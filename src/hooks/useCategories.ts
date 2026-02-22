import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export function useCategories() {
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await api.getCategories();
            setCategories(data);
        } catch (err) {
            setError(err as Error);
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const createCategory = useCallback(async (data: any) => {
        try {
            const result = await api.createCategory(data);
            await fetchCategories();
            return { data: result, error: null };
        } catch (err) {
            return { data: null, error: err as Error };
        }
    }, [fetchCategories]);

    const updateCategory = useCallback(async (id: string, data: any) => {
        try {
            const result = await api.updateCategory(id, data);
            await fetchCategories();
            return { data: result, error: null };
        } catch (err) {
            return { data: null, error: err as Error };
        }
    }, [fetchCategories]);

    const deleteCategory = useCallback(async (id: string) => {
        try {
            await api.deleteCategory(id);
            await fetchCategories();
            return { error: null };
        } catch (err) {
            return { error: err as Error };
        }
    }, [fetchCategories]);

    return {
        categories,
        isLoading,
        error,
        refetch: fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    };
}
