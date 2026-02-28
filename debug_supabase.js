import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ncvgbcpmerkaukemauca.supabase.co';
const supabaseKey = 'sb_publishable_1PzKXbbeIYpinzf3V9GiFw_lVeZqVnH';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    try {
        console.log("--- Checking matches ---");
        const { data: matches, error: matchesError } = await supabase.from('matches').select('*');
        if (matchesError) {
            console.error("Error fetching matches:", matchesError.message);
        } else {
            console.log("Matches found:", matches.length);
            console.log(JSON.stringify(matches, null, 2));
        }

        console.log("\n--- Checking teams ---");
        const { data: teams, error: teamsError } = await supabase.from('teams').select('*');
        if (teamsError) {
            console.error("Error fetching teams:", teamsError.message);
        } else {
            console.log("Teams found:", teams.length);
            console.log(JSON.stringify(teams, null, 2));
        }

        console.log("\n--- Checking departments ---");
        const { data: departments, error: deptsError } = await supabase.from('departments').select('*');
        if (deptsError) {
            console.error("Error fetching departments:", deptsError.message);
        } else {
            console.log("Departments found:", departments.length);
        }

        console.log("\n--- Checking cricket_innings ---");
        const { data: innings, error: inningsError } = await supabase.from('cricket_innings').select('*');
        if (inningsError) {
            console.error("Error fetching cricket_innings:", inningsError.message);
        } else {
            console.log("Innings found:", innings.length);
            console.log(JSON.stringify(innings, null, 2));
        }
    } catch (err) {
        console.error("Unexpected error:", err);
    }
}

checkData();
