import React from 'react';
import { ShieldAlert, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface UnauthorizedStateProps {
  requiredRole?: string;
  className?: string;
}

export const UnauthorizedState: React.FC<UnauthorizedStateProps> = ({
  requiredRole = 'client',
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
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800 mb-5 border border-neutral-200">
        <ShieldAlert className="h-8 w-8" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-bold text-neutral-900 mb-2">Access Restricted</h2>
      <p className="max-w-md text-sm text-neutral-600 mb-6">
        This workspace requires an authorized <span className="font-semibold text-neutral-900 capitalize">{requiredRole}</span> account. Please sign in with the appropriate credentials.
      </p>
      <button
        type="button"
        onClick={() => navigate('/login')}
        className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-none hover:bg-neutral-800 transition-colors"
      >
        <LogIn className="h-4 w-4" aria-hidden="true" />
        Sign In to Continue
      </button>
    </div>
  );
};
