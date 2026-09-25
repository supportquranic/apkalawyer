import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/features/auth/AuthContext';
import { AppRoutes } from '@/routes/AppRoutes';
import { GavelIntroAnimation } from '@/components/intro/GavelIntroAnimation';

const INTRO_SESSION_KEY = 'apkalawyer_intro_shown';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !sessionStorage.getItem(INTRO_SESSION_KEY);
    } catch {
      return false;
    }
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    } catch {
      // Ignore storage error
    }
  };

  return (
    <>
      {showIntro && <GavelIntroAnimation onComplete={handleIntroComplete} />}
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
