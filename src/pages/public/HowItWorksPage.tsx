import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

export const HowItWorksPage: React.FC = () => {
  useSEO({
    title: 'How It Works — ApkaLawyer',
    description: 'Learn how ApkaLawyer simplifies finding verified advocates, booking consultations, tracking hearings, and generating legal drafts.',
  });

  const steps = [
    {
      number: '01',
      title: 'Find & Compare Verified Advocates',
      description: 'Filter by city, court enrollment level (High Court / Supreme Court), fee structure, and specialized legal expertise.',
    },
    {
      number: '02',
      title: 'Book a Confidential Consultation',
      description: 'Choose a convenient video, phone, or in-person chamber slot. Upload relevant case documents beforehand for lawyer review.',
    },
    {
      number: '03',
      title: 'Track Court Diary & Case Progress',
      description: 'Retain counsel with escrow protection. Monitor every cause list hearing date, judge orders, and case milestones seamlessly.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-black">How ApkaLawyer Works</h1>
        <p className="mt-2 text-sm text-neutral-500">
          A seamless, transparent way to connect with advocates and manage legal procedures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {steps.map((step) => (
          <div key={step.number} className="rounded-xl border border-neutral-200 bg-white p-6 space-y-3">
            <span className="text-3xl font-bold text-neutral-300 font-mono block">
              {step.number}
            </span>
            <h3 className="text-base font-bold text-black">{step.title}</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-normal">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="p-8 border border-neutral-200 rounded-xl bg-neutral-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-bold text-black">Ready to get started?</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Find verified legal counsel in your city today.</p>
        </div>
        <Link
          to={ROUTES.PUBLIC.LAWYERS}
          className="inline-flex items-center rounded-lg bg-black px-5 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
        >
          Find a Lawyer
        </Link>
      </div>
    </div>
  );
};
