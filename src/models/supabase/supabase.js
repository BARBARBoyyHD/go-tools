
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your_db_url.supabase.co';
const supabaseKey = 'your_anon_key';
export const supabase = createClient(supabaseUrl, supabaseKey);
