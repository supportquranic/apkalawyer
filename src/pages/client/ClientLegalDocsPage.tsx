import React, { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { 
  FileText, 
  FileSignature, 
  FileCheck2, 
  Building2, 
  Sparkles
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
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="h-4 w-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 4 Tool Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', label: 'All Tools', count: FREE_LEGAL_TOOLS.length },
          { id: 'notice', label: 'Legal Notice', count: 5, icon: FileText },
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
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {displayedTools.map((tool) => (
          <div
            key={tool.id}
            className="rounded-2xl border border-neutral-200 bg-white p-3.5 sm:p-4 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-1.5 mb-3">
              <h3 className="text-xs sm:text-sm font-bold text-black leading-snug">{tool.title}</h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed line-clamp-3">{tool.description}</p>
            </div>

            <div className="space-y-2.5 pt-2.5 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => openToolWizard(tool.id)}
                className="w-full glass-btn py-2.5 text-xs font-semibold text-black gap-2 justify-center"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Create Free Draft
              </button>

              <button
                type="button"
                onClick={() => navigate(ROUTES.PUBLIC.LAWYERS)}
                className="w-full text-center text-[11px] text-neutral-500 font-semibold hover:text-black transition-colors whitespace-nowrap"
              >
                Find a Lawyer →
              </button>
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
