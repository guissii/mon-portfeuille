import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export function useSettings() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchSettings = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await api.getSettings();
            setSettings(data);
        } catch (err) {
            setError(err as Error);
            setSettings({});
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const updateSettings = useCallback(async (data: Record<string, string>) => {
        try {
            const result = await api.updateSettings(data);
            setSettings(result);
            return { data: result, error: null };
        } catch (err) {
            return { data: null, error: err as Error };
        }
    }, []);

    return {
        settings,
        isLoading,
        error,
        refetch: fetchSettings,
        updateSettings,
    };
}
