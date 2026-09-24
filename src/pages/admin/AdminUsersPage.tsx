import React from 'react';
import { useSEO } from '@/hooks/useSEO';

export const AdminUsersPage: React.FC = () => {
  useSEO({ title: 'User Moderation — Admin', noIndex: true });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Registered Users & Clients</h1>
        <p className="text-xs text-slate-500">Monitor client accounts, identity verification, and security status.</p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 bg-white text-xs text-slate-600">
        Active client accounts are monitored for platform trust and safety compliance.
      </div>
    </div>
  );
};
