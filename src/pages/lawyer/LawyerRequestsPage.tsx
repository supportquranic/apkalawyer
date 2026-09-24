import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { bookingService } from '@/services';
import { Booking } from '@/types/booking';
import { useSEO } from '@/hooks/useSEO';
import { formatPKR } from '@/utils/formatters';
import { formatDate } from '@/utils/date';
import { LoadingState, EmptyState } from '@/components/feedback';
import { Check, X } from 'lucide-react';

export const LawyerRequestsPage: React.FC = () => {
  useSEO({ title: 'Client Consultation Inquiries', noIndex: true });
  const { user } = useAuth();
  const [requests, setRequests] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    bookingService.getBookings('lawyer', user.id).then((data) => {
      setRequests(data);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading client consultation requests..." />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Client Consultation Requests</h1>
        <p className="text-xs text-slate-500">Incoming inquiries, preliminary case summaries, and booking approvals.</p>
      </div>

      {requests.length === 0 ? (
        <EmptyState title="No Pending Requests" description="You have responded to all client consultation requests." />
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">{r.bookingRef}</span>
                  <h3 className="text-sm font-bold text-slate-900">{r.clientName}</h3>
                  <p className="text-xs text-slate-500">{r.practiceArea} • {r.clientPhone}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs font-bold text-slate-900 block">{formatDate(r.date)}</span>
                  <span className="text-xs text-black font-medium">{r.timeSlot}</span>
                </div>
              </div>

              {r.clientNotes && (
                <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700">
                  <strong>Client Preliminary Note:</strong> {r.clientNotes}
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Fee: {formatPKR(r.fee)}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-black"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Accept Slot
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <X className="h-3.5 w-3.5" />
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
