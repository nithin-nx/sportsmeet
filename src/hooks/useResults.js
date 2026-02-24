import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MOCK_RESULTS, MOCK_EVENTS, MOCK_DEPARTMENTS } from '../lib/mockData';

export const useResults = (eventId) => {
    const [event, setEvent] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!eventId) return;

        const fetchData = async () => {
            try {
                // Fetch event details
                const { data: eventData } = await supabase
                    .from('events')
                    .select('*')
                    .eq('id', eventId)
                    .single();

                // Fetch results with department info
                const { data: resultsData } = await supabase
                    .from('results')
                    .select('*, departments(name, color)')
                    .eq('event_id', eventId)
                    .order('position', { ascending: true });

                const event_obj = eventData || MOCK_EVENTS.find(e => e.id === eventId);

                // If it's a mock event or db didn't return results, check mock data
                if ((!resultsData || resultsData.length === 0)) {
                    const mockRes = MOCK_RESULTS.filter(r => r.event_id === eventId).map(r => ({
                        ...r,
                        departments: MOCK_DEPARTMENTS.find(d => d.id === r.department_id)
                    }));
                    setResults(mockRes);
                } else {
                    setResults(resultsData);
                }

                setEvent(event_obj);
            } catch (e) {
                const mockEvent = MOCK_EVENTS.find(e => e.id === eventId);
                const mockRes = MOCK_RESULTS.filter(r => r.event_id === eventId).map(r => ({
                    ...r,
                    departments: MOCK_DEPARTMENTS.find(d => d.id === r.department_id)
                }));
                setEvent(mockEvent);
                setResults(mockRes);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventId]);

    return { event, results, loading };
};
