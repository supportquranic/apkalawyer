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
  FileText,
  ShieldCheck
} from 'lucide-react';

export const ClientDashboardPage: React.FC = () => {
  useSEO({ title: 'ApkaLawyer — Legal App', noIndex: true });

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
      {/* Top Client Header */}
      <div className="flex items-center justify-between py-1">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-black tracking-tight flex items-center gap-1.5">
            Salam, {user?.name || 'Muzammil'}
            <ShieldCheck className="h-4 w-4 text-black inline" />
          </h1>
          <p className="text-xs text-neutral-500">Select what you want to do</p>
        </div>
        <span className="text-[11px] font-bold bg-neutral-100 text-black border border-neutral-200 px-3 py-1 rounded-full">
          Verified Account
        </span>
      </div>

      {/* Main Bento Grid — Exactly matching reference layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Big Card (Left Column, Full Height): Book a Lawyer */}
        <Link
          to={ROUTES.CLIENT.LAWYERS}
          className="group relative overflow-hidden rounded-[2rem] bg-neutral-900 text-white min-h-[440px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-7 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-800"
        >
          {/* Background Full-Bleed Image of Senior Pakistani Advocate */}
          <img
            src="/images/senior-lawyer-headshot.webp"
            alt="Senior Advocate"
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

          {/* Top Tagline */}
          <div className="relative z-10">
            <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">
              Start Your Legal Consultation
            </span>
          </div>

          {/* Bottom Content & Quote */}
          <div className="relative z-10 space-y-4 pt-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                &ldquo;Justice Begins With The Right Legal Counsel.&rdquo;
              </h2>
              <p className="text-xs text-neutral-300 mt-2 font-medium">
                Verified Supreme Court & High Court Advocates across Pakistan
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full shadow-md group-hover:bg-neutral-100 transition-colors">
                Book a Lawyer
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </Link>

        {/* Right Column: 2 Stacked Cards */}
        <div className="flex flex-col gap-4">
          {/* Top Right Card: Video Consultation */}
          <Link
            to={ROUTES.CLIENT.CONSULTATIONS}
            className="group relative overflow-hidden rounded-[2rem] bg-neutral-950 text-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-800 flex flex-col justify-between min-h-[220px] sm:min-h-[240px]"
          >
            {/* Background Texture/Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black opacity-90" />
            <div className="absolute right-0 top-0 w-44 h-44 opacity-25 pointer-events-none">
              <img
                src="/images/card-consultation.webp"
                alt="Video Consultation"
                className="w-full h-full object-contain object-right group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1.5">
                <Video className="h-3.5 w-3.5 text-white" />
                Live Consultation
              </span>
              <span className="text-[10px] font-bold bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded-full border border-neutral-700">
                03 Online Now
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-2 mt-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Video Consultation
              </h3>
              <p className="text-xs text-neutral-400 max-w-[260px] line-clamp-2">
                Instant 1-on-1 confidential encrypted audio & video advice with active counsel.
              </p>
            </div>

            {/* Bottom Button */}
            <div className="relative z-10 pt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                <span>Start Video Call</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>

          {/* Bottom Right Card: Draft a Legal Notice */}
          <Link
            to={ROUTES.CLIENT.LEGAL_DOCUMENTS}
            className="group relative overflow-hidden rounded-[2rem] bg-white text-black p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200 flex flex-col justify-between min-h-[220px] sm:min-h-[240px]"
          >
            {/* Background 3D Seal/Document Image in Corner */}
            <div className="absolute right-2 bottom-2 w-32 h-32 opacity-20 pointer-events-none">
              <img
                src="/images/card-legal-notice.webp"
                alt="Draft Legal Notice"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Top Badge */}
            <div className="relative z-10">
              <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-black" />
                Document Drafter
              </span>
            </div>

            {/* Headline */}
            <div className="relative z-10 space-y-1 mt-3">
              <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight leading-tight">
                Draft a Legal Notice
              </h3>
              <p className="text-xs text-neutral-600 max-w-[260px] line-clamp-2">
                Generate customized recovery notices, contracts, affidavits, and legal agreements.
              </p>
            </div>

            {/* White/Black Pill Button matching reference "Explore More" */}
            <div className="relative z-10 pt-4">
              <span className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-bold px-4 py-2 rounded-full group-hover:bg-neutral-800 transition-colors shadow-sm">
                Explore More
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* 3rd Feature: Track Your Case (Milestone Tracker Card) */}
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
                <span className="text-[10px] font-mono font-bold bg-neutral-100 text-black px-2 py-0.5 rounded border border-neutral-200">
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
          <div className="flex items-center justify-between text-xs mb-2 font-medium">
            <span className="text-neutral-500">Court Milestone Progress</span>
            <span className="font-bold text-black">{activeMatter.progressPercentage}% Completed</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden mb-4">
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
              <span className="text-[10px] text-black font-bold">Active in Court</span>
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
    </div>
  );
};
