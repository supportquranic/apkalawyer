import { Booking, ConsultationMode, BookingStatus } from './booking';

export interface Consultation extends Booking {
  advocateNotes?: string;
  prescriptionOpinion?: string;
  recommendedAction?: 'matter_filing' | 'notice_serving' | 'settlement' | 'no_action_needed';
  followUpRequired?: boolean;
}

export { type ConsultationMode, type BookingStatus };
