export type MatterStatus = 'intake' | 'drafting' | 'filed' | 'in_court' | 'stay_granted' | 'arguments' | 'decree_passed' | 'settled' | 'closed';

export interface MatterMilestone {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dateCompleted?: string;
  dueDate?: string;
}

export interface LegalMatter {
  id: string;
  matterNumber: string; // e.g. "MAT-2026-0842"
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  lawyerId: string;
  lawyerName: string;
  practiceArea: string;
  courtName?: string;
  benchRoom?: string;
  caseNumber?: string;
  judgeName?: string;
  opposingParty?: string;
  opposingCounsel?: string;
  status: MatterStatus;
  progressPercentage: number;
  totalFee: number;
  paidAmount: number;
  openedAt: string;
  updatedAt: string;
  milestones: MatterMilestone[];
}
