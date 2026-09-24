import React, { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { 
  FileText, 
  FileSignature, 
  FileCheck2, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Gavel
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FreeLegalToolsWizard, FREE_LEGAL_TOOLS, LegalToolCategory } from '@/components/legalTools/FreeLegalToolsWizard';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

export const ClientLegalDocsPage: React.FC = () => {
  useSEO({ title: 'Free Legal Tools: Create. Understand. Prepare. — ApkaLawyer', noIndex: true });
  const navigate = useNavigate();

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<LegalToolCategory | 'all'>('all');
  const [selectedToolId, setSelectedToolId] = useState('notice_cheque_489f');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const openToolWizard = (toolId: string) => {
    setSelectedToolId(toolId);
    setIsWizardOpen(true);
  };

  const displayedTools = activeCategoryFilter === 'all'
    ? FREE_LEGAL_TOOLS
    : FREE_LEGAL_TOOLS.filter((t) => t.category === activeCategoryFilter);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="h-4 w-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Hero Header */}
      <div className="bg-white border border-neutral-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                ApkaLawyer Tools
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                100% FREE BASIC DRAFT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              Free Legal Tools
            </h1>
            <p className="text-sm font-semibold text-neutral-600">
              Create. Understand. Prepare.
            </p>
            <p className="text-xs text-neutral-500 max-w-xl leading-relaxed">
              Generate structured statutory legal drafts for Pakistani High Courts & District Courts. Get your baseline draft free, then opt for High Court Advocate verification or court representation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openToolWizard('notice_cheque_489f')}
            className="glass-btn gap-2 px-6 py-3 text-xs font-bold text-black whitespace-nowrap shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-black" />
            <span>Launch Legal Drafter</span>
          </button>
        </div>

        {/* Funnel Pathway Indicator */}
        <div className="pt-4 border-t border-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] font-semibold text-neutral-600">
          <div className="p-2 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="text-black font-bold">1. Free Tool</span>
            <p className="text-[10px] text-neutral-400">Generate Basic Draft</p>
          </div>
          <div className="p-2 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="text-black font-bold">2. User Gets Value</span>
            <p className="text-[10px] text-neutral-400">Copy / Download Text</p>
          </div>
          <div className="p-2 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="text-black font-bold">3. Advocate Review</span>
            <p className="text-[10px] text-neutral-400">Optional Verification</p>
          </div>
          <div className="p-2 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="text-black font-bold">4. Court Service</span>
            <p className="text-[10px] text-neutral-400">Connect with Advocate</p>
          </div>
        </div>
      </div>

      {/* 4 Tool Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', label: 'All Tools', count: FREE_LEGAL_TOOLS.length },
          { id: 'notice', label: 'Legal Notice', count: 4, icon: FileText },
          { id: 'application', label: 'Application / Complaint', count: 3, icon: FileSignature },
          { id: 'affidavit', label: 'Affidavit / Declaration', count: 3, icon: FileCheck2 },
          { id: 'agreement', label: 'Agreement / Contract', count: 3, icon: Building2 },
        ].map((tab) => {
          const isActive = activeCategoryFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategoryFilter(tab.id as any)}
              className={cn(
                'whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0',
                isActive
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-300'
              )}
            >
              <span>{tab.label}</span>
              <span className={cn('text-[10px] px-1.5 py-0.2 rounded-full', isActive ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-500')}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedTools.map((tool) => (
          <div
            key={tool.id}
            className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs hover:border-neutral-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-700 uppercase border border-neutral-200">
                  {tool.categoryLabel}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  FREE DRAFT
                </span>
              </div>

              <h3 className="text-sm font-bold text-black leading-snug">{tool.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{tool.description}</p>
              
              <div className="pt-1">
                <p className="text-[11px] font-mono text-black font-semibold bg-neutral-50 p-2 rounded-xl border border-neutral-100 flex items-center gap-1.5">
                  <Gavel className="h-3.5 w-3.5 text-black flex-shrink-0" />
                  <span className="truncate">Statute: {tool.statute}</span>
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => openToolWizard(tool.id)}
                className="w-full glass-btn py-2.5 text-xs font-bold text-black gap-2 justify-center"
              >
                <Sparkles className="h-3.5 w-3.5 text-black" />
                <span>Create Free Basic Draft</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1 pt-0.5">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-neutral-400" />
                  <span>Optional Advocate Review</span>
                </span>
                <span className="text-neutral-400">•</span>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.PUBLIC.LAWYERS)}
                  className="text-black font-semibold hover:underline"
                >
                  Find a Lawyer →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Free Legal Tools Wizard Modal */}
      <FreeLegalToolsWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        initialToolId={selectedToolId}
        initialCategory={
          FREE_LEGAL_TOOLS.find((t) => t.id === selectedToolId)?.category || 'notice'
        }
        onSuccessPost={() => {
          showToast('Draft published to feed for Advocate review!');
          setTimeout(() => navigate(ROUTES.CLIENT.CONSULTATIONS), 1200);
        }}
        onSuccessSendDirect={(lawyerName) => {
          showToast(`Draft sent directly to ${lawyerName} via DM for review!`);
          setTimeout(() => navigate(ROUTES.CLIENT.MESSAGES), 1200);
        }}
      />
    </div>
  );
};
