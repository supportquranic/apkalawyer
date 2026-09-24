import { IMessageService } from '../interfaces/message.service.interface';
import { Conversation, ChatMessage } from '@/types/message';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '@/data/mock/messages.mock';

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockMessageService implements IMessageService {
  async getConversations(_userId: string): Promise<Conversation[]> {
    await delay(200);
    return MOCK_CONVERSATIONS;
  }

  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    await delay(150);
    return MOCK_MESSAGES[conversationId] || [];
  }

  async sendMessage(
    conversationId: string,
    senderId: string,
    senderName: string,
    senderRole: 'client' | 'lawyer' | 'admin',
    content: string
  ): Promise<ChatMessage> {
    await delay(250);
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      senderName,
      senderRole,
      content,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    if (!MOCK_MESSAGES[conversationId]) {
      MOCK_MESSAGES[conversationId] = [];
    }
    MOCK_MESSAGES[conversationId].push(newMessage);
    return newMessage;
  }
}
