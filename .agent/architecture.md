# ApkaLawyer Architecture Guide for Agents

## 1. Directory Structure

```
src/
├── app/                  # Application root, providers, top-level contexts
├── assets/               # Static assets, SVG icons, imagery
├── components/
│   ├── ui/               # Core atomic primitives (Button, Card, Input, Modal, Badge, etc.)
│   ├── layout/           # Shared structural wrappers (Container, PageHeader, Section)
│   ├── navigation/       # Headers, Navbars, Sidebars, Breadcrumbs, Mobile Navigation
│   ├── forms/            # Form controls, validation feedback, search inputs
│   └── feedback/         # LoadingState, EmptyState, ErrorState, SuccessState, UnauthorizedState
├── config/               # App configuration, constants, navigation definitions, SEO defaults
├── data/
│   ├── mock/             # Centralized mock data collections
│   └── constants/        # Cities, practice areas, courts, statutory types
├── features/             # Domain-driven feature modules
│   ├── auth/             # Session management, role-based access mocking
│   ├── lawyers/          # Directory, filters, detailed profiles, reviews
│   ├── consultations/    # Instant & scheduled consultation flows
│   ├── bookings/         # Booking wizard, time slot selection, confirmations
│   ├── messaging/        # Real-time chat UI, matter communications
│   ├── matters/          # Case/matter management, milestones, case files
│   ├── documents/        # Client vault, document uploads, privacy controls
│   ├── hearings/         # Cause list tracker, upcoming hearing dates, court logs
│   ├── calendar/         # Unified legal calendar, reminders, deadlines
│   ├── payments/         # Retainers, invoices, fee breakdowns, escrow UI
│   ├── notifications/    # Alert feed, status changes, SMS/WhatsApp updates
│   └── legal-documents/  # Document drafting, notices, NDA & contract generators
├── hooks/                # Reusable custom React hooks (useAuth, useSEO, useMediaQuery, etc.)
├── layouts/              # Route layouts (PublicLayout, ClientLayout, LawyerLayout, AdminLayout)
├── lib/                  # Utilities, className mergers, storage helpers
├── pages/
│   ├── public/           # Landing, lawyer search, practice areas, about, legal pages
│   ├── client/           # Client dashboard and self-service portals
│   ├── lawyer/           # Advocate workspace, case management, earnings
│   └── admin/            # Verification queue, audit logs, dispute moderation
├── routes/               # Central routing matrix, protected route guards, navigation paths
├── services/
│   ├── interfaces/       # Service contracts defining data access signatures
│   ├── mock/             # Asynchronous mock implementations mimicking real REST/RPC calls
│   └── index.ts          # Central dependency injection / service factory
├── types/                # Strict TypeScript entity and domain definitions
├── utils/                # Pure formatting, date manipulation, currency, validators
└── styles/               # Global styling, Tailwind entry point, theme design tokens
```

## 2. Component & Feature Design
- **Single Responsibility**: Components must have a focused responsibility. Presentation components should not make direct network calls.
- **Service Layer Abstraction**: UI consumes methods from `services/` (e.g. `lawyerService.getLawyers()`). Under the hood, this calls the mock service now and will swap to an API client in production.
- **Asynchronous Simulation**: Mock services return Promises with realistic network latencies (`300-600ms`) and typed responses to properly validate loading and error states in UI.
- **Route Protection**: `ProtectedRoute` checks mock authentication status and role (`client`, `lawyer`, `admin`). When unauthenticated or unauthorized, redirect with friendly fallback states.
