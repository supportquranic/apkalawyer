import React, { useEffect, useState } from 'react';
import { lawyerService } from '@/services';
import { Lawyer } from '@/types/lawyer';
import { useSEO } from '@/hooks/useSEO';
import { formatPKR } from '@/utils/formatters';
import { LoadingState } from '@/components/feedback';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ClientLawyersPage: React.FC = () => {
  useSEO({ title: 'Find & Retain Lawyers — Client Portal', noIndex: true });
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    lawyerService.getLawyers().then((data) => {
      setLawyers(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingState message="Loading advocates..." />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Find & Retain Legal Advocates</h1>
        <p className="text-xs text-slate-500">Connect with verified advocates across all major Pakistani courts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lawyers.map((l) => (
          <div key={l.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <img src={l.avatarUrl} alt={l.name} className="h-14 w-14 rounded-xl object-cover border border-slate-200" />
              <div>
                <span className="text-[10px] font-semibold text-black uppercase block">{l.courtEnrollment}</span>
                <h3 className="text-xs font-bold text-slate-900">{l.name}</h3>
                <p className="text-[11px] text-slate-500">{l.city} • {l.experienceYears} yrs</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">{formatPKR(l.consultationFee)}</span>
              <Link
                to={`/lawyers/${l.id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-black hover:text-black"
              >
                View Chamber Profile
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
