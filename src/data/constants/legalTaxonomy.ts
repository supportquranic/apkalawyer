// Extracted legal taxonomy for ApkaLawyer
export interface TaxonomyCategory {
  id: string;
  slug: string;
  name: string;
  urduName?: string;
  description: string;
}

export interface TaxonomyItem {
  id: string;
  name: string;
  categoryId?: string;
  categoryName?: string;
}

export const LEGAL_CATEGORIES: TaxonomyCategory[] = [
  { id: '6788b1063a7507993871b70c', slug: 'civil-litigation', name: 'Civil Litigation', urduName: 'دیوانی مقدمات', description: 'Recovery suits, injunctions, declaratory suits, execution proceedings, and property disputes.' },
  { id: '6788b1063a7507993871b70b', slug: 'criminal-defense', name: 'Criminal Defense', urduName: 'فوجداری دفاع اور ضمانت', description: 'Bail applications, FIR quashment, trial defense, NAB/FIA defense, and appeals.' },
  { id: '6788b1063a7507993871b70d', slug: 'corporate-law', name: 'Corporate Law', urduName: 'کارپوریٹ اور تجارتی قوانین', description: 'SECP incorporation, mergers, contracts, due diligence, and regulatory compliance.' },
  { id: '6788b1063a7507993871b70e', slug: 'family-law', name: 'Family Law', urduName: 'عائلی اور خاندانی قوانین', description: 'Khula, divorce, child custody, maintenance allowance, and succession certificates.' },
  { id: '6788b1063a7507993871b713', slug: 'taxation', name: 'Taxation & FBR', urduName: 'ٹیکس اور ایف بی آر', description: 'Income tax, sales tax appeals, FBR audit replies, and customs advisory.' },
  { id: '67bd84139d76fb259568981c', slug: 'property-real-estate', name: 'Property & Real Estate', urduName: 'اراضی اور جائیداد', description: 'Title deed verification, stay orders, landlord-tenant eviction, and registry mutation.' },
  { id: '6788b1063a7507993871b710', slug: 'employment-labor', name: 'Employment & Labor', urduName: 'ملازمت اور لیبر قوانین', description: 'Workplace disputes, severance, unlawful termination, and NIRC court litigation.' },
  { id: '6788b1063a7507993871b711', slug: 'immigration', name: 'Immigration & Visas', urduName: 'امیگریشن اور ویزا امور', description: 'Work permits, citizenship, visa refusal appeals, and overseas attestation.' },
  { id: '6788b1063a7507993871b70f', slug: 'intellectual-property', name: 'Intellectual Property', urduName: 'دانشورانہ املاک', description: 'Trademarks, copyright protection, patent filing, and infringement defense.' },
  { id: '67a1c1215c2eb4747db686f7', slug: 'constitutional-matters', name: 'Constitutional Matters', urduName: 'آئینی رٹ اور پٹیشنز', description: 'High Court writ petitions (Art. 199), public interest litigation, and judicial reviews.' },
  { id: '6788b1063a7507993871b714', slug: 'banking-finance', name: 'Banking & Finance', urduName: 'بینکنگ اور فنانس', description: 'Banking Court recovery suits, loan restructuring, and financial compliance.' },
  { id: '67bd83cf9d76fb259568981a', slug: 'nab-fia-cases', name: 'NAB / FIA Cases', urduName: 'نیب اور ایف آئی اے', description: 'National Accountability Bureau inquiries, FIA cybercrime defense, and anti-corruption.' },
  { id: '67bd83eb9d76fb259568981b', slug: 'medical-negligence', name: 'Medical Negligence', urduName: 'طبی غفلت', description: 'Healthcare malpractice claims, PMDC complaints, and damages suits.' },
  { id: '67a1c10f5c2eb4747db686f1', slug: 'human-rights', name: 'Human Rights', urduName: 'انسانی حقوق', description: 'Fundamental rights enforcement, illegal detention habeas corpus, and civic liberties.' },
  { id: '67a1c1155c2eb4747db686f3', slug: 'consumer-protection', name: 'Consumer Protection', urduName: 'صارفین کے حقوق', description: 'Consumer Court claims, product liability, and service deficiency damages.' },
  { id: '6788b1063a7507993871b712', slug: 'environmental-law', name: 'Environmental Law', urduName: 'ماحولیاتی قوانین', description: 'EPA approvals, pollution tribunal litigation, and carbon compliance.' },
  { id: '6a77a540b398b80b9f92766a', slug: 'privacy-cyber-crime', name: 'Privacy & Cyber Crime', urduName: 'ڈیجیٹل اور سائبر کرائم', description: 'PECA defense, online harassment, data protection, and financial fraud.' },
  { id: '6a77a6cdb398b80b9f927798', slug: 'adr-dispute-resolution', name: 'ADR & Mediation', urduName: 'ثالثی اور مصالحت', description: 'Commercial arbitration, family mediation, and out-of-court settlements.' },
];

export const POPULAR_SPECIALIZATIONS: TaxonomyItem[] = [
  {
    "id": "spec-1",
    "name": "Bail Before Arrest (Pre-Arrest Bail)",
    "categoryName": "Criminal Defense"
  },
  {
    "id": "spec-2",
    "name": "FIR Quashment Petitions",
    "categoryName": "Criminal Defense"
  },
  {
    "id": "spec-3",
    "name": "Trial Defense & Special Laws",
    "categoryName": "Criminal Defense"
  },
  {
    "id": "spec-4",
    "name": "NAB & Accountability Trials",
    "categoryName": "NAB / FIA Cases"
  },
  {
    "id": "spec-5",
    "name": "FIA Cybercrime & PECA Offenses",
    "categoryName": "Privacy & Cyber Crime"
  },
  {
    "id": "spec-6",
    "name": "Khula & Talaq Dissolution",
    "categoryName": "Family Law"
  },
  {
    "id": "spec-7",
    "name": "Child Custody & Visitation Rights",
    "categoryName": "Family Law"
  },
  {
    "id": "spec-8",
    "name": "Maintenance Allowance & Dowry Recovery",
    "categoryName": "Family Law"
  },
  {
    "id": "spec-9",
    "name": "Succession & Inheritance Certificates",
    "categoryName": "Family Law"
  },
  {
    "id": "spec-10",
    "name": "Stay Orders on Disputed Property",
    "categoryName": "Property & Real Estate"
  },
  {
    "id": "spec-11",
    "name": "Title Deed & Registry Mutation",
    "categoryName": "Property & Real Estate"
  },
  {
    "id": "spec-12",
    "name": "Illegal Possession & Eviction Suits",
    "categoryName": "Property & Real Estate"
  },
  {
    "id": "spec-13",
    "name": "Land Acquisition & Revenue Appeals",
    "categoryName": "Property & Real Estate"
  },
  {
    "id": "spec-14",
    "name": "SECP Company Incorporation & Registration",
    "categoryName": "Corporate Law"
  },
  {
    "id": "spec-15",
    "name": "Shareholder Agreements & Governance",
    "categoryName": "Corporate Law"
  },
  {
    "id": "spec-16",
    "name": "Commercial Contracts & Due Diligence",
    "categoryName": "Corporate Law"
  },
  {
    "id": "spec-17",
    "name": "Money Recovery Suits (Order 37 CPC)",
    "categoryName": "Civil Litigation"
  },
  {
    "id": "spec-18",
    "name": "Declaration of Rights & Injunctions",
    "categoryName": "Civil Litigation"
  },
  {
    "id": "spec-19",
    "name": "FBR Show Cause Notice & Audit Replies",
    "categoryName": "Taxation & FBR"
  },
  {
    "id": "spec-20",
    "name": "Appellate Tribunal Tax Litigation",
    "categoryName": "Taxation & FBR"
  },
  {
    "id": "spec-21",
    "name": "Trademark & Copyright Registration",
    "categoryName": "Intellectual Property"
  },
  {
    "id": "spec-22",
    "name": "High Court Writ Petitions (Article 199)",
    "categoryName": "Constitutional Matters"
  },
  {
    "id": "spec-23",
    "name": "Banking Court Recovery Suits",
    "categoryName": "Banking & Finance"
  },
  {
    "id": "spec-24",
    "name": "Unlawful Termination & NIRC Litigation",
    "categoryName": "Employment & Labor"
  },
  {
    "id": "spec-25",
    "name": "Work Visa, Immigration & Western Appeals",
    "categoryName": "Immigration & Visas"
  },
  {
    "id": "spec-26",
    "name": "Consumer Court Damages & Product Defect",
    "categoryName": "Consumer Protection"
  },
  {
    "id": "spec-27",
    "name": "Medical Malpractice & Negligence Claims",
    "categoryName": "Medical Negligence"
  },
  {
    "id": "spec-28",
    "name": "Arbitration & Out-of-Court Settlement",
    "categoryName": "ADR & Mediation"
  }
];

export const POPULAR_SERVICES: TaxonomyItem[] = [
  {
    "id": "srv-1",
    "name": "Drafting Legal Notice / Demand Notice",
    "categoryName": "Civil Litigation"
  },
  {
    "id": "srv-2",
    "name": "Vakalatnama & Court Appearance Representation",
    "categoryName": "Civil Litigation"
  },
  {
    "id": "srv-3",
    "name": "Filing Pre-Arrest / Post-Arrest Bail",
    "categoryName": "Criminal Defense"
  },
  {
    "id": "srv-4",
    "name": "Registration of FIR / Police Complaint (22-A/22-B)",
    "categoryName": "Criminal Defense"
  },
  {
    "id": "srv-5",
    "name": "Family Court Khula / Divorce Decree Filing",
    "categoryName": "Family Law"
  },
  {
    "id": "srv-6",
    "name": "Filing Child Custody Guardianship Petition",
    "categoryName": "Family Law"
  },
  {
    "id": "srv-7",
    "name": "Succession Certificate & Letter of Administration",
    "categoryName": "Family Law"
  },
  {
    "id": "srv-8",
    "name": "Property Registry & Fard Verification",
    "categoryName": "Property & Real Estate"
  },
  {
    "id": "srv-9",
    "name": "Drafting Sale Deed, Rent Agreement & Power of Attorney",
    "categoryName": "Property & Real Estate"
  },
  {
    "id": "srv-10",
    "name": "Filing Injunction / Stay Order Application",
    "categoryName": "Property & Real Estate"
  },
  {
    "id": "srv-11",
    "name": "SECP Private Limited Company Registration",
    "categoryName": "Corporate Law"
  },
  {
    "id": "srv-12",
    "name": "Drafting Non-Disclosure Agreement (NDA)",
    "categoryName": "Corporate Law"
  },
  {
    "id": "srv-13",
    "name": "Drafting Employment Agreement & HR Policy",
    "categoryName": "Corporate Law"
  },
  {
    "id": "srv-14",
    "name": "Annual Income Tax Return Filing & FBR Notice Reply",
    "categoryName": "Taxation & FBR"
  },
  {
    "id": "srv-15",
    "name": "Sales Tax Registration & Active Taxpayer Status (ATL)",
    "categoryName": "Taxation & FBR"
  },
  {
    "id": "srv-16",
    "name": "IPO Trademark Application & Search Report",
    "categoryName": "Intellectual Property"
  },
  {
    "id": "srv-17",
    "name": "High Court Constitutional Writ Filing",
    "categoryName": "Constitutional Matters"
  },
  {
    "id": "srv-18",
    "name": "Banking Court Loan Default Defense",
    "categoryName": "Banking & Finance"
  },
  {
    "id": "srv-19",
    "name": "FIA Cybercrime Harassment Notice Filing",
    "categoryName": "Privacy & Cyber Crime"
  },
  {
    "id": "srv-20",
    "name": "NAB Call-Up Notice Defense Advisory",
    "categoryName": "NAB / FIA Cases"
  },
  {
    "id": "srv-21",
    "name": "Habeas Corpus Petition for Missing / Detained Person",
    "categoryName": "Human Rights"
  },
  {
    "id": "srv-22",
    "name": "Consumer Court Claim for Compensation",
    "categoryName": "Consumer Protection"
  },
  {
    "id": "srv-23",
    "name": "Commercial Dispute Arbitration Drafting",
    "categoryName": "ADR & Mediation"
  }
];
