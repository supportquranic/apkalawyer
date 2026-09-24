# ApkaLawyer Design System & UI Specifications

## 1. Design Tokens & Color Palette

### Primary & Slate Neutrals
- **Background Root**: `bg-slate-50` (`#f8fafc`)
- **Card / Surface**: `bg-white` (`#ffffff`)
- **Surface Hover**: `bg-slate-100` (`#f1f5f9`)
- **Surface Border**: `border-slate-200` (`#e2e8f0`)
- **Text Primary**: `text-slate-900` (`#0f172a`)
- **Text Secondary**: `text-slate-600` (`#475569`)
- **Text Muted**: `text-slate-400` (`#94a3b8`)

### Emerald / Brand Accent (High-Trust Pakistani Tech)
- **Brand Primary**: `emerald-600` (`#059669`)
- **Brand Hover**: `emerald-700` (`#047857`)
- **Brand Light**: `emerald-50` (`#ecfdf5`)
- **Brand Border**: `emerald-200` (`#a7f3d0`)

### State Colors
- **Success**: `emerald-600` / `bg-emerald-50` / `border-emerald-200`
- **Info / Pending**: `sky-600` / `bg-sky-50` / `border-sky-200`
- **Warning / Adjourned**: `amber-600` / `bg-amber-50` / `border-amber-200`
- **Danger / Urgent**: `rose-600` / `bg-rose-50` / `border-rose-200`

---

## 2. Typography
- **Primary Body & Headings**: `font-sans` (`'Plus Jakarta Sans', sans-serif`)
- **Identifiers & Codes (Matter IDs, Bar License, Case Numbers)**: `font-mono` (`'JetBrains Mono', monospace`)

---

## 3. Atomic Components Catalog
- `Button`: Supports `variant` (`primary`, `secondary`, `outline`, `ghost`, `danger`), `size` (`sm`, `md`, `lg`), `isLoading`, and `icon`.
- `Card`: Semantic container with structured padding, subtle borders, and optional hover elevation.
- `Badge`: Compact status indicator with color-coded variant mappings for case and hearing statuses.
- `Modal`: Accessible modal with smooth fade/scale transition and background backdrop blur.
- `Input` / `Select` / `Textarea`: Standardized form components with floating or static labels, error text, and clear focus-visible rings.
- `Feedback Components`:
  - `LoadingState`: Clean spinner with customizable message.
  - `EmptyState`: Centered icon, clear title, explanatory paragraph, and primary CTA.
  - `ErrorState`: Error alert with retry button.
  - `NotFoundState`: 404 handler with redirection button to dashboard/home.
  - `UnauthorizedState`: Explains insufficient role permissions.
  - `NetworkErrorState`: Offline or connection timeout fallback.
