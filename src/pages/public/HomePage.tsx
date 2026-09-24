import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { useSEO } from '@/hooks/useSEO';
import { lawyerService } from '@/services';
import { Lawyer } from '@/types/lawyer';
import { formatPKR } from '@/utils/formatters';
import { 
  Search, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  FileText, 
  Video, 
  Briefcase 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [featuredLawyers, setFeaturedLawyers] = useState<Lawyer[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: 'ApkaLawyer — Verified Legal Services & Lawyers in Pakistan',
    description: 'Find verified lawyers in Pakistan. Book online and in-person consultations, manage legal matters, and track court hearings in one place.',
    canonical: 'https://apkalawyer.pk/',
    ogTitle: 'ApkaLawyer — Verified Legal Services in Pakistan',
    ogDescription: 'Find verified lawyers in Pakistan. Book consultations and track case matters in one place.',
  });

  useEffect(() => {
    lawyerService.getFeaturedLawyers().then(setFeaturedLawyers);
  }, []);

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
    <div className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black leading-[1.15] mb-5">
              Find the right lawyer for your legal needs.
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl font-normal">
              Discover verified lawyers in Pakistan, book confidential consultations, and manage legal matters in one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={ROUTES.PUBLIC.LAWYERS}
                className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors shadow-none"
              >
                Find a Lawyer
              </Link>
              <Link
                to={ROUTES.PUBLIC.HOW_IT_WORKS}
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-neutral-50 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Product UI Composition */}
          <div className="mt-14 pt-8 border-t border-neutral-100">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-neutral-900" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Verified Advocate Directory
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span>Lahore</span>
                  <span>•</span>
                  <span>Karachi</span>
                  <span>•</span>
                  <span>Islamabad</span>
                  <span>•</span>
                  <span>Nationwide</span>
                </div>
              </div>

              {/* Sample Quick Filter Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <div className="p-3 bg-white border border-neutral-200 rounded-lg text-xs flex items-center justify-between">
                  <span className="text-neutral-500">Practice Area</span>
                  <span className="font-semibold text-black">All Categories</span>
                </div>
                <div className="p-3 bg-white border border-neutral-200 rounded-lg text-xs flex items-center justify-between">
                  <span className="text-neutral-500">City / Jurisdiction</span>
                  <span className="font-semibold text-black">Any City</span>
                </div>
                <Link
                  to={ROUTES.PUBLIC.LAWYERS}
                  className="p-3 bg-black text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                  <Search className="h-3.5 w-3.5" />
                  Search Advocates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONSULT BEST LAWYERS ONLINE (PRACTICE AREAS GRID) */}
      <section className="py-12 sm:py-16 border-b border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
              Consult best lawyers online
            </h2>
            <Link
              to={ROUTES.PUBLIC.PRACTICE_AREAS}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-7 sm:gap-y-9">
            {[
              { name: 'Civil Litigation', slug: 'civil-litigation', icon: 'civil-litigation' },
              { name: 'Criminal Defense', slug: 'criminal-defense', icon: 'criminal-defense' },
              { name: 'Corporate Law', slug: 'corporate-law', icon: 'corporate-law' },
              { name: 'Family Law', slug: 'family-law', icon: 'family-law' },
              { name: 'Taxation', slug: 'taxation', icon: 'taxation' },
              { name: 'Property & Real Estate', slug: 'property-real-estate', icon: 'property-real-estate' },
              { name: 'Employment & Labor', slug: 'employment-labor', icon: 'employment-labor' },
              { name: 'Immigration', slug: 'immigration', icon: 'immigration' },
              { name: 'Intellectual Property', slug: 'intellectual-property', icon: 'intellectual-property' },
              { name: 'Constitutional Matters', slug: 'constitutional-matters', icon: 'constitutional-matters' },
              { name: 'Banking & Finance', slug: 'banking-finance', icon: 'banking-finance' },
              { name: 'NAB / FIA Cases', slug: 'nab-fia-cases', icon: 'nab-fia-cases' },
            ].map((item) => (
              <Link
                key={item.slug}
                to={`${ROUTES.PUBLIC.LAWYERS}?practiceArea=${encodeURIComponent(item.name)}`}
                className="group flex flex-col items-center text-center cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-neutral-50 border border-neutral-200/90 p-2 sm:p-2.5 flex items-center justify-center transition-all duration-200 group-hover:border-neutral-400 group-hover:bg-neutral-100/60 overflow-hidden shadow-none">
                  <img
                    src={`/icons/practice-areas/${item.icon}.webp`}
                    alt={item.name}
                    className="h-full w-full object-contain transform transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <span className="mt-2.5 sm:mt-3 text-xs sm:text-[13px] font-medium text-neutral-800 group-hover:text-black leading-snug px-1">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRUST & VERIFICATION SECTION */}
      <section className="py-14 sm:py-18 border-b border-neutral-100 bg-neutral-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-2">
              A transparent legal network.
            </h2>
            <p className="text-sm text-neutral-600">
              Clear information and verified credentials before you connect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 border border-neutral-200 rounded-xl bg-white space-y-2">
              <span className="text-xs font-mono font-bold text-neutral-400">01</span>
              <h3 className="text-sm font-bold text-black">Verified Lawyers</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Advocates are reviewed against Bar Council records and enrollment credentials.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-xl bg-white space-y-2">
              <span className="text-xs font-mono font-bold text-neutral-400">02</span>
              <h3 className="text-sm font-bold text-black">Transparent Profiles</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Review fee structures, experience, court levels, and practice focus upfront.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-xl bg-white space-y-2">
              <span className="text-xs font-mono font-bold text-neutral-400">03</span>
              <h3 className="text-sm font-bold text-black">Easy Consultations</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Schedule video calls, phone consultations, or chamber visits with confirmed time slots.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-xl bg-white space-y-2">
              <span className="text-xs font-mono font-bold text-neutral-400">04</span>
              <h3 className="text-sm font-bold text-black">Secure Legal Matters</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Manage case files, hearing dates, and correspondence in one private workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED ADVOCATES SECTION */}
      <section className="py-16 sm:py-20 border-b border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-black">Featured Advocates</h2>
              <p className="text-xs text-neutral-600 mt-1">
                Verified advocates available for scheduled consultations across major jurisdictions.
              </p>
            </div>
            <Link
              to={ROUTES.PUBLIC.LAWYERS}
              className="text-xs font-semibold text-black hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              View all lawyers
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="border border-neutral-200 rounded-xl bg-white p-5 flex flex-col justify-between hover:border-neutral-400 transition-colors"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-4">
                    <img
                      src={lawyer.avatarUrl}
                      alt={lawyer.name}
                      className="h-14 w-14 rounded-lg object-cover border border-neutral-200 grayscale contrast-125"
                    />
                    <div>
                      <div className="flex items-center gap-1 text-[11px] text-neutral-600 font-medium">
                        <Check className="h-3 w-3 text-black" />
                        <span>{lawyer.courtEnrollment}</span>
                      </div>
                      <h3 className="text-sm font-bold text-black leading-snug mt-0.5">{lawyer.name}</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {lawyer.city} • {lawyer.experienceYears} yrs experience
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {lawyer.practiceAreas.slice(0, 2).map((pa) => (
                      <span
                        key={pa}
                        className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[11px] font-medium"
                      >
                        {pa}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
                      Consultation
                    </span>
                    <span className="text-xs font-bold text-black">
                      {formatPKR(lawyer.consultationFee)}
                    </span>
                  </div>
                  <Link
                    to={`/lawyers/${lawyer.id}`}
                    className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-neutral-50 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-16 sm:py-20 border-b border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-2">
              How It Works
            </h2>
            <p className="text-sm text-neutral-600">
              A straightforward process from inquiry to case resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-2xl font-bold text-neutral-300 font-mono">01</span>
              <h3 className="text-base font-bold text-black">Find a Lawyer</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Filter advocates by legal domain, city, experience, and court enrollment level to find counsel suited to your situation.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-2xl font-bold text-neutral-300 font-mono">02</span>
              <h3 className="text-base font-bold text-black">Book a Consultation</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Choose a confirmed time slot for online video or in-person chamber consultation and submit preliminary matter details.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-2xl font-bold text-neutral-300 font-mono">03</span>
              <h3 className="text-base font-bold text-black">Manage Your Matter</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Retain counsel and monitor your case timeline, cause list hearing dates, and court orders directly in your client portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONSULTATION SECTION */}
      <section className="py-16 sm:py-20 border-b border-neutral-100 bg-neutral-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-black mb-4">
                Consultations tailored to your schedule.
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Connect with advocates without administrative delays. Choose between preliminary discovery calls or detailed case analysis sessions.
              </p>

              <div className="space-y-3 text-xs text-neutral-700">
                <div className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
                  <span><strong>Online & In-Person:</strong> Secure video link or office chamber meeting.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
                  <span><strong>Transparent Fees:</strong> Upfront pricing with no hidden advisory charges.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
                  <span><strong>Document Attachment:</strong> Provide case summaries prior to your session.</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to={ROUTES.PUBLIC.LAWYERS}
                  className="inline-flex items-center rounded-lg bg-black px-5 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
                >
                  Schedule a Consultation
                </Link>
              </div>
            </div>

            {/* Product UI Demonstration Box */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs">
                <span className="font-semibold text-neutral-500 uppercase tracking-wider text-[10px]">
                  Consultation Booking Preview
                </span>
                <span className="font-bold text-black">45-Minute Advisory</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
                  <span className="text-[10px] text-neutral-400 block">Date</span>
                  <span className="font-semibold text-black mt-0.5 block">Thu, 15 Oct 2026</span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
                  <span className="text-[10px] text-neutral-400 block">Time</span>
                  <span className="font-semibold text-black mt-0.5 block">04:00 PM PKT</span>
                </div>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Meeting Format</span>
                  <span className="font-semibold text-black mt-0.5 block">Private Video Conference</span>
                </div>
                <Video className="h-4 w-4 text-neutral-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LEGAL MATTERS SECTION */}
      <section className="py-16 sm:py-20 border-b border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-2">
              Continuous matter management.
            </h2>
            <p className="text-sm text-neutral-600">
              Everything related to your case stays organized in one place after retaining an advocate.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-1">
              <Briefcase className="h-4 w-4 text-neutral-700 mb-2" />
              <h3 className="text-xs font-bold text-black">Matters</h3>
              <p className="text-[11px] text-neutral-500">Milestone timelines & status.</p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-1">
              <FileText className="h-4 w-4 text-neutral-700 mb-2" />
              <h3 className="text-xs font-bold text-black">Documents</h3>
              <p className="text-[11px] text-neutral-500">Pleadings & stay orders.</p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-1">
              <Clock className="h-4 w-4 text-neutral-700 mb-2" />
              <h3 className="text-xs font-bold text-black">Hearings</h3>
              <p className="text-[11px] text-neutral-500">Cause list diary & judges.</p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-1">
              <Calendar className="h-4 w-4 text-neutral-700 mb-2" />
              <h3 className="text-xs font-bold text-black">Important Dates</h3>
              <p className="text-[11px] text-neutral-500">Court filing deadlines.</p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-1">
              <ShieldCheck className="h-4 w-4 text-neutral-700 mb-2" />
              <h3 className="text-xs font-bold text-black">Messages</h3>
              <p className="text-[11px] text-neutral-500">Privileged communication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOR LAWYERS SECTION */}
      <section id="for-lawyers" className="py-16 sm:py-20 border-b border-neutral-100 bg-neutral-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-[11px] uppercase font-bold text-neutral-500 tracking-wider mb-2">
                For Legal Practitioners
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-black mb-4">
                Built for Pakistani advocates and legal chambers.
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Expand your practice reach, digitize case management, and streamline client intake with an authenticated advocate profile.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-8">
                <div className="p-3 border border-neutral-200 rounded-lg bg-white">
                  <p className="font-bold text-black mb-0.5">Verified Profile</p>
                  <p className="text-neutral-500 text-[11px]">Showcase Bar Council license and expertise.</p>
                </div>
                <div className="p-3 border border-neutral-200 rounded-lg bg-white">
                  <p className="font-bold text-black mb-0.5">Consultation Intake</p>
                  <p className="text-neutral-500 text-[11px]">Receive pre-scheduled client appointments.</p>
                </div>
                <div className="p-3 border border-neutral-200 rounded-lg bg-white">
                  <p className="font-bold text-black mb-0.5">Court Diary</p>
                  <p className="text-neutral-500 text-[11px]">Track hearing dates and bench numbers.</p>
                </div>
                <div className="p-3 border border-neutral-200 rounded-lg bg-white">
                  <p className="font-bold text-black mb-0.5">Direct Messaging</p>
                  <p className="text-neutral-500 text-[11px]">Communicate with retained clients securely.</p>
                </div>
              </div>

              <Link
                to={ROUTES.PUBLIC.LOGIN}
                className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                Join as a Lawyer
              </Link>
            </div>

            {/* Chamber Preview */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <h4 className="text-xs font-bold text-black">Advocate Muhammad Zeeshan Malik</h4>
                  <p className="text-[11px] text-neutral-500">Punjab Bar Council Verified • High Court</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-neutral-100 text-black text-[10px] font-bold uppercase">
                  Verified
                </span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Upcoming Hearing</span>
                  <span className="font-mono font-bold text-black">W.P. 18492/2026</span>
                </div>
                <p className="text-[11px] text-neutral-600">Lahore High Court — Single Bench 4</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. LEGAL DOCUMENT ASSISTANCE */}
      <section className="py-16 sm:py-20 border-b border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-2">
              Structured legal document drafts.
            </h2>
            <p className="text-sm text-neutral-600">
              Generate formatted drafts for common agreements and statutory notices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-1">
              <span className="text-xs font-mono font-bold text-neutral-400">Step 01</span>
              <h3 className="text-xs font-bold text-black">Draft</h3>
              <p className="text-[11px] text-neutral-500">Enter required statutory fields.</p>
            </div>
            <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-1">
              <span className="text-xs font-mono font-bold text-neutral-400">Step 02</span>
              <h3 className="text-xs font-bold text-black">Review</h3>
              <p className="text-[11px] text-neutral-500">Inspect clauses and terms.</p>
            </div>
            <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-1">
              <span className="text-xs font-mono font-bold text-neutral-400">Step 03</span>
              <h3 className="text-xs font-bold text-black">Edit</h3>
              <p className="text-[11px] text-neutral-500">Customize to your requirements.</p>
            </div>
            <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-1">
              <span className="text-xs font-mono font-bold text-neutral-400">Step 04</span>
              <h3 className="text-xs font-bold text-black">Save & Consult</h3>
              <p className="text-[11px] text-neutral-500">Share with lawyer for review.</p>
            </div>
          </div>

          {/* Statutory Drafting Disclaimer */}
          <div className="p-4 border border-neutral-200 rounded-xl bg-neutral-50 text-neutral-700 text-xs leading-relaxed max-w-3xl">
            <strong>Important Note:</strong> Generated documents are preliminary drafts and do not constitute final legal advice. For formal filings before Pakistani courts or high-stakes agreements, drafts should be reviewed and verified by a licensed advocate.
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-16 sm:py-20 border-b border-neutral-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left sm:text-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-neutral-600">
              Clear answers regarding verification, bookings, and legal representation.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-neutral-200 rounded-xl bg-white overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-black hover:bg-neutral-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-neutral-500 flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-neutral-500 flex-shrink-0 ml-2" />
                    )}
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
      </section>

      {/* 11. FINAL CLOSING CTA */}
      <section className="py-20 sm:py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-black mb-4">
            Need legal help? Start by finding the right lawyer.
          </h2>
          <p className="text-sm text-neutral-600 mb-8 max-w-xl mx-auto">
            Connect with verified advocates across all practice areas and Pakistani jurisdictions.
          </p>
          <Link
            to={ROUTES.PUBLIC.LAWYERS}
            className="inline-flex items-center rounded-lg bg-black px-8 py-3.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Find a Lawyer
          </Link>
        </div>
      </section>
    </div>
  );
};
