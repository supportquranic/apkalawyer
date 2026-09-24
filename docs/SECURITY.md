# ApkaLawyer Security Documentation

## 1. Architectural Distinction: Current Frontend vs. Future Production

| Dimension | Current Frontend Prototype (Phase 0/1) | Future Production Backend |
| :--- | :--- | :--- |
| **Authentication** | Mock session state in React Context for UX preview | Secure HTTP-only JWTs, OAuth 2.0, OTP via SMS/Email |
| **Authorization** | Client-side routing guards (`<ProtectedRoute />`) | Server-side Row Level Security (RLS) & API Gateways |
| **Data Privacy** | In-memory mock datasets in static JavaScript | AES-256 encrypted database columns & Private S3/Storage |
| **Document Access** | Static mock URLs / blobs | Signed, time-expiring URLs with verified access tokens |
| **Secrets Management** | Zero production secrets; `.env.example` placeholders | Environment secrets managed in cloud KMS / secure vaults |

---

## 2. Frontend Security Principles (Implemented Now)

1. **Zero Secret Exposure**: No API secret, private key, payment merchant token, or database credential may ever exist in frontend source code or git history.
2. **Environment Variable Rules**: Only public configuration variables prefixed with `VITE_` are allowed in frontend code. Server-side secrets must never use `VITE_`.
3. **No Indexing of Private Dashboards**: `robots.txt` and `<meta name="robots" content="noindex, nofollow">` protect all `/client/*`, `/lawyer/*`, and `/admin/*` routes from search engines.
4. **Input Sanitization & Validation**: Form fields strictly validate patterns (e.g. Pakistani phone numbers `03XX-XXXXXXX`, email addresses, file extensions).
5. **No Dangerous HTML Injections**: Avoid `dangerouslySetInnerHTML`. Where rich text is required, DOMPurify is enforced.
6. **Strict Content Policies**: External links must include `rel="noopener noreferrer"`.

---

## 3. Future Production Security Strategy

### 3.1 Data & Storage Isolation
- **Row Level Security (RLS)**: PostgreSQL/Supabase policies will restrict access so clients can only view their own legal matters, invoices, and conversations.
- **Lawyer-Client Privilege**: Documents uploaded in a matter are restricted strictly to the designated client and advocate.

### 3.2 File Upload Hardening
- Backend virus and malware scanning on all incoming attachments.
- Whitelist mime-types: `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `image/jpeg`, `image/png`.
- Enforce strict size limits (e.g., 25MB max per document).

### 3.3 Rate Limiting & Abuse Prevention
- Rate limit authentication endpoints, OTP generation requests, and contact forms to prevent brute-force attacks and SMS-toll fraud.
- Complete audit logs for sensitive operations (e.g., advocate license status modification, document deletion, financial escrow release).
