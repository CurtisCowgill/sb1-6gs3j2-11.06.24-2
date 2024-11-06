import { useCallback, useEffect, useRef } from 'react';
import { useSafeState } from './useSafeState';
import { useErrorHandler } from './useErrorHandler';
import { useToastContext } from '../context/ToastContext';

interface AsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: Error | null;
}

export function useAsync<T>(asyncFunction: () => Promise<T>, immediate = true) {
  const [state, setState] = useSafeState<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });

  const handleError = useErrorHandler();
  const { showToast } = useToastContext();
  const mountedRef = useRef(true);

  const execute = useCallback(async () => {
    setState({ status: 'pending', data: null, error: null });
    try {
      const response = await asyncFunction();
      if (mountedRef.current) {
        setState({ status: 'success', data: response, error: null });
      }
    } catch (error) {
      if (mountedRef.current) {
        const handledError = handleError(error);
        setState({ status: 'error', data: null, error: handledError });
        showToast(handledError.message, 'error');
      }
    }
  }, [asyncFunction, setState, handleError, showToast]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [execute, immediate]);

  return { ...state, execute };
}