import { useState, useEffect, useCallback } from 'react';
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
    let mounted = true;

    const initAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          if (mounted) {
            setState({
              user: null,
              isLoading: false,
              isAuthenticated: false,
              error: null,
            });
          }
          return;
        }

        const { user } = await api.getMe();
        if (mounted) {
          setState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        }
      } catch (error) {
        localStorage.removeItem('auth_token');
        if (mounted) {
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { user } = await api.login(email, password);

      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

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

      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });

      return { success: true, error: null };
    } catch (error) {
      localStorage.removeItem('auth_token');
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: error as Error,
      });
      return { success: false, error: error as Error };
    }
  }, []);

  return {
    ...state,
    signIn,
    signOut,
  };
}
