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
  Video, 
  FileText
} from 'lucide-react';

export const ClientDashboardPage: React.FC = () => {
  useSEO({ title: 'ApkaLawyer', noIndex: true });

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
    title: 'Commercial Contract',
    lawyerName: 'Barrister Ahmad Hassan',
    courtName: 'Lahore High Court',
    status: 'in_progress',
    progressPercentage: 68,
    category: 'Corporate Litigation',
    nextHearingDate: '2026-09-28',
  };

  return (
    <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto pb-10 pt-1">
      {/* Main Bento Grid: Side-by-side in Mobile & Desktop */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 items-stretch">
        {/* Big Card (Left Column): Book a Lawyer with Pure White Background Headshot */}
        <Link
          to={ROUTES.CLIENT.LAWYERS}
          className="group relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white flex flex-col justify-between p-3.5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 border border-neutral-200 min-h-[320px] sm:min-h-[460px]"
        >
          {/* Pure White Background Senior Pakistani Lawyer Headshot */}
          <img
            src="/images/senior-lawyer-pure-white.webp"
            alt="Senior Advocate"
            className="absolute inset-0 w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Top Headroom Space: Clean Black Text */}
          <div className="relative z-10">
            <h2 className="text-base sm:text-2xl font-bold text-black tracking-tight">
              Book a Lawyer
            </h2>
          </div>

          {/* Bottom Action Pill */}
          <div className="relative z-10 pt-2">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-black text-white text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm group-hover:bg-neutral-800 transition-colors">
              <span>Book Now</span>
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Right Column: 2 Stacked Cards */}
        <div className="flex flex-col gap-2.5 sm:gap-4">
          {/* Top Right Card: Video Consultation */}
          <Link
            to={ROUTES.CLIENT.CONSULTATIONS}
            className="group relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white text-black p-3.5 sm:p-5 shadow-xs hover:shadow-md transition-all duration-300 border border-neutral-200 flex-1 flex flex-col justify-between min-h-[150px] sm:min-h-[215px]"
          >
            {/* Clean Corner Visual */}
            <div className="absolute right-0 bottom-0 w-24 h-24 sm:w-36 sm:h-36 opacity-30 pointer-events-none">
              <img
                src="/images/card-consultation.webp"
                alt="Video Consultation"
                className="w-full h-full object-contain object-right-bottom group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Title & Tag */}
            <div className="relative z-10">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                <Video className="h-3 w-3 text-black" />
                <span>Live 1-on-1</span>
              </div>
              <h3 className="text-sm sm:text-xl font-bold text-black tracking-tight leading-snug">
                Video Consultation
              </h3>
            </div>

            {/* Action */}
            <div className="relative z-10 pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-black group-hover:translate-x-1 transition-transform">
                <span>Start Call</span>
                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </span>
            </div>
          </Link>

          {/* Bottom Right Card: Draft Legal Notice */}
          <Link
            to={ROUTES.CLIENT.LEGAL_DOCUMENTS}
            className="group relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white text-black p-3.5 sm:p-5 shadow-xs hover:shadow-md transition-all duration-300 border border-neutral-200 flex-1 flex flex-col justify-between min-h-[150px] sm:min-h-[215px]"
          >
            {/* Clean Corner Visual */}
            <div className="absolute right-1 bottom-1 sm:right-2 sm:bottom-2 w-20 h-20 sm:w-28 sm:h-28 opacity-25 pointer-events-none">
              <img
                src="/images/card-legal-notice.webp"
                alt="Draft Legal Notice"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Title & Tag */}
            <div className="relative z-10">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                <FileText className="h-3 w-3 text-black" />
                <span>Legal Drafter</span>
              </div>
              <h3 className="text-sm sm:text-xl font-bold text-black tracking-tight leading-snug">
                Draft Legal Notice
              </h3>
            </div>

            {/* Action */}
            <div className="relative z-10 pt-2">
              <span className="inline-flex items-center gap-1 bg-black text-white text-[10px] sm:text-xs font-bold px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full group-hover:bg-neutral-800 transition-colors shadow-xs">
                <span>Explore</span>
                <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* 3rd Feature Card: Track Your Case */}
      <Link
        to={ROUTES.CLIENT.MATTERS}
        className="block group bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs hover:border-black hover:shadow-sm transition-all"
      >
        {/* Card Header: Heading & Short Case Name (No case number on title) */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-black">Track Your Case</h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">
                {activeMatter.title}
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-black group-hover:translate-x-0.5 transition-transform">
            <span>Details</span>
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </span>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="pt-3 pb-1">
          {/* Progress bar */}
          <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden mb-3">
            <div
              className="h-full bg-black rounded-full transition-all duration-500"
              style={{ width: `${activeMatter.progressPercentage}%` }}
            />
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="flex flex-col items-center">
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold mb-0.5">
                ✓
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-black">Case Filed</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold mb-0.5 ring-2 ring-neutral-200">
                2
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-black">Hearings</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center text-[10px] font-bold mb-0.5">
                3
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-neutral-400">Judgement</span>
            </div>
          </div>
        </div>

        {/* Next Hearing Date Alert */}
        <div className="mt-2.5 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] sm:text-xs text-neutral-700 bg-neutral-50/80 rounded-lg px-2.5 py-1.5">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-black flex-shrink-0" />
            <span>
              <strong>Next Hearing:</strong> 28 Sep 2026
            </span>
          </div>
          <span className="text-[10px] font-bold text-neutral-500">68% Done</span>
        </div>
      </Link>
    </div>
  );
};
