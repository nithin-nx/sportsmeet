import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ncvgbcpmerkaukemauca.supabase.co';
const supabaseKey = 'sb_publishable_1PzKXbbeIYpinzf3V9GiFw_lVeZqVnH';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log("Testing connection...");
    const { data, error } = await supabase.from('departments').select('count', { count: 'exact', head: true });
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Success! Departments count:", data);
    }
}

test();
