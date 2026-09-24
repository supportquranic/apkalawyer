import { Booking, CreateBookingPayload } from '@/types/booking';

export interface IBookingService {
  getBookings(role: 'client' | 'lawyer' | 'admin', userId: string): Promise<Booking[]>;
  getBookingById(id: string): Promise<Booking | null>;
  createBooking(payload: CreateBookingPayload, clientUserId: string): Promise<Booking>;
  cancelBooking(id: string, reason?: string): Promise<Booking>;
}
