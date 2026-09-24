import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { documentService } from '@/services';
import { LegalDocumentItem } from '@/types/document';
import { useSEO } from '@/hooks/useSEO';
import { formatBytes } from '@/utils/formatters';
import { LoadingState, EmptyState } from '@/components/feedback';
import { FileText, Download, Lock, Upload } from 'lucide-react';

export const ClientDocumentsPage: React.FC = () => {
  useSEO({ title: 'Document Vault — ApkaLawyer', noIndex: true });
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

  if (isLoading) return <LoadingState message="Accessing encrypted document vault..." />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold mb-1">
            <Lock className="h-3.5 w-3.5" />
            <span>256-bit Privileged Vault</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Case Documents & Evidence Vault</h1>
          <p className="text-xs text-slate-500">Encrypted pleadings, certified stay orders, and registry documents.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-sm"
        >
          <Upload className="h-3.5 w-3.5 text-emerald-400" />
          Upload Case Document
        </button>
      </div>

      {documents.length === 0 ? (
        <EmptyState title="No Documents" description="Your document vault is currently empty." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600">
                    {doc.category.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 leading-snug">{doc.title}</h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{doc.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{formatBytes(doc.fileSize)}</span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold cursor-pointer">
                  <Download className="h-3 w-3" />
                  Download
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
