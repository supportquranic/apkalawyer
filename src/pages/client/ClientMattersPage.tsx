import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { matterService } from '@/services';
import { LegalMatter } from '@/types/matter';
import { useSEO } from '@/hooks/useSEO';
import { LoadingState, EmptyState } from '@/components/feedback';
import { CheckCircle2, Circle } from 'lucide-react';

export const ClientMattersPage: React.FC = () => {
  useSEO({ title: 'My Legal Matters — ApkaLawyer', noIndex: true });
  const { user } = useAuth();
  const [matters, setMatters] = useState<LegalMatter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    matterService.getMatters(user.id, 'client').then((data) => {
      setMatters(data);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading case records..." />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Legal Matters & Cases</h1>
        <p className="text-xs text-slate-500">Track court filings, stay orders, and litigation milestones.</p>
      </div>

      {matters.length === 0 ? (
        <EmptyState
          title="No Active Legal Matters"
          description="You do not have any ongoing case matters filed through ApkaLawyer."
        />
      ) : (
        <div className="space-y-6">
          {matters.map((matter) => (
            <div key={matter.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{matter.matterNumber}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-200 text-black">
                      {matter.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{matter.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {matter.courtName} • {matter.caseNumber || 'Pre-Filing Stage'}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase text-slate-400 font-semibold block">Counsel</span>
                  <span className="text-xs font-bold text-slate-900">{matter.lawyerName}</span>
                </div>
              </div>

              {/* Milestones Stepper */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                  Litigation Milestones ({matter.progressPercentage}% Completed)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {matter.milestones.map((ms) => (
                    <div
                      key={ms.id}
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                        ms.completed
                          ? 'border-neutral-200 bg-neutral-100/60 text-neutral-900'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      {ms.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold leading-snug">{ms.title}</p>
                        {ms.dateCompleted && (
                          <p className="text-[10px] text-black mt-0.5">Completed {ms.dateCompleted}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
