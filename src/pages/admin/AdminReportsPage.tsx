import React from 'react';
import { useSEO } from '@/hooks/useSEO';

export const AdminReportsPage: React.FC = () => {
  useSEO({ title: 'Safety & Reports — Admin', noIndex: true });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Trust, Safety & Audit Logs</h1>
        <p className="text-xs text-slate-500">Security event logs, abuse reports, and compliance auditing.</p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 bg-white text-xs text-slate-600">
        All sensitive system operations and verification status changes are immutably logged for audit readiness.
      </div>
    </div>
  );
};
