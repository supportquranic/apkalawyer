import { User } from './user';

export interface Client extends User {
  role: 'client';
  preferredLanguage: string;
  activeMattersCount: number;
  totalConsultationsCount: number;
  isOverseasPakistani?: boolean;
  residenceCountry?: string;
}
