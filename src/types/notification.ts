export type NotificationType = 
  | 'hearing_alert' 
  | 'booking_request' 
  | 'booking_confirmed' 
  | 'matter_update' 
  | 'document_shared' 
  | 'payment_received' 
  | 'payment_due' 
  | 'message_new' 
  | 'system_alert';

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  meta?: Record<string, string | number | boolean>;
}
