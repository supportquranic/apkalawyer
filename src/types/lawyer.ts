import { User } from './user';
import { BarCouncil, CourtLevel } from './common';

export interface PracticeArea {
  id: string;
  slug: string;
  name: string;
  urduName?: string;
  description: string;
  iconName: string;
  popularMatters: string[];
}

export interface LawyerAvailability {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  slotDurationMinutes: number;
}

export interface LawyerReview {
  id: string;
  lawyerId: string;
  clientName: string;
  rating: number; // 1-5
  comment: string;
  practiceArea: string;
  createdAt: string;
  isVerifiedClient: boolean;
}

export interface Lawyer extends User {
  role: 'lawyer';
  barCouncil: BarCouncil;
  barLicenseNumber: string;
  courtEnrollment: CourtLevel;
  enrollmentYear: number;
  experienceYears: number;
  officeAddress: string;
  bio: string;
  aboutUrdu?: string;
  practiceAreas: string[];
  languages: string[];
  consultationFee: number; // In PKR
  retainerStartingFee?: number;
  rating: number;
  reviewCount: number;
  isVerifiedByAdmin: boolean;
  featured: boolean;
  education: string[];
  casesHandledCount: number;
  availabilitySchedule?: LawyerAvailability[];
}

export interface LawyerFilterOptions {
  practiceArea?: string;
  city?: string;
  courtEnrollment?: string;
  minExperience?: number;
  maxFee?: number;
  searchQuery?: string;
  verifiedOnly?: boolean;
}
