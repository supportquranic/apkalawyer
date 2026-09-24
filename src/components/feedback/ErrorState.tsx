import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to Load Information',
  message = 'An unexpected error occurred while fetching case records. Please try again.',
  onRetry,
  className,
}) => {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-center text-neutral-900',
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-neutral-800 mb-3">
        <AlertCircle className="h-5 w-5" aria-hidden="true" />
      </div>
      <h4 className="text-sm font-semibold mb-1">{title}</h4>
      <p className="max-w-sm text-xs text-neutral-600 mb-4">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-none hover:bg-neutral-100 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          Try Again
        </button>
      )}
    </div>
  );
};
