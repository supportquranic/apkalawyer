import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { matterService } from '@/services';
import { LegalMatter } from '@/types/matter';
import { useSEO } from '@/hooks/useSEO';
import { LoadingState, NotFoundState } from '@/components/feedback';
import { ROUTES } from '@/routes/paths';
import { ArrowLeft } from 'lucide-react';

export const LawyerMatterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [matter, setMatter] = useState<LegalMatter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useSEO({ title: matter ? `${matter.title} — Case Room` : 'Case Room', noIndex: true });

  useEffect(() => {
    if (!id) return;
    matterService.getMatterById(id).then((data) => {
      setMatter(data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) return <LoadingState message="Loading case room..." />;
  if (!matter) return <NotFoundState title="Matter Record Not Found" returnUrl={ROUTES.LAWYER.MATTERS} />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link to={ROUTES.LAWYER.MATTERS} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" />
        Back to Case Files
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-400">{matter.matterNumber}</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-200 text-black">
            {matter.status.replace('_', ' ')}
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-900">{matter.title}</h1>
        <p className="text-xs text-slate-600 leading-relaxed">{matter.description}</p>
      </div>
    </div>
  );
};
