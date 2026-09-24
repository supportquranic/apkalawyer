import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { hearingService } from '@/services';
import { Hearing } from '@/types/hearing';
import { useSEO } from '@/hooks/useSEO';
import { formatDate } from '@/utils/date';
import { LoadingState, EmptyState } from '@/components/feedback';
import { Clock } from 'lucide-react';

export const ClientHearingsPage: React.FC = () => {
  useSEO({ title: 'Court Cause List & Hearings — ApkaLawyer', noIndex: true });
  const { user } = useAuth();
  const [hearings, setHearings] = useState<Hearing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    hearingService.getHearings(user.id, 'client').then((data) => {
      setHearings(data);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading cause list & hearing diary..." />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Court Cause List & Hearings</h1>
        <p className="text-xs text-slate-500">Upcoming court appearances, bench rooms, and judicial order sheets.</p>
      </div>

      {hearings.length === 0 ? (
        <EmptyState title="No Court Hearings" description="No hearings are currently listed on the cause list." />
      ) : (
        <div className="space-y-4">
          {hearings.map((h) => (
            <div key={h.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-500">{h.caseNumber}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                    {h.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Clock className="h-3.5 w-3.5 text-black" />
                  <span>{formatDate(h.hearingDate)} • {h.hearingTime}</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900">{h.matterTitle}</h3>

              <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
                <p><strong>Court:</strong> {h.courtName} — {h.benchRoom}</p>
                <p><strong>Presiding Judge:</strong> {h.judgeName}</p>
                <p><strong>Purpose of Hearing:</strong> {h.purpose}</p>
                {h.lawyerNotes && (
                  <p className="text-amber-800 pt-1 border-t border-slate-200/60 font-medium">
                    <strong>Lawyer Chamber Note:</strong> {h.lawyerNotes}
                  </p>
                )}
                {h.orderSummary && (
                  <p className="text-black pt-1 border-t border-slate-200/60 font-medium">
                    <strong>Judicial Order Summary:</strong> {h.orderSummary}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
