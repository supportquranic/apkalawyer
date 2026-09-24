# ApkaLawyer Route Registry

## 1. Public Routes (`/`)
- `/`: Public Homepage (Hero, search, practice area matrix, verification highlights, trust indicators).
- `/lawyers`: Public Lawyer Discovery & Filtering Directory.
- `/lawyers/:id`: Detailed Advocate Profile (Bio, credentials, bar verification, reviews, booking modal).
- `/practice-areas`: Practice Area Index (Family, Property, Corporate, Criminal, Tax, Cybercrime).
- `/how-it-works`: Step-by-step workflow guide for clients and advocates.
- `/about`: Mission, leadership, regulatory adherence, and vision for Pakistan legal tech.
- `/faq`: Frequently asked questions with structured categories.
- `/contact`: Support inquiries, office locations, and grievance redressal form.
- `/privacy`: Data privacy, retention, and confidentiality policies (placeholder).
- `/terms`: Terms of service, platform role, and disclaimers (placeholder).
- `/disclaimer`: Explicit legal representation disclaimers (placeholder).
- `/login`: Unified role-aware authentication portal.
- `/register`: Registration wizard for clients and advocates.

---

## 2. Client Portal Routes (`/client/*`)
- `/client/dashboard`: High-level metrics, upcoming hearings, active matters, recent messages.
- `/client/lawyers`: Saved lawyers and direct booking interface.
- `/client/consultations`: Upcoming, past, and requested consultation appointments.
- `/client/matters`: Active legal cases, litigation progress tracker, milestones.
- `/client/matters/:id`: Dedicated matter workspace with timeline and files.
- `/client/messages`: Secure messaging center with retained advocates.
- `/client/documents`: Encrypted document vault and file manager.
- `/client/calendar`: Integrated hearings, appointments, and filing deadlines calendar.
- `/client/hearings`: Cause list tracker with judge and court notifications.
- `/client/payments`: Retainer invoices, consultation receipts, escrow ledger.
- `/client/notifications`: Real-time platform notifications feed.
- `/client/profile`: Personal details, CNIC verification status, security settings.
- `/client/legal-documents`: Automated legal notice & contract generator wizard.

---

## 3. Lawyer / Advocate Portal Routes (`/lawyer/*`)
- `/lawyer/dashboard`: Daily cause list preview, pending client requests, earnings overview.
- `/lawyer/requests`: New consultation and case representation inquiries.
- `/lawyer/clients`: Active and past client directory.
- `/lawyer/matters`: Active case files, drafting workspace, court diary entries.
- `/lawyer/matters/:id`: Detailed case management room.
- `/lawyer/calendar`: Court diary, trial dates, client consultation scheduling.
- `/lawyer/hearings`: Daily cause list planner and hearing outcome recorder.
- `/lawyer/messages`: Direct client communication channel.
- `/lawyer/documents`: Case filings, Vakalatnama records, stay order transcripts.
- `/lawyer/earnings`: Fee collections, payout requests, escrow clearances.
- `/lawyer/profile`: Advocate bio, fee structures, bar council numbers, court enrollments.
- `/lawyer/verification`: Bar Council card upload and verification status tracking.

---

## 4. Admin Portal Routes (`/admin/*`)
- `/admin/dashboard`: Platform KPIs, user volume, dispute tickets, verification queue.
- `/admin/users`: Client account moderation and activity audits.
- `/admin/lawyers`: Advocate directory and accreditation controls.
- `/admin/verification`: Bar Council card and identity manual verification workflow.
- `/admin/bookings`: Consultation oversight and scheduling dispute resolution.
- `/admin/matters`: Platform-wide legal matter health and timeline monitoring.
- `/admin/payments`: Escrow releases, fee payouts, refund requests.
- `/admin/reports`: Trust & safety reports, platform analytics.
- `/admin/settings`: Platform configurations, practice area taxonomy, fee caps.
