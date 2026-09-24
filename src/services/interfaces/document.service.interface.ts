import { LegalDocumentItem } from '@/types/document';

export interface IDocumentService {
  getDocuments(userId: string, matterId?: string): Promise<LegalDocumentItem[]>;
  getDocumentById(id: string): Promise<LegalDocumentItem | null>;
}
