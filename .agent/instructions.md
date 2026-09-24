# ApkaLawyer — AI Agent Instructions & Product Guidelines

## 1. Project Identity & Vision
**ApkaLawyer** is a premier, secure, and modern legal technology platform designed specifically for Pakistan. It connects verified legal practitioners (Advocates of District Courts, High Courts, and Supreme Court) with individuals, SMEs, and corporate clients seeking credible legal counsel, dispute resolution, contract drafting, and hearing management.

## 2. Core Development Principles
1. **Frontend-First Validation Stage**: We are currently in Phase 0/Phase 1 frontend-first validation. There is **NO production backend yet**.
2. **Backend-Ready Architecture**: All components, state models, and service interfaces must be decoupled from mock data so they can connect to Supabase/PostgreSQL with zero UI refactoring.
3. **No Fake Security Claims**: Client-side checks are purely for UX routing. Never claim or rely on client-side security as true protection.
4. **Technology Aesthetic**: Modern, clean, trustworthy, mobile-first, and high-performance. Avoid cliché legal tropes (gavels, antique scales, dark gold Corinthian columns).
5. **Separation of Legal Roles**: Distinguish platform information, direct lawyer legal advice, automated document generation, and lawyer-reviewed filings.

## 3. Non-Negotiable Agent Rules
- **DO NOT** hardcode mock data inside page or presentation components. Always use `@/services` and `@/data/mock`.
- **DO NOT** introduce heavy monolithic dependencies or complex state machines before they are needed.
- **DO NOT** commit secrets, private tokens, or fake database credentials.
- **DO NOT** invent unapproved legal claims or guarantees in platform copy.
- **DO NOT** modify existing architectural boundaries without updating documentation.
- **ALWAYS** maintain strict TypeScript types and zero-lint errors.
