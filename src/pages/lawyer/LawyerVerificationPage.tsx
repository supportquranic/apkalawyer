import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { ShieldCheck } from 'lucide-react';

export const LawyerVerificationPage: React.FC = () => {
  useSEO({ title: 'Bar Council Verification — ApkaLawyer', noIndex: true });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Bar Council Verification Status</h1>
        <p className="text-xs text-slate-500">Legal accreditation and statutory credentials review.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900">
          <ShieldCheck className="h-6 w-6 text-black flex-shrink-0" />
          <div>
            <h3 className="text-sm font-bold">Bar License Verified & Active</h3>
            <p className="text-xs mt-0.5">
              Your credentials are confirmed with the Punjab Bar Council registry as an Advocate of the High Court.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Bar License Number</span>
            <span className="font-mono font-bold text-slate-800 text-sm mt-1 block">LHC-2012-7891</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Court Enrollment</span>
            <span className="font-bold text-slate-800 text-sm mt-1 block">High Court of Pakistan</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Enrollment Year</span>
            <span className="font-bold text-slate-800 text-sm mt-1 block">2012 (14 Years Experience)</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Verification Tier</span>
            <span className="font-bold text-black text-sm mt-1 block">Tier 1 Bar Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
