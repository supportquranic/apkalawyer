import { Lawyer, LawyerFilterOptions, PracticeArea, LawyerReview } from '@/types/lawyer';

export interface ILawyerService {
  getLawyers(filters?: LawyerFilterOptions): Promise<Lawyer[]>;
  getLawyerById(id: string): Promise<Lawyer | null>;
  getFeaturedLawyers(): Promise<Lawyer[]>;
  getPracticeAreas(): Promise<PracticeArea[]>;
  getLawyerReviews(lawyerId: string): Promise<LawyerReview[]>;
}
