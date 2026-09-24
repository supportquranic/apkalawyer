import React from 'react';
import { useSEO } from '@/hooks/useSEO';

export const AdminPaymentsPage: React.FC = () => {
  useSEO({ title: 'Escrow & Payouts — Admin', noIndex: true });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Escrow & Payout Clearances</h1>
        <p className="text-xs text-slate-500">1LINK, bank transfers, and retainer tranche settlements.</p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 bg-white text-xs text-slate-600">
        Escrow funds are held securely until milestone confirmation between client and advocate.
      </div>
    </div>
  );
};
