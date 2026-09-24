export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'lawyer' | 'admin';
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: {
    name: string;
    url: string;
    size: number;
    type: string;
  }[];
}

export interface Conversation {
  id: string;
  matterId?: string;
  matterNumber?: string;
  matterTitle?: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  lawyerId: string;
  lawyerName: string;
  lawyerAvatar?: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
}
