import { LegalThread } from '@/types/thread';

export const initialMockThreads: LegalThread[] = [
  {
    id: 'thread-001',
    authorId: 'usr-client-01',
    authorName: 'Tariq Mehmood',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    authorCity: 'Lahore, Punjab',
    category: 'Property & Land Dispute',
    title: 'Disputed possession of ancestral inherited agricultural land in Sheikhupura',
    content: 'My late grandfather left 16 acres of registered agricultural land with a clear Fard Malkiat. Recent mutation (Intiqal) was secretly transferred without my mother’s required legal consent. Need urgent advice on filing a Suit for Declaration and obtaining a Stay Order before harvest.',
    images: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800'
    ],
    createdAt: '2 hours ago',
    helpfulCount: 42,
    hasUserLiked: false,
    status: 'open',
    advices: [
      {
        id: 'adv-001',
        lawyerId: 'law-001',
        lawyerName: 'Barrister Ahmad Hassan',
        lawyerAvatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150',
        lawyerTitle: 'Senior Advocate High Court',
        experienceYears: 16,
        city: 'Lahore',
        isVerified: true,
        content: 'Under Section 42 of Specific Relief Act 1877, file a Suit for Declaration immediately before Civil Judge Sheikhupura with an Order 39 Rules 1 & 2 application for ad-interim injunction (Stay Order).',
        createdAt: '1 hour ago',
        upvotes: 18,
      },
      {
        id: 'adv-002',
        lawyerId: 'law-002',
        lawyerName: 'Advocate Maria Rehman',
        lawyerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
        lawyerTitle: 'Land Revenue & Civil Specialist',
        experienceYears: 11,
        city: 'Lahore',
        isVerified: true,
        content: 'Also lodge a revenue challenge before ADC(R) under Section 161 of Land Revenue Act 1967 against the fraudulent Mutation.',
        createdAt: '45 mins ago',
        upvotes: 9,
      }
    ],
    offers: [
      {
        id: 'off-001',
        lawyerId: 'law-001',
        lawyerName: 'Barrister Ahmad Hassan',
        lawyerAvatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150',
        lawyerTitle: 'Senior Advocate High Court',
        city: 'Lahore',
        experienceYears: 16,
        feeQuotePKR: 45000,
        message: 'I regularly handle revenue and civil injunctions at Sheikhupura Civil Courts and Lahore High Court. I can draft and file the Stay Order petition within 24 hours.',
        createdAt: '30 mins ago'
      }
    ]
  },
  {
    id: 'thread-002',
    authorId: 'usr-client-02',
    authorName: 'Farhan Ali Qureshi',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    authorCity: 'Karachi, Sindh',
    category: 'Corporate & Contracts',
    title: 'Software vendor pending PKR 2.4M payment after approved SLA milestone',
    content: 'Our IT consultancy signed a formal SLA with an offshore client subsidiary in Karachi. We delivered Phase 1 & 2 with sign-offs. Overdue for 75 days. What is the fastest legal recourse — Legal Notice under Contract Act or Order 37 CPC Summary Suit?',
    images: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800'
    ],
    createdAt: '5 hours ago',
    helpfulCount: 29,
    hasUserLiked: true,
    status: 'open',
    advices: [
      {
        id: 'adv-003',
        lawyerId: 'law-003',
        lawyerName: 'Advocate Zeeshan Malik',
        lawyerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        lawyerTitle: 'Corporate & Commercial Litigator',
        experienceYears: 14,
        city: 'Karachi',
        isVerified: true,
        content: 'First step: Issue a formal Legal Demand Notice with a strict 14-day cure period under Section 73 of the Contract Act 1872. If unpaid, file a Summary Suit for Recovery under Order 37 CPC at the District / High Court.',
        createdAt: '3 hours ago',
        upvotes: 14,
      }
    ],
    offers: [
      {
        id: 'off-002',
        lawyerId: 'law-003',
        lawyerName: 'Advocate Zeeshan Malik',
        lawyerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        lawyerTitle: 'Corporate & Commercial Litigator',
        city: 'Karachi',
        experienceYears: 14,
        feeQuotePKR: 25000,
        message: 'I can draft and serve the formal legal recovery notice with High Court chamber seal within 1 working day and initiate recovery proceedings.',
        createdAt: '2 hours ago'
      }
    ]
  },
  {
    id: 'thread-003',
    authorId: 'usr-client-03',
    authorName: 'Sana Fatima',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    authorCity: 'Islamabad Capital Territory',
    category: 'Family & Khula / Maintenance',
    title: 'نکاح نامے میں درج حق مہر اور بچے کے نان نفقہ کا دعویٰ',
    content: 'شوہر گزشتہ 9 ماہ سے بغیر خرچہ نان نفقہ کے باہر مقیم ہے۔ نکاح نامے میں حق مہر معجل درج ہے۔ کیا فیملی کورٹ اسلام آباد میں خلع، سامان جہیز اور خرچے کا متفقہ دعویٰ دائر ہو سکتا ہے؟',
    images: [],
    createdAt: '1 day ago',
    helpfulCount: 56,
    hasUserLiked: false,
    status: 'open',
    advices: [
      {
        id: 'adv-004',
        lawyerId: 'law-004',
        lawyerName: 'Advocate Ayesha Siddiqui',
        lawyerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
        lawyerTitle: 'Family Law Advocate High Court',
        experienceYears: 12,
        city: 'Islamabad',
        isVerified: true,
        content: 'جی ہاں! فیملی کورٹس ایکٹ 1964 کے تحت آپ خلع، سامان جہیز، حق مہر اور بچے کے ماہانہ خرچ کا متفقہ دعویٰ ایک ہی عدالت میں دائر کر سکتی ہیں۔ دوسری پیشی پر ہی عبوری خرچ مقرر ہو جاتا ہے۔',
        createdAt: '20 hours ago',
        upvotes: 27,
      }
    ],
    offers: [
      {
        id: 'off-003',
        lawyerId: 'law-004',
        lawyerName: 'Advocate Ayesha Siddiqui',
        lawyerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
        lawyerTitle: 'Family Law Advocate High Court',
        city: 'Islamabad',
        experienceYears: 12,
        feeQuotePKR: 35000,
        message: 'I represent family matters daily at Islamabad District & High Courts. I will handle your complete documentation and represent you at mediation and hearings.',
        createdAt: '18 hours ago'
      }
    ]
  },
  {
    id: 'thread-004',
    authorId: 'usr-client-04',
    authorName: 'Muhammad Hamza',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    authorCity: 'Rawalpindi, Punjab',
    category: 'Cybercrime & Defamation',
    title: 'Fake cloned accounts spreading defamatory forged documents under PECA Act',
    content: 'Anonymous syndicate created cloned Instagram accounts using our company logo and defamatory receipts. We have timestamped evidence. How to file an immediate complaint with FIA Cyber Crime Wing (CCRC)?',
    images: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800'
    ],
    createdAt: '2 days ago',
    helpfulCount: 31,
    hasUserLiked: false,
    status: 'open',
    advices: [
      {
        id: 'adv-005',
        lawyerId: 'law-005',
        lawyerName: 'Advocate Bilal Nasir',
        lawyerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
        lawyerTitle: 'Cybercrime & Digital Law Expert',
        experienceYears: 9,
        city: 'Rawalpindi / Islamabad',
        isVerified: true,
        content: 'Immediately submit a complaint under Section 20 and 24 of PECA 2016 at the nearest FIA Cyber Crime Reporting Centre with digital evidence logs.',
        createdAt: '1 day ago',
        upvotes: 11,
      }
    ],
    offers: [
      {
        id: 'off-004',
        lawyerId: 'law-005',
        lawyerName: 'Advocate Bilal Nasir',
        lawyerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
        lawyerTitle: 'Cybercrime & Digital Law Expert',
        city: 'Rawalpindi / Islamabad',
        experienceYears: 9,
        feeQuotePKR: 30000,
        message: 'I can draft the FIA Cyber Crime formal representation and coordinate with the investigating officer to secure immediate takedowns and notices.',
        createdAt: '1 day ago'
      }
    ]
  }
];
