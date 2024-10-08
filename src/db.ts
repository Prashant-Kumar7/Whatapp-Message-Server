import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv';
import { Database } from './types/supabase';
// import { supabase } from './db';
dotenv.config();
export const supabase = createClient<Database>(
    process.env.SUPRABASE_PROJECT_URL || "", 
    process.env.SUPRABASE_API_KEY || ""
);
