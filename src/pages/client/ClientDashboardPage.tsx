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
  ShieldCheck,
  Video,
  Search,
  Building2,
  ReceiptText,
  Home,
  FileCheck2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ClientDashboardPage: React.FC = () => {
  useSEO({ title: 'ApkaLawyer — Mobile App Portal', noIndex: true });

  const { user } = useAuth();
  const [matters, setMatters] = useState<LegalMatter[]>([]);
  const [hearings, setHearings] = useState<Hearing[]>([]);
  const [, setBookings] = useState<Booking[]>([]);
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

  if (isLoading) return <LoadingState message="Loading legal app..." />;

  const activeMatter = matters[0] || {
    id: 'mat-001',
    matterNumber: 'LHR-HC-2026-0842',
    title: 'Commercial Contract & Breach Resolution',
    lawyerName: 'Barrister Ahmad Hassan',
    courtName: 'Lahore High Court (Bench 3)',
    status: 'in_progress',
    progressPercentage: 68,
    category: 'Corporate Litigation',
    nextHearingDate: '2026-09-28',
  };

  const upcomingHearing = hearings.find((h) => h.status === 'scheduled');

  const quickCategories = [
    { name: 'Corporate', icon: Building2, path: `${ROUTES.CLIENT.LAWYERS}?cat=corporate` },
    { name: 'Tax / FBR', icon: ReceiptText, path: `${ROUTES.CLIENT.LAWYERS}?cat=tax` },
    { name: 'Property', icon: Home, path: `${ROUTES.CLIENT.LAWYERS}?cat=property` },
    { name: 'Family', icon: ShieldCheck, path: `${ROUTES.CLIENT.LAWYERS}?cat=family` },
    { name: 'Criminal', icon: Gavel, path: `${ROUTES.CLIENT.LAWYERS}?cat=criminal` },
    { name: 'Contracts', icon: FileCheck2, path: `${ROUTES.CLIENT.LAWYERS}?cat=contracts` },
  ];

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-6">
      {/* App Greeting & Status Bar */}
      <div className="flex items-center justify-between bg-white border border-neutral-200/90 rounded-2xl px-4 py-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
            {user?.name?.charAt(0) || 'M'}
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-black tracking-tight flex items-center gap-1.5">
              Salam, {user?.name || 'Muzammil'}
              <ShieldCheck className="h-3.5 w-3.5 text-black inline" />
            </h1>
            <p className="text-[11px] text-neutral-500">What legal service do you need today?</p>
          </div>
        </div>

        <Link
          to={ROUTES.CLIENT.LAWYERS}
          className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
          title="Search Advocates"
        >
          <Search className="h-4 w-4" />
        </Link>
      </div>

      {/* Primary Action Cards: 2 Short Compact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Card 1: Lawyer Booking Card */}
        <Link
          to={ROUTES.CLIENT.LAWYERS}
          className="group relative overflow-hidden bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs hover:border-black transition-all flex items-center justify-between"
        >
          <div className="flex-1 pr-3 z-10">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-semibold mb-1.5">
              <Sparkles className="h-2.5 w-2.5 text-black" />
              <span>Verified Advocates</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-black tracking-tight group-hover:text-black">
              Book a Lawyer
            </h2>
            <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">
              Top High Court & Supreme Court counsels
            </p>
            <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-black group-hover:translate-x-0.5 transition-transform">
              <span>Book Appointment</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 relative">
            <img
              src="/icons/app-lawyer-booking.webp"
              alt="Lawyer Booking"
              className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Card 2: Video Consultation Card */}
        <Link
          to={ROUTES.CLIENT.CONSULTATIONS}
          className="group relative overflow-hidden bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs hover:border-black transition-all flex items-center justify-between"
        >
          <div className="flex-1 pr-3 z-10">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-semibold mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>03 Lawyers Online</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-black tracking-tight group-hover:text-black flex items-center gap-1.5">
              Video Consultation
            </h2>
            <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">
              Instant 1-on-1 encrypted video advice
            </p>
            <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-black group-hover:translate-x-0.5 transition-transform">
              <Video className="h-3 w-3" />
              <span>Start Video Call</span>
              <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
            </div>
          </div>
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 relative">
            <img
              src="/icons/app-video-consultation.webp"
              alt="Video Consultation"
              className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>

      {/* Card 3: Track Your Case Card (Wider Card with Tracking Milestone UI) */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-black">Track Your Case</h3>
                <span className="text-[10px] font-mono font-bold bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded">
                  {activeMatter.matterNumber}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 truncate max-w-sm">
                {activeMatter.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-neutral-900 text-white px-2 py-0.5 rounded-full">
              In Hearing Stage
            </span>
            <Link
              to={ROUTES.CLIENT.MATTERS}
              className="text-xs font-bold text-black hover:underline flex items-center gap-0.5 ml-2"
            >
              Details
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Milestone Tracker Visual */}
        <div className="pt-4 pb-2">
          <div className="flex items-center justify-between text-[11px] mb-2 font-medium">
            <span className="text-neutral-500">Milestone Progress</span>
            <span className="font-bold text-black">{activeMatter.progressPercentage}% Completed</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden mb-4">
            <div
              className="h-full bg-black rounded-full transition-all duration-500"
              style={{ width: `${activeMatter.progressPercentage}%` }}
            />
          </div>

          {/* 3 Step Milestones */}
          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold mb-1">
                ✓
              </div>
              <span className="text-[11px] font-bold text-black">Case Filed</span>
              <span className="text-[10px] text-neutral-400">Admitted</span>
            </div>

            {/* Step 2 (Active) */}
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold mb-1 ring-4 ring-neutral-100">
                2
              </div>
              <span className="text-[11px] font-bold text-black">Hearings</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Active In Court</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center text-[10px] font-bold mb-1">
                3
              </div>
              <span className="text-[11px] font-medium text-neutral-400">Judgement</span>
              <span className="text-[10px] text-neutral-400">Decree</span>
            </div>
          </div>
        </div>

        {/* Next Hearing Sub-card */}
        <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 bg-neutral-50/80 rounded-xl p-3">
          <div className="flex items-center gap-2 text-neutral-700">
            <Clock className="h-3.5 w-3.5 text-neutral-900 flex-shrink-0" />
            <span>
              <strong>Next Hearing:</strong> 28 Sep 2026 • 10:30 AM (Lahore High Court)
            </span>
          </div>
          <Link
            to={ROUTES.CLIENT.HEARINGS}
            className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1"
          >
            Cause List
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Quick Legal Practice Categories */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs sm:text-sm font-bold text-black">Legal Services by Category</h3>
          <Link to={ROUTES.CLIENT.LAWYERS} className="text-xs text-neutral-500 hover:text-black font-semibold">
            All Categories →
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {quickCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={cat.path}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-100 hover:border-neutral-300 transition-all text-center group"
              >
                <div className="h-8 w-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center mb-1.5 group-hover:border-black transition-colors">
                  <Icon className="h-4 w-4 text-black" />
                </div>
                <span className="text-[11px] font-bold text-neutral-800 group-hover:text-black">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Compact Secondary Grid: Upcoming Cause List & Active Documents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Cause List / Hearing Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-neutral-100 text-black flex items-center justify-center">
                <Gavel className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-xs font-bold text-black">Cause List & Diary</h3>
            </div>
            <Link to={ROUTES.CLIENT.HEARINGS} className="text-[11px] font-bold text-neutral-600 hover:text-black">
              View All
            </Link>
          </div>

          {upcomingHearing ? (
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-black">
                  {upcomingHearing.caseNumber}
                </span>
                <span className="text-[10px] font-semibold text-neutral-600 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(upcomingHearing.hearingDate)}
                </span>
              </div>
              <h4 className="text-xs font-bold text-black truncate">{upcomingHearing.matterTitle}</h4>
              <p className="text-[11px] text-neutral-500">
                {upcomingHearing.courtName} — {upcomingHearing.benchRoom}
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-center text-xs text-neutral-500">
              No hearings scheduled for this week.
            </div>
          )}
        </div>

        {/* Legal Vault / Drafter Quick Access */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-neutral-100 text-black flex items-center justify-center">
                  <FileCheck2 className="h-3.5 w-3.5" />
                </div>
                <h3 className="text-xs font-bold text-black">Legal Document Vault</h3>
              </div>
              <Link to={ROUTES.CLIENT.DOCUMENTS} className="text-[11px] font-bold text-neutral-600 hover:text-black">
                Vault
              </Link>
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Store, sign, and securely share Power of Attorney, Affidavits, and court pleadings with counsel.
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[11px] font-medium text-neutral-500">4 Verified Filings</span>
            <Link
              to={ROUTES.CLIENT.LEGAL_DOCUMENTS}
              className="text-xs font-bold text-black hover:underline flex items-center gap-1"
            >
              Draft Legal Notice →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
