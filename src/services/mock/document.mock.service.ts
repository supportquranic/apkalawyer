import { IDocumentService } from '../interfaces/document.service.interface';
import { LegalDocumentItem } from '@/types/document';
import { MOCK_DOCUMENTS } from '@/data/mock/documents.mock';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockDocumentService implements IDocumentService {
  async getDocuments(_userId: string, matterId?: string): Promise<LegalDocumentItem[]> {
    await delay(250);
    if (matterId) {
      return MOCK_DOCUMENTS.filter((d) => d.matterId === matterId);
    }
    return MOCK_DOCUMENTS;
  }

  async getDocumentById(id: string): Promise<LegalDocumentItem | null> {
    await delay(150);
    return MOCK_DOCUMENTS.find((d) => d.id === id) || null;
  }
}
