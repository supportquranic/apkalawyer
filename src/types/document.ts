export type DocumentCategory = 
  | 'pleading' 
  | 'court_order' 
  | 'power_of_attorney' 
  | 'evidence' 
  | 'identity_proof' 
  | 'legal_notice' 
  | 'contract' 
  | 'general';

export interface LegalDocumentItem {
  id: string;
  matterId?: string;
  matterNumber?: string;
  uploaderId: string;
  uploaderName: string;
  uploaderRole: 'client' | 'lawyer' | 'admin';
  title: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number; // in bytes
  fileType: string;
  category: DocumentCategory;
  isPrivileged: boolean;
  uploadedAt: string;
}
