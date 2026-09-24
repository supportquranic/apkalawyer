export type ConsultationMode = 'video' | 'phone' | 'in_person' | 'written_opinion';
export type BookingStatus = 'pending' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  bookingRef: string; // e.g., "BK-2026-9182"
  lawyerId: string;
  lawyerName: string;
  lawyerAvatar?: string;
  lawyerTitle?: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  practiceArea: string;
  date: string; // "YYYY-MM-DD"
  timeSlot: string; // "11:00 AM - 11:45 AM"
  mode: ConsultationMode;
  fee: number;
  status: BookingStatus;
  meetingLink?: string;
  officeAddress?: string;
  clientNotes?: string;
  attachmentUrls?: string[];
  createdAt: string;
}

export interface CreateBookingPayload {
  lawyerId: string;
  practiceArea: string;
  date: string;
  timeSlot: string;
  mode: ConsultationMode;
  clientNotes: string;
}
