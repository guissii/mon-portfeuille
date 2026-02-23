import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { api } from '@/lib/api';

interface AuthState {
  user: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        user: session?.user ?? null,
        isLoading: false,
        isAuthenticated: !!session,
        error: null,
      });
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user ?? null,
        isLoading: false,
        isAuthenticated: !!session,
        error: null,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await api.login(email, password);
      // State is updated via onAuthStateChange listener
      return { success: true, error: null };
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
      return { success: false, error: error as Error };
    }
  }, []);

  const signOut = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      await api.logout();
      return { success: true, error: null };
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
      return { success: false, error: error as Error };
    }
  }, []);

  return {
    ...state,
    signIn,
    signOut,
  };
}
