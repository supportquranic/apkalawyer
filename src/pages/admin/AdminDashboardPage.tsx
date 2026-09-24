import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Users, UserCheck, Briefcase, CreditCard } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  useSEO({ title: 'Admin Overview — ApkaLawyer', noIndex: true });

  const stats = [
    { label: 'Pending Bar Verifications', value: '3', icon: UserCheck, color: 'text-amber-600 bg-amber-50' },
    { label: 'Verified Advocates', value: '28', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Active Legal Matters', value: '42', icon: Briefcase, color: 'text-sky-600 bg-sky-50' },
    { label: 'Escrow Volume (PKR)', value: 'PKR 1.45M', icon: CreditCard, color: 'text-indigo-600 bg-indigo-50' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Platform Overview & Compliance</h1>
        <p className="text-xs text-slate-500">Real-time metrics, practitioner verification queue, and escrow ledger.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
