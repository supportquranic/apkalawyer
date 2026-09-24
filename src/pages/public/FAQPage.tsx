import React, { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useSEO({
    title: 'Frequently Asked Questions — ApkaLawyer',
    description: 'Find answers about lawyer verification, online consultations, legal notices, and court case tracking in Pakistan.',
  });

  const faqs = [
    {
      q: 'How does ApkaLawyer work?',
      a: 'ApkaLawyer is a technology platform connecting clients with verified legal practitioners in Pakistan. You can search lawyers by practice area and city, book online or in-person consultations, and manage ongoing case matters with clear timeline updates.',
    },
    {
      q: 'Are lawyers on the platform verified?',
      a: 'Yes. Every advocate listed undergoes a credential verification process where their Bar Council enrollment number (e.g. Punjab, Sindh, Islamabad Bar Councils) and practicing status are verified before their profile is approved.',
    },
    {
      q: 'Can I book a free consultation?',
      a: 'Some advocates offer brief 15-minute introductory or discovery consultations at no fee. Each lawyer profile clearly states their consultation fee and available options up front.',
    },
    {
      q: 'Can I meet a lawyer online?',
      a: 'Yes. You can choose confidential video consultations through your browser or schedule an in-person appointment at the advocate’s chamber or office.',
    },
    {
      q: 'Can I manage my legal matter after retaining counsel?',
      a: 'Yes. Once you retain a lawyer, you gain access to a dedicated matter workspace to track court hearing dates, upload confidential documents to an encrypted vault, and message your counsel directly.',
    },
    {
      q: 'How do lawyers join ApkaLawyer?',
      a: 'Licensed advocates enrolled with high court or subordinate bar councils can apply through the lawyer registration portal by providing their Bar Council credentials, CNIC, and practice details for administrative review.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Frequently Asked Questions</h1>
        <p className="text-sm text-neutral-500">Everything you need to know about the ApkaLawyer platform.</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border border-neutral-200 rounded-xl bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-black hover:bg-neutral-50 transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="h-4 w-4 text-neutral-500" /> : <ChevronDown className="h-4 w-4 text-neutral-500" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
