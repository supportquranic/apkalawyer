export type UserRole = 'client' | 'lawyer' | 'admin';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
  description?: string;
}

export type CourtLevel = 
  | 'Subordinate / District Courts'
  | 'High Court'
  | 'Supreme Court of Pakistan'
  | 'Specialized Tribunals / FBR / Banking';

export type BarCouncil = 
  | 'Punjab Bar Council'
  | 'Sindh Bar Council'
  | 'Islamabad Bar Council'
  | 'Khyber Pakhtunkhwa Bar Council'
  | 'Balochistan Bar Council';
