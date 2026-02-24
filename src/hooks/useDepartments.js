import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MOCK_DEPARTMENTS, MOCK_RESULTS, MOCK_EVENTS } from '../lib/mockData';

export const useDepartments = (category = null) => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                // Fetch departments and optionally filter results by event category
                let query = supabase.from('departments').select('*, results(points, events(category))');

                const { data, error } = await query;

                if (error || !data || data.length === 0) {
                    // For mock data, we calculate points from MOCK_RESULTS
                    const mockProcessed = MOCK_DEPARTMENTS.map(dept => {
                        const deptResults = MOCK_RESULTS.filter(r => r.department_id === dept.id);

                        // Filter by category if requested
                        const filteredResults = category
                            ? deptResults.filter(r => {
                                const event = MOCK_EVENTS.find(e => e.id === r.event_id);
                                return event?.category === category;
                            })
                            : deptResults;

                        const totalPoints = filteredResults.reduce((sum, r) => sum + r.points, 0);

                        return { ...dept, points: totalPoints };
                    }).sort((a, b) => b.points - a.points);

                    setDepartments(mockProcessed);
                } else {
                    const processed = data.map(dept => {
                        const filteredResults = category
                            ? (dept.results?.filter(r => r.events?.category === category) || [])
                            : (dept.results || []);

                        return {
                            ...dept,
                            points: filteredResults.reduce((sum, r) => sum + r.points, 0) || 0
                        };
                    }).sort((a, b) => b.points - a.points);
                    setDepartments(processed);
                }
            } catch (e) {
                setDepartments(MOCK_DEPARTMENTS.map(d => ({ ...d, points: 0 })));
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, [category]);

    return { departments, loading };
};
