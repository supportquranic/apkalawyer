import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { 
  LayoutDashboard, 
  Inbox, 
  Users, 
  Briefcase, 
  Calendar, 
  Gavel, 
  MessageSquare, 
  FileText, 
  DollarSign, 
  UserCheck, 
  ShieldCheck, 
  LogOut,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';
import { cn } from '@/lib/utils';

export const LawyerLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const desktopNavItems = [
    { label: 'Dashboard', path: ROUTES.LAWYER.DASHBOARD, icon: LayoutDashboard },
    { label: 'Client Requests', path: ROUTES.LAWYER.REQUESTS, icon: Inbox },
    { label: 'Client Directory', path: ROUTES.LAWYER.CLIENTS, icon: Users },
    { label: 'Case Matters', path: ROUTES.LAWYER.MATTERS, icon: Briefcase },
    { label: 'Court Diary / Hearings', path: ROUTES.LAWYER.HEARINGS, icon: Gavel },
    { label: 'Calendar', path: ROUTES.LAWYER.CALENDAR, icon: Calendar },
    { label: 'Client Messages', path: ROUTES.LAWYER.MESSAGES, icon: MessageSquare },
    { label: 'Documents & Filings', path: ROUTES.LAWYER.DOCUMENTS, icon: FileText },
    { label: 'Fee Collections', path: ROUTES.LAWYER.EARNINGS, icon: DollarSign },
    { label: 'Chamber Profile', path: ROUTES.LAWYER.PROFILE, icon: UserCheck },
    { label: 'Bar Verification', path: ROUTES.LAWYER.VERIFICATION, icon: ShieldCheck },
  ];

  const mobileBottomNavItems = [
    { label: 'Home', path: ROUTES.LAWYER.DASHBOARD, icon: LayoutDashboard },
    { label: 'Requests', path: ROUTES.LAWYER.REQUESTS, icon: Inbox },
    { label: 'Clients', path: ROUTES.LAWYER.CLIENTS, icon: Users },
    { label: 'Messages', path: ROUTES.LAWYER.MESSAGES, icon: MessageSquare },
    { label: 'Profile', path: ROUTES.LAWYER.PROFILE, icon: UserCheck },
  ];

  return (
    <div className="min-h-screen flex bg-neutral-50/50 text-black">
      {/* Desktop Sidebar */}
      <aside className="w-60 bg-white text-neutral-800 flex flex-col border-r border-neutral-200 hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-neutral-100">
          <Link to={ROUTES.PUBLIC.HOME} className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-black">
              Apka<span className="font-normal text-neutral-500">Lawyer</span>
            </span>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-neutral-100 flex items-center gap-3">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100'}
            alt="Lawyer avatar"
            className="h-8 w-8 rounded-full object-cover border border-neutral-200"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-black truncate">{user?.name || 'Advocate'}</p>
            <p className="text-[11px] text-neutral-400 truncate">Advocate High Court</p>
          </div>
        </div>

        {/* Nav list */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {desktopNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-neutral-100 text-black font-semibold'
                    : 'text-neutral-500 hover:bg-neutral-50 hover:text-black'
                )}
              >
                <Icon className={cn('h-4 w-4', isActive ? 'text-black' : 'text-neutral-400')} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-3 border-t border-neutral-100">
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-500 hover:text-black hover:bg-neutral-50 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4 text-neutral-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
        <header className="h-14 bg-white border-b border-neutral-200 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-black">Advocate Chambers</span>
          </div>
          <Link
            to={ROUTES.PUBLIC.HOME}
            className="text-xs text-neutral-500 hover:text-black flex items-center gap-1 font-medium transition-colors"
          >
            Public Site
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </header>

        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Floating Bottom Navigation Bar (Ultra-Realistic Liquid Glass Toggle) */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-4 inset-x-4 max-w-md mx-auto liquid-glass-nav p-1 flex items-center justify-between z-50 md:hidden"
      >
        {mobileBottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex-1 py-2 px-1 text-center font-sans tracking-tight transition-all duration-300 relative z-10',
                'liquid-nav-label',
                isActive ? 'active' : ''
              )}
            >
              <span className="inline-block text-[12px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
