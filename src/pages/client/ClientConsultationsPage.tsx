import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { bookingService } from '@/services';
import { Booking } from '@/types/booking';
import { useSEO } from '@/hooks/useSEO';
import { formatPKR } from '@/utils/formatters';
import { formatDate } from '@/utils/date';
import { LoadingState, EmptyState } from '@/components/feedback';
import { Calendar, Video } from 'lucide-react';

export const ClientConsultationsPage: React.FC = () => {
  useSEO({ title: 'My Consultations — ApkaLawyer', noIndex: true });
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    bookingService.getBookings('client', user.id).then((data) => {
      setBookings(data);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading legal consultations..." />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Legal Consultations</h1>
          <p className="text-xs text-slate-500">Upcoming, confirmed, and past advocate advisory sessions.</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <EmptyState
          title="No Consultations Scheduled"
          description="Book a confidential consultation with a verified advocate to discuss your case."
          actionLabel="Find a Lawyer"
          onAction={() => window.location.assign('/lawyers')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((b) => (
            <div key={b.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 block">{b.bookingRef}</span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">{b.lawyerName}</h3>
                  <p className="text-xs text-slate-500">{b.practiceArea}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                  {b.status}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2 font-medium">
                  <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{formatDate(b.date)} • {b.timeSlot}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Video className="h-3.5 w-3.5 text-slate-400" />
                  <span className="capitalize">{b.mode} Consultation</span>
                  <span className="mx-1">•</span>
                  <span className="font-semibold text-slate-900">{formatPKR(b.fee)}</span>
                </div>
              </div>

              {b.meetingLink && b.status === 'confirmed' && (
                <a
                  href={b.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  <Video className="h-3.5 w-3.5" />
                  Join Encrypted Video Room
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
