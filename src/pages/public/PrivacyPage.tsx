import React from 'react';
import { useSEO } from '@/hooks/useSEO';

export const PrivacyPage: React.FC = () => {
  useSEO({
    title: 'Privacy Policy — ApkaLawyer',
    description: 'Privacy policy, client confidentiality, and data handling standards for ApkaLawyer.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mb-2">Privacy & Data Policy</h1>
      <p className="text-xs text-neutral-400 mb-8">Effective Date: Prototype / Pre-Release Phase</p>

      <div className="text-xs sm:text-sm leading-relaxed text-neutral-700 space-y-6">
        <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs">
          <strong>Notice:</strong> This is a structured placeholder document for the frontend validation phase. Official legal and regulatory privacy terms will be formally approved prior to commercial launch.
        </div>

        <section className="space-y-1.5">
          <h2 className="text-sm font-bold text-black">1. Client Confidentiality & Privileged Documents</h2>
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            ApkaLawyer treats legal documents, pleadings, court filings, and communications shared between clients and retained advocates as confidential. Documents uploaded to the Document Vault are restricted strictly to authorized participants.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-sm font-bold text-black">2. Personal Information Processed</h2>
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            To provide verification and consultation services, we process user identity information (Name, Email, Verified Pakistani Mobile Number, and Bar Council License numbers for legal practitioners).
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-sm font-bold text-black">3. Storage & Encryption Standard</h2>
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            In production deployment, case files and identity records are stored with encryption at rest and in transit via TLS/HTTPS protocols.
          </p>
        </section>
      </div>
    </div>
  );
};
