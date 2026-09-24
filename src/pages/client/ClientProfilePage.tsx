import React from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { useSEO } from '@/hooks/useSEO';
import { maskCNIC, formatPakPhone } from '@/utils/formatters';
import { ShieldCheck } from 'lucide-react';

export const ClientProfilePage: React.FC = () => {
  useSEO({ title: 'Profile & Identity — ApkaLawyer', noIndex: true });
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Profile & Verification</h1>
        <p className="text-xs text-slate-500">Manage identity credentials and account security.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
            alt="User avatar"
            className="h-16 w-16 rounded-2xl object-cover border border-slate-200"
          />
          <div>
            <div className="flex items-center gap-1.5 text-black text-xs font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Verified Client Profile
            </div>
            <h2 className="text-lg font-bold text-slate-900">{user?.name}</h2>
            <p className="text-xs text-slate-500">{user?.city || 'Lahore, Pakistan'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">CNIC Number</span>
            <span className="font-mono font-bold text-slate-800 text-sm mt-0.5 block">
              {maskCNIC(user?.cnicMasked || '35201-1234567-1')}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Registered Mobile</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">
              {formatPakPhone(user?.phone || '03001234567')}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Email Address</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">
              {user?.email || 'client@apkalawyer.pk'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Account Security</span>
            <span className="font-bold text-black text-sm mt-0.5 block">
              Two-Factor Ready (SMS OTP)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
