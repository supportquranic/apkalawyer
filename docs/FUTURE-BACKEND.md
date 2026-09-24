# ApkaLawyer Future Backend Architecture Plan

> **CRITICAL NOTE**: We are in Phase 0 / Frontend Validation. The backend is **NOT** built yet. This document serves as the architectural blueprint for when Supabase / PostgreSQL / Microservices are introduced in future production phases.

---

## 1. Planned Production Technology Stack
- **Database**: PostgreSQL 16+ (Supabase Managed or Self-Hosted).
- **Authentication**: Supabase Auth (JWTs, OAuth 2.0, Twilio/Zong SMS OTP for Pakistani mobile numbers).
- **Object Storage**: S3-compatible encrypted private buckets for court petitions, case evidence, and CNIC records.
- **Realtime**: PostgreSQL CDC (Change Data Capture) via WebSockets for real-time matter chats, cause list alerts, and presence.
- **Payment Gateway**: Integration with State Bank of Pakistan regulated 1LINK / PayFast / Kuickpay / JazzCash / EasyPaisa gateways for local PKR escrow & card payments.
- **Automated Document Worker**: Node.js microservice running `docx-templates` and PDF generator with cryptographic watermarking.

---

## 2. Planned Relational Schema (PostgreSQL)

```sql
-- 1. Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(32) UNIQUE NOT NULL,
  role VARCHAR(32) NOT NULL CHECK (role IN ('client', 'lawyer', 'admin')),
  full_name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  cnic_hash VARCHAR(128),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Lawyer Profiles Table
CREATE TABLE lawyers (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  bar_council VARCHAR(64) NOT NULL,
  bar_license_number VARCHAR(64) UNIQUE NOT NULL,
  court_enrollment VARCHAR(64) NOT NULL,
  enrollment_year INT NOT NULL,
  city VARCHAR(64) NOT NULL,
  office_address TEXT,
  bio TEXT NOT NULL,
  consultation_fee INT NOT NULL DEFAULT 5000,
  rating NUMERIC(3,2) DEFAULT 5.0,
  review_count INT DEFAULT 0,
  is_verified_by_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Practice Areas Mapping
CREATE TABLE practice_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(128) NOT NULL,
  description TEXT
);

CREATE TABLE lawyer_practice_areas (
  lawyer_id UUID REFERENCES lawyers(id) ON DELETE CASCADE,
  practice_area_id UUID REFERENCES practice_areas(id) ON DELETE CASCADE,
  PRIMARY KEY (lawyer_id, practice_area_id)
);

-- 4. Legal Matters (Cases)
CREATE TABLE legal_matters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_number VARCHAR(64) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  client_id UUID REFERENCES users(id),
  lawyer_id UUID REFERENCES lawyers(id),
  practice_area VARCHAR(128) NOT NULL,
  court_name VARCHAR(255),
  case_number VARCHAR(128),
  judge_name VARCHAR(128),
  status VARCHAR(32) DEFAULT 'intake',
  progress_percentage INT DEFAULT 0,
  total_fee INT NOT NULL DEFAULT 0,
  paid_amount INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Court Hearings (Cause List)
CREATE TABLE hearings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id UUID REFERENCES legal_matters(id) ON DELETE CASCADE,
  hearing_date DATE NOT NULL,
  hearing_time TIME,
  court_room VARCHAR(64),
  judge_name VARCHAR(128),
  purpose TEXT NOT NULL,
  status VARCHAR(32) DEFAULT 'scheduled',
  order_sheet_url TEXT,
  next_hearing_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Consultations & Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id UUID REFERENCES lawyers(id),
  client_id UUID REFERENCES users(id),
  booking_date DATE NOT NULL,
  time_slot VARCHAR(64) NOT NULL,
  mode VARCHAR(32) NOT NULL,
  fee INT NOT NULL,
  status VARCHAR(32) DEFAULT 'pending',
  meeting_url TEXT,
  client_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Document Vault
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id UUID REFERENCES legal_matters(id) ON DELETE SET NULL,
  uploader_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type VARCHAR(64) NOT NULL,
  category VARCHAR(64) NOT NULL,
  is_privileged BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Payments & Escrow Ledger
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number VARCHAR(64) UNIQUE NOT NULL,
  matter_id UUID REFERENCES legal_matters(id),
  booking_id UUID REFERENCES bookings(id),
  client_id UUID REFERENCES users(id),
  lawyer_id UUID REFERENCES lawyers(id),
  amount INT NOT NULL,
  tax_amount INT DEFAULT 0,
  status VARCHAR(32) DEFAULT 'pending',
  gateway_reference VARCHAR(128),
  due_date DATE,
  paid_at TIMESTAMPTZ
);
```

---

## 3. Seamless Frontend Migration Plan
When backend is ready:
1. Initialize `@supabase/supabase-js`.
2. Implement backend services in `src/services/supabase/` conforming to `src/services/interfaces/`.
3. In `src/services/index.ts`, switch export bindings from mock services to Supabase services via the `VITE_ENABLE_MOCK_DATA` environment toggle.
4. Zero presentation or page components will require rewriting.
