import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { matterService } from '@/services';
import { LegalMatter } from '@/types/matter';
import { useSEO } from '@/hooks/useSEO';
import { LoadingState } from '@/components/feedback';
import { Plus } from 'lucide-react';

export const LawyerMattersPage: React.FC = () => {
  useSEO({ title: 'Active Case Matters — Advocate Chambers', noIndex: true });
  const { user } = useAuth();
  const [matters, setMatters] = useState<LegalMatter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    matterService.getMatters(user.id, 'lawyer').then((data) => {
      setMatters(data);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading chamber matters..." />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Litigation & Case Files</h1>
          <p className="text-xs text-slate-500">Active client matters, pleadings status, and court case tracking.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-sm"
        >
          <Plus className="h-3.5 w-3.5 text-emerald-400" />
          Open New Matter File
        </button>
      </div>

      <div className="space-y-4">
        {matters.map((m) => (
          <div key={m.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-500">{m.matterNumber}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                  {m.status.replace('_', ' ')}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-900">Client: {m.clientName}</span>
            </div>

            <h3 className="text-sm font-bold text-slate-900">{m.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
