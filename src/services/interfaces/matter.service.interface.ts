import { LegalMatter } from '@/types/matter';

export interface IMatterService {
  getMatters(userId: string, role: 'client' | 'lawyer' | 'admin'): Promise<LegalMatter[]>;
  getMatterById(id: string): Promise<LegalMatter | null>;
}
