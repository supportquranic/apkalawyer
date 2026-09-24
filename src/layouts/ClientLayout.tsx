import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Briefcase, 
  Gavel, 
  FileText, 
  FileSignature, 
  MessageSquare, 
  CreditCard, 
  Bell, 
  User, 
  LogOut,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';
import { cn } from '@/lib/utils';

export const ClientLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Full sidebar items for desktop
  const desktopNavItems = [
    { label: 'Dashboard', path: ROUTES.CLIENT.DASHBOARD, icon: LayoutDashboard },
    { label: 'Find Lawyers', path: ROUTES.CLIENT.LAWYERS, icon: Users },
    { label: 'Consultations', path: ROUTES.CLIENT.CONSULTATIONS, icon: Calendar },
    { label: 'Legal Matters', path: ROUTES.CLIENT.MATTERS, icon: Briefcase },
    { label: 'Court Hearings', path: ROUTES.CLIENT.HEARINGS, icon: Gavel },
    { label: 'Document Vault', path: ROUTES.CLIENT.DOCUMENTS, icon: FileText },
    { label: 'Legal Drafter', path: ROUTES.CLIENT.LEGAL_DOCUMENTS, icon: FileSignature },
    { label: 'Messages', path: ROUTES.CLIENT.MESSAGES, icon: MessageSquare },
    { label: 'Payments', path: ROUTES.CLIENT.PAYMENTS, icon: CreditCard },
    { label: 'Notifications', path: ROUTES.CLIENT.NOTIFICATIONS, icon: Bell },
    { label: 'Profile', path: ROUTES.CLIENT.PROFILE, icon: User },
  ];

  // Minimal 5-item mobile bottom navigation
  const mobileBottomNavItems = [
    { label: 'Home', path: ROUTES.CLIENT.DASHBOARD, icon: LayoutDashboard },
    { label: 'Lawyers', path: ROUTES.CLIENT.LAWYERS, icon: Users },
    { label: 'Consults', path: ROUTES.CLIENT.CONSULTATIONS, icon: Calendar },
    { label: 'Messages', path: ROUTES.CLIENT.MESSAGES, icon: MessageSquare },
    { label: 'Profile', path: ROUTES.CLIENT.PROFILE, icon: User },
  ];

  return (
    <div className="min-h-screen flex bg-neutral-50/50 text-black">
      {/* Desktop Minimal Sidebar */}
      <aside className="w-60 bg-white text-neutral-800 flex flex-col border-r border-neutral-200 hidden md:flex">
        {/* Brand Header */}
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
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
            alt="User avatar"
            className="h-8 w-8 rounded-full object-cover border border-neutral-200"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-black truncate">{user?.name || 'Client'}</p>
            <p className="text-[11px] text-neutral-400 truncate">Client Account</p>
          </div>
        </div>

        {/* Nav List */}
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
        {/* Compact Top Header */}
        <header className="h-14 bg-white border-b border-neutral-200 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-black">Client Workspace</span>
          </div>
          <Link
            to={ROUTES.PUBLIC.HOME}
            className="text-xs text-neutral-500 hover:text-black flex items-center gap-1 font-medium transition-colors"
          >
            Public Site
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Floating Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-3 inset-x-3 max-w-md mx-auto bg-white/95 backdrop-blur-md border border-neutral-200 shadow-sm rounded-2xl px-2 py-1.5 flex items-center justify-around z-50 md:hidden"
      >
        {mobileBottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] transition-colors',
                isActive ? 'text-black font-semibold' : 'text-neutral-400 hover:text-neutral-700'
              )}
            >
              <Icon className={cn('h-4 w-4 mb-0.5', isActive ? 'text-black' : 'text-neutral-400')} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
