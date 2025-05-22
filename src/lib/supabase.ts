import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Ensure environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please connect your Supabase project first.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

// Helper function to update user profile
export async function updateUserProfile(userId: string, updates: { name?: string; avatar_url?: string }) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Real-time subscription helper
export const subscribeToChanges = (
  table: string,
  callback: (payload: any) => void
) => {
  const channel = supabase
    .channel(`${table}_changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: table,
      },
      callback
    )
    .subscribe();

  return () => {
    channel.unsubscribe();
  };
};