
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = ''; 
const supabaseAnonKey = '';

let supabaseInstance = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Supabase client initialized successfully.");
  } catch (error) {
    console.error("Error creating Supabase client:", error);
    supabaseInstance = null;
  }
} else {
  console.warn("Supabase URL or Anon Key is not configured. Supabase client will not be initialized. Application will run in demo mode.");
}

export const supabase = supabaseInstance;

export const isSupabaseConnected = () => {
  return !!supabaseInstance;
};
