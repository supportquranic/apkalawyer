import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { matterService, hearingService, bookingService, paymentService } from '@/services';
import { LegalMatter } from '@/types/matter';
import { Hearing } from '@/types/hearing';
import { Booking } from '@/types/booking';
import { PaymentInvoice } from '@/types/payment';
import { formatPKR } from '@/utils/formatters';
import { formatDate } from '@/utils/date';
import { useSEO } from '@/hooks/useSEO';
import { LoadingState } from '@/components/feedback';
import { 
  Briefcase, 
  Gavel, 
  Calendar, 
  ShieldCheck, 
  Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

export const LawyerDashboardPage: React.FC = () => {
  useSEO({ title: 'Lawyer Chambers Workspace', noIndex: true });
  const { user } = useAuth();
  const [matters, setMatters] = useState<LegalMatter[]>([]);
  const [hearings, setHearings] = useState<Hearing[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [invoices, setInvoices] = useState<PaymentInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      matterService.getMatters(user.id, 'lawyer'),
      hearingService.getHearings(user.id, 'lawyer'),
      bookingService.getBookings('lawyer', user.id),
      paymentService.getInvoices(user.id, 'lawyer'),
    ]).then(([mattersData, hearingsData, bookingsData, invoicesData]) => {
      setMatters(mattersData);
      setHearings(hearingsData);
      setBookings(bookingsData);
      setInvoices(invoicesData);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading advocate chambers dashboard..." />;

  const totalCollected = invoices
    .filter((i) => i.status === 'paid')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Punjab Bar Council • High Court License Active</span>
          </div>
          <h2 className="text-xl font-bold">{user?.name || 'Advocate High Court'}</h2>
          <p className="text-xs text-slate-300 mt-0.5">Chambers of Commercial & Constitutional Litigation</p>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Retainers Collected</span>
          <span className="text-xl font-bold text-emerald-400">{formatPKR(totalCollected)}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
            <Briefcase className="h-4 w-4 text-emerald-600" />
            <span>Active Matters</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{matters.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
            <Gavel className="h-4 w-4 text-amber-600" />
            <span>Hearings Listed</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{hearings.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
            <Calendar className="h-4 w-4 text-sky-600" />
            <span>Pending Bookings</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{bookings.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
            <Users className="h-4 w-4 text-indigo-600" />
            <span>Active Retained Clients</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">12</p>
        </div>
      </div>

      {/* Cause List Preview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900">Today & Upcoming Court Cause List</h3>
          <Link to={ROUTES.LAWYER.HEARINGS} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
            Open Full Court Diary
          </Link>
        </div>

        <div className="space-y-3">
          {hearings.slice(0, 2).map((h) => (
            <div key={h.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-slate-500">{h.caseNumber}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-semibold text-slate-800">{h.courtName}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{h.matterTitle}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Judge: {h.judgeName} — Purpose: {h.purpose}</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs font-bold text-slate-900 block">{formatDate(h.hearingDate)}</span>
                <span className="text-[11px] text-emerald-600 font-semibold">{h.hearingTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
