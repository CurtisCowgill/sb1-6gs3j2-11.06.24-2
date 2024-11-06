import { useState, useEffect, useCallback } from 'react';
import { useToastContext } from '../context/ToastContext';
import { useErrorBoundary } from './useErrorBoundary';
import { useAutoRecovery } from './useAutoRecovery';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDataFetching<T>(
  fetchFn: () => Promise<T>,
  options: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    errorMessage?: string;
    retryMessage?: string;
  } = {}
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToastContext();
  const { handleError } = useErrorBoundary();
  const { withRecovery } = useAutoRecovery();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await withRecovery(fetchFn, {
        onSuccess: options.onSuccess,
        onError: options.onError,
        retryMessage: options.retryMessage || 'Retrying...'
      });
      setData(result);
    } catch (err) {
      const error = handleError(err);
      setError(error);
      showToast(options.errorMessage || error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, handleError, showToast, withRecovery, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}