import { IHearingService } from '../interfaces/hearing.service.interface';
import { Hearing } from '@/types/hearing';
import { MOCK_HEARINGS } from '@/data/mock/hearings.mock';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockHearingService implements IHearingService {
  async getHearings(_userId: string, _role: 'client' | 'lawyer' | 'admin'): Promise<Hearing[]> {
    await delay(250);
    return MOCK_HEARINGS;
  }

  async getUpcomingHearings(limit = 5): Promise<Hearing[]> {
    await delay(200);
    return MOCK_HEARINGS.filter((h) => h.status === 'scheduled').slice(0, limit);
  }

  async getHearingById(id: string): Promise<Hearing | null> {
    await delay(150);
    return MOCK_HEARINGS.find((h) => h.id === id) || null;
  }
}
