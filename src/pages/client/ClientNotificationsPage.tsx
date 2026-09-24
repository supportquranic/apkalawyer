import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { notificationService } from '@/services';
import { AppNotification } from '@/types/notification';
import { useSEO } from '@/hooks/useSEO';
import { formatDate } from '@/utils/date';
import { LoadingState } from '@/components/feedback';
import { Bell } from 'lucide-react';

export const ClientNotificationsPage: React.FC = () => {
  useSEO({ title: 'Notifications — ApkaLawyer', noIndex: true });
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    notificationService.getNotifications(user.id).then((data) => {
      setNotifications(data);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) return <LoadingState message="Loading notifications..." />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Notifications & Alerts</h1>
        <p className="text-xs text-slate-500">Real-time alerts for cause list appearances, document uploads, and case changes.</p>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Bell className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
              <span className="text-[10px] text-slate-400 mt-1 block">{formatDate(n.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
