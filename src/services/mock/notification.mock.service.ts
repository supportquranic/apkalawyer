import { INotificationService } from '../interfaces/notification.service.interface';
import { AppNotification } from '@/types/notification';
import { MOCK_NOTIFICATIONS } from '@/data/mock/notifications.mock';

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockNotificationService implements INotificationService {
  private notifications = [...MOCK_NOTIFICATIONS];

  async getNotifications(_userId: string): Promise<AppNotification[]> {
    await delay(200);
    return this.notifications;
  }

  async markAsRead(id: string): Promise<boolean> {
    await delay(100);
    const notif = this.notifications.find((n) => n.id === id);
    if (notif) notif.isRead = true;
    return true;
  }

  async markAllAsRead(_userId: string): Promise<boolean> {
    await delay(150);
    this.notifications.forEach((n) => (n.isRead = true));
    return true;
  }
}
