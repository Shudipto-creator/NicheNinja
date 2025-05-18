import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '@/types';
import { mockData } from './mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser) as User;
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            ...initialState,
            isLoading: false,
          });
        }
      } catch (error) {
        setAuthState({
          ...initialState,
          isLoading: false,
          error: 'Failed to restore authentication',
        });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setAuthState({
      ...authState,
      isLoading: true,
      error: null,
    });

    try {
      // This is a mock login - in a real app, this would call an API
      // For demo purposes, we'll just check if the email matches our demo user
      const user = mockData.users.find(u => u.email === email);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user && password === 'password') {
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          ...authState,
          isLoading: false,
          error: 'Invalid email or password',
        });
      }
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: 'Login failed. Please try again.',
      });
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setAuthState({
      ...authState,
      isLoading: true,
      error: null,
    });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would call an API to register the user
      // For demo purposes, we'll just return success if the email isn't already used
      const existingUser = mockData.users.find(u => u.email === email);
      
      if (existingUser) {
        setAuthState({
          ...authState,
          isLoading: false,
          error: 'Email already in use',
        });
        return;
      }
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        createdAt: new Date().toISOString(),
      };
      
      // In a real app, we would save this user to the database
      // For now, we'll just simulate a successful registration
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: 'Registration failed. Please try again.',
      });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};