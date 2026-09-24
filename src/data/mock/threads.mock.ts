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
    content: 'My late grandfather left 16 acres of registered agricultural land with a clear Fard Malkiat. Recent mutation (Intiqal) was secretly transferred to my distant relatives without my mother’s required legal consent. We have original Registry papers and Khasra Girdawari from 1998 onwards. Need urgent advice on filing a Suit for Declaration and obtaining a Stay Order before they harvest or sell the land.',
    urduContent: 'ہمارے دادا کی وراثتی زمین پر دوسرے رشتہ داروں نے والدہ کی رضامندی کے بغیر خفیہ انتقال کروا لیا ہے۔ ہمارے پاس فرد ملکیت اور پرانی گرداوری موجود ہے۔ براہ کرم فوری حکم امتناعی (Stay Order) اور دعویٰ استقرار حق دائر کرنے کی قانونی رہنمائی فرمائیں۔',
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
        content: 'Under Section 42 of the Specific Relief Act 1877, file a Suit for Declaration immediately before the Civil Judge in Sheikhupura. Concurrently attach an application under Order 39 Rules 1 & 2 CPC for an ad-interim injunction (Stay Order) citing irreparable loss. Also present your certified Fard and summon the Patwari record for verification.',
        urduContent: 'سول جج کی عدالت میں فوری دعویٰ استقرار حق اور آرڈر 39 رول 1 و 2 کے تحت حکم امتناعی کی درخواست دائر کریں۔ پٹوار ریکارڈ اور فرد ملکیت کو فوری ریکارڈ پر لائیں۔',
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
        content: 'Also lodge a formal challenge before the Additional Deputy Commissioner (Revenue) / Collector under Section 161 of the Land Revenue Act 1967 against the fraudulent Mutation. Once the revenue appeal is acknowledged, civil stay becomes much easier to obtain.',
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
    category: 'Corporate & Contract Breach',
    title: 'Software company vendor not releasing payment after milestone approval and signed SLA',
    content: 'Our IT consultancy signed a formal Service Level Agreement (SLA) with an offshore client’s registered Pakistani subsidiary in Karachi. We delivered Phase 1 & Phase 2 with explicit email sign-offs and invoice acceptance. Total pending PKR 2.4 Million is overdue for 75 days. What is the fastest legal recourse — Legal Notice under Negotiable Instruments / CPC Summary Suit or Arbitration under PECA / Arbitration Act?',
    urduContent: 'ہماری آئی ٹی کمپنی کا کسٹمر کے ساتھ باضابطہ معاہدہ تھا اور مائل اسٹون کی منظوری کے بعد بھی 24 لاکھ روپے کی ادائیگی گزشتہ ڈھائی ماہ سے رکی ہوئی ہے۔ فوری قانونی کارروائی کیلئے رہنمائی فرمائیں۔',
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
        content: 'First step: Issue a formal Legal Demand Notice with a strict 14-day cure period under Section 73 of the Contract Act 1872. If unpaid, file a Summary Suit for Recovery under Order 37 CPC at the Sindh High Court / District Court. In 80% of corporate breach matters, the respondent settles upon receiving a formal Advocate Legal Notice.',
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
    title: 'Procedure for Khula decree and recovery of prompt Dower (Haq Mehr) & Child Maintenance',
    content: 'Married for 4 years with one 2-year-old child. Husband moved abroad and has stopped providing financial maintenance (Nafqa) for the past 9 months. The Nikahnama clearly states gold sets and 15 Tolas prompt Dower as unpaid. Can I file simultaneous petitions for Khula, Recovery of Dowry Articles, and Child Maintenance in the Family Court Islamabad?',
    urduContent: 'نکاح نامے میں حق مہر معجل درج ہے۔ شوہر گزشتہ 9 ماہ سے نان نفقہ نہیں دے رہا۔ کیا فیملی کورٹ میں خلع، خرچہ نان نفقہ اور سامان جہیز کا دعویٰ بیک وقت کیا جا سکتا ہے؟',
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
        content: 'Yes! Under Section 7 of the Family Courts Act 1964, you can file a consolidated Plaint before the Family Court including: (1) Dissolution of Marriage via Khula, (2) Recovery of prompt Dower & Dowry items, and (3) Past & future Child Maintenance under Section 9. The court will grant interim maintenance order on the second hearing.',
        urduContent: 'جی ہاں! فیملی کورٹس ایکٹ 1964 کے تحت آپ خلع، سامان جہیز، حق مہر اور بچے کے ماہانہ خرچ کا متفقہ دعویٰ ایک ہی عدالت میں دائر کر سکتی ہیں۔ دوسری پیشی پر ہی عبوری خرچ مقرر ہو جاتا ہے۔',
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
    title: 'Fake social media accounts spreading malicious forged documents under PECA Act 2016',
    content: 'An anonymous syndicate has created cloned Instagram and WhatsApp handles using my business logo and defamatory forged receipts to harass my clients. We already took digital forensic timestamped screenshots and URL archives. How quickly can we file a petition with FIA Cyber Crime Wing (CCRC) and simultaneously file a damages suit under the Defamation Ordinance 2002?',
    urduContent: 'سوشل میڈیا پر جعلی اکاؤنٹس بنا کر ہمارے کاروبار کے خلاف جھوٹا پراپیگنڈا کیا جا رہا ہے۔ ایف آئی اے سائبر کرائم اور ہتک عزت کے مقدمے کا قانونی طریقہ کار کیا ہے؟',
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
        content: 'Immediately submit a complaint under Section 20 (Offences against dignity of natural person) and Section 24 (Cyber stalking) of PECA 2016 at the nearest FIA Cyber Crime Reporting Centre with IP logs and Hash certificates. We can also seek urgent Section 14 interim injunction from the District Sessions Court to take down malicious posts.',
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
