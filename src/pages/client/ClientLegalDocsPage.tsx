import React from 'react';
import { MOCK_LEGAL_TEMPLATES } from '@/data/mock/legalDocuments.mock';
import { LegalTemplate } from '@/types/legalDocument';
import { useSEO } from '@/hooks/useSEO';
import { FileSignature, Clock, ShieldAlert } from 'lucide-react';

export const ClientLegalDocsPage: React.FC = () => {
  useSEO({ title: 'Legal Notice & Document Generator — ApkaLawyer', noIndex: true });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Legal Document & Notice Generator</h1>
        <p className="text-xs text-slate-500">
          Generate structured legal drafts conforming to Pakistani statutory frameworks.
        </p>
      </div>

      {/* Mandatory Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs">
        <ShieldAlert className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Preliminary Drafting Notice:</strong> Generated documents are automated baseline drafts. For court filings, official service of legal notices, or high-value contracts, ensure the draft is reviewed and signed by an Advocate of the High Court.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_LEGAL_TEMPLATES.map((tmpl: LegalTemplate) => (
          <div key={tmpl.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-600 uppercase">
                  {tmpl.category}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  ~{tmpl.estimatedTimeMinutes} mins
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{tmpl.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tmpl.description}</p>
              {tmpl.statutoryReference && (
                <p className="text-[11px] font-mono text-emerald-700 mt-2 font-medium">
                  Ref: {tmpl.statutoryReference}
                </p>
              )}
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FileSignature className="h-3.5 w-3.5 text-emerald-400" />
              Start Drafting Wizard
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
