import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { documentService } from '@/services';
import { LegalDocumentItem } from '@/types/document';
import { useSEO } from '@/hooks/useSEO';
import { formatBytes } from '@/utils/formatters';
import { LoadingState } from '@/components/feedback';
import { Download, Upload } from 'lucide-react';

export const LawyerDocumentsPage: React.FC = () => {
  useSEO({ title: 'Case Filings & Documents — Advocate Chambers', noIndex: true });
  const { user } = useAuth();
  const [documents, setDocuments] = useState<LegalDocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    documentService.getDocuments(user.id).then((data) => {
      setDocuments(data);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading case pleadings..." />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Case Documents & Vakalatnama Files</h1>
          <p className="text-xs text-slate-500">Draft pleadings, signed affidavits, stay orders, and client registry copies.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-sm"
        >
          <Upload className="h-3.5 w-3.5 text-emerald-400" />
          Upload Court Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600">
                  {doc.category.replace('_', ' ')}
                </span>
                <span className="text-[10px] text-slate-400">{formatBytes(doc.fileSize)}</span>
              </div>
              <h3 className="text-xs font-bold text-slate-900 leading-snug">{doc.title}</h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{doc.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[10px]">{doc.matterNumber || 'General'}</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                <Download className="h-3 w-3" />
                Download PDF
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
