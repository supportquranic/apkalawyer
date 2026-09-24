import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { paymentService } from '@/services';
import { PaymentInvoice } from '@/types/payment';
import { useSEO } from '@/hooks/useSEO';
import { formatPKR } from '@/utils/formatters';
import { LoadingState } from '@/components/feedback';

export const LawyerEarningsPage: React.FC = () => {
  useSEO({ title: 'Fee Collections & Retainers — Advocate Chambers', noIndex: true });
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<PaymentInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    paymentService.getInvoices(user.id, 'lawyer').then((data) => {
      setInvoices(data);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading fee settlements..." />;

  const totalPaid = invoices
    .filter((i) => i.status === 'paid')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Fee Collections & Settlements</h1>
          <p className="text-xs text-slate-500">Retainer milestones, direct bank deposits, and escrow clearances.</p>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Cleared Balance</span>
          <span className="text-xl font-bold text-emerald-600">{formatPKR(totalPaid)}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
            <tr>
              <th className="p-4">Invoice Ref</th>
              <th className="p-4">Client</th>
              <th className="p-4">Description</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/50">
                <td className="p-4 font-mono font-bold text-slate-600">{inv.invoiceNumber}</td>
                <td className="p-4 font-semibold text-slate-900">{inv.clientName}</td>
                <td className="p-4 text-slate-600">{inv.description}</td>
                <td className="p-4 font-bold text-slate-900">{formatPKR(inv.totalAmount)}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                    {inv.status}
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
