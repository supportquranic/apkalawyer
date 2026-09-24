export interface LegalAdvice {
  id: string;
  lawyerId: string;
  lawyerName: string;
  lawyerAvatar: string;
  lawyerTitle: string;
  experienceYears: number;
  city: string;
  isVerified: boolean;
  content: string;
  urduContent?: string;
  createdAt: string;
  upvotes: number;
}

export interface RepresentationOffer {
  id: string;
  lawyerId: string;
  lawyerName: string;
  lawyerAvatar: string;
  lawyerTitle: string;
  city: string;
  experienceYears: number;
  feeQuotePKR?: number;
  message: string;
  createdAt: string;
}

export interface LegalThread {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorCity: string;
  isAnonymous?: boolean;
  category: string;
  title: string;
  content: string;
  urduContent?: string;
  images?: string[]; // strictly max 2 images
  createdAt: string;
  helpfulCount: number;
  hasUserLiked?: boolean;
  advices: LegalAdvice[];
  offers: RepresentationOffer[];
  status: 'open' | 'under_review' | 'resolved';

  // Legal Notice Draft Review & Approval extensions
  isLegalNoticeDraft?: boolean;
  noticeDetails?: {
    noticeType: string;
    senderName: string;
    recipientName: string;
    demandAmount?: string;
    noticePeriodDays?: number;
    rawDraftText: string;
  };
  approvalStatus?: 'pending' | 'approved';
  approvedByLawyerName?: string;
  approvedByLawyerTitle?: string;
  approvedAt?: string;
  approvalNote?: string;
}
