import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { matterService } from '@/services';
import { LegalMatter } from '@/types/matter';
import { ROUTES } from '@/routes/paths';
import { useSEO } from '@/hooks/useSEO';
import { LoadingState } from '@/components/feedback';
import { 
  ArrowRight, 
  Briefcase, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Video, 
  UserCheck
} from 'lucide-react';

export const ClientDashboardPage: React.FC = () => {
  useSEO({ title: 'ApkaLawyer — Legal Portal', noIndex: true });

  const { user } = useAuth();
  const [matters, setMatters] = useState<LegalMatter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    matterService.getMatters(user.id, 'client').then((mattersData) => {
      setMatters(mattersData);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading legal app..." />;

  const activeMatter = matters[0] || {
    id: 'mat-001',
    matterNumber: 'LHR-HC-2026-0842',
    title: 'Commercial Contract & Breach Resolution',
    lawyerName: 'Barrister Ahmad Hassan',
    courtName: 'Lahore High Court',
    status: 'in_progress',
    progressPercentage: 68,
    category: 'Corporate Litigation',
    nextHearingDate: '2026-09-28',
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-10">
      {/* App Header Greeting */}
      <div className="flex items-center justify-between py-1">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-black tracking-tight flex items-center gap-1.5">
            Salam, {user?.name || 'Muzammil'}
            <ShieldCheck className="h-4 w-4 text-neutral-800 inline" />
          </h1>
          <p className="text-xs text-neutral-500">What would you like to do today?</p>
        </div>
        <span className="text-[11px] font-bold bg-neutral-100 text-neutral-800 border border-neutral-200/80 px-2.5 py-1 rounded-full">
          Verified Client
        </span>
      </div>

      {/* 1 & 2. Two Large Visual Cards in One Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Feature 1: Book a Lawyer */}
        <Link
          to={ROUTES.CLIENT.LAWYERS}
          className="group relative overflow-hidden bg-white border border-neutral-200 rounded-3xl p-5 shadow-xs hover:border-black hover:shadow-md transition-all flex flex-col justify-between min-h-[260px] sm:min-h-[290px]"
        >
          {/* Card Header Info */}
          <div className="z-10 relative">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-bold mb-2">
              <UserCheck className="h-3 w-3 text-black" />
              <span>Verified Advocates</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-black tracking-tight">
              Book a Lawyer
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5 max-w-[200px]">
              Supreme Court & High Court legal counsel
            </p>
          </div>

          {/* Large Lawyer Visual Image */}
          <div className="absolute right-0 bottom-0 w-44 h-48 sm:w-52 sm:h-56 pointer-events-none flex items-end justify-end">
            <img
              src="/images/card-lawyer.webp"
              alt="Advocate Lawyer"
              className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Bottom Action Pill */}
          <div className="z-10 pt-4">
            <span className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-bold px-4 py-2 rounded-full group-hover:bg-neutral-800 transition-colors shadow-sm">
              Find Lawyers
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Feature 2: Book Consultation */}
        <Link
          to={ROUTES.CLIENT.CONSULTATIONS}
          className="group relative overflow-hidden bg-white border border-neutral-200 rounded-3xl p-5 shadow-xs hover:border-black hover:shadow-md transition-all flex flex-col justify-between min-h-[260px] sm:min-h-[290px]"
        >
          {/* Card Header Info */}
          <div className="z-10 relative">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[11px] font-bold mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Video & Audio</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-black tracking-tight">
              Book Consultation
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5 max-w-[200px]">
              Direct 1-on-1 confidential video advice
            </p>
          </div>

          {/* Large Consultation Visual Image */}
          <div className="absolute right-0 bottom-0 w-44 h-40 sm:w-52 sm:h-44 pointer-events-none flex items-end justify-end">
            <img
              src="/images/card-consultation.webp"
              alt="Online Legal Consultation"
              className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Bottom Action Pill */}
          <div className="z-10 pt-4">
            <span className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-bold px-4 py-2 rounded-full group-hover:bg-neutral-800 transition-colors shadow-sm">
              <Video className="h-3.5 w-3.5" />
              Schedule Call
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>
      </div>

      {/* Feature 3: Track Your Case (Wide Visual Milestone Card) */}
      <Link
        to={ROUTES.CLIENT.MATTERS}
        className="block group bg-white border border-neutral-200 rounded-3xl p-5 shadow-xs hover:border-black hover:shadow-md transition-all"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-black text-white flex items-center justify-center flex-shrink-0">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-black">Track Your Case</h3>
                <span className="text-[10px] font-mono font-bold bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded">
                  {activeMatter.matterNumber}
                </span>
              </div>
              <p className="text-xs text-neutral-500 truncate max-w-md">
                {activeMatter.title}
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-black group-hover:translate-x-0.5 transition-transform self-start sm:self-auto">
            View Live Status
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="pt-4 pb-2">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-neutral-500 font-medium">Court Progress</span>
            <span className="font-bold text-black">{activeMatter.progressPercentage}% Completed</span>
          </div>

          {/* Progress bar */}
          <div className="h-2.5 w-full rounded-full bg-neutral-100 overflow-hidden mb-4">
            <div
              className="h-full bg-black rounded-full transition-all duration-500"
              style={{ width: `${activeMatter.progressPercentage}%` }}
            />
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center">
              <div className="h-7 w-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold mb-1">
                ✓
              </div>
              <span className="text-xs font-bold text-black">Case Filed</span>
              <span className="text-[10px] text-neutral-400">Admitted</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-7 w-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold mb-1 ring-4 ring-neutral-100">
                2
              </div>
              <span className="text-xs font-bold text-black">Hearings</span>
              <span className="text-[10px] text-emerald-600 font-bold">Active in Court</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-7 w-7 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center text-xs font-bold mb-1">
                3
              </div>
              <span className="text-xs font-medium text-neutral-400">Judgement</span>
              <span className="text-[10px] text-neutral-400">Decree</span>
            </div>
          </div>
        </div>

        {/* Next Hearing Alert Strip */}
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs bg-neutral-50 rounded-xl px-3.5 py-2.5">
          <div className="flex items-center gap-2 text-neutral-700">
            <Clock className="h-4 w-4 text-black flex-shrink-0" />
            <span>
              <strong>Next Hearing:</strong> 28 Sep 2026 • 10:30 AM (Lahore High Court)
            </span>
          </div>
          <span className="font-bold text-black hidden sm:inline">Case File ↗</span>
        </div>
      </Link>

      {/* Feature 4: Write Legal Notice (Visual Drafter Card) */}
      <Link
        to={ROUTES.CLIENT.LEGAL_DOCUMENTS}
        className="group relative overflow-hidden bg-white border border-neutral-200 rounded-3xl p-5 shadow-xs hover:border-black hover:shadow-md transition-all flex items-center justify-between"
      >
        <div className="flex-1 pr-4 z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-bold mb-2">
            <FileText className="h-3 w-3 text-black" />
            <span>Instant Legal Drafter</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-black tracking-tight">
            Write Legal Notice
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm">
            Generate customized legal notices, contracts, affidavits, and court replies reviewed by verified counsel.
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-bold px-4 py-2 rounded-full group-hover:bg-neutral-800 transition-colors shadow-sm">
              Draft Legal Notice
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* 3D Legal Notice Document Visual */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 relative">
          <img
            src="/images/card-legal-notice.webp"
            alt="Write Legal Notice"
            className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
    </div>
  );
};
