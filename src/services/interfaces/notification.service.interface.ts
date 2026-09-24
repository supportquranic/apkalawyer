import { AppNotification } from '@/types/notification';

export interface INotificationService {
  getNotifications(userId: string): Promise<AppNotification[]>;
  markAsRead(id: string): Promise<boolean>;
  markAllAsRead(userId: string): Promise<boolean>;
}
