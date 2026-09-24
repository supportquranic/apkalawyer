import React, { useState } from 'react';
import { MOCK_LEGAL_TEMPLATES } from '@/data/mock/legalDocuments.mock';
import { LegalTemplate } from '@/types/legalDocument';
import { useSEO } from '@/hooks/useSEO';
import { FileSignature, Clock, ShieldAlert, Sparkles, Gavel, CheckCircle2 } from 'lucide-react';
import { LegalNoticeWizard } from '@/components/legalNotice/LegalNoticeWizard';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

export const ClientLegalDocsPage: React.FC = () => {
  useSEO({ title: 'Legal Notice & Document Drafter — ApkaLawyer', noIndex: true });
  const navigate = useNavigate();

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="h-4 w-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Title & Launch Banner */}
      <div className="bg-white border border-neutral-200 p-5 rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-black tracking-tight">Legal Notice & Document Generator</h1>
            <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded font-bold uppercase">
              Pakistani Statutory Format
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Draft statutory legal notices for Cheque Dishonour (489-F), Property Eviction, Contract Recovery & Family disputes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsWizardOpen(true)}
          className="glass-btn gap-2 px-5 py-2.5 text-xs font-bold text-black whitespace-nowrap"
        >
          <Gavel className="h-4 w-4" />
          <span>Launch Notice Drafter</span>
        </button>
      </div>

      {/* Statutory Disclaimer */}
      <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-neutral-800 flex items-start gap-3 text-xs">
        <ShieldAlert className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
        <div>
          <strong>Preliminary Drafting Notice:</strong> Generated documents conform to Pakistan legal statutes. You can publish your draft to the public feed for Advocate verification or send it directly to a High Court Advocate via DM for signature.
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_LEGAL_TEMPLATES.map((tmpl: LegalTemplate) => (
          <div key={tmpl.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs hover:border-neutral-300 transition-all space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-700 uppercase border border-neutral-200">
                  {tmpl.category}
                </span>
                <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  ~{tmpl.estimatedTimeMinutes} mins
                </span>
              </div>
              <h3 className="text-sm font-bold text-black">{tmpl.title}</h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{tmpl.description}</p>
              {tmpl.statutoryReference && (
                <p className="text-[11px] font-mono text-black mt-2 font-semibold">
                  Statute: {tmpl.statutoryReference}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsWizardOpen(true)}
              className="w-full glass-btn py-2.5 text-xs font-bold text-black gap-2 justify-center"
            >
              <FileSignature className="h-3.5 w-3.5 text-black" />
              <span>Start Drafting Wizard</span>
            </button>
          </div>
        ))}
      </div>

      {/* Wizard Modal */}
      <LegalNoticeWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSuccessPost={() => {
          showToast('Legal notice draft published to feed for Advocate review!');
          setTimeout(() => navigate(ROUTES.CLIENT.CONSULTATIONS), 1200);
        }}
        onSuccessSendDirect={(lawyerName) => {
          showToast(`Legal notice draft sent directly to ${lawyerName} via DM!`);
          setTimeout(() => navigate(ROUTES.CLIENT.MESSAGES), 1200);
        }}
      />
    </div>
  );
};
