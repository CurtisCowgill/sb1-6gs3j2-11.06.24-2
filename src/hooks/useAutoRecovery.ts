import { useCallback, useRef } from 'react';
import { ErrorRecovery } from '../utils/ErrorRecovery';
import { useToastContext } from '../context/ToastContext';

export function useAutoRecovery() {
  const { showToast } = useToastContext();
  const operationCounter = useRef(0);

  const withRecovery = useCallback(async <T>(
    operation: () => Promise<T>,
    options: {
      onSuccess?: (data: T) => void;
      onError?: (error: Error) => void;
      retryMessage?: string;
    } = {}
  ): Promise<T> => {
    const operationId = `${Date.now()}-${operationCounter.current++}`;

    try {
      const wrappedOperation = async () => {
        try {
          const result = await operation();
          options.onSuccess?.(result);
          return result;
        } catch (error) {
          throw error;
        }
      };

      return await ErrorRecovery.handleError(
        wrappedOperation,
        () => {
          if (options.retryMessage) {
            showToast(options.retryMessage, 'info');
          }
          return wrappedOperation();
        },
        operationId
      );
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error(String(error));
      options.onError?.(normalizedError);
      throw normalizedError;
    } finally {
      ErrorRecovery.resetRetries(operationId);
    }
  }, [showToast]);

  return { withRecovery };
}