import { Conversation, ChatMessage } from '@/types/message';

export interface IMessageService {
  getConversations(userId: string): Promise<Conversation[]>;
  getMessages(conversationId: string): Promise<ChatMessage[]>;
  sendMessage(conversationId: string, senderId: string, senderName: string, senderRole: 'client' | 'lawyer' | 'admin', content: string): Promise<ChatMessage>;
}
