import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { hearingService } from '@/services';
import { Hearing } from '@/types/hearing';
import { useSEO } from '@/hooks/useSEO';
import { formatDate } from '@/utils/date';
import { LoadingState } from '@/components/feedback';
import { Clock, Plus } from 'lucide-react';

export const LawyerHearingsPage: React.FC = () => {
  useSEO({ title: 'Court Diary & Cause List — Advocate Chambers', noIndex: true });
  const { user } = useAuth();
  const [hearings, setHearings] = useState<Hearing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    hearingService.getHearings(user.id, 'lawyer').then((data) => {
      setHearings(data);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading court diary..." />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Advocate Court Diary & Cause List</h1>
          <p className="text-xs text-slate-500">Track cause list serials, bench allocations, and recorded orders.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Hearing Entry
        </button>
      </div>

      <div className="space-y-4">
        {hearings.map((h) => (
          <div key={h.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-600">{h.caseNumber}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                  {h.status.replace('_', ' ')}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                {formatDate(h.hearingDate)} • {h.hearingTime}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900">{h.matterTitle}</h3>
            <p className="text-xs text-slate-600 font-medium">
              {h.courtName} — {h.benchRoom} (Judge: {h.judgeName})
            </p>

            <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700 space-y-1">
              <p><strong>Purpose:</strong> {h.purpose}</p>
              {h.lawyerNotes && <p className="text-amber-800"><strong>Chamber Instructions:</strong> {h.lawyerNotes}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
