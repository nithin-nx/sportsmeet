import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useMatchCenter = (matchId, sport) => {
    const [match, setMatch] = useState(null);
    const [details, setDetails] = useState([]); // goals for football, overs for cricket
    const [innings, setInnings] = useState([]); // for cricket
    const [loading, setLoading] = useState(true);

    const fetchMatchDetails = async () => {
        // Prevent infinite loading by setting a safety timeout
        const timeoutId = setTimeout(() => setLoading(false), 10000);

        try {
            // Fetch match with team info
            const { data: matchData, error: matchError } = await supabase
                .from('matches')
                .select('*, team1:team1_id(*), team2:team2_id(*)')
                .eq('id', matchId)
                .single();

            if (matchError) throw matchError;
            setMatch(matchData);

            if (sport === 'football') {
                const { data: goals, error: goalsError } = await supabase
                    .from('football_goals')
                    .select('*')
                    .eq('match_id', matchId)
                    .order('minute', { ascending: true });
                if (goalsError) throw goalsError;
                setDetails(goals);
            } else if (sport === 'cricket') {
                const { data: overs, error: oversError } = await supabase
                    .from('cricket_overs')
                    .select('*')
                    .eq('match_id', matchId)
                    .order('over_number', { ascending: false });
                if (oversError) throw oversError;
                setDetails(overs);

                const { data: inningsData, error: inningsError } = await supabase
                    .from('cricket_innings')
                    .select('*')
                    .eq('match_id', matchId);
                if (inningsError) throw inningsError;
                setInnings(inningsData);
            }
        } catch (err) {
            console.error("Error fetching match details:", err);
        } finally {
            clearTimeout(timeoutId);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!matchId) return;
        fetchMatchDetails();

        // Debounce updates to prevent network flood during rapid match events
        let debounceTimer;
        const debouncedFetch = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(fetchMatchDetails, 500);
        };

        const channel = supabase
            .channel(`match-${matchId}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'matches', filter: `id=eq.${matchId}` }, debouncedFetch)
            .on('postgres_changes', { event: '*', schema: 'public', table: sport === 'football' ? 'football_goals' : 'cricket_overs', filter: `match_id=eq.${matchId}` }, debouncedFetch)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'cricket_innings', filter: `match_id=eq.${matchId}` }, debouncedFetch)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
            clearTimeout(debounceTimer);
        };
    }, [matchId, sport]);

    return { match, details, innings, loading };
};
