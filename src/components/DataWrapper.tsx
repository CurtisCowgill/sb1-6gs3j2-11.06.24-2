import React from 'react';
import LoadingState from './LoadingState';
import { AlertTriangle } from 'lucide-react';

interface DataWrapperProps<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  onRetry?: () => void;
  loadingMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;
  children: (data: T) => React.ReactNode;
}

function DataWrapper<T>({
  isLoading,
  error,
  data,
  onRetry,
  loadingMessage = 'Loading...',
  errorMessage,
  emptyMessage = 'No data available',
  children
}: DataWrapperProps<T>) {
  if (isLoading) {
    return <LoadingState message={loadingMessage} />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-gray-600 text-center mb-4">{errorMessage || error.message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children(data)}</>;
}

export default DataWrapper;