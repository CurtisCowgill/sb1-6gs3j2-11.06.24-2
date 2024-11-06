import { useState, useCallback } from 'react';

export function useSafeState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);

  const setSafeState = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setState(value);
    } catch (error) {
      console.error('Error setting state:', error);
    }
  }, []);

  return [state, setSafeState] as const;
}