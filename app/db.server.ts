import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL)
  throw Error('Supabase URL not found in environment');
if (!process.env.SUPABASE_KEY)
  throw Error('Supabase KEY not found in environment');

export let supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
