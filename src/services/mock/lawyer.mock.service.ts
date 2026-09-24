import { ILawyerService } from '../interfaces/lawyer.service.interface';
import { Lawyer, LawyerFilterOptions, PracticeArea, LawyerReview } from '@/types/lawyer';
import { MOCK_LAWYERS } from '@/data/mock/lawyers.mock';
import { PRACTICE_AREAS_DATA } from '@/data/constants/practiceAreas';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockLawyerService implements ILawyerService {
  async getLawyers(filters?: LawyerFilterOptions): Promise<Lawyer[]> {
    await delay(300);
    let results = [...MOCK_LAWYERS];

    if (!filters) return results;

    if (filters.city) {
      results = results.filter((l) => l.city.toLowerCase() === filters.city?.toLowerCase());
    }

    if (filters.practiceArea) {
      results = results.filter((l) =>
        l.practiceAreas.some((p) => p.toLowerCase().includes(filters.practiceArea!.toLowerCase()))
      );
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      results = results.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q) ||
          l.bio.toLowerCase().includes(q) ||
          l.practiceAreas.some((p) => p.toLowerCase().includes(q))
      );
    }

    if (filters.maxFee) {
      results = results.filter((l) => l.consultationFee <= filters.maxFee!);
    }

    if (filters.verifiedOnly) {
      results = results.filter((l) => l.isVerifiedByAdmin);
    }

    return results;
  }

  async getLawyerById(id: string): Promise<Lawyer | null> {
    await delay(200);
    return MOCK_LAWYERS.find((l) => l.id === id) || null;
  }

  async getFeaturedLawyers(): Promise<Lawyer[]> {
    await delay(200);
    return MOCK_LAWYERS.filter((l) => l.featured);
  }

  async getPracticeAreas(): Promise<PracticeArea[]> {
    await delay(150);
    return PRACTICE_AREAS_DATA;
  }

  async getLawyerReviews(lawyerId: string): Promise<LawyerReview[]> {
    await delay(200);
    return [
      {
        id: 'rev-01',
        lawyerId,
        clientName: 'M. Kashif (CEO, Retail Logistics)',
        rating: 5,
        comment: 'Exceptional legal knowledge regarding high court writ procedures. Advocate Malik secured an interim stay order on the very first urgent motion hearing.',
        practiceArea: 'Property & Real Estate',
        createdAt: '2026-08-10T12:00:00Z',
        isVerifiedClient: true,
      },
      {
        id: 'rev-02',
        lawyerId,
        clientName: 'Saima Jamil (Overseas Client - UK)',
        rating: 5,
        comment: 'Very professional communication via video call and transparent fee structure. Highly recommended for overseas Pakistanis.',
        practiceArea: 'Family & Matrimonial Law',
        createdAt: '2026-07-28T14:30:00Z',
        isVerifiedClient: true,
      },
    ];
  }
}
