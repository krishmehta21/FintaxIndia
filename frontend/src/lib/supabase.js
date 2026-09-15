import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dlqxzjzjinqgzogbiiaa.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_sTwYCCS8NauPrDpU0NOY_g_YiUadKmM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

