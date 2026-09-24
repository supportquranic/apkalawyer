import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SuccessStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title,
  message,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-center text-neutral-900',
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-neutral-900 mb-3">
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
      </div>
      <h4 className="text-sm font-semibold mb-1">{title}</h4>
      <p className="max-w-sm text-xs text-neutral-600 mb-4">{message}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center rounded-lg bg-neutral-950 px-3.5 py-2 text-xs font-semibold text-white shadow-none hover:bg-neutral-800 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
