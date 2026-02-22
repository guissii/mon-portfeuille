import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import type { Project } from '@/types';

interface UseProjectsOptions {
  featured?: boolean;
  status?: 'draft' | 'published';
  category?: string;
  limit?: number;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.getProjects({
        status: options.status,
        featured: options.featured,
        category: options.category,
        limit: options.limit,
      });

      setProjects(data as Project[]);
    } catch (err) {
      setError(err as Error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, [options.featured, options.status, options.category, options.limit]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const getProjectBySlug = useCallback(async (slug: string) => {
    try {
      const data = await api.getProjectBySlug(slug);
      return { data: data as Project, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  }, []);

  const createProject = useCallback(async (data: any) => {
    try {
      const result = await api.createProject(data);
      await fetchProjects();
      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  }, [fetchProjects]);

  const updateProject = useCallback(async (id: string, data: any) => {
    try {
      const result = await api.updateProject(id, data);
      await fetchProjects();
      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  }, [fetchProjects]);

  const deleteProject = useCallback(async (id: string) => {
    try {
      await api.deleteProject(id);
      await fetchProjects();
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    error,
    refetch: fetchProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject,
  };
}
