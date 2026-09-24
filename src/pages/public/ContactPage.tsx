import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { MapPin, Phone, Mail } from 'lucide-react';

export const ContactPage: React.FC = () => {
  useSEO({
    title: 'Contact Us — ApkaLawyer Pakistan',
    description: 'Get in touch with the ApkaLawyer team for platform support, advocate onboardings, or business partnerships.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Contact Us</h1>
        <p className="text-sm text-neutral-500">Reach out to our platform support and partner relations team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white border border-neutral-200 flex items-start gap-3">
            <MapPin className="h-4 w-4 text-neutral-700 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-black">Office Location</h4>
              <p className="text-xs text-neutral-600 mt-0.5">
                Level 4, Al-Hafeez Heights, Gulberg III, Lahore, Pakistan
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 flex items-start gap-3">
            <Mail className="h-4 w-4 text-neutral-700 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-black">Email</h4>
              <p className="text-xs text-neutral-600 mt-0.5">support@apkalawyer.pk</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 flex items-start gap-3">
            <Phone className="h-4 w-4 text-neutral-700 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-black">Helpline</h4>
              <p className="text-xs text-neutral-600 mt-0.5">+92 (042) 3578-9000 (Mon - Sat, 9am - 6pm PKT)</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 rounded-xl border border-neutral-200 bg-white space-y-4">
          <h3 className="text-sm font-bold text-black">Send a Message</h3>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Muhammad Ali"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-xs focus:border-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="ali@example.com"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-xs focus:border-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Message</label>
              <textarea
                rows={3}
                placeholder="How can we assist you?"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-xs focus:border-black focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-black py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
