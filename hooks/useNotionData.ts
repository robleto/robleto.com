import { useState, useEffect, useCallback } from 'react';
import { fetchNotionData } from '@/lib/notionContentFetcher';
import type { NotionFetchResponse, BaseItem } from '@/types';

interface UseNotionDataOptions {
  databaseId?: string;
  pageId?: string;
  entryType?: string;
  includeImages?: boolean;
  enabled?: boolean; // Allow conditional fetching
}

interface UseNotionDataReturn<T = BaseItem> {
  data: NotionFetchResponse<T> | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useNotionData<T = BaseItem>(
  options: UseNotionDataOptions
): UseNotionDataReturn<T> {
  const [data, setData] = useState<NotionFetchResponse<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!options.enabled && options.enabled !== undefined) {
      return;
    }

    if (!options.databaseId && !options.pageId) {
      setError(new Error('Either databaseId or pageId must be provided'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchNotionData({
        databaseId: options.databaseId,
        pageId: options.pageId,
        entryType: options.entryType,
        includeImages: options.includeImages,
      });

      setData(result as NotionFetchResponse<T>);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      console.error('Error fetching Notion data:', error);
    } finally {
      setLoading(false);
    }
  }, [options.databaseId, options.pageId, options.entryType, options.includeImages, options.enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// Hook for multiple data sources
export function useMultipleNotionData<T = BaseItem>(
  dataSources: UseNotionDataOptions[]
): {
  results: UseNotionDataReturn<T>[];
  loading: boolean;
  hasError: boolean;
} {
  const results = dataSources.map(options => useNotionData<T>(options));
  
  const loading = results.some(result => result.loading);
  const hasError = results.some(result => result.error !== null);

  return {
    results,
    loading,
    hasError,
  };
}
