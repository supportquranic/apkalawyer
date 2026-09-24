import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lawyerService } from '@/services';
import { Lawyer, LawyerReview } from '@/types/lawyer';
import { useSEO } from '@/hooks/useSEO';
import { formatPKR } from '@/utils/formatters';
import { LoadingState, NotFoundState } from '@/components/feedback';
import { MapPin, Check, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/routes/paths';

export const LawyerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [reviews, setReviews] = useState<LawyerReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([lawyerService.getLawyerById(id), lawyerService.getLawyerReviews(id)]).then(
      ([lawyerData, reviewData]) => {
        setLawyer(lawyerData);
        setReviews(reviewData);
        setIsLoading(false);
      }
    );
  }, [id]);

  useSEO({
    title: lawyer ? `${lawyer.name} — Advocate High Court | ApkaLawyer` : 'Advocate Profile',
    description: lawyer ? lawyer.bio : 'Verified legal advocate profile on ApkaLawyer.',
  });

  if (isLoading) return <LoadingState message="Loading advocate chamber profile..." />;
  if (!lawyer) return <NotFoundState title="Lawyer Profile Not Found" returnUrl={ROUTES.PUBLIC.LAWYERS} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to={ROUTES.PUBLIC.LAWYERS}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-black mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Advocate Directory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <img
                src={lawyer.avatarUrl}
                alt={lawyer.name}
                className="h-20 w-20 rounded-xl object-cover border border-neutral-200 grayscale contrast-125"
              />
              <div>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-700 mb-1 px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200">
                  <Check className="h-3 w-3 text-black" />
                  <span>{lawyer.barCouncil} Verified</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-black mt-1">{lawyer.name}</h1>
                <p className="text-xs font-medium text-neutral-500 mt-0.5">{lawyer.courtEnrollment}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mt-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {lawyer.city}
                  </span>
                  <span>•</span>
                  <span>License: {lawyer.barLicenseNumber}</span>
                  <span>•</span>
                  <span>{lawyer.experienceYears} Years Practice</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100">
              <h2 className="text-sm font-bold text-black uppercase tracking-wider mb-2">
                About & Legal Experience
              </h2>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">{lawyer.bio}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100">
              <h2 className="text-sm font-bold text-black uppercase tracking-wider mb-2">
                Practice Areas
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {lawyer.practiceAreas.map((pa) => (
                  <span
                    key={pa}
                    className="px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 text-xs font-medium"
                  >
                    {pa}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 space-y-4">
            <h2 className="text-sm font-bold text-black uppercase tracking-wider">
              Client Feedback ({reviews.length})
            </h2>
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-lg bg-neutral-50/50 border border-neutral-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-black">{rev.clientName}</span>
                    <span className="text-[11px] text-neutral-500 font-mono">{rev.rating}.0 / 5.0</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Consultation Booking Card */}
        <div>
          <div className="sticky top-24 rounded-xl border border-neutral-200 bg-white p-6 space-y-5">
            <div>
              <h3 className="text-base font-bold text-black">Consultation</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Schedule a confidential session.</p>
            </div>

            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-100">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                Standard Advisory (45 Min)
              </span>
              <span className="text-xl font-bold text-black mt-1 block">
                {formatPKR(lawyer.consultationFee)}
              </span>
            </div>

            <Link
              to={ROUTES.CLIENT.CONSULTATIONS}
              className="w-full flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Book Consultation
            </Link>

            <div className="pt-4 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-500">
              <div className="flex items-center gap-2">
                <Check className="h-3 w-3 text-black" />
                <span>Online video & office chamber formats</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3 w-3 text-black" />
                <span>Pre-consultation document review included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
