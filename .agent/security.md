# ApkaLawyer Security Rules for Agents

## 1. Absolute Prohibitions
- **NEVER** expose real secrets, API keys, private keys, database passwords, or payment webhook secrets in frontend code.
- **NEVER** prefix server-only keys with `VITE_`.
- **NEVER** commit `.env`, `.env.local`, or any populated secret files into Git.
- **NEVER** assume client-side authorization replaces server-side authorization. Role checks in the browser are solely for navigation routing and UX clarity.
- **NEVER** store unencrypted sensitive identity information (such as real Pakistani CNIC, passport scans, or privileged legal documents) in local storage or unauthenticated public buckets.
- **NEVER** use `dangerouslySetInnerHTML` without rigorous DOMPurify sanitization.

## 2. Frontend Security Standards
- **Input Sanitization**: Validate all form inputs (phone numbers formatted as `03XX-XXXXXXX` or `+923XXXXXXXXX`, email formats, CNIC patterns).
- **File Upload Guarding**: Restrict file upload extensions on the client (`.pdf`, `.docx`, `.jpg`, `.png`) and enforce file size caps (e.g. max 15MB) with clear user feedback.
- **Safe Link Handling**: External URLs must use `rel="noopener noreferrer"`.
- **Private Route Indexing**: Disallow search engine robots from crawling `/client/*`, `/lawyer/*`, `/admin/*` via `robots.txt` and `<meta name="robots" content="noindex, nofollow" />`.

## 3. Future Backend Transition Checklist
When transitioning to Supabase / PostgreSQL backend:
- Enforce Row Level Security (RLS) on all tables (`legal_matters`, `documents`, `messages`, `bookings`).
- Use Signed URLs with expiration for all client legal documents.
- Restrict advocate bar license verification to privileged admin roles only.
- Implement server-side rate-limiting on SMS OTP and authentication endpoints.
