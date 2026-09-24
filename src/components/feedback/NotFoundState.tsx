import React from 'react';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NotFoundStateProps {
  title?: string;
  message?: string;
  returnUrl?: string;
  className?: string;
}

export const NotFoundState: React.FC<NotFoundStateProps> = ({
  title = 'Page or Legal Record Not Found',
  message = 'The requested advocate profile, case matter, or legal resource does not exist or has been archived.',
  returnUrl = '/',
  className,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'flex min-h-[50vh] flex-col items-center justify-center p-8 text-center',
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 mb-5 border border-neutral-200">
        <FileQuestion className="h-8 w-8 text-neutral-700" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-bold tracking-tight text-neutral-900 mb-2">{title}</h2>
      <p className="max-w-md text-sm text-neutral-500 mb-8">{message}</p>
      <button
        type="button"
        onClick={() => navigate(returnUrl)}
        className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-none hover:bg-neutral-800 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Return to Portal
      </button>
    </div>
  );
};
