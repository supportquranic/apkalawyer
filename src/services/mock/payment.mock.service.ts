import { IPaymentService } from '../interfaces/payment.service.interface';
import { PaymentInvoice } from '@/types/payment';
import { MOCK_PAYMENTS } from '@/data/mock/payments.mock';

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockPaymentService implements IPaymentService {
  async getInvoices(_userId: string, _role: 'client' | 'lawyer' | 'admin'): Promise<PaymentInvoice[]> {
    await delay(250);
    return MOCK_PAYMENTS;
  }

  async getInvoiceById(id: string): Promise<PaymentInvoice | null> {
    await delay(150);
    return MOCK_PAYMENTS.find((p) => p.id === id) || null;
  }
}
