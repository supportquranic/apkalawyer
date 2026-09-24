import React from 'react';
import { useSEO } from '@/hooks/useSEO';

export const AdminMattersPage: React.FC = () => {
  useSEO({ title: 'Platform Legal Matters — Admin', noIndex: true });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Platform-wide Legal Matters</h1>
        <p className="text-xs text-slate-500">Case milestone progress and litigation dispute health checks.</p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 bg-white text-xs text-slate-600">
        Platform litigation matters and stay orders are tracked for SLA compliance.
      </div>
    </div>
  );
};
