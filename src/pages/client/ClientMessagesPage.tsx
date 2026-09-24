import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { messageService } from '@/services';
import { Conversation, ChatMessage } from '@/types/message';
import { useSEO } from '@/hooks/useSEO';
import { formatTime } from '@/utils/date';
import { LoadingState } from '@/components/feedback';
import { Send, ShieldCheck } from 'lucide-react';

export const ClientMessagesPage: React.FC = () => {
  useSEO({ title: 'Secure Messages — ApkaLawyer', noIndex: true });
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    messageService.getConversations(user.id).then((convs) => {
      setConversations(convs);
      if (convs.length > 0) {
        setActiveConv(convs[0]);
        messageService.getMessages(convs[0].id).then((msgs) => {
          setMessages(msgs);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, [user]);

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

  if (isLoading) return <LoadingState message="Connecting to encrypted messaging channel..." />;

  return (
    <div className="space-y-4 max-w-7xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Privileged Communications</h1>
        <p className="text-xs text-slate-500">Direct encrypted correspondence with retained counsel.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Conversation List */}
        <div className="border-r border-slate-200 p-4 space-y-2 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => {
                setActiveConv(conv);
                messageService.getMessages(conv.id).then(setMessages);
              }}
              className={`p-3 rounded-xl cursor-pointer transition-all ${
                activeConv?.id === conv.id ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">{conv.lawyerName}</span>
                <span className="text-[10px] text-slate-400">10:15 AM</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{conv.lastMessage}</p>
            </div>
          ))}
        </div>

        {/* Chat Thread */}
        <div className="md:col-span-2 flex flex-col h-full bg-slate-50">
          {activeConv ? (
            <>
              <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{activeConv.lawyerName}</h3>
                  <p className="text-[10px] text-emerald-600 font-medium">Advocate High Court</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Privileged
                </div>
              </div>

              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {messages.map((m) => {
                  const isMe = m.senderId === user?.id;
                  return (
                    <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                          isMe
                            ? 'bg-emerald-600 text-white rounded-br-none'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                        }`}
                      >
                        <p>{m.content}</p>
                        <span className={`text-[9px] mt-1 block ${isMe ? 'text-emerald-100' : 'text-slate-400'}`}>
                          {formatTime(m.timestamp)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message to your counsel..."
                  className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
              Select a conversation to begin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
