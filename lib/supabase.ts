
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("CRITICAL: Supabase environment variables are missing!");
    console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "Defined" : "Undefined");
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "Defined" : "Undefined");
}

export const supabase = createClient(supabaseUrl || 'http://localhost', supabaseAnonKey || 'placeholder')
