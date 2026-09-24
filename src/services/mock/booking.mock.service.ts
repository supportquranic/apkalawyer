import { IBookingService } from '../interfaces/booking.service.interface';
import { Booking, CreateBookingPayload } from '@/types/booking';
import { MOCK_BOOKINGS } from '@/data/mock/bookings.mock';
import { MOCK_LAWYERS } from '@/data/mock/lawyers.mock';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockBookingService implements IBookingService {
  private bookings: Booking[] = [...MOCK_BOOKINGS];

  async getBookings(role: 'client' | 'lawyer' | 'admin', userId: string): Promise<Booking[]> {
    await delay(250);
    if (role === 'admin') return this.bookings;
    if (role === 'lawyer') return this.bookings.filter((b) => b.lawyerId === userId);
    return this.bookings.filter((b) => b.clientId === userId);
  }

  async getBookingById(id: string): Promise<Booking | null> {
    await delay(200);
    return this.bookings.find((b) => b.id === id) || null;
  }

  async createBooking(payload: CreateBookingPayload, clientUserId: string): Promise<Booking> {
    await delay(400);
    const lawyer = MOCK_LAWYERS.find((l) => l.id === payload.lawyerId);
    
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingRef: `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      lawyerId: payload.lawyerId,
      lawyerName: lawyer?.name || 'Advocate',
      lawyerAvatar: lawyer?.avatarUrl,
      lawyerTitle: lawyer?.courtEnrollment,
      clientId: clientUserId,
      clientName: 'Client User',
      clientPhone: '03001234567',
      practiceArea: payload.practiceArea,
      date: payload.date,
      timeSlot: payload.timeSlot,
      mode: payload.mode,
      fee: lawyer?.consultationFee || 5000,
      status: 'pending',
      clientNotes: payload.clientNotes,
      createdAt: new Date().toISOString(),
    };

    this.bookings.unshift(newBooking);
    return newBooking;
  }

  async cancelBooking(id: string, reason?: string): Promise<Booking> {
    await delay(300);
    const booking = this.bookings.find((b) => b.id === id);
    if (!booking) throw new Error('Booking not found');
    booking.status = 'cancelled';
    if (reason) booking.clientNotes = `${booking.clientNotes || ''} [Cancelled: ${reason}]`;
    return booking;
  }
}
