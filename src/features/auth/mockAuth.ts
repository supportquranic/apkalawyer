import { User } from '@/types/user';

export const DEMO_USERS: Record<string, User> = {
  client: {
    id: 'client-01',
    name: 'Bilal Ahmad Khan',
    email: 'client@apkalawyer.pk',
    phone: '03001234567',
    role: 'client',
    city: 'Lahore',
    cnicMasked: '35201-*******-1',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-10-01T10:00:00Z',
  },
  lawyer: {
    id: 'lawyer-01',
    name: 'Advocate Muhammad Zeeshan Malik',
    email: 'lawyer@apkalawyer.pk',
    phone: '03008451290',
    role: 'lawyer',
    city: 'Lahore',
    cnicMasked: '35202-*******-3',
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&auto=format&fit=crop&q=80',
    createdAt: '2023-01-15T09:00:00Z',
  },
  admin: {
    id: 'admin-01',
    name: 'Legal Compliance Administrator',
    email: 'admin@apkalawyer.pk',
    phone: '03000000000',
    role: 'admin',
    city: 'Islamabad',
    isVerified: true,
    createdAt: '2023-01-01T00:00:00Z',
  },
};
