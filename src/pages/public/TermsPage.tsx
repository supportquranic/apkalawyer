import React from 'react';
import { useSEO } from '@/hooks/useSEO';

export const TermsPage: React.FC = () => {
  useSEO({
    title: 'Terms of Service — ApkaLawyer',
    description: 'Terms and conditions governing the use of the ApkaLawyer platform.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mb-2">Terms of Service</h1>
      <p className="text-xs text-neutral-400 mb-8">Effective Date: Prototype / Pre-Release Phase</p>

      <div className="text-xs sm:text-sm leading-relaxed text-neutral-700 space-y-6">
        <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs">
          <strong>Notice:</strong> This is a structured terms placeholder for the frontend validation phase. Commercial terms will be finalized upon formal regulatory review.
        </div>

        <section className="space-y-1.5">
          <h2 className="text-sm font-bold text-black">1. Technology Platform Role</h2>
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            ApkaLawyer operates as an online technology intermediary and discovery platform. ApkaLawyer is not a law firm and does not itself provide legal advice or act as legal counsel.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-sm font-bold text-black">2. Advocate-Client Relationship</h2>
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            An advocate-client privileged relationship is established solely between the client and the specific licensed advocate retained by the client through mutual agreement and execution of a formal Vakalatnama / engagement contract.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-sm font-bold text-black">3. Practitioner Verification</h2>
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            While ApkaLawyer conducts preliminary validation of Bar Council enrollment numbers, clients are encouraged to perform independent diligence regarding their specific litigation needs.
          </p>
        </section>
      </div>
    </div>
  );
};
