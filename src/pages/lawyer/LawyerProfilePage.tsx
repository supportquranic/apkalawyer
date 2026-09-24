import React from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { useSEO } from '@/hooks/useSEO';
import { ShieldCheck } from 'lucide-react';

export const LawyerChamberProfilePage: React.FC = () => {
  useSEO({ title: 'Chamber Profile — ApkaLawyer', noIndex: true });
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Chamber Profile & Settings</h1>
        <p className="text-xs text-slate-500">Public directory visibility, fee cards, and enrollment credentials.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150'}
            alt="Lawyer avatar"
            className="h-16 w-16 rounded-2xl object-cover border border-slate-200"
          />
          <div>
            <div className="flex items-center gap-1.5 text-black text-xs font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Verified Advocate High Court
            </div>
            <h2 className="text-lg font-bold text-slate-900">{user?.name}</h2>
            <p className="text-xs text-slate-500">{user?.city || 'Lahore, Pakistan'}</p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-600 space-y-3">
          <p>
            <strong>Chamber Address:</strong> Chamber 402, Al-Rehman Centre, Fane Road, High Court, Lahore
          </p>
          <p>
            <strong>Standard Consultation Fee:</strong> PKR 7,500
          </p>
        </div>
      </div>
    </div>
  );
};
