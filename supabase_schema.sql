-- Final Corrected Supabase Schema for College Sports Points Tabulation System

-- Drop existing tables to start fresh (CAUTION: This will delete existing data)
-- DROP TABLE IF EXISTS results;
-- DROP TABLE IF EXISTS events;
-- DROP TABLE IF EXISTS departments;

-- 1. Departments Table (Houses)
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL, -- hex color e.g. '#0072FF'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT, -- emoji or icon key
  date DATE, -- Nullable for "Coming Soon"
  time TEXT, -- e.g. '03:30 PM'
  venue TEXT, -- Nullable for "Coming Soon"
  category TEXT NOT NULL CHECK (category IN ('athletics', 'games')),
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed')),
  rules TEXT[] DEFAULT '{}', -- Added for event guidelines
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Results Table
CREATE TABLE IF NOT EXISTS results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  position INTEGER NOT NULL, -- 1st, 2nd, 3rd, etc.
  department_id uuid REFERENCES departments(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL,
  points INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (event_id, position) -- Ensures only one 1st, 2nd, and 3rd per event
);

-- Enable Realtime for all tables
-- Note: This requires high-level permissions. If it fails, enable via UI.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE departments, events, results;
  END IF;
EXCEPTION
  WHEN others THEN NULL;
END $$;

-- 4. Initial Seed Data (Your Departments)
INSERT INTO departments (name, color) VALUES 
('CSE', '#0072FF'),
('MECH', '#FF4757'),
('IT', '#2ED573'),
('EEE', '#FFA502'),
('ECE', '#78E08F')
ON CONFLICT (name) DO NOTHING;

-- 6. Full Event Catalog
INSERT INTO events (name, icon, date, time, venue, category, status) VALUES 
-- Games
('Handball', '🤾', NULL, NULL, NULL, 'games', 'upcoming', ARRAY[
  'The goalkeeper is the only player allowed to touch the ball with feet inside the goal area.',
  'On-court players must not step into the goal area.',
  'Rolling substitutions are allowed, but max 7 players per team on court at once.',
  'Charging a player from behind leads to a 2-minute suspension.',
  'Maximum 3 steps allowed with the ball without dribbling.',
  'Ball cannot be held for more than 3 seconds without throwing or dribbling.',
  'Attacking team cannot play the ball back across the center line once passed.',
  'Passive play rule: Shot must be taken within 56 seconds or a free-throw is awarded to the defense.',
  'Double dribble is strictly prohibited.',
  'Court players are not allowed to touch the ball with their feet or lower legs.',
  'Players must not rip the ball from an opponent\'s hands or use excessive force (pushing/ripping).',
  'Obey committee rules; otherwise, disciplinary action will be taken.'
]),
('Throwball', '🏐', NULL, NULL, NULL, 'games', 'upcoming'),
('Volleyball', '🏐', NULL, NULL, NULL, 'games', 'upcoming'),
('Basketball', '🏀', NULL, NULL, NULL, 'games', 'upcoming'),
('Table Tennis', '🏓', NULL, NULL, NULL, 'games', 'upcoming'),
('Badminton', '🏸', NULL, NULL, NULL, 'games', 'upcoming'),
('Cricket', '🏏', NULL, NULL, NULL, 'games', 'upcoming'),
('Football', '⚽', NULL, NULL, NULL, 'games', 'upcoming'),
-- Athletics
('200 m', '🏃', NULL, NULL, NULL, 'athletics', 'upcoming'),
('400 m', '🏃', NULL, NULL, NULL, 'athletics', 'upcoming'),
('800 m', '🏃', NULL, NULL, NULL, 'athletics', 'upcoming'),
('1500 m', '🏃', NULL, NULL, NULL, 'athletics', 'upcoming'),
('3000 m', '🏃', NULL, NULL, NULL, 'athletics', 'upcoming'),
('Shot Put', '☄️', NULL, NULL, NULL, 'athletics', 'upcoming'),
('Javelin Throw', '🔱', NULL, NULL, NULL, 'athletics', 'upcoming'),
('Long Jump', '👟', NULL, NULL, NULL, 'athletics', 'upcoming')
ON CONFLICT DO NOTHING;

-- 7. Sample Confirmed Events
INSERT INTO events (name, icon, date, time, venue, category, status) VALUES 
('Chess', '♟️', '2026-02-25', '03:30 PM', 'Admin Block', 'games', 'upcoming'),
('Carrom', '', '2026-02-25', '03:30 PM', 'Admin Block', 'games', 'upcoming')
ON CONFLICT DO NOTHING;
