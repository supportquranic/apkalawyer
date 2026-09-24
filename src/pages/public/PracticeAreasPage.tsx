import React from 'react';
import { Link } from 'react-router-dom';
import { PRACTICE_AREAS_DATA } from '@/data/constants/practiceAreas';
import { useSEO } from '@/hooks/useSEO';
import { ROUTES } from '@/routes/paths';
import { ArrowRight } from 'lucide-react';

export const PracticeAreasPage: React.FC = () => {
  useSEO({
    title: 'Legal Practice Areas — ApkaLawyer Pakistan',
    description: 'Explore specialized legal practice areas across Pakistan including Family Law, Property Disputes, Corporate SECP, Criminal Defense, and FBR Taxation.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
          Legal Practice Areas
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-neutral-500">
          Find verified advocates experienced in specific statutory frameworks, tribunals, and high court registries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {PRACTICE_AREAS_DATA.map((pa) => (
          <Link
            key={pa.id}
            to={`${ROUTES.PUBLIC.LAWYERS}?practiceArea=${encodeURIComponent(pa.name)}`}
            className="group rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 flex flex-col justify-between hover:border-neutral-900 transition-all hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-neutral-950 group-hover:text-black">
                  {pa.name}
                </h2>
                {pa.urduName && (
                  <span className="text-[11px] text-neutral-400 font-sans" dir="rtl">
                    {pa.urduName}
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 mb-3">
                {pa.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 text-xs font-semibold text-neutral-900 group-hover:text-black">
              <span>Browse Advocates</span>
              <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
