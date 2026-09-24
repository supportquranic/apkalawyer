export type HearingStatus = 'scheduled' | 'adjourned' | 'concluded' | 'order_reserved' | 'stay_extended';

export interface Hearing {
  id: string;
  matterId: string;
  matterNumber: string;
  matterTitle: string;
  caseNumber: string;
  courtName: string;
  benchRoom: string;
  judgeName: string;
  hearingDate: string; // ISO string "YYYY-MM-DD"
  hearingTime: string; // "09:30 AM"
  purpose: string; // e.g. "Framing of Issues", "Cross-Examination of PW-1", "Stay Application Arguments"
  status: HearingStatus;
  lawyerNotes?: string;
  orderSummary?: string;
  nextHearingDate?: string;
  nextHearingPurpose?: string;
  causeListNumber?: number;
}
