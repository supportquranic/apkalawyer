import React from 'react';
import { NotFoundState } from '@/components/feedback/NotFoundState';
import { useSEO } from '@/hooks/useSEO';

export const NotFoundPage: React.FC = () => {
  useSEO({
    title: '404 - Page Not Found',
    noIndex: true,
  });

  return <NotFoundState />;
};
