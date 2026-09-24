import React from 'react';
import { useSEO } from '@/hooks/useSEO';

export const AboutPage: React.FC = () => {
  useSEO({
    title: 'About Us — ApkaLawyer Pakistan',
    description: 'Transforming legal accessibility, transparency, and advocate discovery across Pakistan.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-black mb-6">About ApkaLawyer</h1>
      <p className="text-sm text-neutral-600 leading-relaxed mb-8">
        ApkaLawyer was founded to make credible, transparent, and verified legal representation accessible to every citizen, overseas Pakistani, and business enterprise.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div className="p-6 rounded-xl border border-neutral-200 bg-white space-y-2">
          <h3 className="text-sm font-bold text-black">Our Mission</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            To bridge the information gap in Pakistan's legal ecosystem through verified Bar credentials, transparent consultation scheduling, and modern matter management.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-neutral-200 bg-white space-y-2">
          <h3 className="text-sm font-bold text-black">Trust & Integrity</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Every legal advocate featured on the platform undergoes strict identity and Bar Council license validation.
          </p>
        </div>
      </div>
    </div>
  );
};
