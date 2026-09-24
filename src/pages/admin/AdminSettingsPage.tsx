import React from 'react';
import { useSEO } from '@/hooks/useSEO';

export const AdminSettingsPage: React.FC = () => {
  useSEO({ title: 'Platform Settings — Admin', noIndex: true });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Platform Global Settings</h1>
        <p className="text-xs text-slate-500">Practice area taxonomies, fee minimums, and system configurations.</p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 bg-white text-xs text-slate-600">
        Platform operational settings and court jurisdiction configurations are managed here.
      </div>
    </div>
  );
};
