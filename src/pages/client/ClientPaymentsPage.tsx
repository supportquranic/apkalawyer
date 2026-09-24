import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { paymentService } from '@/services';
import { PaymentInvoice } from '@/types/payment';
import { useSEO } from '@/hooks/useSEO';
import { formatPKR } from '@/utils/formatters';
import { formatDate } from '@/utils/date';
import { LoadingState } from '@/components/feedback';
import { CheckCircle2 } from 'lucide-react';

export const ClientPaymentsPage: React.FC = () => {
  useSEO({ title: 'Payments & Retainer Invoices — ApkaLawyer', noIndex: true });
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<PaymentInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    paymentService.getInvoices(user.id, 'client').then((data) => {
      setInvoices(data);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading payment ledger & invoices..." />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Payments & Retainer Ledger</h1>
        <p className="text-xs text-slate-500">Itemized invoices, consultation receipts, and escrow status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {invoices.map((inv) => (
          <div key={inv.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 block">{inv.invoiceNumber}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">{inv.description}</h3>
                <p className="text-xs text-slate-500">{inv.lawyerName}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                inv.status === 'paid' ? 'bg-neutral-200 text-black' : 'bg-amber-100 text-amber-800'
              }`}>
                {inv.status}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">Total Amount</span>
              <span className="text-base font-bold text-slate-900">{formatPKR(inv.totalAmount)}</span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span>Due: {formatDate(inv.dueDate)}</span>
              {inv.status === 'paid' ? (
                <span className="text-black font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Paid on {formatDate(inv.paidAt!)}
                </span>
              ) : (
                <button
                  type="button"
                  className="rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-black"
                >
                  Pay via 1LINK / Card
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
