import React, { useEffect, useState } from 'react';
import { lawyerService } from '@/services';
import { Lawyer } from '@/types/lawyer';
import { useSEO } from '@/hooks/useSEO';
import { LoadingState } from '@/components/feedback';

export const AdminLawyersPage: React.FC = () => {
  useSEO({ title: 'Advocate Directory Moderation — Admin', noIndex: true });
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
        <h1 className="text-xl font-bold text-slate-900">Enrolled Advocates Directory</h1>
        <p className="text-xs text-slate-500">Manage advocate accounts, status, and Bar Council verification.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Bar Council</th>
              <th className="p-4">Court Level</th>
              <th className="p-4">City</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {lawyers.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-900">{l.name}</td>
                <td className="p-4 text-slate-600">{l.barCouncil}</td>
                <td className="p-4 text-slate-600">{l.courtEnrollment}</td>
                <td className="p-4 text-slate-600">{l.city}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                    Verified
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
