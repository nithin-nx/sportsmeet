import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useMatches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Initial Fetch
        const fetchMatches = async () => {
            try {
                const { data, error } = await supabase
                    .from('matches')
                    .select('*, events(name, icon)');

                if (!error && data) {
                    setMatches(data);
                }
            } catch (err) {
                console.error("Error fetching matches:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();

        // 2. Real-time Subscription
        const channel = supabase
            .channel('realtime_matches')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'matches' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        // For inserts, we might need to fetch again to get joined event data
                        // or just add it if event_id is enough for now. 
                        // Simplified: update the list
                        setMatches((prev) => [...prev, payload.new]);
                    } else if (payload.eventType === 'UPDATE') {
                        setMatches((prev) =>
                            prev.map(m => m.id === payload.new.id ? { ...m, ...payload.new } : m)
                        );
                    } else if (payload.eventType === 'DELETE') {
                        setMatches((prev) => prev.filter(m => m.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const liveMatches = matches.filter(m => m.status === 'live');
    const upcomingMatches = matches.filter(m => m.status === 'upcoming');
    const completedMatches = matches.filter(m => m.status === 'completed');

    return { matches, liveMatches, upcomingMatches, completedMatches, loading };
};
