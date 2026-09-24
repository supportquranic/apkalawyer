import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading legal data...',
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center text-neutral-600',
        className
      )}
    >
      <Loader2
        className={cn('animate-spin text-neutral-900 mb-3', sizeClasses[size])}
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-neutral-700">{message}</p>
      <span className="sr-only">Loading</span>
    </div>
  );
};
