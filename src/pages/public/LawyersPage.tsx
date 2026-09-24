import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { lawyerService } from '@/services';
import { Lawyer } from '@/types/lawyer';
import { useSEO } from '@/hooks/useSEO';
import { formatPKR } from '@/utils/formatters';
import { LoadingState, EmptyState } from '@/components/feedback';
import { MapPin, ArrowRight, Check } from 'lucide-react';
import { PAKISTAN_CITIES } from '@/data/constants/cities';
import { PRACTICE_AREAS_DATA } from '@/data/constants/practiceAreas';

export const LawyersPage: React.FC = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useSEO({
    title: 'Verified Lawyers & Advocates in Pakistan — ApkaLawyer',
    description: 'Browse verified High Court & Supreme Court advocates in Lahore, Karachi, Islamabad. Filter by practice area, fee, and court enrollment.',
    canonical: 'https://apkalawyer.pk/lawyers',
  });

  useEffect(() => {
    let isCurrent = true;
    lawyerService
      .getLawyers({
        city: selectedCity || undefined,
        practiceArea: selectedArea || undefined,
      })
      .then((data) => {
        if (isCurrent) {
          setLawyers(data);
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [selectedCity, selectedArea]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
          Find a Verified Advocate
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Explore licensed advocates and legal practitioners verified across Pakistani Bar Councils.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50 mb-8 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            Practice Area
          </label>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-black focus:outline-none focus:border-black"
          >
            <option value="">All Practice Areas</option>
            {PRACTICE_AREAS_DATA.map((pa) => (
              <option key={pa.id} value={pa.name}>
                {pa.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            City / Jurisdiction
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-black focus:outline-none focus:border-black"
          >
            <option value="">All Cities</option>
            {PAKISTAN_CITIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {(selectedCity || selectedArea) && (
          <div className="self-end">
            <button
              type="button"
              onClick={() => {
                setSelectedCity('');
                setSelectedArea('');
              }}
              className="px-3 py-2 text-xs text-neutral-600 hover:text-black font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* List */}
      {isLoading ? (
        <LoadingState message="Loading verified advocates directory..." />
      ) : lawyers.length === 0 ? (
        <EmptyState
          title="No Advocates Found"
          description="We could not find advocates matching the current filter selection."
          actionLabel="Clear Filters"
          onAction={() => {
            setSelectedCity('');
            setSelectedArea('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="rounded-xl border border-neutral-200 bg-white p-6 hover:border-neutral-400 transition-colors flex flex-col justify-between"
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
                    <h2 className="text-sm font-bold text-black leading-snug mt-0.5">{lawyer.name}</h2>
                    <div className="flex items-center gap-1 text-neutral-500 text-xs mt-0.5">
                      <MapPin className="h-3 w-3" />
                      <span>{lawyer.city}</span>
                      <span className="mx-0.5">•</span>
                      <span>{lawyer.experienceYears} yrs experience</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 line-clamp-2 mb-4 leading-relaxed font-normal">
                  {lawyer.bio}
                </p>

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
                  className="inline-flex items-center gap-1 text-xs font-semibold text-black hover:underline"
                >
                  View Profile
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
