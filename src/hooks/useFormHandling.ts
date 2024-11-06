import { useState } from 'react';
import { useToastContext } from '../context/ToastContext';

interface FormHandlingOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useFormHandling<T>({
  onSuccess,
  onError,
  successMessage = 'Operation completed successfully',
  errorMessage = 'An error occurred'
}: FormHandlingOptions<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToastContext();

  const handleSubmit = async (submitFn: () => Promise<T>) => {
    setIsSubmitting(true);
    try {
      const result = await submitFn();
      showToast(successMessage, 'success');
      onSuccess?.(result);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      showToast(errorMessage, 'error');
      onError?.(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit
  };
}