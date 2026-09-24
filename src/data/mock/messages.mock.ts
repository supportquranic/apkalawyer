import { Conversation, ChatMessage } from '@/types/message';

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-001',
    matterId: 'mat-001',
    matterNumber: 'MAT-2026-0842',
    matterTitle: 'Writ Petition: Stay on Illegal Demolition',
    clientId: 'client-01',
    clientName: 'Bilal Ahmad Khan',
    clientAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    lawyerId: 'lawyer-01',
    lawyerName: 'Advocate Muhammad Zeeshan Malik',
    lawyerAvatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'I have uploaded the certified copy of the stay order to your vault. Please review.',
    lastMessageTimestamp: '2026-09-24T10:15:00Z',
    unreadCount: 1,
  },
];

export const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-001': [
    {
      id: 'msg-01',
      conversationId: 'conv-001',
      senderId: 'client-01',
      senderName: 'Bilal Ahmad Khan',
      senderRole: 'client',
      content: 'Assalam o Alaikum Advocate Sb. Any update from the LDA legal directorate?',
      timestamp: '2026-09-24T09:45:00Z',
      isRead: true,
    },
    {
      id: 'msg-02',
      conversationId: 'conv-001',
      senderId: 'lawyer-01',
      senderName: 'Advocate Muhammad Zeeshan Malik',
      senderRole: 'lawyer',
      content: 'Walaikum Assalam Bilal Sb. We have served the interim order to the Chief Town Planner and Assistant Director. They cannot touch the boundary wall.',
      timestamp: '2026-09-24T10:05:00Z',
      isRead: true,
    },
    {
      id: 'msg-03',
      conversationId: 'conv-001',
      senderId: 'lawyer-01',
      senderName: 'Advocate Muhammad Zeeshan Malik',
      senderRole: 'lawyer',
      content: 'I have uploaded the certified copy of the stay order to your vault. Please review.',
      timestamp: '2026-09-24T10:15:00Z',
      isRead: false,
    },
  ],
};
