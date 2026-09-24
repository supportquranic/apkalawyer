import { IMatterService } from '../interfaces/matter.service.interface';
import { LegalMatter } from '@/types/matter';
import { MOCK_MATTERS } from '@/data/mock/matters.mock';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockMatterService implements IMatterService {
  async getMatters(userId: string, role: 'client' | 'lawyer' | 'admin'): Promise<LegalMatter[]> {
    await delay(300);
    if (role === 'admin') return MOCK_MATTERS;
    if (role === 'lawyer') return MOCK_MATTERS.filter((m) => m.lawyerId === userId || true);
    return MOCK_MATTERS.filter((m) => m.clientId === userId || true);
  }

  async getMatterById(id: string): Promise<LegalMatter | null> {
    await delay(200);
    return MOCK_MATTERS.find((m) => m.id === id) || null;
  }
}
