import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useLiveFeed = () => {
    const [matches, setMatches] = useState([]);
    const [goals, setGoals] = useState([]);
    const [innings, setInnings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        // Prevent multiple simultaneous fetches
        const timeoutId = setTimeout(() => setLoading(false), 10000);

        try {
            // Fetch matches (Live, Upcoming, and Past)
            console.log("Fetching matches from Supabase...");
            const { data: matchesData, error: matchesError } = await supabase
                .from('matches')
                .select('*, team1:team1_id(*), team2:team2_id(*)');
            // Temporarily disabled ordering to check if match_date exists
            // .order('match_date', { ascending: false });

            if (matchesError) {
                console.error("Match Fetch Error Detal:", matchesError);
                throw matchesError;
            }
            console.log("Matches data received:", matchesData?.length, matchesData);

            // Fetch goals and innings if there are any matches
            let goalsData = [];
            let inningsData = [];

            if (matchesData.length > 0) {
                const matchIds = matchesData.map(m => m.id);

                const { data: gData, error: gError } = await supabase
                    .from('football_goals')
                    .select('*')
                    .in('match_id', matchIds);
                if (gError) throw gError;
                goalsData = gData;

                const { data: iData, error: iError } = await supabase
                    .from('cricket_innings')
                    .select('*')
                    .in('match_id', matchIds);
                if (iError) throw iError;
                inningsData = iData;
            }

            setMatches(matchesData);
            setGoals(goalsData);
            setInnings(inningsData);
        } catch (err) {
            console.error("Error fetching live feed:", err);
        } finally {
            clearTimeout(timeoutId);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // Debounce real-time updates to prevent flash loading and network flood
        let debounceTimer;
        const debouncedFetch = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(fetchData, 500);
        };

        const matchesChannel = supabase
            .channel('live-feed-all')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, debouncedFetch)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'football_goals' }, debouncedFetch)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'cricket_innings' }, debouncedFetch)
            .subscribe();

        return () => {
            supabase.removeChannel(matchesChannel);
            clearTimeout(debounceTimer);
        };
    }, []);

    const getMatchScore = (match, sport) => {
        if (sport === 'football') {
            const team1Goals = goals.filter(g => g.match_id === match.id && g.team_id === match.team1_id).length;
            const team2Goals = goals.filter(g => g.match_id === match.id && g.team_id === match.team2_id).length;
            return { team1: team1Goals, team2: team2Goals };
        } else if (sport === 'cricket') {
            return innings.filter(i => i.match_id === match.id);
        }
        return null;
    };

    return { matches, goals, innings, loading, getMatchScore };
};
