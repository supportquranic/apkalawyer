import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { threadService } from '@/services';
import { LegalThread } from '@/types/thread';
import { useSEO } from '@/hooks/useSEO';
import { LoadingState } from '@/components/feedback';
import { 
  MessageSquare, 
  ThumbsUp, 
  Briefcase, 
  Send, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  Gavel, 
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { ThemedDropdown } from '@/components/ui/ThemedDropdown';
import { FreeLegalToolsWizard } from '@/components/legalTools/FreeLegalToolsWizard';

const CATEGORIES = [
  'All Matters',
  'Property & Land Dispute',
  'Family, Khula & Child Custody',
  'Criminal Defense & Bail',
  'Civil Litigation & Inheritance',
  'Corporate & Contracts',
  'Banking & Cheque Bounce (489-F)',
  'Cybercrime & PECA (FIA)',
  'Labor & Employment',
  'Taxation, FBR & Customs',
  'Constitutional & High Court Writs',
  'Consumer Protection & Court'
];

export const ClientConsultationsPage: React.FC = () => {
  useSEO({ title: 'Legal Consultations & Advocate Advices — ApkaLawyer', noIndex: true });
  const { user } = useAuth();

  const locationState = useLocation();

  const [threads, setThreads] = useState<LegalThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Matters');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Composer state — auto-open when navigated from header + button
  const [isComposerOpen, setIsComposerOpen] = useState(
    !!(locationState.state as any)?.openComposer
  );
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Property & Land Dispute');
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Advices collapsed by default - only open when user clicks
  const [expandedThreadIds, setExpandedThreadIds] = useState<Record<string, boolean>>({});

  // New advice inputs per thread
  const [adviceInputs, setAdviceInputs] = useState<Record<string, string>>({});
  
  // Representation Offer Modal
  const [activeOfferThread, setActiveOfferThread] = useState<LegalThread | null>(null);
  const [offerFee, setOfferFee] = useState<string>('35000');
  const [offerMessage, setOfferMessage] = useState<string>('');
  
  // Image Lightbox & Wizard Modals
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadThreads = async () => {
    const data = await threadService.getThreads(
      selectedCategory === 'All Matters' ? undefined : selectedCategory,
      searchQuery
    );
    setThreads(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadThreads();
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if ((locationState.state as any)?.openComposer) {
      setIsComposerOpen(true);
    }
  }, [locationState.state, locationState.key]);

  const toggleExpand = (threadId: string) => {
    setExpandedThreadIds((prev) => ({
      ...prev,
      [threadId]: !prev[threadId]
    }));
  };

  const handleLike = async (threadId: string) => {
    const updated = await threadService.toggleLike(threadId);
    if (updated) {
      setThreads((prev) => prev.map((t) => (t.id === threadId ? updated : t)));
    }
  };

  const handleAddImage = () => {
    if (attachedImages.length >= 4) {
      showToast('Maximum 4 images allowed per post');
      return;
    }
    const sampleImages = [
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800'
    ];
    const pick = sampleImages[attachedImages.length % sampleImages.length];
    setAttachedImages((prev) => [...prev, pick]);
  };

  const handleRemoveImage = (index: number) => {
    setAttachedImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Please provide a matter title and description');
      return;
    }

    setIsSubmitting(true);
    await threadService.createThread({
      authorName: user?.name || 'Client Citizen',
      authorAvatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      authorCity: 'Lahore, Pakistan',
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      images: attachedImages
    });

    setNewTitle('');
    setNewContent('');
    setAttachedImages([]);
    setIsComposerOpen(false);
    setIsSubmitting(false);
    showToast('Legal consultation thread posted to verified advocates!');
    loadThreads();
  };

  const handlePostAdvice = async (threadId: string) => {
    const text = adviceInputs[threadId];
    if (!text || !text.trim()) return;

    await threadService.addAdvice(threadId, {
      lawyerName: user?.name || 'Advocate Muhammad Zeeshan',
      lawyerAvatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150',
      lawyerTitle: 'Advocate High Court',
      experienceYears: 12,
      city: 'Lahore',
      content: text.trim()
    });

    setAdviceInputs((prev) => ({ ...prev, [threadId]: '' }));
    showToast('Your legal advice has been posted to this thread');
    loadThreads();
  };

  const handleSendRepresentationOffer = async () => {
    if (!activeOfferThread) return;

    await threadService.addOffer(activeOfferThread.id, {
      lawyerName: user?.name || 'Advocate Muhammad Zeeshan',
      lawyerAvatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150',
      lawyerTitle: 'Advocate High Court',
      city: 'Lahore',
      experienceYears: 12,
      feeQuotePKR: Number(offerFee) || 30000,
      message: offerMessage.trim() || 'I am ready to handle your case and represent you before the court.'
    });

    setActiveOfferThread(null);
    setOfferMessage('');
    showToast('Representation proposal sent privately to the client!');
    loadThreads();
  };

  const handleApproveNotice = async (threadId: string) => {
    await threadService.approveLegalNotice(
      threadId,
      user?.name || 'Advocate Muhammad Zeeshan',
      'Advocate High Court',
      'Draft reviewed and verified for Pakistan statutory compliance.'
    );
    showToast('Legal notice draft approved! Author notified & post archived.');
    loadThreads();
  };



  if (isLoading) return <LoadingState message="Loading legal consultations feed..." />;

  return (
    <div className="space-y-4 sm:space-y-5 max-w-3xl mx-auto pb-16">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="h-4 w-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}



      {/* If Composer is open, display ONLY the post creation card, not the feed under it */}
      {isComposerOpen ? (
        <form
          onSubmit={handleCreatePost}
          className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-sm space-y-3.5 transition-all"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover border border-neutral-200 flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-black truncate">{user?.name || 'Client Account'}</p>
                <p className="text-[11px] text-neutral-400">Post New Case / Consultation</p>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsComposerOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-full transition-colors flex-shrink-0"
              aria-label="Close composer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Category Dropdown (Before Brief) */}
          <div>
            <ThemedDropdown
              value={newCategory}
              onChange={setNewCategory}
              options={CATEGORIES.filter((c) => c !== 'All Matters')}
              placeholder="Select Case Matter Category"
              label="Legal Matter Category"
            />
          </div>

          {/* Title / Brief */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
              Case Brief / Title
            </label>
            <input
              type="text"
              placeholder="Brief summary or question (English / اردو)..."
              value={newTitle}
              dir="auto"
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full text-sm font-bold placeholder:text-neutral-400 text-black border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Single Natural Content Box (English / Urdu) */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
              Case Details & Questions
            </label>
            <textarea
              rows={4}
              dir="auto"
              placeholder="Write your question, matter, or legal dispute in English or اردو..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full text-xs sm:text-sm font-normal placeholder:text-neutral-400 text-black border border-neutral-200 rounded-xl p-3 outline-none focus:border-black transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Images preview */}
          {attachedImages.length > 0 && (
            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-neutral-500">
                Attached Images / Documents ({attachedImages.length}):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {attachedImages.map((img, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden border border-neutral-200 h-24 bg-neutral-100">
                    <img src={img} alt="Attached Evidence" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 bg-black/75 hover:bg-black text-white rounded-full transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions footer */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={handleAddImage}
              className="glass-btn gap-1.5 px-3.5 py-2 text-xs font-bold text-neutral-700 hover:text-black"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Attach Image</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="glass-btn gap-1.5 px-4 py-2 text-xs font-bold text-black"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{isSubmitting ? 'Posting...' : 'Post Case'}</span>
            </button>
          </div>
        </form>
      ) : (
        /* =========================================================================
            CONSULTATIONS FEED (Visible when composer is closed)
           ========================================================================= */
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search consultation threads, legal notices, or advocate names..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-neutral-200 rounded-xl pl-9 pr-4 py-2 text-xs text-black placeholder:text-neutral-400 outline-none focus:border-black transition-colors"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsWizardOpen(true)}
                className="glass-btn gap-1.5 px-3.5 py-2 text-xs font-bold text-black flex-shrink-0"
              >
                <Gavel className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Draft Legal Notice</span>
              </button>
            </div>

            {/* Categories auto-scroll pill bar */}
            <div className="overflow-hidden no-scrollbar">
              <div className="auto-scroll-track">
                {[...CATEGORIES, ...CATEGORIES].map((cat, idx) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={`${cat}-${idx}`}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        'whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold transition-all flex-shrink-0',
                        isSelected
                          ? 'bg-black text-white shadow-xs'
                          : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300'
                      )}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Feed List */}
          <div className="space-y-4">
            {threads.map((thread) => {
              const isExpanded = !!expandedThreadIds[thread.id];
              return (
                <article
                  key={thread.id}
                  id={thread.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs hover:border-neutral-300 transition-all space-y-3"
                >
                  {/* Post Author Bar */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={thread.authorAvatar}
                        alt={thread.authorName}
                        className="h-10 w-10 rounded-full object-cover border border-neutral-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-black truncate">
                          {thread.authorName}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 whitespace-nowrap mt-0.5">
                          <span>{thread.authorCity}</span>
                          <span className="text-neutral-300">•</span>
                          <span className="flex items-center gap-1 text-neutral-400">
                            <Clock className="h-3 w-3" />
                            {thread.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title & Unified Content (Supports English / Urdu naturally) */}
                  <div className="space-y-1.5">
                    <h2 dir="auto" className="text-sm sm:text-base font-bold text-black tracking-tight leading-snug">
                      {thread.title}
                    </h2>
                    <p dir="auto" className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                      {thread.content}
                    </p>
                  </div>

                  {/* Notice Draft Badge if applicable */}
                  {thread.isLegalNoticeDraft && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                          <FileText className="h-4 w-4 text-amber-600" />
                          <span>Draft Legal Notice for Advocate Review</span>
                        </span>
                        <span className="text-[10px] font-bold bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-full uppercase">
                          Pending Approval
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-800">
                        Notice Type: <strong>{thread.noticeDetails?.noticeType || thread.category}</strong> • Demand: <strong>{thread.noticeDetails?.demandAmount || 'N/A'}</strong>
                      </p>
                    </div>
                  )}

                  {/* Attached Images (Strict Max 2 per post) */}
                  {thread.images && thread.images.length > 0 && (
                    <div
                      className={cn(
                        'grid gap-2 rounded-xl overflow-hidden',
                        thread.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                      )}
                    >
                      {thread.images.slice(0, 2).map((imgUrl, imgIdx) => (
                        <button
                          key={imgIdx}
                          type="button"
                          onClick={() => setLightboxImage(imgUrl)}
                          className="relative h-44 sm:h-52 w-full bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 group/img focus:outline-none"
                        >
                          <img
                            src={imgUrl}
                            alt={`Evidence ${imgIdx + 1}`}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                            Click to open
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Single Clean Row of Action Buttons (Helpful, Advices, Offer) */}
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* Helpful / Upvote */}
                      <button
                        type="button"
                        onClick={() => handleLike(thread.id)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors',
                          thread.hasUserLiked
                            ? 'bg-neutral-100 text-black font-bold'
                            : 'text-neutral-500 hover:bg-neutral-50 hover:text-black'
                        )}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>{thread.helpfulCount}</span>
                      </button>

                      {/* Advices (Click to View) */}
                      <button
                        type="button"
                        onClick={() => toggleExpand(thread.id)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors',
                          isExpanded
                            ? 'bg-neutral-100 text-black font-bold'
                            : 'text-neutral-500 hover:bg-neutral-50 hover:text-black'
                        )}
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>{thread.advices.length} Advices</span>
                      </button>
                    </div>

                    {/* Offer Representation & Approve Notice Buttons */}
                    <div className="flex items-center gap-2">
                      {thread.isLegalNoticeDraft && thread.approvalStatus !== 'approved' && (
                        <button
                          type="button"
                          onClick={() => handleApproveNotice(thread.id)}
                          className="glass-btn gap-1 px-3.5 py-1.5 text-xs font-bold text-emerald-900 bg-emerald-50 border-emerald-300 hover:bg-emerald-100"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Approve Draft</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setActiveOfferThread(thread)}
                        className="glass-btn gap-1 px-3.5 py-1.5 text-xs font-bold text-black"
                      >
                        <Briefcase className="h-3 w-3" />
                        <span>Offer</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Advices Section (Visible only after clicking Advices button) */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-neutral-100 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                        <span className="flex items-center gap-1.5">
                          <Gavel className="h-3.5 w-3.5 text-black" />
                          Advocate Legal Advices ({thread.advices.length})
                        </span>
                        <span className="text-[11px] font-normal text-neutral-400">
                          Expert opinions by verified advocates
                        </span>
                      </div>

                      {thread.advices.length === 0 ? (
                        <p className="text-xs text-neutral-400 italic py-1">
                          No advices posted yet. Verified advocates will review this case shortly.
                        </p>
                      ) : (
                        <div className="space-y-2.5">
                          {thread.advices.map((advice) => (
                            <div
                              key={advice.id}
                              className="p-3 sm:p-3.5 bg-neutral-50/80 rounded-xl border border-neutral-200/80 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={advice.lawyerAvatar}
                                    alt={advice.lawyerName}
                                    className="h-7 w-7 rounded-full object-cover border border-neutral-200"
                                  />
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs font-bold text-black">
                                        {advice.lawyerName}
                                      </span>
                                      {advice.isVerified && (
                                        <CheckCircle2 className="h-3 w-3 text-black" />
                                      )}
                                    </div>
                                    <p className="text-[10px] text-neutral-500">
                                      {advice.lawyerTitle} • {advice.experienceYears} Yrs Experience • {advice.city}
                                    </p>
                                  </div>
                                </div>
                                <span className="text-[10px] text-neutral-400">{advice.createdAt}</span>
                              </div>

                              <p dir="auto" className="text-xs text-neutral-800 leading-relaxed">
                                {advice.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Post Advice Input */}
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          dir="auto"
                          placeholder="Write professional legal advice (English / اردو)..."
                          value={adviceInputs[thread.id] || ''}
                          onChange={(e) =>
                            setAdviceInputs((prev) => ({
                              ...prev,
                              [thread.id]: e.target.value
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handlePostAdvice(thread.id);
                            }
                          }}
                          className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-black placeholder:text-neutral-400 outline-none focus:border-black transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => handlePostAdvice(thread.id)}
                          className="glass-btn px-3.5 py-2 text-xs font-bold text-black flex items-center gap-1"
                        >
                          <Send className="h-3 w-3" />
                          <span>Advise</span>
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}


      {/* "Offer" Representation Modal (Advocate to Post Author) */}
      {activeOfferThread && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-black" />
                <h3 className="text-sm font-bold text-black">Send Private Representation Offer</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveOfferThread(null)}
                className="p-1 hover:bg-neutral-100 rounded-full text-neutral-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-neutral-50 p-3 rounded-xl text-xs space-y-1">
              <p dir="auto" className="font-semibold text-black">{activeOfferThread.title}</p>
              <p className="text-neutral-500 text-[11px]">
                Target Client: {activeOfferThread.authorName} • {activeOfferThread.authorCity}
              </p>
              <p className="text-[10px] text-neutral-400 pt-0.5">
                * Note: Your offer will be sent privately to the post author.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Estimated Representation Fee Quote (PKR):
              </label>
              <input
                type="number"
                value={offerFee}
                onChange={(e) => setOfferFee(e.target.value)}
                placeholder="e.g. 35000"
                className="w-full text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Offer / Chamber Note:
              </label>
              <textarea
                rows={3}
                dir="auto"
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                placeholder="Explain how you can handle this case (English or اردو)..."
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 outline-none focus:border-black resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveOfferThread(null)}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:text-black rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendRepresentationOffer}
                className="glass-btn px-4 py-1.5 text-xs font-bold text-black"
              >
                Send Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-2xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage}
              alt="Evidence preview"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-3 -right-3 p-2 bg-black text-white rounded-full shadow-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Free Legal Tools Generator Wizard Modal */}
      <FreeLegalToolsWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSuccessPost={() => {
          showToast('Draft posted to feed for Advocate review!');
          loadThreads();
        }}
      />
    </div>
  );
};
