import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MOCK_EVENTS } from '../lib/mockData';

export const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*');

                const rawEvents = (error || !data || data.length === 0) ? MOCK_EVENTS : data;

                // Sorting logic:
                // 1. Confirmed Upcoming (Has Date)
                // 2. Completed (Past)
                // 3. Unconfirmed Upcoming (No Date)
                const sorted = [...rawEvents].sort((a, b) => {
                    const priority = (item) => {
                        if (item.status === 'upcoming' && item.date) return 1;
                        if (item.status === 'completed') return 2;
                        if (item.status === 'upcoming' && !item.date) return 3;
                        return 4;
                    };

                    const priorityA = priority(a);
                    const priorityB = priority(b);

                    if (priorityA !== priorityB) return priorityA - priorityB;

                    // Secondary sort by date within priority groups (if applicable)
                    if (a.date && b.date) {
                        return new Date(a.date) - new Date(b.date);
                    }
                    return 0;
                });

                setEvents(sorted);
            } catch (e) {
                setEvents(MOCK_EVENTS);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const athleticsEvents = events.filter(e => e.category === 'athletics');
    const gamesEvents = events.filter(e => e.category === 'games');
    const upcomingEvents = events.filter(e => e.status === 'upcoming');
    const pastEvents = events.filter(e => e.status === 'completed');

    return { events, athleticsEvents, gamesEvents, upcomingEvents, pastEvents, loading };
};
