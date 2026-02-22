import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import type { Certification } from '@/types';

interface UseCertificationsOptions {
  featured?: boolean;
  status?: 'draft' | 'published';
  limit?: number;
}

export function useCertifications(options: UseCertificationsOptions = {}) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCertifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.getCertifications({
        status: options.status,
        featured: options.featured,
        limit: options.limit,
      });

      setCertifications(data as Certification[]);
    } catch (err) {
      setError(err as Error);
      setCertifications([]);
    } finally {
      setIsLoading(false);
    }
  }, [options.featured, options.status, options.limit]);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  const createCertification = useCallback(async (data: any) => {
    try {
      const result = await api.createCertification(data);
      await fetchCertifications();
      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  }, [fetchCertifications]);

  const updateCertification = useCallback(async (id: string, data: any) => {
    try {
      const result = await api.updateCertification(id, data);
      await fetchCertifications();
      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  }, [fetchCertifications]);

  const deleteCertification = useCallback(async (id: string) => {
    try {
      await api.deleteCertification(id);
      await fetchCertifications();
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  }, [fetchCertifications]);

  return {
    certifications,
    isLoading,
    error,
    refetch: fetchCertifications,
    createCertification,
    updateCertification,
    deleteCertification,
  };
}
