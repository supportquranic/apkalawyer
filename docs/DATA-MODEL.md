# ApkaLawyer Data Model & Entity Specifications

## 1. Domain Entities & TypeScript Types

### 1.1 User & Identity
```typescript
type UserRole = 'client' | 'lawyer' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  isVerified: boolean;
}
```

### 1.2 Lawyer Profile
```typescript
interface Lawyer extends User {
  role: 'lawyer';
  barCouncil: 'Punjab Bar Council' | 'Sindh Bar Council' | 'Islamabad Bar Council' | 'KP Bar Council' | 'Balochistan Bar Council';
  barLicenseNumber: string;
  courtEnrollment: 'Subordinate/District Courts' | 'High Court' | 'Supreme Court of Pakistan';
  enrollmentYear: number;
  city: string;
  address?: string;
  bio: string;
  practiceAreas: string[];
  languages: string[];
  consultationFee: number; // PKR
  rating: number; // 0 to 5.0
  reviewCount: number;
  isVerifiedByAdmin: boolean;
  availabilitySchedule?: LawyerAvailability[];
}
```

### 1.3 Legal Matters (Cases)
```typescript
type MatterStatus = 'intake' | 'active' | 'in_court' | 'settled' | 'closed';

interface LegalMatter {
  id: string;
  matterNumber: string; // e.g. "MAT-2026-0842"
  title: string;
  clientId: string;
  clientName: string;
  lawyerId: string;
  lawyerName: string;
  practiceArea: string;
  courtName?: string;
  judgeName?: string;
  caseNumber?: string;
  status: MatterStatus;
  progressPercentage: number;
  totalFee: number;
  paidAmount: number;
  openedAt: string;
  updatedAt: string;
}
```

### 1.4 Court Hearings & Cause List
```typescript
type HearingStatus = 'scheduled' | 'adjourned' | 'concluded' | 'order_passed';

interface Hearing {
  id: string;
  matterId: string;
  matterTitle: string;
  caseNumber: string;
  courtName: string;
  benchRoom: string;
  judgeName: string;
  hearingDate: string; // ISO 8601
  hearingTime: string; // e.g. "09:30 AM"
  purpose: string; // e.g. "Framing of Issues", "Cross Examination", "Arguments"
  status: HearingStatus;
  notes?: string;
  nextHearingDate?: string;
}
```

### 1.5 Consultations & Bookings
```typescript
type ConsultationMode = 'video' | 'phone' | 'in_person';
type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  lawyerId: string;
  lawyerName: string;
  clientId: string;
  clientName: string;
  practiceArea: string;
  date: string;
  timeSlot: string;
  mode: ConsultationMode;
  fee: number;
  status: BookingStatus;
  meetingLink?: string;
  notes?: string;
  createdAt: string;
}
```

### 1.6 Documents & Vault
```typescript
type DocumentCategory = 'pleading' | 'order' | 'power_of_attorney' | 'evidence' | 'identity' | 'general';

interface LegalDocumentItem {
  id: string;
  matterId?: string;
  uploaderId: string;
  title: string;
  fileUrl: string;
  fileSize: number; // in bytes
  fileType: string; // e.g. "application/pdf"
  category: DocumentCategory;
  isPrivileged: boolean;
  uploadedAt: string;
}
```

### 1.7 Payments & Invoices
```typescript
type PaymentStatus = 'pending' | 'in_escrow' | 'paid' | 'refunded' | 'failed';

interface PaymentInvoice {
  id: string;
  invoiceNumber: string;
  matterId?: string;
  bookingId?: string;
  clientId: string;
  lawyerId: string;
  description: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: PaymentStatus;
  dueDate: string;
  paidAt?: string;
}
```
