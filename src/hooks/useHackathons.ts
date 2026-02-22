import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import type { Hackathon } from '@/types';

interface UseHackathonsOptions {
  featured?: boolean;
  status?: 'draft' | 'published';
  limit?: number;
}

export function useHackathons(options: UseHackathonsOptions = {}) {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHackathons = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.getHackathons({
        status: options.status,
        featured: options.featured,
        limit: options.limit,
      });

      setHackathons(data as Hackathon[]);
    } catch (err) {
      setError(err as Error);
      setHackathons([]);
    } finally {
      setIsLoading(false);
    }
  }, [options.featured, options.status, options.limit]);

  useEffect(() => {
    fetchHackathons();
  }, [fetchHackathons]);

  const createHackathon = useCallback(async (data: any) => {
    try {
      const result = await api.createHackathon(data);
      await fetchHackathons();
      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  }, [fetchHackathons]);

  const updateHackathon = useCallback(async (id: string, data: any) => {
    try {
      const result = await api.updateHackathon(id, data);
      await fetchHackathons();
      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  }, [fetchHackathons]);

  const deleteHackathon = useCallback(async (id: string) => {
    try {
      await api.deleteHackathon(id);
      await fetchHackathons();
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  }, [fetchHackathons]);

  return {
    hackathons,
    isLoading,
    error,
    refetch: fetchHackathons,
    createHackathon,
    updateHackathon,
    deleteHackathon,
  };
}
