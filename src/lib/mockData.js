export const MOCK_DEPARTMENTS = [
    { id: 'd1', name: 'Computer Science', color: '#0072FF' },
    { id: 'd2', name: 'Mechanical Engineering', color: '#FF4757' },
    { id: 'd3', name: 'Civil Engineering', color: '#2ED573' },
    { id: 'd4', name: 'Electrical Engineering', color: '#FFA502' },
    { id: 'd5', name: 'Electronics Engineering', color: '#78E08F' },
];

export const MOCK_EVENTS = [
    { id: 'e1', name: '100m Sprint', icon: '🏃', date: '2026-02-20', time: '09:00 AM', venue: 'Main Stadium', status: 'completed', category: 'athletics' },
    { id: 'e2', name: 'Football Tournament', icon: '⚽', date: '2026-02-18', time: '02:00 PM', venue: 'Football Ground', status: 'completed', category: 'games' },
    { id: 'e3', name: 'Cricket Finals', icon: '🏏', date: null, time: null, venue: null, status: 'upcoming', category: 'games' },
    { id: 'e4', name: 'Relay Race 4x100m', icon: '🏃', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics' },
    { id: 'e5', name: 'Chess', icon: '♟️', date: '2026-02-25', time: '03:30 PM', venue: 'Admin Block', status: 'upcoming', category: 'games' },
    { id: 'e6', name: 'Carrom', icon: '🎯', date: '2026-02-25', time: '03:30 PM', venue: 'Admin Block', status: 'upcoming', category: 'games' },

    // New Events (All Coming Soon)
    { id: 'e7', name: 'Handball', icon: '🤾', date: null, time: null, venue: null, status: 'upcoming', category: 'games' },
    { id: 'e8', name: 'Throwball', icon: '🏐', date: null, time: null, venue: null, status: 'upcoming', category: 'games' },
    { id: 'e9', name: 'Volleyball', icon: '🏐', date: null, time: null, venue: null, status: 'upcoming', category: 'games' },
    { id: 'e10', name: 'Basketball', icon: '🏀', date: null, time: null, venue: null, status: 'upcoming', category: 'games' },
    { id: 'e11', name: 'Table Tennis', icon: '🏓', date: null, time: null, venue: null, status: 'upcoming', category: 'games' },
    { id: 'e12', name: 'Badminton', icon: '🏸', date: null, time: null, venue: null, status: 'upcoming', category: 'games' },
    { id: 'e13', name: '200 m', icon: '🏃', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics' },
    { id: 'e14', name: '400 m', icon: '🏃', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics' },
    { id: 'e15', name: '800 m', icon: '🏃', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics' },
    { id: 'e16', name: '1500 m', icon: '🏃', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics' },
    { id: 'e17', name: '3000 m', icon: '🏃', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics' },
    { id: 'e18', name: 'Shot Put', icon: '☄️', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics' },
    { id: 'e19', name: 'Javelin Throw', icon: '🔱', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics' },
    { id: 'e20', name: 'Long Jump', icon: '👟', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics' },
];

export const MOCK_RESULTS = [
    { id: 'r1', event_id: 'e1', position: 1, department_id: 'd1', player_name: 'Arjun K', points: 10 },
    { id: 'r2', event_id: 'e1', position: 2, department_id: 'd4', player_name: 'Rahul S', points: 7 },
    { id: 'r3', event_id: 'e1', position: 3, department_id: 'd2', player_name: 'Midhun P', points: 5 },
    { id: 'r4', event_id: 'e2', position: 1, department_id: 'd2', player_name: 'Mechanical Lions', points: 15 },
    { id: 'r5', event_id: 'e2', position: 2, department_id: 'd1', player_name: 'CS Strikers', points: 10 },
    { id: 'r6', event_id: 'e2', position: 3, department_id: 'd3', player_name: 'Civil Warriors', points: 7 },
];
