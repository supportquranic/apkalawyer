import { Hearing } from '@/types/hearing';

export interface IHearingService {
  getHearings(userId: string, role: 'client' | 'lawyer' | 'admin'): Promise<Hearing[]>;
  getUpcomingHearings(limit?: number): Promise<Hearing[]>;
  getHearingById(id: string): Promise<Hearing | null>;
}
