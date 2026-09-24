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
  MessageCircle,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Inbox
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

const CATEGORIES = [
  'All Matters',
  'Property & Land Dispute',
  'Corporate & Contract Breach',
  'Family & Khula / Maintenance',
  'Cybercrime & Defamation',
  'Criminal & Bail',
  'Labor & Employment',
  'Consumer Court'
];

export const ClientConsultationsPage: React.FC = () => {
  useSEO({ title: 'Legal Consultations & Advocate Advices — ApkaLawyer', noIndex: true });
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'feed' | 'my_offers'>('feed');
  const [threads, setThreads] = useState<LegalThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Matters');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Composer state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newUrduContent, setNewUrduContent] = useState('');
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
  
  // Image Lightbox Modal
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
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
    if (attachedImages.length >= 2) {
      showToast('Maximum 2 images allowed per post');
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
      urduContent: newUrduContent.trim() || undefined,
      images: attachedImages
    });

    setNewTitle('');
    setNewContent('');
    setNewUrduContent('');
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

  // Total private offers across user's threads
  const myThreads = threads.filter((t) => t.authorId === 'usr-client-01' || t.authorId === 'usr-current' || threads.indexOf(t) === 0);
  const totalOffersCount = myThreads.reduce((acc, t) => acc + (t.offers?.length || 0), 0);

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

      {/* Header Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-black tracking-tight">
                Legal Consultations
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded-full">
                Threads
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Community consultation threads, advocate advices, and private representation offers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsComposerOpen(!isComposerOpen)}
            className="glass-btn gap-1.5 px-4 py-2 text-xs font-bold text-black self-start sm:self-auto"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{isComposerOpen ? 'Close Composer' : 'Post Thread'}</span>
          </button>
        </div>

        {/* View Switcher: Public Feed vs Private Offers & Messages */}
        <div className="flex items-center gap-2 pt-1 border-t border-neutral-100">
          <button
            type="button"
            onClick={() => setActiveTab('feed')}
            className={cn(
              'flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5',
              activeTab === 'feed'
                ? 'bg-black text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200/60'
            )}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Consultation Feed</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('my_offers')}
            className={cn(
              'flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 relative',
              activeTab === 'my_offers'
                ? 'bg-black text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200/60'
            )}
          >
            <Inbox className="h-3.5 w-3.5" />
            <span>My Posts & Private Offers</span>
            {totalOffersCount > 0 && (
              <span className={cn(
                'text-[10px] px-1.5 py-0.2 rounded-full font-bold',
                activeTab === 'my_offers' ? 'bg-white text-black' : 'bg-black text-white'
              )}>
                {totalOffersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Thread Composer Modal / Card */}
      {isComposerOpen && (
        <form
          onSubmit={handleCreatePost}
          className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-sm space-y-3.5 transition-all"
        >
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2.5">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover border border-neutral-200"
              />
              <div>
                <p className="text-xs font-bold text-black">{user?.name || 'Client Account'}</p>
                <p className="text-[11px] text-neutral-400">Public Consultation Post</p>
              </div>
            </div>

            {/* Category selection */}
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              aria-label="Select Category"
              className="text-xs font-semibold bg-neutral-100 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-black outline-none focus:ring-1 focus:ring-black"
            >
              {CATEGORIES.filter((c) => c !== 'All Matters').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Brief summary of your legal matter / dispute..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full text-sm font-bold placeholder:text-neutral-400 text-black border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-black transition-colors"
            />
          </div>

          {/* English description */}
          <div>
            <textarea
              rows={3}
              placeholder="Explain your situation in detail (Facts, documents available, questions for advocates)..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full text-xs font-normal placeholder:text-neutral-400 text-black border border-neutral-200 rounded-xl p-3 outline-none focus:border-black transition-colors resize-none"
            />
          </div>

          {/* Optional Urdu text */}
          <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/80">
            <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
              اردو تفصیل (اختیاری / Optional Urdu Description):
            </label>
            <textarea
              rows={2}
              dir="rtl"
              placeholder="اپنا قانونی مسئلہ اردو میں لکھیں تاکہ وکلاء بہتر رہنمائی کر سکیں..."
              value={newUrduContent}
              onChange={(e) => setNewUrduContent(e.target.value)}
              className="w-full text-xs font-sans text-right placeholder:text-neutral-400 text-black bg-white border border-neutral-200 rounded-lg p-2.5 outline-none focus:border-black resize-none"
            />
          </div>

          {/* Images preview (Max 2 images) */}
          {attachedImages.length > 0 && (
            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-neutral-500">
                Attached Documents / Evidence ({attachedImages.length}/2):
              </p>
              <div className="grid grid-cols-2 gap-2">
                {attachedImages.map((img, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden border border-neutral-200 h-28 bg-neutral-100">
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
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddImage}
                disabled={attachedImages.length >= 2}
                className={cn(
                  'flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-neutral-200 transition-colors',
                  attachedImages.length >= 2
                    ? 'opacity-40 cursor-not-allowed bg-neutral-100 text-neutral-400'
                    : 'bg-white hover:bg-neutral-50 text-neutral-700'
                )}
              >
                <ImageIcon className="h-3.5 w-3.5" />
                <span>Attach Image (Max 2)</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="glass-btn gap-1.5 px-4 py-1.5 text-xs font-bold text-black"
            >
              <Send className="h-3 w-3" />
              <span>{isSubmitting ? 'Posting...' : 'Post Thread'}</span>
            </button>
          </div>
        </form>
      )}

      {/* =========================================================================
          TAB 1: PUBLIC CONSULTATIONS FEED
         ========================================================================= */}
      {activeTab === 'feed' && (
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="space-y-2.5">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search consultation threads, topics, questions or advocate names..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl pl-9 pr-4 py-2 text-xs text-black placeholder:text-neutral-400 outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Categories scrollable pill bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold transition-all',
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

          {/* Feed List */}
          <div className="space-y-4">
            {threads.map((thread) => {
              const isExpanded = !!expandedThreadIds[thread.id];
              return (
                <article
                  key={thread.id}
                  id={thread.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs hover:border-neutral-300 transition-all space-y-3.5"
                >
                  {/* Post Author Bar */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={thread.authorAvatar}
                        alt={thread.authorName}
                        className="h-10 w-10 rounded-full object-cover border border-neutral-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-bold text-black">
                            {thread.authorName}
                          </span>
                          <ShieldCheck className="h-3.5 w-3.5 text-neutral-700" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                          <span>{thread.authorCity}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <Clock className="h-3 w-3" />
                            {thread.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-full border border-neutral-200">
                      {thread.category}
                    </span>
                  </div>

                  {/* Title & English Content */}
                  <div className="space-y-1.5">
                    <h2 className="text-sm sm:text-base font-bold text-black tracking-tight leading-snug">
                      {thread.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                      {thread.content}
                    </p>
                  </div>

                  {/* Optional Urdu Content Block */}
                  {thread.urduContent && (
                    <div
                      dir="rtl"
                      className="p-3 rounded-xl bg-neutral-50/90 border border-neutral-200 text-right text-xs sm:text-sm font-sans leading-relaxed text-black"
                    >
                      <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                        اردو تفصیل:
                      </span>
                      <p>{thread.urduContent}</p>
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
                            Tap to Zoom
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
                        {isExpanded ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </button>
                    </div>

                    {/* Offer Representation Button */}
                    <button
                      type="button"
                      onClick={() => setActiveOfferThread(thread)}
                      className="glass-btn gap-1 px-3.5 py-1.5 text-xs font-bold text-black"
                    >
                      <Briefcase className="h-3 w-3" />
                      <span>Offer</span>
                    </button>
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

                              <p className="text-xs text-neutral-800 leading-relaxed">
                                {advice.content}
                              </p>

                              {advice.urduContent && (
                                <p
                                  dir="rtl"
                                  className="text-xs font-sans text-neutral-900 border-t border-neutral-200/60 pt-1.5 text-right"
                                >
                                  {advice.urduContent}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Post Advice Input */}
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="Write professional legal advice or citation for this client..."
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

      {/* =========================================================================
          TAB 2: MY POSTS & PRIVATE REPRESENTATION OFFERS (Confidential to Poster)
         ========================================================================= */}
      {activeTab === 'my_offers' && (
        <div className="space-y-4">
          <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-black flex-shrink-0" />
              <span>
                <strong>Confidential Section:</strong> Representation offers and direct fee quotes sent by advocates are only visible here to you.
              </span>
            </div>
            <Link
              to={ROUTES.CLIENT.MESSAGES}
              className="glass-btn px-3 py-1 text-xs font-bold text-black flex-shrink-0"
            >
              Open Messages
            </Link>
          </div>

          {myThreads.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center space-y-2">
              <Inbox className="h-8 w-8 text-neutral-300 mx-auto" />
              <h3 className="text-sm font-bold text-black">No Active Posts Yet</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Post your legal question or dispute to receive expert advices and representation offers from advocates.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('feed');
                  setIsComposerOpen(true);
                }}
                className="glass-btn px-4 py-1.5 text-xs font-bold text-black mt-2"
              >
                Create Your First Post
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myThreads.map((thread) => (
                <div
                  key={thread.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs space-y-3.5"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-neutral-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                        {thread.category} • Posted {thread.createdAt}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-black">{thread.title}</h3>
                    </div>
                    <span className="text-[10px] font-bold bg-neutral-100 text-black px-2.5 py-1 rounded-full border border-neutral-200 flex-shrink-0">
                      {thread.offers?.length || 0} Offers Received
                    </span>
                  </div>

                  {/* List of Private Offers for this specific thread */}
                  {thread.offers && thread.offers.length > 0 ? (
                    <div className="space-y-2.5">
                      <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                        Advocate Proposals & Quotes:
                      </p>
                      {thread.offers.map((offer) => (
                        <div
                          key={offer.id}
                          className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={offer.lawyerAvatar}
                              alt={offer.lawyerName}
                              className="h-10 w-10 rounded-full object-cover border border-neutral-200 flex-shrink-0"
                            />
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <p className="text-xs font-bold text-black">{offer.lawyerName}</p>
                                <CheckCircle2 className="h-3 w-3 text-black" />
                              </div>
                              <p className="text-[11px] text-neutral-500">
                                {offer.lawyerTitle} • {offer.experienceYears} Yrs Exp • {offer.city}
                              </p>
                              <p className="text-xs text-neutral-800 italic pt-1">
                                "{offer.message}"
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                            {offer.feeQuotePKR && (
                              <div className="text-right">
                                <span className="text-[10px] text-neutral-400 block">Estimated Fee</span>
                                <span className="text-xs font-bold text-black">
                                  PKR {offer.feeQuotePKR.toLocaleString()}
                                </span>
                              </div>
                            )}
                            <Link
                              to={ROUTES.CLIENT.MESSAGES}
                              className="glass-btn px-3.5 py-1.5 text-xs font-bold text-black flex items-center gap-1"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span>Message</span>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 italic py-2">
                      No representation offers submitted yet for this post.
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
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
              <p className="font-semibold text-black">{activeOfferThread.title}</p>
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
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                placeholder="Explain how you can handle this case and your availability for court representation..."
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
    </div>
  );
};
