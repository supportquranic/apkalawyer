import { LegalThread, LegalAdvice, RepresentationOffer } from '@/types/thread';
import { initialMockThreads } from '@/data/mock/threads.mock';

const THREADS_STORAGE_KEY = 'apkalawyer_legal_threads_v1';

const getStoredThreads = (): LegalThread[] => {
  try {
    const raw = localStorage.getItem(THREADS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to parse stored threads:', e);
  }
  localStorage.setItem(THREADS_STORAGE_KEY, JSON.stringify(initialMockThreads));
  return initialMockThreads;
};

const setStoredThreads = (threads: LegalThread[]): void => {
  try {
    localStorage.setItem(THREADS_STORAGE_KEY, JSON.stringify(threads));
  } catch (e) {
    console.warn('Failed to save threads:', e);
  }
};

export const threadService = {
  async getThreads(category?: string, searchQuery?: string): Promise<LegalThread[]> {
    await new Promise((r) => setTimeout(r, 120));
    let threads = getStoredThreads();
    if (category && category !== 'all') {
      threads = threads.filter((t) => t.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      threads = threads.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.content.toLowerCase().includes(q) ||
          (t.urduContent && t.urduContent.includes(q)) ||
          t.authorName.toLowerCase().includes(q)
      );
    }
    return threads;
  },

  async createThread(newThreadData: {
    authorName: string;
    authorAvatar?: string;
    authorCity: string;
    category: string;
    title: string;
    content: string;
    urduContent?: string;
    images?: string[];
  }): Promise<LegalThread> {
    await new Promise((r) => setTimeout(r, 150));
    const threads = getStoredThreads();
    const newThread: LegalThread = {
      id: `thread-${Date.now()}`,
      authorId: 'usr-current',
      authorName: newThreadData.authorName || 'Client Citizen',
      authorAvatar: newThreadData.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      authorCity: newThreadData.authorCity || 'Pakistan',
      category: newThreadData.category || 'General Legal Advisory',
      title: newThreadData.title,
      content: newThreadData.content,
      urduContent: newThreadData.urduContent,
      images: (newThreadData.images || []).slice(0, 2), // max 2 images
      createdAt: 'Just now',
      helpfulCount: 1,
      hasUserLiked: true,
      status: 'open',
      advices: [],
      offers: []
    };

    const updated = [newThread, ...threads];
    setStoredThreads(updated);
    return newThread;
  },

  async addAdvice(threadId: string, adviceData: {
    lawyerName: string;
    lawyerAvatar: string;
    lawyerTitle: string;
    experienceYears: number;
    city: string;
    content: string;
    urduContent?: string;
  }): Promise<LegalAdvice> {
    await new Promise((r) => setTimeout(r, 120));
    const threads = getStoredThreads();
    const newAdvice: LegalAdvice = {
      id: `adv-${Date.now()}`,
      lawyerId: 'law-current',
      lawyerName: adviceData.lawyerName,
      lawyerAvatar: adviceData.lawyerAvatar,
      lawyerTitle: adviceData.lawyerTitle,
      experienceYears: adviceData.experienceYears,
      city: adviceData.city,
      isVerified: true,
      content: adviceData.content,
      urduContent: adviceData.urduContent,
      createdAt: 'Just now',
      upvotes: 1
    };

    const updated = threads.map((t) => {
      if (t.id === threadId) {
        return {
          ...t,
          advices: [...t.advices, newAdvice]
        };
      }
      return t;
    });

    setStoredThreads(updated);
    return newAdvice;
  },

  async addOffer(threadId: string, offerData: {
    lawyerName: string;
    lawyerAvatar: string;
    lawyerTitle: string;
    city: string;
    experienceYears: number;
    feeQuotePKR?: number;
    message: string;
  }): Promise<RepresentationOffer> {
    await new Promise((r) => setTimeout(r, 120));
    const threads = getStoredThreads();
    const newOffer: RepresentationOffer = {
      id: `off-${Date.now()}`,
      lawyerId: 'law-current',
      lawyerName: offerData.lawyerName,
      lawyerAvatar: offerData.lawyerAvatar,
      lawyerTitle: offerData.lawyerTitle,
      city: offerData.city,
      experienceYears: offerData.experienceYears,
      feeQuotePKR: offerData.feeQuotePKR,
      message: offerData.message,
      createdAt: 'Just now'
    };

    const updated = threads.map((t) => {
      if (t.id === threadId) {
        return {
          ...t,
          offers: [...t.offers, newOffer]
        };
      }
      return t;
    });

    setStoredThreads(updated);
    return newOffer;
  },

  async toggleLike(threadId: string): Promise<LegalThread | null> {
    const threads = getStoredThreads();
    let target: LegalThread | null = null;
    const updated = threads.map((t) => {
      if (t.id === threadId) {
        const liked = !t.hasUserLiked;
        target = {
          ...t,
          hasUserLiked: liked,
          helpfulCount: liked ? t.helpfulCount + 1 : Math.max(0, t.helpfulCount - 1)
        };
        return target;
      }
      return t;
    });
    setStoredThreads(updated);
    return target;
  }
};
