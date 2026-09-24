import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { 
  ShieldAlert, 
  Users, 
  UserCheck, 
  Briefcase, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Calendar,
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';
import { cn } from '@/lib/utils';

export const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: 'Admin Overview', path: ROUTES.ADMIN.DASHBOARD, icon: BarChart3 },
    { label: 'Bar Verification Queue', path: ROUTES.ADMIN.VERIFICATION, icon: UserCheck },
    { label: 'All Lawyers', path: ROUTES.ADMIN.LAWYERS, icon: Users },
    { label: 'All Users', path: ROUTES.ADMIN.USERS, icon: Users },
    { label: 'Consultations', path: ROUTES.ADMIN.BOOKINGS, icon: Calendar },
    { label: 'Platform Matters', path: ROUTES.ADMIN.MATTERS, icon: Briefcase },
    { label: 'Escrow & Payouts', path: ROUTES.ADMIN.PAYMENTS, icon: CreditCard },
    { label: 'Safety & Disputes', path: ROUTES.ADMIN.REPORTS, icon: ShieldAlert },
    { label: 'Platform Settings', path: ROUTES.ADMIN.SETTINGS, icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 hidden md:flex">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link to={ROUTES.PUBLIC.HOME} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-sky-500 flex items-center justify-center text-slate-950 font-bold text-sm">
              AL
            </div>
            <div>
              <span className="font-bold text-white tracking-tight">ApkaLawyer</span>
              <span className="block text-[10px] text-sky-400 font-medium uppercase">Administration</span>
            </div>
          </Link>
        </div>

        {/* Nav list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-sky-600 text-white font-semibold'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                )}
              >
                <Icon className={cn('h-4 w-4', isActive ? 'text-white' : 'text-slate-400')} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800">
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <h1 className="text-base font-semibold text-slate-800">Admin Control Center</h1>
          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.PUBLIC.HOME}
              className="text-xs text-slate-600 hover:text-sky-600 font-medium"
            >
              Public Website
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
