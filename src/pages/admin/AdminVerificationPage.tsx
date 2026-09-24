import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Check, X } from 'lucide-react';

export const AdminVerificationPage: React.FC = () => {
  useSEO({ title: 'Bar License Verification Queue — Admin', noIndex: true });

  const pending = [
    {
      id: 'v1',
      name: 'Advocate Tariq Mehmood Bajwa',
      barCouncil: 'Punjab Bar Council',
      licenseNo: 'PBC-2018-9921',
      court: 'High Court',
      city: 'Rawalpindi',
      submittedAt: '2026-09-23',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Bar Council Verification Queue</h1>
        <p className="text-xs text-slate-500">Review advocate Bar licenses against provincial Bar Council registries.</p>
      </div>

      <div className="space-y-4">
        {pending.map((p) => (
          <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono font-bold text-xs text-slate-600">{p.licenseNo}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                  Pending Review
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
              <p className="text-xs text-slate-500">{p.barCouncil} • {p.court} • {p.city}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500"
              >
                <Check className="h-3.5 w-3.5" />
                Approve & Verify
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <X className="h-3.5 w-3.5" />
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
