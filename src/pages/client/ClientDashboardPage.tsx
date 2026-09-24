import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { matterService, hearingService, bookingService } from '@/services';
import { LegalMatter } from '@/types/matter';
import { Hearing } from '@/types/hearing';
import { Booking } from '@/types/booking';
import { formatDate } from '@/utils/date';
import { ROUTES } from '@/routes/paths';
import { useSEO } from '@/hooks/useSEO';
import { LoadingState } from '@/components/feedback';
import { 
  Briefcase, 
  Gavel, 
  Clock, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';

export const ClientDashboardPage: React.FC = () => {
  useSEO({ title: 'Client Dashboard', noIndex: true });

  const { user } = useAuth();
  const [matters, setMatters] = useState<LegalMatter[]>([]);
  const [hearings, setHearings] = useState<Hearing[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      matterService.getMatters(user.id, 'client'),
      hearingService.getHearings(user.id, 'client'),
      bookingService.getBookings('client', user.id),
    ]).then(([mattersData, hearingsData, bookingsData]) => {
      setMatters(mattersData);
      setHearings(hearingsData);
      setBookings(bookingsData);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading client workspace..." />;

  const activeMatter = matters[0];
  const upcomingHearing = hearings.find((h) => h.status === 'scheduled');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Card */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Active Client Account • CNIC Verified</span>
          </div>
          <h2 className="text-xl font-bold">Welcome back, {user?.name || 'Client'}</h2>
          <p className="text-xs text-slate-300 mt-1">
            You have {matters.length} active legal case{matters.length === 1 ? '' : 's'} and {bookings.length} upcoming consultation{bookings.length === 1 ? '' : 's'}.
          </p>
        </div>
        <Link
          to={ROUTES.CLIENT.LAWYERS}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-sm"
        >
          Book New Consultation
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Grid: Upcoming Hearing & Active Matter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cause List / Hearing Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Gavel className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Upcoming Court Hearing</h3>
            </div>
            <Link to={ROUTES.CLIENT.HEARINGS} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
              View Cause List
            </Link>
          </div>

          {upcomingHearing ? (
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold text-amber-900">
                  {upcomingHearing.caseNumber}
                </span>
                <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDate(upcomingHearing.hearingDate)} • {upcomingHearing.hearingTime}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">{upcomingHearing.matterTitle}</h4>
              <p className="text-xs text-slate-600 font-medium">
                {upcomingHearing.courtName} — {upcomingHearing.benchRoom}
              </p>
              <div className="text-[11px] text-amber-900/90 pt-2 border-t border-amber-200/50">
                <strong>Purpose:</strong> {upcomingHearing.purpose}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-6 text-center">No upcoming court hearings scheduled.</p>
          )}
        </div>

        {/* Active Matter Tracker */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Briefcase className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Primary Case Matter</h3>
            </div>
            <Link to={ROUTES.CLIENT.MATTERS} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
              View All Matters
            </Link>
          </div>

          {activeMatter ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-500">
                  {activeMatter.matterNumber}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                  {activeMatter.status.replace('_', ' ')}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">{activeMatter.title}</h4>
              <p className="text-xs text-slate-600">Counsel: {activeMatter.lawyerName}</p>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                  <span>Case Milestone Progress</span>
                  <span>{activeMatter.progressPercentage}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${activeMatter.progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-6 text-center">No active legal matters found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
