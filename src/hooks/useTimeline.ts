import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export function useTimeline(limit?: number) {
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchTimeline = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await api.getTimeline(limit);
            setEvents(data);
        } catch (err) {
            setError(err as Error);
            setEvents([]);
        } finally {
            setIsLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchTimeline();
    }, [fetchTimeline]);

    return {
        events,
        isLoading,
        error,
        refetch: fetchTimeline,
    };
}
