/*
  # Create demo account

  1. Changes
    - Create demo user account with profile
    - Set up initial store for demo user
  
  2. Security
    - Uses secure password hashing through Supabase Auth
    - Maintains existing RLS policies
*/

-- Create the demo user account through Supabase Auth
SELECT supabase_auth.create_user(
  uuid_generate_v4(),
  'demo@nicheninja.com',
  'password',
  '{}'::jsonb,
  '{}'::jsonb,
  '{}'::jsonb,
  'authenticated',
  true, -- email_confirmed
  true, -- phone_confirmed
  null, -- phone
  null, -- password_hash (Supabase will hash the password)
  now(),
  now()
);

-- Get the user ID for the demo account
DO $$
DECLARE
  demo_user_id uuid;
BEGIN
  -- Get the user ID from auth.users
  SELECT id INTO demo_user_id
  FROM auth.users
  WHERE email = 'demo@nicheninja.com';

  -- Create profile for demo user if it doesn't exist
  INSERT INTO profiles (id, name, created_at, updated_at)
  VALUES (demo_user_id, 'Demo User', now(), now())
  ON CONFLICT (id) DO NOTHING;

  -- Create a demo store
  INSERT INTO stores (name, slug, description, owner_id)
  VALUES (
    'Demo Store',
    'demo-store',
    'This is a demo store to showcase the platform features',
    demo_user_id
  )
  ON CONFLICT DO NOTHING;
END $$;