import { useCallback, useState } from 'react';
import { useToastContext } from '../context/ToastContext';

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToastContext();

  const handleError = useCallback((error: unknown) => {
    const normalizedError = error instanceof Error ? error : new Error(String(error));
    setError(normalizedError);
    showToast(normalizedError.message, 'error');
    return normalizedError;
  }, [showToast]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, resetError };
}