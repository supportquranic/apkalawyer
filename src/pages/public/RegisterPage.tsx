import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { ROUTES } from '@/routes/paths';

export const RegisterPage: React.FC = () => {
  useSEO({
    title: 'Register Account — ApkaLawyer',
    description: 'Create an account on ApkaLawyer as a client or register as an advocate.',
  });

  return (
    <div className="min-h-[70vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-2xl font-bold tracking-tight text-black">Create an Account</h1>
        <p className="mt-1 text-xs text-neutral-500">Join Pakistan's verified legal technology network.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 border border-neutral-200 rounded-xl sm:px-8 text-center space-y-4">
          <p className="text-xs text-neutral-600 leading-relaxed">
            Client and advocate registrations will connect to SMS OTP verification upon production backend deployment. You can currently explore all workspace features through the role switcher.
          </p>
          <Link
            to={ROUTES.PUBLIC.LOGIN}
            className="w-full inline-flex justify-center items-center rounded-lg bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Go to Role Sign-In
          </Link>
        </div>
      </div>
    </div>
  );
};
