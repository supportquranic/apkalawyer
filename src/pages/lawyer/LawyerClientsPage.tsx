import React from 'react';
import { useSEO } from '@/hooks/useSEO';

export const LawyerClientsPage: React.FC = () => {
  useSEO({ title: 'Clients Directory — Advocate Chambers', noIndex: true });

  const clients = [
    {
      id: 'c1',
      name: 'Bilal Ahmad Khan',
      city: 'Lahore',
      phone: '03001234567',
      matter: 'Writ Petition: Stay on Illegal Demolition',
      status: 'Active Matter',
    },
    {
      id: 'c2',
      name: 'Kamran Rafiq (Dubai, UAE)',
      city: 'Overseas',
      phone: '03217654321',
      matter: 'Guardian Petition & Child Custody',
      status: 'Active Matter',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Retained Clients Directory</h1>
        <p className="text-xs text-slate-500">Contact records, active retainers, and client matter histories.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients.map((c) => (
          <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">{c.name}</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-200 text-black">
                {c.status}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">{c.matter}</p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-4 text-[11px] text-slate-500">
              <span>{c.city}</span>
              <span>•</span>
              <span>{c.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
