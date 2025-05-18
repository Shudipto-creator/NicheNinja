import { createClient } from '@supabase/supabase-js';

// Get environment variables or use default values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJh...'; // Use a placeholder key or your development key

// Remove the error throwing block and add a console warning instead
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Using default development values. This should not be used in production.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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