export type LegalTemplateType = 
  | 'legal_notice_defamation'
  | 'legal_notice_recovery'
  | 'legal_notice_cheque_dishonour'
  | 'nda_bilateral'
  | 'tenancy_residential'
  | 'employment_agreement'
  | 'power_of_attorney_special'
  | 'freelance_contract';

export interface LegalTemplate {
  id: string;
  type: LegalTemplateType;
  title: string;
  category: 'Notices' | 'Agreements' | 'Corporate' | 'Property';
  description: string;
  statutoryReference?: string; // e.g. "Section 489-F PPC / Defamation Ordinance 2002"
  fieldsCount: number;
  estimatedTimeMinutes: number;
  popular: boolean;
}

export interface GeneratedLegalDocument {
  id: string;
  templateId: string;
  templateTitle: string;
  userId: string;
  title: string;
  status: 'draft' | 'ready_for_review' | 'lawyer_reviewed' | 'finalized';
  formData: Record<string, string | number | boolean>;
  renderedContent: string;
  createdAt: string;
  updatedAt: string;
}
