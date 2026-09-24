import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Users, 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  Gavel
} from 'lucide-react';
import { ThemedDropdown } from '@/components/ui/ThemedDropdown';
import { lawyerService, threadService, messageService } from '@/services';
import { Lawyer } from '@/types/lawyer';

interface LegalNoticeWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessPost?: () => void;
  onSuccessSendDirect?: (lawyerName: string) => void;
}

const NOTICE_TYPES = [
  {
    id: 'cheque_489f',
    label: 'Cheque Dishonour (Section 489-F PPC & Sec 138 NIA)',
    statute: 'Section 489-F Pakistan Penal Code 1860 & Negotiable Instruments Act 1881',
  },
  {
    id: 'contract_recovery',
    label: 'Breach of Contract & Money Recovery',
    statute: 'Contract Act 1872 & Code of Civil Procedure (Order 37)',
  },
  {
    id: 'property_eviction',
    label: 'Property Rent Default & Eviction Notice',
    statute: 'Punjab / Sindh Rented Premises Act 2009',
  },
  {
    id: 'family_maintenance',
    label: 'Family Maintenance & Haq Mehr / Dower Demand',
    statute: 'Muslim Family Laws Ordinance 1961 & Family Courts Act 1964',
  },
  {
    id: 'defamation_peca',
    label: 'Defamation & Cybercrime Cease & Desist',
    statute: 'Defamation Ordinance 2002 & PECA 2016',
  },
  {
    id: 'general_notice',
    label: 'General Legal Notice / Custom Dispute',
    statute: 'Laws of Pakistan & Civil Procedure Code 1908',
  }
];

export const LegalNoticeWizard: React.FC<LegalNoticeWizardProps> = ({
  isOpen,
  onClose,
  onSuccessPost,
  onSuccessSendDirect
}) => {
  const [step, setStep] = useState<'form' | 'preview' | 'send_direct'>('form');

  // Form states
  const [noticeType, setNoticeType] = useState('cheque_489f');
  const [senderName, setSenderName] = useState('Muhammad Bilal Khan');
  const [senderCity] = useState('Lahore, Pakistan');
  const [recipientName, setRecipientName] = useState('Sheikh Tariq Mahmood');
  const [recipientAddress, setRecipientAddress] = useState('Gulberg III, Lahore');
  const [demandAmount, setDemandAmount] = useState('1500000');
  const [chequeOrContractNo, setChequeOrContractNo] = useState('CHK-8849201 / HBL Bank');
  const [matterSummary, setMatterSummary] = useState(
    'Failure to pay outstanding amount for business transaction despite repeated reminders.'
  );
  const [noticeDays, setNoticeDays] = useState('14');

  // Generated Text State
  const [generatedNoticeText, setGeneratedNoticeText] = useState('');
  const [copied, setCopied] = useState(false);

  // Direct Lawyer Selection State
  const [lawyersList, setLawyersList] = useState<Lawyer[]>([]);
  const [selectedLawyerId, setSelectedLawyerId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentNoticeConfig = NOTICE_TYPES.find((n) => n.id === noticeType) || NOTICE_TYPES[0];

  const handleGenerateNotice = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedNotice = `LEGAL NOTICE UNDER ${currentNoticeConfig.statute.toUpperCase()}

BY REGISTERED POST A.D. / URGENT COURIER SERVICE

TO (RECIPIENT):
${recipientName.toUpperCase()}
${recipientAddress}

FROM (SENDER):
${senderName.toUpperCase()}
${senderCity}

SUBJECT: FORMAL LEGAL DEMAND NOTICE REGARDING ${currentNoticeConfig.label.toUpperCase()} AMOUNTING TO PKR ${Number(demandAmount || 0).toLocaleString()}

Sir / Madam,

Under instructions from and on behalf of my client, ${senderName}, resident of ${senderCity}, I hereby issue you this formal Legal Notice as under:

1. That my client entered into a lawful agreement/transaction with you regarding:
   "${matterSummary.trim()}"

2. Reference Particulars / Instrument No:
   ${chequeOrContractNo.trim() || 'Official Written Contract & Correspondence'}

3. That in discharge of your lawful debt and liability towards my client, a financial obligation of PKR ${Number(demandAmount || 0).toLocaleString()} was established. However, you defaulted on payment and committed statutory violation under ${currentNoticeConfig.statute}.

4. That your acts constitute a severe legal breach, causing financial distress, mental agony, and legal injury to my client.

STATUTORY DEMAND & ${noticeDays}-DAY NOTICE:
You are hereby formally called upon and directed to pay/clear the full amount of PKR ${Number(demandAmount || 0).toLocaleString()} to my client within a period of ${noticeDays} (${noticeDays}) DAYS from the receipt of this legal notice.

TAKE NOTICE that if you fail to comply with the demands contained herein within the stipulated ${noticeDays} days, my client will initiate civil recovery proceedings and/or criminal prosecution under the jurisdiction of the competent Courts at your sole risk, cost, and legal consequences.

Dated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Issued by: ${senderName} (Draft subject to Advocate Verification)
Location: ${senderCity}`;

    setGeneratedNoticeText(formattedNotice);
    setStep('preview');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedNoticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Option A: Post to feed for lawyer verification
  const handlePostToFeedForVerification = async () => {
    setIsSubmitting(true);
    await threadService.createLegalNoticeThread({
      authorName: senderName,
      authorCity: senderCity,
      category: 'Legal Notice Verification',
      title: `[Draft Legal Notice Review] ${currentNoticeConfig.label} against ${recipientName}`,
      content: `I have generated a draft legal notice regarding ${currentNoticeConfig.label}. Requesting verified Advocates to review and approve statutory compliance.\n\n--- LEGAL NOTICE DRAFT ---\n${generatedNoticeText}`,
      noticeDetails: {
        noticeType: currentNoticeConfig.label,
        senderName,
        recipientName,
        demandAmount: `PKR ${Number(demandAmount || 0).toLocaleString()}`,
        noticePeriodDays: Number(noticeDays),
        rawDraftText: generatedNoticeText
      }
    });

    setIsSubmitting(false);
    onClose();
    if (onSuccessPost) onSuccessPost();
  };

  // Open Direct Send step
  const handleOpenSendDirect = async () => {
    const lawyers = await lawyerService.getLawyers();
    setLawyersList(lawyers);
    if (lawyers.length > 0) {
      setSelectedLawyerId(lawyers[0].id);
    }
    setStep('send_direct');
  };

  // Option B: Send directly to an Advocate DM
  const handleSendDirectToLawyer = async () => {
    const targetLawyer = lawyersList.find((l) => l.id === selectedLawyerId) || lawyersList[0];
    if (!targetLawyer) return;

    setIsSubmitting(true);
    const convId = `conv-offer-${Date.now()}`;
    await messageService.sendMessage(
      convId,
      'usr-current',
      senderName,
      'client',
      `__NOTICE_DRAFT__|${currentNoticeConfig.label}|${senderName}|${recipientName}|${demandAmount}|${generatedNoticeText.replace(/\|/g, ' ')}`
    );

    setIsSubmitting(false);
    onClose();
    if (onSuccessSendDirect) onSuccessSendDirect(targetLawyer.name);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-neutral-200 max-w-2xl w-full shadow-2xl space-y-4 p-4 sm:p-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-black text-white flex items-center justify-center font-bold">
              <Gavel className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-black flex items-center gap-1.5">
                <span>Legal Notice Drafter (Pakistan Laws)</span>
                <span className="text-[10px] bg-neutral-100 font-bold px-1.5 py-0.5 rounded text-neutral-600">
                  AI Statutory Format
                </span>
              </h2>
              <p className="text-[11px] text-neutral-400">
                Draft legal notices & submit for Advocate review or direct approval
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-black transition-colors"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* STEP 1: FORM INPUTS */}
        {step === 'form' && (
          <form onSubmit={handleGenerateNotice} className="space-y-4">
            {/* Type selector */}
            <ThemedDropdown
              label="Legal Notice Type & Statutory Act"
              value={noticeType}
              onChange={setNoticeType}
              options={NOTICE_TYPES.map((t) => ({
                value: t.id,
                label: t.label,
                sublabel: t.statute
              }))}
            />

            {/* Sender & Recipient Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Sender Full Name (Your Name)
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Opposite Party / Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Sheikh Tariq Mahmood"
                  className="w-full text-xs font-semibold bg-white border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Recipient Address / City
                </label>
                <input
                  type="text"
                  required
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="e.g. Gulberg III, Lahore"
                  className="w-full text-xs bg-white border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Financial Claim / Demand Amount (PKR)
                </label>
                <input
                  type="number"
                  value={demandAmount}
                  onChange={(e) => setDemandAmount(e.target.value)}
                  placeholder="e.g. 1500000"
                  className="w-full text-xs font-bold bg-white border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Instrument / Cheque No / Reference
                </label>
                <input
                  type="text"
                  value={chequeOrContractNo}
                  onChange={(e) => setChequeOrContractNo(e.target.value)}
                  placeholder="e.g. CHK-992104 HBL Bank"
                  className="w-full text-xs bg-white border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Notice Period Deadline (Days)
                </label>
                <input
                  type="number"
                  value={noticeDays}
                  onChange={(e) => setNoticeDays(e.target.value)}
                  className="w-full text-xs font-bold bg-white border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Matter Summary */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Dispute Facts / Summary (English / اردو)
              </label>
              <textarea
                rows={3}
                dir="auto"
                value={matterSummary}
                onChange={(e) => setMatterSummary(e.target.value)}
                placeholder="Briefly state facts, breach, or reasons for legal notice..."
                className="w-full text-xs bg-white border border-neutral-200 rounded-xl p-2.5 outline-none focus:border-black resize-none leading-relaxed"
              />
            </div>

            {/* Submit generate */}
            <div className="flex items-center justify-end pt-2 border-t border-neutral-100">
              <button
                type="submit"
                className="glass-btn px-5 py-2.5 text-xs font-bold text-black gap-2"
              >
                <Sparkles className="h-4 w-4 text-black" />
                <span>Generate Legal Notice Draft</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PREVIEW DRAFT & CHOOSE APPROVAL WORKFLOW */}
        {step === 'preview' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-black" />
                <span>Generated Statutory Legal Notice</span>
              </span>
              <button
                type="button"
                onClick={handleCopyText}
                className="glass-btn px-3 py-1.5 text-xs font-bold text-neutral-700 hover:text-black flex items-center gap-1.5"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
              </button>
            </div>

            {/* Raw Text Box */}
            <div className="bg-neutral-900 text-neutral-100 font-mono text-[11px] p-4 rounded-xl max-h-64 overflow-y-auto whitespace-pre-wrap leading-relaxed border border-neutral-800 shadow-inner">
              {generatedNoticeText}
            </div>

            {/* Next Action Selection */}
            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 space-y-2.5">
              <p className="text-xs font-bold text-black">
                How would you like to verify and approve this draft?
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Option 1: Post to Cases Feed for Advocate Review */}
                <button
                  type="button"
                  onClick={handlePostToFeedForVerification}
                  disabled={isSubmitting}
                  className="p-3 bg-white border border-neutral-200 hover:border-black rounded-xl text-left transition-all hover:shadow-xs group space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-black group-hover:underline flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-black" />
                      Option 1: Post to Feed
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-black" />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Post to public feed for verified Advocates to review, comment & click Approve.
                  </p>
                </button>

                {/* Option 2: Send Directly to an Advocate DM */}
                <button
                  type="button"
                  onClick={handleOpenSendDirect}
                  disabled={isSubmitting}
                  className="p-3 bg-white border border-neutral-200 hover:border-black rounded-xl text-left transition-all hover:shadow-xs group space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-black group-hover:underline flex items-center gap-1">
                      <Send className="h-3.5 w-3.5 text-black" />
                      Option 2: Send DM to Advocate
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-black" />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Send directly to an advocate via private chat for manual review & signature.
                  </p>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="glass-btn px-3.5 py-2 text-xs font-bold text-neutral-600 hover:text-black"
              >
                Back to Edit
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-neutral-500 hover:text-black"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DIRECT ADVOCATE SELECT (OPTION B) */}
        {step === 'send_direct' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-black mb-1">Select Advocate to Review Notice</h3>
              <p className="text-[11px] text-neutral-500">
                Choose a High Court Advocate to send your draft legal notice for manual review.
              </p>
            </div>

            <ThemedDropdown
              label="Select Verified Advocate"
              value={selectedLawyerId}
              onChange={setSelectedLawyerId}
              options={lawyersList.map((l) => ({
                value: l.id,
                label: l.name,
                sublabel: `${l.courtEnrollment || 'Advocate High Court'} • ${l.city} (${l.experienceYears} Yrs Exp)`
              }))}
            />

            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs text-neutral-700 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
              <span>
                Your legal notice will be delivered into the advocate's private chat thread. The advocate can review, click <strong>"Approve Notice"</strong>, or reply with corrections.
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setStep('preview')}
                className="glass-btn px-3.5 py-2 text-xs font-bold text-neutral-600 hover:text-black"
              >
                Back to Draft
              </button>

              <button
                type="button"
                onClick={handleSendDirectToLawyer}
                disabled={isSubmitting}
                className="glass-btn px-5 py-2.5 text-xs font-bold text-black gap-2"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Draft to Advocate DM'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
