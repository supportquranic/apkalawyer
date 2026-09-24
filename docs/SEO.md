# ApkaLawyer SEO Strategy & Guidelines

## 1. Overview
ApkaLawyer employs a high-performance SEO strategy tailored for legal discovery in Pakistan. Public pages are optimized for search engines while private user dashboards are shielded from indexing.

## 2. Page Hierarchy & Indexation Rules

| Page Category | Routes | Search Engine Status | Primary Target Keywords |
| :--- | :--- | :--- | :--- |
| **Landing & Core** | `/`, `/how-it-works`, `/about`, `/faq`, `/contact` | `index, follow` | "lawyer in pakistan", "legal advice pakistan", "online legal consultation" |
| **Directory & Profiles**| `/lawyers`, `/lawyers/:id` | `index, follow` | "top corporate lawyers lahore", "high court advocate karachi", "family lawyer islamabad" |
| **Practice Areas** | `/practice-areas`, `/practice-areas/:slug` | `index, follow` | "property dispute lawyer", "criminal defense advocate", "tax lawyer fbr" |
| **Legal Compliance** | `/privacy`, `/terms`, `/disclaimer` | `index, follow` | Canonical transparency |
| **Client Dashboards** | `/client/*` | `noindex, nofollow` | None (Private) |
| **Lawyer Workspaces** | `/lawyer/*` | `noindex, nofollow` | None (Private) |
| **Admin Operations** | `/admin/*` | `noindex, nofollow` | None (Private) |

---

## 3. Dynamic Metadata Architecture
Every public route uses the `useSEO` custom hook or `<SEOHead />` component to inject:
- **Title**: `<Page Title> | ApkaLawyer — Verified Legal Services Pakistan`
- **Meta Description**: 150-160 character compelling summary.
- **Canonical URL**: Prevents duplicate content penalties.
- **OpenGraph & Twitter Card**: Structured social sharing preview with high-resolution brand banner.
- **JSON-LD Structured Data**:
  - `LegalService` schema for lawyer profile pages.
  - `FAQPage` schema for frequently asked questions.
  - `BreadcrumbList` schema for practice area and directory navigation.

---

## 4. Technical Assets
- `public/robots.txt`: Explicitly allows public pages and denies `/client/`, `/lawyer/`, `/admin/`, `/api/`.
- `public/sitemap.xml`: Curated index of all valid public routes with modification timestamps.
