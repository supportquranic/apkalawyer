import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { useSEO } from '@/hooks/useSEO';
import { ROUTES } from '@/routes/paths';
import { UserRole } from '@/types/common';
import { User, Briefcase, ShieldAlert, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginAsDemoUser } = useAuth();
  const navigate = useNavigate();

  useSEO({
    title: 'Sign In — ApkaLawyer Portal',
    description: 'Sign in to access your client dashboard or advocate workspace.',
  });

  const handleDemoLogin = (role: UserRole) => {
    loginAsDemoUser(role);
    if (role === 'client') navigate(ROUTES.CLIENT.DASHBOARD);
    else if (role === 'lawyer') navigate(ROUTES.LAWYER.DASHBOARD);
    else navigate(ROUTES.ADMIN.DASHBOARD);
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-2xl font-bold tracking-tight text-black">Sign In to ApkaLawyer</h1>
        <p className="mt-1 text-xs text-neutral-500">Select a workspace role to explore the Phase 1 prototype.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 border border-neutral-200 rounded-xl sm:px-8 space-y-3">
          <button
            type="button"
            onClick={() => handleDemoLogin('client')}
            className="w-full flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:border-black transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-700">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-black">Client Portal</p>
                <p className="text-[11px] text-neutral-500">View cases, consultations & vault</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-black" />
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin('lawyer')}
            className="w-full flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:border-black transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-700">
                <Briefcase className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-black">Advocate Chambers</p>
                <p className="text-[11px] text-neutral-500">Manage court diary, clients & fees</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-black" />
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin('admin')}
            className="w-full flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:border-black transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-700">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-black">Administrator Control</p>
                <p className="text-[11px] text-neutral-500">Bar license review & platform oversight</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
