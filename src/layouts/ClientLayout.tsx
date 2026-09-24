import React, { useRef } from 'react';
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
  LogOut
} from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';
import { cn } from '@/lib/utils';

export const ClientLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

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

  // Mobile navigation items (Text only, no icons)
  const mobileBottomNavItems = [
    { label: 'Home', path: ROUTES.CLIENT.DASHBOARD },
    { label: 'Lawyers', path: ROUTES.CLIENT.LAWYERS },
    { label: 'Consults', path: ROUTES.CLIENT.CONSULTATIONS },
    { label: 'Matters', path: ROUTES.CLIENT.MATTERS },
    { label: 'Profile', path: ROUTES.CLIENT.PROFILE },
  ];

  const activeIndex = Math.max(
    0,
    mobileBottomNavItems.findIndex(
      (item) =>
        location.pathname === item.path ||
        (item.path !== ROUTES.CLIENT.DASHBOARD && location.pathname.startsWith(item.path))
    )
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    navRef.current.style.setProperty('--mx', `${x}%`);
    navRef.current.style.setProperty('--my', `${y}%`);
  };

  return (
    <div className="min-h-screen flex bg-[#F9FAFB] text-black">
      {/* Liquid Glass Refraction Filter Definition (Exact from Reference) */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <filter id="lens" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="2" seed="4" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="38" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </svg>

      {/* Desktop Minimal Sidebar */}
      <aside className="w-60 bg-white text-neutral-800 flex flex-col border-r border-neutral-200 hidden md:flex">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-neutral-100">
          <Link to={ROUTES.CLIENT.DASHBOARD} className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-black">
              Apka<span className="font-normal text-neutral-500">Lawyer</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-white px-1.5 py-0.5 rounded">
              App
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
      <div className="flex-1 flex flex-col min-w-0 pb-24 md:pb-6">
        {/* Compact App Header */}
        <header className="h-14 bg-white border-b border-neutral-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-sm text-black tracking-tight flex items-center gap-1.5">
              Apka<span className="font-normal text-neutral-500">Lawyer</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded border border-neutral-200/80">
              Verified
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Link
              to={ROUTES.CLIENT.NOTIFICATIONS}
              className="relative p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-black ring-2 ring-white" />
            </Link>
            <Link
              to={ROUTES.CLIENT.PROFILE}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Profile"
            >
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                alt="Profile"
                className="h-7 w-7 rounded-full object-cover border border-neutral-200"
              />
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-3.5 sm:p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Floating Bottom Navigation Bar (Exact Liquid Glass Effect) */}
      <nav
        ref={navRef}
        onPointerMove={handlePointerMove}
        aria-label="Mobile Navigation"
        className="fixed bottom-3.5 inset-x-4 max-w-sm mx-auto glass-nav grid grid-cols-5 items-center z-50 md:hidden"
      >
        {/* Sliding Thumb */}
        <span
          className="glass-thumb pointer-events-none"
          style={{
            transform: `translateX(calc(${activeIndex} * 100%))`,
            width: `calc(100% / ${mobileBottomNavItems.length})`,
          }}
        />

        {mobileBottomNavItems.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn('glass-label', isActive && 'on')}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
