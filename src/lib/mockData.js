export const MOCK_DEPARTMENTS = [
    { id: 'd1', name: 'CSE', color: '#0072FF' },
    { id: 'd2', name: 'MECH', color: '#FF4757' },
    { id: 'd3', name: 'IT', color: '#2ED573' },
    { id: 'd4', name: 'EEE', color: '#FFA502' },
    { id: 'd5', name: 'ECE', color: '#78E08F' },
];

export const MOCK_EVENTS = [
    {
        id: 'e1',
        name: '100m Sprint',
        icon: '🏃',
        date: '2026-02-20',
        time: '09:00 AM',
        venue: 'Main Stadium',
        status: 'completed',
        category: 'athletics',
        rules: [
            "Athletes must stay in their assigned lanes throughout the race.",
            "A false start results in immediate disqualification.",
            "The finish is determined by the chest crossing the finish line.",
            "Spikes must not exceed 9mm in length."
        ]
    },
    {
        id: 'e2',
        name: 'Football',
        icon: '⚽',
        date: '2026-02-18',
        time: '02:00 PM',
        venue: 'Football Ground',
        status: 'upcoming',
        category: 'games',
        rules: [
            "Matches are 20 minutes per half with a 5-minute break.",
            "Rolling substitutions are allowed.",
            "Yellow and Red card rules apply as per FIFA standards.",
            "In case of a draw in knockout stages, direct penalty shootout will occur."
        ]
    },
    {
        id: 'e3',
        name: 'Cricket Finals',
        icon: '🏏',
        date: null,
        time: null,
        venue: null,
        status: 'upcoming',
        category: 'games',
        rules: [
            "Matches will be 10 overs per side.",
            "Maximum 2 overs per bowler.",
            "Powerplay restricted to the first 3 overs.",
            "Super over rule applies for tied matches."
        ]
    },
    {
        id: 'e4',
        name: 'Relay Race 4x100m',
        icon: '🏃',
        date: null,
        time: null,
        venue: null,
        status: 'upcoming',
        category: 'athletics',
        rules: [
            "Baton must be passed within the 20m changeover zone.",
            "Dropping the baton results in disqualification if picked up incorrectly.",
            "Athletes must remain in their lanes after passing the baton."
        ]
    },
    {
        id: 'e5',
        name: 'Chess',
        icon: '♟️',
        date: '2026-02-25',
        time: '03:30 PM',
        venue: 'Admin Block',
        status: 'upcoming',
        category: 'games',
        rules: [
            "Time format: 10 minutes + 5 seconds increment.",
            "Touch-move rule is strictly enforced.",
            "Standard FIDE rules apply.",
            "Mobile phones are strictly prohibited in the playing arena."
        ]
    },
    {
        id: 'e6',
        name: 'Carrom',
        icon: '🎯',
        date: '2026-02-25',
        time: '03:30 PM',
        venue: 'Admin Block',
        status: 'upcoming',
        category: 'games',
        rules: [
            "Matches are best of 3 boards.",
            "Queen must be covered immediately.",
            "Fouls result in a penalty of one piece.",
            "Finger flicking only, no pushing allowed."
        ]
    },

    // New Events (All Coming Soon)
    {
        id: 'e7',
        name: 'Handball',
        icon: '🤾',
        date: null,
        time: null,
        venue: null,
        status: 'upcoming',
        category: 'games',
        rules: [
            "The goalkeeper is the only player allowed to touch the ball with feet inside the goal area.",
            "On-court players must not step into the goal area.",
            "Rolling substitutions are allowed, but max 7 players per team on court at once.",
            "Charging a player from behind leads to a 2-minute suspension.",
            "Maximum 3 steps allowed with the ball without dribbling.",
            "Ball cannot be held for more than 3 seconds without throwing or dribbling.",
            "Attacking team cannot play the ball back across the center line once passed.",
            "Passive play rule: Shot must be taken within 56 seconds or a free-throw is awarded to the defense.",
            "Double dribble is strictly prohibited.",
            "Court players are not allowed to touch the ball with their feet or lower legs.",
            "Players must not rip the ball from an opponent's hands or use excessive force (pushing/ripping).",
            "Obey committee rules; otherwise, disciplinary action will be taken."
        ]
    },
    { id: 'e8', name: 'Throwball', icon: '🏐', date: null, time: null, venue: null, status: 'upcoming', category: 'games', rules: ["Ball must be caught with both hands.", "Maximum 3 touches per side."] },
    { id: 'e9', name: 'Volleyball', icon: '🏐', date: null, time: null, venue: null, status: 'upcoming', category: 'games', rules: ["Standard FIVB rules for 6-a-side.", "Best of 3 sets for group stages."] },
    { id: 'e10', name: 'Basketball', icon: '🏀', date: null, time: null, venue: null, status: 'upcoming', category: 'games', rules: ["4 quarters of 8 minutes each.", "Standard FIBA foul rules apply."] },
    { id: 'e11', name: 'Table Tennis', icon: '🏓', date: null, time: null, venue: null, status: 'upcoming', category: 'games', rules: ["Best of 3 games, each up to 11 points.", "Alternate service every 2 points."] },
    { id: 'e12', name: 'Badminton', icon: '🏸', date: null, time: null, venue: null, status: 'upcoming', category: 'games', rules: ["Best of 3 sets, each up to 21 points.", "Standard BWF scoring applies."] },
    { id: 'e13', name: '200 m', icon: '🏃', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics', rules: ["Lane discipline is mandatory."] },
    { id: 'e14', name: '400 m', icon: '🏃', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics', rules: ["One full lap of the track."] },
    { id: 'e15', name: '800 m', icon: '🏃', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics', rules: ["Starts in lanes, breaks to inside after the first curve."] },
    { id: 'e16', name: '1500 m', icon: '🏃', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics', rules: ["Long distance track event."] },
    { id: 'e17', name: '3000 m', icon: '🏃', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics', rules: ["Endurance race, 7.5 laps."] },
    { id: 'e18', name: 'Shot Put', icon: '☄️', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics', rules: ["The shot must be 'put' from the shoulder.", "Must exit from the rear of the circle."] },
    { id: 'e19', name: 'Javelin Throw', icon: '🔱', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics', rules: ["Tip must strike the ground first.", "The throw must be over the shoulder."] },
    { id: 'e20', name: 'Long Jump', icon: '👟', date: null, time: null, venue: null, status: 'upcoming', category: 'athletics', rules: ["No-step on the foul line.", "Distance measured from the nearest break in landing."] },
];

export const MOCK_RESULTS = [
    { id: 'r1', event_id: 'e1', position: 1, department_id: 'd1', player_name: 'Arjun K', points: 10 },
    { id: 'r2', event_id: 'e1', position: 2, department_id: 'd4', player_name: 'Rahul S', points: 7 },
    { id: 'r3', event_id: 'e1', position: 3, department_id: 'd2', player_name: 'Midhun P', points: 5 },
    { id: 'r4', event_id: 'e2', position: 1, department_id: 'd2', player_name: 'Mechanical Lions', points: 15 },
    { id: 'r5', event_id: 'e2', position: 2, department_id: 'd1', player_name: 'CS Strikers', points: 10 },
    { id: 'r6', event_id: 'e2', position: 3, department_id: 'd3', player_name: 'Civil Warriors', points: 7 },
];
