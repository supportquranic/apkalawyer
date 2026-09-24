import { PaymentInvoice } from '@/types/payment';

export interface IPaymentService {
  getInvoices(userId: string, role: 'client' | 'lawyer' | 'admin'): Promise<PaymentInvoice[]>;
  getInvoiceById(id: string): Promise<PaymentInvoice | null>;
}
