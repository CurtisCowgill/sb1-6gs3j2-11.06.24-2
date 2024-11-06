import { useCallback } from 'react';

export function useErrorHandler() {
  return useCallback((error: unknown) => {
    if (error instanceof Error) {
      return error;
    }
    return new Error('An unexpected error occurred');
  }, []);
}