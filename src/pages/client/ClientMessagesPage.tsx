import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { messageService } from '@/services';
import { Conversation, ChatMessage } from '@/types/message';
import { useSEO } from '@/hooks/useSEO';
import { formatTime } from '@/utils/date';
import { LoadingState } from '@/components/feedback';
import {
  Send,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─── helper: parse offer card content string ─── */
function parseOfferCard(content: string) {
  const parts = content.replace('__OFFER_CARD__|', '').split('|');
  return {
    title: parts[0] || '',
    experience: parts[1] || '',
    city: parts[2] || '',
    fee: Number(parts[3]) || 0,
    message: parts[4] || '',
    caseTitle: parts[5] || '',
  };
}

export const ClientMessagesPage: React.FC = () => {
  useSEO({ title: 'Messages & Offers — ApkaLawyer', noIndex: true });
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    if (!user) return;
    messageService.getConversations(user.id).then((convs) => {
      setConversations(convs);
      setIsLoading(false);
    });
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const openConversation = (conv: Conversation) => {
    setActiveConv(conv);
    messageService.getMessages(conv.id).then(setMessages);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv || !user) return;
    const msg = await messageService.sendMessage(
      activeConv.id,
      user.id,
      user.name,
      'client',
      inputText.trim()
    );
    setMessages((prev) => [...prev, msg]);
    setInputText('');
  };

  if (isLoading) return <LoadingState message="Loading messages & offers..." />;

  // Separate conversations: offers vs regular messages
  const offerConvs = conversations.filter((c) => c.id.startsWith('conv-offer'));
  const regularConvs = conversations.filter((c) => !c.id.startsWith('conv-offer'));

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="h-4 w-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[320px_1fr] rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        {/* ═══════════════════════════════════════════════
            LEFT PANEL — CONVERSATION LIST
           ═══════════════════════════════════════════════ */}
        <div
          className={cn(
            'border-r border-neutral-200 flex flex-col bg-white',
            activeConv ? 'hidden md:flex' : 'flex'
          )}
        >
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-neutral-100">
            <h1 className="text-base font-bold text-black tracking-tight flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-black" />
              Messages & Offers
            </h1>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Direct messages and advocate representation proposals
            </p>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto">
            {/* Offer Conversations Section */}
            {offerConvs.length > 0 && (
              <div className="px-3 pt-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-1 mb-2 flex items-center gap-1.5">
                  <Briefcase className="h-3 w-3" />
                  Representation Offers ({offerConvs.length})
                </p>
                <div className="space-y-1">
                  {offerConvs.map((conv) => (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => openConversation(conv)}
                      className={cn(
                        'w-full text-left p-3 rounded-xl transition-all',
                        activeConv?.id === conv.id
                          ? 'bg-neutral-100 border border-neutral-200'
                          : 'hover:bg-neutral-50'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex-shrink-0">
                          <img
                            src={conv.lawyerAvatar}
                            alt={conv.lawyerName}
                            className="h-9 w-9 rounded-full object-cover border border-neutral-200"
                          />
                          {conv.unreadCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-black ring-2 ring-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-bold text-black truncate">{conv.lawyerName}</span>
                            <span className="text-[9px] text-neutral-400 flex-shrink-0 ml-2">
                              {formatTime(conv.lastMessageTimestamp)}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 truncate">{conv.matterTitle?.replace('💼 ', '')}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Conversations */}
            {regularConvs.length > 0 && (
              <div className="px-3 pt-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-1 mb-2 flex items-center gap-1.5">
                  <MessageSquare className="h-3 w-3" />
                  Direct Messages ({regularConvs.length})
                </p>
                <div className="space-y-1">
                  {regularConvs.map((conv) => (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => openConversation(conv)}
                      className={cn(
                        'w-full text-left p-3 rounded-xl transition-all',
                        activeConv?.id === conv.id
                          ? 'bg-neutral-100 border border-neutral-200'
                          : 'hover:bg-neutral-50'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex-shrink-0">
                          <img
                            src={conv.lawyerAvatar}
                            alt={conv.lawyerName}
                            className="h-9 w-9 rounded-full object-cover border border-neutral-200"
                          />
                          {conv.unreadCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-black ring-2 ring-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-bold text-black truncate">{conv.lawyerName}</span>
                            <span className="text-[9px] text-neutral-400 flex-shrink-0 ml-2">
                              {formatTime(conv.lastMessageTimestamp)}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 truncate">{conv.lastMessage}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {conversations.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <MessageSquare className="h-8 w-8 text-neutral-300 mb-2" />
                <p className="text-xs text-neutral-400">No conversations yet</p>
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            RIGHT PANEL — CHAT THREAD
           ═══════════════════════════════════════════════ */}
        <div
          className={cn(
            'flex flex-col h-full bg-neutral-50/50',
            !activeConv ? 'hidden md:flex' : 'flex'
          )}
        >
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="px-4 py-3 bg-white border-b border-neutral-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Mobile back button */}
                  <button
                    type="button"
                    onClick={() => { setActiveConv(null); setMessages([]); }}
                    className="md:hidden p-1.5 -ml-1 hover:bg-neutral-100 rounded-full text-neutral-600"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <img
                    src={activeConv.lawyerAvatar}
                    alt={activeConv.lawyerName}
                    className="h-9 w-9 rounded-full object-cover border border-neutral-200 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-black truncate">{activeConv.lawyerName}</h3>
                      <CheckCircle2 className="h-3 w-3 text-black flex-shrink-0" />
                    </div>
                    {activeConv.matterTitle && (
                      <p dir="auto" className="text-[10px] text-neutral-500 truncate">
                        {activeConv.matterTitle.replace(/💼\s?/, '')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400 flex-shrink-0">
                  <ShieldCheck className="h-3.5 w-3.5 text-black" />
                  <span className="hidden sm:inline">Privileged</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 px-3 py-4 space-y-3 overflow-y-auto">
                {messages.map((m) => {
                  const isMe = m.senderId === user?.id;
                  const isOfferCard = m.content.startsWith('__OFFER_CARD__|');

                  // ── Render Offer Proposal Card ──
                  if (isOfferCard) {
                    const offer = parseOfferCard(m.content);
                    return (
                      <div key={m.id} className="flex justify-start">
                        <div className="max-w-sm w-full">
                          {/* Offer card */}
                          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                            {/* Card header */}
                            <div className="bg-neutral-900 px-4 py-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-white" />
                                <span className="text-xs font-bold text-white">Representation Offer</span>
                              </div>
                              <span className="text-[10px] font-bold text-white/70">
                                {formatTime(m.timestamp)}
                              </span>
                            </div>

                            {/* Card body */}
                            <div className="p-4 space-y-3">
                              {/* Case reference */}
                              {offer.caseTitle && (
                                <div className="bg-neutral-50 rounded-xl p-2.5 border border-neutral-100">
                                  <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-0.5">Re: Case Matter</p>
                                  <p dir="auto" className="text-xs font-bold text-black leading-snug">{offer.caseTitle}</p>
                                </div>
                              )}

                              {/* Advocate info row */}
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={activeConv.lawyerAvatar}
                                  alt={activeConv.lawyerName}
                                  className="h-8 w-8 rounded-full object-cover border border-neutral-200"
                                />
                                <div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs font-bold text-black">{activeConv.lawyerName}</span>
                                    <CheckCircle2 className="h-3 w-3 text-black" />
                                  </div>
                                  <p className="text-[10px] text-neutral-500">
                                    {offer.title} • {offer.experience} Yrs • {offer.city}
                                  </p>
                                </div>
                              </div>

                              {/* Fee badge */}
                              {offer.fee > 0 && (
                                <div className="flex items-center justify-between bg-neutral-50 rounded-xl px-3.5 py-2.5 border border-neutral-200">
                                  <span className="text-[10px] font-semibold text-neutral-500">Quoted Fee</span>
                                  <span className="text-sm font-bold text-black">PKR {offer.fee.toLocaleString()}</span>
                                </div>
                              )}

                              {/* Proposal note */}
                              <p dir="auto" className="text-xs text-neutral-700 leading-relaxed italic">
                                "{offer.message}"
                              </p>

                              {/* Action buttons */}
                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => showToast('Representation accepted! Advocate will be notified.')}
                                  className="flex-1 glass-btn px-3 py-2 text-xs font-bold text-black gap-1.5 justify-center"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Accept
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const input = document.querySelector<HTMLInputElement>('#chat-input');
                                    if (input) { input.focus(); }
                                  }}
                                  className="flex-1 px-3 py-2 text-xs font-bold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors flex items-center gap-1.5 justify-center"
                                >
                                  <Send className="h-3.5 w-3.5" />
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // ── Regular chat bubble ──
                  return (
                    <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={cn(
                          'max-w-[75%] sm:max-w-md px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed',
                          isMe
                            ? 'bg-black text-white rounded-br-sm'
                            : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-sm shadow-sm'
                        )}
                      >
                        {!isMe && (
                          <p className="text-[10px] font-bold text-neutral-500 mb-1">{m.senderName}</p>
                        )}
                        <p dir="auto">{m.content}</p>
                        <span className={cn('text-[9px] mt-1.5 block', isMe ? 'text-neutral-400' : 'text-neutral-400')}>
                          {formatTime(m.timestamp)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-neutral-200 flex gap-2">
                <input
                  id="chat-input"
                  type="text"
                  dir="auto"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message (English / اردو)..."
                  className="flex-1 rounded-xl border border-neutral-200 px-3.5 py-2.5 text-xs text-black placeholder:text-neutral-400 focus:border-black focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="glass-btn px-4 py-2.5 text-xs font-bold text-black"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-2">
              <div className="h-16 w-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-2">
                <MessageSquare className="h-7 w-7 text-neutral-300" />
              </div>
              <h3 className="text-sm font-bold text-black">Select a conversation</h3>
              <p className="text-xs text-neutral-400 max-w-xs">
                Choose a message thread or representation offer from the left panel to start chatting.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
