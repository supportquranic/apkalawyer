import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  Gavel,
  FileCheck2,
  FileSignature,
  Building2,
  Briefcase,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemedDropdown } from '@/components/ui/ThemedDropdown';
import { lawyerService, threadService, messageService } from '@/services';
import { Lawyer } from '@/types/lawyer';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

export type LegalToolCategory = 'notice' | 'application' | 'affidavit' | 'agreement';

export interface ToolOption {
  id: string;
  category: LegalToolCategory;
  categoryLabel: string;
  title: string;
  statute: string;
  description: string;
  defaultFields: {
    partyA: string; // e.g. Sender / Applicant / Deponant / First Party
    partyB: string; // e.g. Recipient / Respondent / Opposite Party / Second Party
    city: string;
    amount?: string;
    referenceNo?: string;
    summary: string;
    noticeDays?: string;
  };
}

export const FREE_LEGAL_TOOLS: ToolOption[] = [
  // 1. LEGAL NOTICES
  {
    id: 'notice_general',
    category: 'notice',
    categoryLabel: 'Legal Notice',
    title: 'General Legal Notice (All-Purpose)',
    statute: 'Contract Act 1872 & Code of Civil Procedure 1908',
    description: 'Draft a formal legal notice for any civil, commercial, or personal dispute — demand compliance, payment, or specific performance.',
    defaultFields: {
      partyA: 'Your Name / Company',
      partyB: 'Recipient Name / Company',
      city: 'Lahore, Pakistan',
      amount: '0',
      referenceNo: '',
      summary: 'Describe the matter, facts, and relief sought in your own words.',
      noticeDays: '14'
    }
  },
  {
    id: 'notice_cheque_489f',
    category: 'notice',
    categoryLabel: 'Legal Notice',
    title: 'Cheque Dishonour Demand Notice (Section 489-F PPC)',
    statute: 'Section 489-F Pakistan Penal Code 1860 & Sec 138 Negotiable Instruments Act',
    description: 'Mandatory statutory 14-day demand notice prior to lodging criminal FIR or filing summary suit.',
    defaultFields: {
      partyA: 'Muhammad Bilal Khan',
      partyB: 'Sheikh Tariq Mahmood',
      city: 'Lahore, Pakistan',
      amount: '1500000',
      referenceNo: 'CHK-8849201 / HBL Bank',
      summary: 'Failure to clear dishonoured cheque issued towards business liability despite repeated verbal demands.',
      noticeDays: '14'
    }
  },
  {
    id: 'notice_property_eviction',
    category: 'notice',
    categoryLabel: 'Legal Notice',
    title: 'Tenancy Rent Default & Eviction Notice',
    statute: 'Punjab / Sindh Rented Premises Act 2009',
    description: 'Formal legal notice demanding clearance of overdue rent and vacant possession of premises.',
    defaultFields: {
      partyA: 'Chaudhry Ahmad Yar',
      partyB: 'Kamran Raza',
      city: 'Karachi, Sindh',
      amount: '180000',
      referenceNo: 'Premises: Apartment 4-B, Clifton, Karachi',
      summary: 'Non-payment of monthly rent for 4 consecutive months and breach of residential tenancy agreement.',
      noticeDays: '14'
    }
  },
  {
    id: 'notice_contract_recovery',
    category: 'notice',
    categoryLabel: 'Legal Notice',
    title: 'Breach of Contract & Outstanding Debt Recovery Notice',
    statute: 'Contract Act 1872 & Code of Civil Procedure (Order 37)',
    description: 'Demand notice for overdue invoices, service level agreements, or outstanding business payments.',
    defaultFields: {
      partyA: 'Apex Solutions Pvt Ltd',
      partyB: 'Vertex Trading Co',
      city: 'Islamabad, ICT',
      amount: '2400000',
      referenceNo: 'SLA Contract # 2025/IT-09',
      summary: 'Failure to release overdue milestone payments following accepted invoice deliverables.',
      noticeDays: '14'
    }
  },
  {
    id: 'notice_defamation',
    category: 'notice',
    categoryLabel: 'Legal Notice',
    title: 'Defamation & Cyber Harassment Cease & Desist Notice',
    statute: 'Defamation Ordinance 2002 & PECA 2016',
    description: 'Legal notice demanding immediate deletion of defamatory online content and unconditional apology.',
    defaultFields: {
      partyA: 'Dr. Usman Alvi',
      partyB: 'Raza Media Handles',
      city: 'Lahore, Punjab',
      amount: '5000000',
      referenceNo: 'Social Media Posts dated 12th Feb',
      summary: 'Publishing false, malicious and defamatory statements causing severe injury to professional reputation.',
      noticeDays: '14'
    }
  },

  // 2. APPLICATION / COMPLAINT
  {
    id: 'app_fia_cybercrime',
    category: 'application',
    categoryLabel: 'Application / Complaint',
    title: 'FIA Cybercrime Reporting Complaint',
    statute: 'Prevention of Electronic Crimes Act (PECA) 2016 & FIA Act 1974',
    description: 'Formal complaint to National Response Centre for Cybercrime (NR3C) for financial fraud, hacking, or impersonation.',
    defaultFields: {
      partyA: 'Zahid Mahmood',
      partyB: 'Unknown Online Fraudster / Account # 0192',
      city: 'Rawalpindi, Punjab',
      amount: '450000',
      referenceNo: 'Transaction Ref # TXN-998124',
      summary: 'Unauthorized electronic transfer through spoofed mobile banking transaction & online identity impersonation.',
      noticeDays: '7'
    }
  },
  {
    id: 'app_consumer_court',
    category: 'application',
    categoryLabel: 'Application / Complaint',
    title: 'Consumer Protection Court Complaint Petition',
    statute: 'Punjab / Sindh / ICT Consumer Protection Act',
    description: 'Formal grievance petition against seller / service provider for defective products, faulty services or deceptive trade practices.',
    defaultFields: {
      partyA: 'Hamza Farooq',
      partyB: 'Electra Retail Stores',
      city: 'Faisalabad, Punjab',
      amount: '350000',
      referenceNo: 'Receipt Invoice # INV-7712',
      summary: 'Selling faulty machinery with unfulfilled warranty obligation and refusal of replacement or refund.',
      noticeDays: '14'
    }
  },
  {
    id: 'app_sho_police',
    category: 'application',
    categoryLabel: 'Application / Complaint',
    title: 'Police Station SHO Application (Sec 22-A/22-B CrPC)',
    statute: 'Code of Criminal Procedure 1898 & Police Order 2002',
    description: 'Formal application to Station House Officer (SHO) requesting registration of FIR for cognizable offence.',
    defaultFields: {
      partyA: 'Malik Jahangir',
      partyB: 'Nominated Offender(s)',
      city: 'Peshawar, KPK',
      amount: '0',
      referenceNo: 'Incident Date: 18th March',
      summary: 'Criminal trespass, illegal intimidation and property destruction committed at complainant site.',
      noticeDays: '3'
    }
  },

  // 3. AFFIDAVIT / DECLARATION
  {
    id: 'aff_general_bayan',
    category: 'affidavit',
    categoryLabel: 'Affidavit / Declaration',
    title: 'General Affidavit / Bayan-e-Halafi (Stamp Paper Format)',
    statute: 'Oaths Act 1873 & Stamp Act 1899',
    description: 'Sworn legal declaration executed on non-judicial stamp paper for court, government, or institutional submission.',
    defaultFields: {
      partyA: 'Syed Ali Raza',
      partyB: 'Oath Commissioner / Notary Public',
      city: 'Multan, Punjab',
      amount: '0',
      referenceNo: 'CNIC # 36302-XXXXXXX-1',
      summary: 'Solemn affirmation of facts, age, address verification and declaration of truthfulness under oath.',
      noticeDays: '0'
    }
  },
  {
    id: 'aff_loss_documents',
    category: 'affidavit',
    categoryLabel: 'Affidavit / Declaration',
    title: 'Loss of Original Documents & CNIC Affidavit',
    statute: 'Registration Act 1908 & Stamp Act 1899',
    description: 'Sworn affidavit stating loss of allotment letter, property title deed, degree, or CNIC for duplicate issuance.',
    defaultFields: {
      partyA: 'Nabila Yasmeen',
      partyB: 'NADRA / Property Board Authorities',
      city: 'Lahore, Punjab',
      amount: '0',
      referenceNo: 'Police Roznamcha Entry # 44',
      summary: 'Declaration of genuine loss of original allotment deed without any illegal pledge or mortgage.',
      noticeDays: '0'
    }
  },
  {
    id: 'aff_legal_heir',
    category: 'affidavit',
    categoryLabel: 'Affidavit / Declaration',
    title: 'Legal Heir & Inheritance Declaration Affidavit',
    statute: 'Succession Act 1925 & Family Laws of Pakistan',
    description: 'Solemn affirmation listing surviving legal heirs of deceased person for NADRA succession certificate or estate distribution.',
    defaultFields: {
      partyA: 'Tariq Hassan (Son of Deceased)',
      partyB: 'Senior Civil Judge / NADRA Succession Board',
      city: 'Karachi, Sindh',
      amount: '0',
      referenceNo: 'Death Cert # 2025/DC-991',
      summary: 'Declaration of surviving widow, sons, and daughters as sole legal heirs of late Hassan Mahmood.',
      noticeDays: '0'
    }
  },

  // 4. AGREEMENT / CONTRACT
  {
    id: 'agr_tenancy_lease',
    category: 'agreement',
    categoryLabel: 'Agreement / Contract',
    title: 'Residential / Commercial Tenancy Lease Agreement',
    statute: 'Punjab Rented Premises Act 2009 / ICT Rent Ordinance',
    description: 'Comprehensive lease agreement specifying monthly rent, security deposit, maintenance, and eviction terms.',
    defaultFields: {
      partyA: 'Landlord: Mian Asif Nazir',
      partyB: 'Tenant: Shahzad Munir',
      city: 'Lahore, Punjab',
      amount: '75000',
      referenceNo: 'House # 112, Phase 5, DHA Lahore',
      summary: '11-Month residential tenancy lease with advance security deposit PKR 225,000 and 10% annual escalation.',
      noticeDays: '30'
    }
  },
  {
    id: 'agr_vehicle_sale',
    category: 'agreement',
    categoryLabel: 'Agreement / Contract',
    title: 'Vehicle / Car Sale Purchase Agreement & Receipt',
    statute: 'Contract Act 1872 & Motor Vehicles Ordinance 1965',
    description: 'Legally binding sale receipt & delivery agreement transferring vehicle ownership and responsibility.',
    defaultFields: {
      partyA: 'Seller: Faisal Shah',
      partyB: 'Buyer: Adnan Qureshi',
      city: 'Islamabad, ICT',
      amount: '3850000',
      referenceNo: 'Toyota Corolla 2021 (Reg # ICT-AB-491)',
      summary: 'Outright vehicle sale with full token tax clearance, biometric transfer commitment, and delivery handover.',
      noticeDays: '7'
    }
  },
  {
    id: 'agr_nda_bilateral',
    category: 'agreement',
    categoryLabel: 'Agreement / Contract',
    title: 'Mutual Non-Disclosure & Confidentiality Agreement (NDA)',
    statute: 'Contract Act 1872 (Pakistan Jurisdiction)',
    description: 'Bilateral confidentiality agreement protecting proprietary technology, trade secrets, and commercial data.',
    defaultFields: {
      partyA: 'Disclosing Party: TechCraft Labs',
      partyB: 'Receiving Party: NextGen Innovations',
      city: 'Lahore, Pakistan',
      amount: '1000000',
      referenceNo: 'Project Code: Alpha-2026',
      summary: 'Mutual non-disclosure obligation covering proprietary source code, client lists, and strategic business data.',
      noticeDays: '14'
    }
  }
];

interface FreeLegalToolsWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialToolId?: string;
  initialCategory?: LegalToolCategory;
  onSuccessPost?: () => void;
  onSuccessSendDirect?: (lawyerName: string) => void;
}

export const FreeLegalToolsWizard: React.FC<FreeLegalToolsWizardProps> = ({
  isOpen,
  onClose,
  initialToolId = 'notice_cheque_489f',
  initialCategory = 'notice',
  onSuccessPost,
  onSuccessSendDirect
}) => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<LegalToolCategory>(initialCategory);
  const [selectedToolId, setSelectedToolId] = useState(initialToolId);
  const [step, setStep] = useState<'form' | 'preview' | 'send_direct'>('form');

  const selectedTool = FREE_LEGAL_TOOLS.find((t) => t.id === selectedToolId) || FREE_LEGAL_TOOLS[0];

  const [partyA, setPartyA] = useState(selectedTool.defaultFields.partyA);
  const [partyB, setPartyB] = useState(selectedTool.defaultFields.partyB);
  const [city, setCity] = useState(selectedTool.defaultFields.city);
  const [amount, setAmount] = useState(selectedTool.defaultFields.amount || '0');
  const [referenceNo, setReferenceNo] = useState(selectedTool.defaultFields.referenceNo || '');
  const [summary, setSummary] = useState(selectedTool.defaultFields.summary);
  const [noticeDays, setNoticeDays] = useState(selectedTool.defaultFields.noticeDays || '14');

  const [generatedDraftText, setGeneratedDraftText] = useState('');
  const [copied, setCopied] = useState(false);

  const [lawyersList, setLawyersList] = useState<Lawyer[]>([]);
  const [selectedLawyerId, setSelectedLawyerId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync tool selection when modal opens
  useEffect(() => {
    if (isOpen) {
      const tool = FREE_LEGAL_TOOLS.find((t) => t.id === initialToolId) || FREE_LEGAL_TOOLS[0];
      setSelectedToolId(tool.id);
      setActiveCategory(tool.category);
      setPartyA(tool.defaultFields.partyA);
      setPartyB(tool.defaultFields.partyB);
      setCity(tool.defaultFields.city);
      setAmount(tool.defaultFields.amount || '0');
      setReferenceNo(tool.defaultFields.referenceNo || '');
      setSummary(tool.defaultFields.summary);
      setNoticeDays(tool.defaultFields.noticeDays || '14');
      setStep('form');
    }
  }, [isOpen, initialToolId, initialCategory]);

  if (!isOpen) return null;

  const filteredTools = FREE_LEGAL_TOOLS.filter((t) => t.category === activeCategory);

  const handleToolChange = (toolId: string) => {
    setSelectedToolId(toolId);
    const t = FREE_LEGAL_TOOLS.find((tool) => tool.id === toolId);
    if (t) {
      setPartyA(t.defaultFields.partyA);
      setPartyB(t.defaultFields.partyB);
      setCity(t.defaultFields.city);
      setAmount(t.defaultFields.amount || '0');
      setReferenceNo(t.defaultFields.referenceNo || '');
      setSummary(t.defaultFields.summary);
      setNoticeDays(t.defaultFields.noticeDays || '14');
    }
  };

  const handleCategoryTabChange = (cat: LegalToolCategory) => {
    setActiveCategory(cat);
    const firstTool = FREE_LEGAL_TOOLS.find((t) => t.category === cat);
    if (firstTool) {
      handleToolChange(firstTool.id);
    }
  };

  // Draft Generator Engine
  const handleGenerateDraft = (e: React.FormEvent) => {
    e.preventDefault();

    let draftContent = '';
    const formattedAmount = Number(amount || 0) > 0 ? `PKR ${Number(amount).toLocaleString()}` : 'N/A';

    if (selectedTool.category === 'notice') {
      draftContent = `LEGAL NOTICE UNDER ${selectedTool.statute.toUpperCase()}

BY REGISTERED POST A.D. / URGENT COURIER SERVICE

TO (RECIPIENT):
${partyB.toUpperCase()}
${city}

FROM (SENDER):
${partyA.toUpperCase()}
${city}

SUBJECT: FORMAL STATUTORY LEGAL DEMAND NOTICE REGARDING ${selectedTool.title.toUpperCase()} (${formattedAmount})

Sir / Madam,

Under instructions from and on behalf of my client, ${partyA}, resident of ${city}, I hereby issue you this formal Legal Notice as under:

1. That my client entered into a lawful legal transaction/relationship with you regarding:
   "${summary.trim()}"

2. Particulars / Reference Document No:
   ${referenceNo.trim() || 'Official Written Agreement & Invoices'}

3. That in discharge of your lawful debt/obligation, a financial requirement of ${formattedAmount} was established. However, you committed default under ${selectedTool.statute}.

STATUTORY DEMAND & ${noticeDays}-DAY NOTICE:
You are hereby formally called upon to comply with the terms and pay/settle the amount of ${formattedAmount} to my client within ${noticeDays} (${noticeDays}) DAYS from receipt of this notice.

TAKE NOTICE that if you fail to comply within ${noticeDays} days, my client will initiate civil recovery proceedings and/or criminal prosecution under the jurisdiction of competent Courts at your sole risk and legal consequences.

Dated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Issued by: ${partyA} (Subject to Advocate Verification)`;

    } else if (selectedTool.category === 'application') {
      draftContent = `BEFORE THE COMPETENT AUTHORITY / COURT AT ${city.toUpperCase()}

COMPLAINT PETITION UNDER ${selectedTool.statute.toUpperCase()}

COMPLAINANT / PETITIONER:
${partyA}
Resident of: ${city}

VERSUS

RESPONDENT / ACCUSED:
${partyB}
Address: ${city}

SUBJECT: APPLICATION FOR REGISTRATION OF COMPLAINT & LEGAL ACTION FOR ${selectedTool.title.toUpperCase()}

Respectfully Sheweth:

1. That the Complainant is a law-abiding citizen of Pakistan residing at the address given above.
2. That the Respondent committed illegal acts, breach, and statutory offense as under:
   "${summary.trim()}"
3. Reference / Transaction Ref No: ${referenceNo.trim() || 'Exhibits attached'}
4. Financial Impact / Damages Claim: ${formattedAmount}

PRAYER / RELIEF SOUGHT:
It is most respectfully prayed that this Application may be accepted, and appropriate legal action / FIR registration / statutory inquiry be ordered against the Respondent in accordance with law.

Complainant: ${partyA}
Dated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;

    } else if (selectedTool.category === 'affidavit') {
      draftContent = `AFFIDAVIT / BAYAN-E-HALAFI
(ON NON-JUDICIAL STAMP PAPER OF PAKISTAN)

I, ${partyA.toUpperCase()}, resident of ${city}, holding CNIC / Ref: ${referenceNo || 'Registered Pakistan Citizen'}, do hereby solemnly affirm and state on Oath as under:

1. That I am the Deponent of this Affidavit and fully conversant with the facts stated herein.
2. That I hereby depose and declare under Oath that:
   "${summary.trim()}"
3. That whatever is stated above is true and correct to the best of my knowledge, belief, and information, and nothing material has been concealed or misstated.

DEPONENT: ${partyA.toUpperCase()}
CNIC / Ref: ${referenceNo || 'Attached'}

VERIFICATION:
Verified on Oath at ${city} on this ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} that the contents of paragraphs 1 to 3 are true and correct.

DEPONENT ATTESTATION`;

    } else {
      // Agreement / Contract
      draftContent = `LEGAL AGREEMENT & CONTRACT
GOVERNED BY ${selectedTool.statute.toUpperCase()}

THIS AGREEMENT is made on this ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} at ${city}

BETWEEN:
FIRST PARTY: ${partyA}, Resident of ${city}
AND
SECOND PARTY: ${partyB}, Resident of ${city}

WHEREAS both parties agree to enter into this legally binding agreement for ${selectedTool.title} subject to the following terms & conditions:

1. PURPOSE & SUBJECT MATTER:
   "${summary.trim()}"

2. CONSIDERATION & VALUATION:
   Total Consideration / Rent / Transaction Value: ${formattedAmount}
   Reference / Particulars: ${referenceNo || 'Schedule A'}

3. GOVERNING LAW & JURISDICTION:
   This Agreement shall be governed by and construed in accordance with the laws of Pakistan. Any dispute shall be submitted to the competent Civil Courts at ${city}.

IN WITNESS WHEREOF, the parties hereto have signed this Agreement on the date first written above.

FIRST PARTY: ___________________ (${partyA})
SECOND PARTY: __________________ (${partyB})
WITNESS 1: _____________________
WITNESS 2: _____________________`;
    }

    setGeneratedDraftText(draftContent);
    setStep('preview');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedDraftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Option A: Post to feed for lawyer verification (Free Tool -> Lawyer Review)
  const handlePostToFeedForVerification = async () => {
    setIsSubmitting(true);
    await threadService.createLegalNoticeThread({
      authorName: partyA,
      authorCity: city,
      category: `${selectedTool.categoryLabel} Review`,
      title: `[Draft ${selectedTool.categoryLabel} Review] ${selectedTool.title}`,
      content: `I generated a free basic draft for ${selectedTool.title}. Requesting verified Advocates to inspect and approve statutory compliance.\n\n--- DRAFT TEXT ---\n${generatedDraftText}`,
      noticeDetails: {
        noticeType: selectedTool.title,
        senderName: partyA,
        recipientName: partyB,
        demandAmount: Number(amount) > 0 ? `PKR ${Number(amount).toLocaleString()}` : undefined,
        noticePeriodDays: Number(noticeDays),
        rawDraftText: generatedDraftText
      }
    });

    setIsSubmitting(false);
    onClose();
    if (onSuccessPost) onSuccessPost();
  };

  // Open Direct Send step for Option B
  const handleOpenSendDirect = async () => {
    const lawyers = await lawyerService.getLawyers();
    setLawyersList(lawyers);
    if (lawyers.length > 0) {
      setSelectedLawyerId(lawyers[0].id);
    }
    setStep('send_direct');
  };

  // Option B: Send directly to an Advocate DM for Lawyer Review
  const handleSendDirectToLawyer = async () => {
    const targetLawyer = lawyersList.find((l) => l.id === selectedLawyerId) || lawyersList[0];
    if (!targetLawyer) return;

    setIsSubmitting(true);
    const convId = `conv-offer-${Date.now()}`;
    await messageService.sendMessage(
      convId,
      'usr-current',
      partyA,
      'client',
      `__NOTICE_DRAFT__|${selectedTool.title}|${partyA}|${partyB}|${amount}|${generatedDraftText.replace(/\|/g, ' ')}`
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
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-black flex items-center gap-1.5">
                <span>Free Legal Tools</span>
                <span className="text-[10px] bg-black text-white font-bold px-1.5 py-0.5 rounded">
                  100% FREE DRAFT
                </span>
              </h2>
              <p className="text-[11px] text-neutral-400">
                Create. Understand. Prepare. Statutory drafts conforming to Pakistani laws.
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

        {/* STEP 1: FORM INPUTS & TOOL SELECTION */}
        {step === 'form' && (
          <form onSubmit={handleGenerateDraft} className="space-y-4">
            
            {/* 4 Tool Category Tabs */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                Select Tool Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200">
                {[
                  { id: 'notice', label: 'Legal Notice', icon: FileText },
                  { id: 'application', label: 'Application', icon: FileSignature },
                  { id: 'affidavit', label: 'Affidavit', icon: FileCheck2 },
                  { id: 'agreement', label: 'Agreement', icon: Building2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleCategoryTabChange(tab.id as LegalToolCategory)}
                      className={cn(
                        'flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all',
                        isActive
                          ? 'bg-black text-white shadow-xs'
                          : 'text-neutral-600 hover:bg-neutral-200/60'
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dropdown for specific tool inside selected category */}
            <ThemedDropdown
              label="Specific Document / Tool"
              value={selectedToolId}
              onChange={handleToolChange}
              options={filteredTools.map((t) => ({
                value: t.id,
                label: t.title,
                sublabel: t.statute
              }))}
            />

            {/* Tool Statutory Description */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs text-neutral-700 space-y-0.5">
              <p className="font-bold text-black flex items-center gap-1">
                <Gavel className="h-3.5 w-3.5 text-black" />
                <span>Statute: {selectedTool.statute}</span>
              </p>
              <p className="text-[11px] text-neutral-500">{selectedTool.description}</p>
            </div>

            {/* Party A & Party B Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  First Party (Your Name / Applicant)
                </label>
                <input
                  type="text"
                  required
                  value={partyA}
                  onChange={(e) => setPartyA(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Second Party / Respondent / Opposite Party
                </label>
                <input
                  type="text"
                  required
                  value={partyB}
                  onChange={(e) => setPartyB(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  City / Jurisdiction
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs bg-white border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Valuation / Amount / Rent (PKR)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full text-xs font-bold bg-white border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Reference / Instrument / Contract No / CNIC
              </label>
              <input
                type="text"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                placeholder="e.g. Agreement Date / Instrument No / CNIC"
                className="w-full text-xs bg-white border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-black"
              />
            </div>

            {/* Matter Summary */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Dispute Particulars / Facts (English or اردو)
              </label>
              <textarea
                rows={3}
                dir="auto"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="State key facts, terms, or incident particulars..."
                className="w-full text-xs bg-white border border-neutral-200 rounded-xl p-2.5 outline-none focus:border-black resize-none leading-relaxed"
              />
            </div>

            {/* Generate Button (Free) */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Basic Draft is 100% Free</span>
              </span>

              <button
                type="submit"
                className="glass-btn px-5 py-2.5 text-xs font-bold text-black gap-2"
              >
                <Sparkles className="h-4 w-4 text-black" />
                <span>Generate Free Basic Draft</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PREVIEW FREE DRAFT + MONETIZATION FUNNEL CARDS */}
        {step === 'preview' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-black" />
                <span>Generated Basic Statutory Draft (Free)</span>
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

            {/* Generated Raw Text Box */}
            <div className="bg-neutral-900 text-neutral-100 font-mono text-[11px] p-4 rounded-xl max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed border border-neutral-800 shadow-inner">
              {generatedDraftText}
            </div>

            {/* =========================================================================
                APKALAWYER MONETIZATION FUNNEL CARDS (NATURAL PROMPT)
               ========================================================================= */}
            <div className="space-y-3 pt-1">
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider text-center">
                Optional Professional Legal Services
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Funnel Option 1: Want a lawyer to review your document? → Get Lawyer Review */}
                <div className="p-4 bg-neutral-900 text-white rounded-2xl border border-neutral-800 space-y-3 flex flex-col justify-between shadow-md">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <ShieldCheck className="h-4 w-4 text-amber-400" />
                      <span>Want a Lawyer to Review Your Document?</span>
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      Get a verified High Court Advocate to inspect, edit, and stamp your draft for full statutory compliance.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenSendDirect}
                    className="w-full glass-btn py-2 text-xs font-bold text-black bg-white hover:bg-neutral-100 gap-1.5 justify-center"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-black" />
                    <span>Get Lawyer Review</span>
                  </button>
                </div>

                {/* Funnel Option 2: Need a lawyer to handle this matter? → Find a Lawyer */}
                <div className="p-4 bg-white border border-neutral-200 rounded-2xl space-y-3 flex flex-col justify-between shadow-xs hover:border-neutral-400 transition-all">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-black">
                      <Briefcase className="h-4 w-4 text-black" />
                      <span>Need a Lawyer to Handle This Matter?</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      Connect with top-rated High Court Advocates in your city to represent you in court or handle negotiations.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(ROUTES.PUBLIC.LAWYERS);
                    }}
                    className="w-full glass-btn py-2 text-xs font-bold text-black gap-1.5 justify-center"
                  >
                    <Search className="h-3.5 w-3.5 text-black" />
                    <span>Find a Lawyer</span>
                  </button>
                </div>

              </div>

              {/* Or Option A: Post to public feed for advocate community review */}
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={handlePostToFeedForVerification}
                  className="text-xs text-neutral-600 hover:text-black font-semibold underline underline-offset-4"
                >
                  Or post to public case feed for community advocate review
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
                Done / Close
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DIRECT ADVOCATE SELECT FOR LAWYER REVIEW */}
        {step === 'send_direct' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-black mb-1">Get Advocate Document Review</h3>
              <p className="text-[11px] text-neutral-500">
                Select a High Court Advocate to send your generated draft for professional review & signature.
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
                Your draft will be delivered to the Advocate's private chamber thread. The lawyer will inspect statutory terms, provide edits, and click <strong>"Approve Notice"</strong>.
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
                <span>{isSubmitting ? 'Sending...' : 'Send Draft for Lawyer Review'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
