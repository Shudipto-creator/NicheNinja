import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, getUserProfile } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check active sessions and sets up an auth state listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        getUserProfile(session.user.id)
          .then((profile) => {
            setState({
              user: session.user,
              profile,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          })
          .catch((error) => {
            console.error('Error fetching user profile:', error);
            setState({
              user: session.user,
              profile: null,
              isAuthenticated: true,
              isLoading: false,
              error: 'Failed to load user profile',
            });
          });
      } else {
        setState({
          user: null,
          profile: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          const profile = await getUserProfile(session.user.id);
          setState({
            user: session.user,
            profile,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setState({
            user: session.user,
            profile: null,
            isAuthenticated: true,
            isLoading: false,
            error: 'Failed to load user profile',
          });
        }
      } else {
        setState({
          user: null,
          profile: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to login',
      });
      throw error; // Re-throw to handle in the component
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (signUpError) throw signUpError;
    } catch (error) {
      console.error('Registration error:', error);
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to register',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      setState({ ...state, isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to logout',
      });
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!state.user) throw new Error('No user logged in');
      const updatedProfile = await updateUserProfile(state.user.id, updates);
      setState({
        ...state,
        profile: updatedProfile,
      });
    } catch (error) {
      console.error('Profile update error:', error);
      setState({
        ...state,
        error: error instanceof Error ? error.message : 'Failed to update profile',
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};