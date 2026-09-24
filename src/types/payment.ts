export type PaymentStatus = 'pending' | 'in_escrow' | 'paid' | 'released' | 'refunded' | 'failed';
export type PaymentType = 'consultation' | 'retainer' | 'court_fee' | 'document_drafting';

export interface PaymentInvoice {
  id: string;
  invoiceNumber: string; // e.g. "INV-2026-0391"
  matterId?: string;
  matterNumber?: string;
  bookingId?: string;
  clientId: string;
  clientName: string;
  lawyerId: string;
  lawyerName: string;
  type: PaymentType;
  description: string;
  amount: number; // PKR
  taxAmount: number;
  totalAmount: number;
  status: PaymentStatus;
  paymentMethod?: 'bank_transfer' | 'card' | '1link' | 'easypaisa' | 'jazzcash';
  dueDate: string;
  paidAt?: string;
  receiptUrl?: string;
}
