import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NetworkErrorStateProps {
  onRetry?: () => void;
  className?: string;
}

export const NetworkErrorState: React.FC<NetworkErrorStateProps> = ({
  onRetry = () => window.location.reload(),
  className,
}) => {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-8 text-center',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-neutral-800 mb-4">
        <WifiOff className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-neutral-900 mb-1">Network Connection Interrupted</h3>
      <p className="max-w-md text-sm text-neutral-500 mb-6">
        Unable to connect to the legal platform. Please check your internet connection and retry.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-none hover:bg-neutral-800 transition-colors"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Reconnect
      </button>
    </div>
  );
};
