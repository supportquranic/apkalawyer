import { AppNotification } from '@/types/notification';

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-001',
    userId: 'client-01',
    type: 'hearing_alert',
    title: 'Upcoming Court Hearing Reminder',
    message: 'Hearing scheduled for Writ Petition 18492/2026 before Justice Tariq Saleem Sheikh on 14 Oct 2026.',
    timestamp: '2026-09-24T08:00:00Z',
    isRead: false,
    actionUrl: '/client/hearings',
  },
  {
    id: 'notif-002',
    userId: 'client-01',
    type: 'document_shared',
    title: 'New Document Uploaded',
    message: 'Advocate Muhammad Zeeshan Malik uploaded "Certified Copy of High Court Stay Order".',
    timestamp: '2026-09-23T16:20:00Z',
    isRead: true,
    actionUrl: '/client/documents',
  },
  {
    id: 'notif-003',
    userId: 'lawyer-01',
    type: 'booking_request',
    title: 'New Consultation Booking',
    message: 'Bilal Ahmad Khan scheduled a 45-minute video consultation for 02 Oct 2026.',
    timestamp: '2026-09-22T14:20:00Z',
    isRead: true,
    actionUrl: '/lawyer/requests',
  },
];
