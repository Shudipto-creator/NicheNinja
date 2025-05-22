/*
  # Create demo user and store

  1. New Records
    - Creates a demo user in auth.users
    - Creates corresponding identity in auth.identities
    - Creates user profile in profiles table
    - Creates a demo store in stores table
    
  2. Changes
    - Ensures UUID extension is available
    - Adds demo data for testing
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the demo user account
DO $$
DECLARE
  demo_user_id uuid := '00000000-0000-0000-0000-000000000000';
  demo_email text := 'demo@nicheninja.com';
  demo_password text := 'password';
BEGIN
  -- Only create the user if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = demo_email
  ) THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      role
    )
    VALUES (
      demo_user_id,
      demo_email,
      crypt(demo_password, gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      '{"name": "Demo User"}'::jsonb,
      false,
      'authenticated'
    );

    -- Create identities record
    INSERT INTO auth.identities (
      id,
      user_id,
      provider_id,
      identity_data,
      provider,
      created_at,
      updated_at,
      last_sign_in_at
    )
    VALUES (
      demo_user_id,
      demo_user_id,
      demo_email,
      format('{"sub": "%s", "email": "%s"}', demo_user_id, demo_email)::jsonb,
      'email',
      now(),
      now(),
      now()
    );

    -- Create profile for demo user
    INSERT INTO public.profiles (
      id,
      name,
      created_at,
      updated_at
    )
    VALUES (
      demo_user_id,
      'Demo User',
      now(),
      now()
    );

    -- Create a demo store
    INSERT INTO public.stores (
      name,
      slug,
      description,
      owner_id,
      created_at,
      updated_at
    )
    VALUES (
      'Demo Store',
      'demo-store',
      'This is a demo store to showcase the platform features',
      demo_user_id,
      now(),
      now()
    );
  END IF;
END $$;