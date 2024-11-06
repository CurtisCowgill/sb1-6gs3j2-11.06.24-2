import { useCallback } from 'react';
import { ErrorPrevention } from '../utils/ErrorPrevention';
import { useToastContext } from '../context/ToastContext';

export function useErrorPrevention() {
  const { showToast } = useToastContext();

  const validateData = useCallback(<T extends object>(
    data: T,
    rules: { [K in keyof T]?: string[] }
  ) => {
    const { isValid, errors } = ErrorPrevention.validateObject(data, rules);
    
    if (!isValid) {
      const errorMessages = Object.entries(errors)
        .map(([field, error]) => `${field}: ${error}`)
        .join(', ');
      
      showToast(errorMessages, 'error');
    }

    return { isValid, errors };
  }, [showToast]);

  const sanitizeData = useCallback(<T extends object>(
    data: T,
    sanitizers: { [K in keyof T]?: string }
  ): T => {
    const sanitized = { ...data };

    for (const [key, sanitizerName] of Object.entries(sanitizers)) {
      if (sanitizerName) {
        sanitized[key as keyof T] = ErrorPrevention.sanitize(
          data[key as keyof T],
          sanitizerName
        );
      }
    }

    return sanitized;
  }, []);

  return { validateData, sanitizeData };
}