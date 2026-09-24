# ApkaLawyer UI & Design System Rules for Agents

## 1. Visual Direction & Aesthetics
- **Theme**: Clean, high-trust, tech-forward, and modern.
- **Palette**: Deep slate/navy foundations (`#0f172a`, `#1e293b`), emerald/teal accents (`#10b981`, `#059669`), subtle cyan highlights (`#0ea5e9`), and warm neutral grays (`#f8fafc` to `#334155`).
- **Typography**: Plus Jakarta Sans for interface headings and body text; JetBrains Mono for reference numbers, case IDs, and document codes.
- **Avoid**: Tacky gavels, antique weighing scales, Corinthian columns, harsh neon gradients, or dark-gold ornamental styling.

## 2. Accessibility Guidelines (WCAG 2.1 AA)
- **Contrast**: Maintain minimum 4.5:1 text-to-background contrast ratio.
- **Focus Rings**: Always provide explicit, visible focus states on keyboard navigation (`focus-visible:ring-2 focus-visible:ring-emerald-500`).
- **Semantic HTML**: Use proper elements (`<main>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<button>`, `<fieldset>`).
- **Labels**: Every form input must have a corresponding `<label>` or `aria-label`.
- **Motion Reduction**: Honor user preferences via `motion-reduce:transition-none` and `motion-reduce:animate-none`.

## 3. Responsive & Mobile-First Standards
- **Breakpoints**: Standard Tailwind breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).
- **Touch Targets**: Minimum 44x44px touch target on interactive elements on mobile devices.
- **Sidebars & Drawers**: Collapsible responsive sidebars with backdrop overlays on mobile.
- **Typography Scaling**: Fluid headings and readable 15-16px base font size for body text.

## 4. Component Hierarchy & Consistency
- Always reuse primitives from `@/components/ui/` (Button, Card, Input, Badge, Modal).
- Use unified state components from `@/components/feedback/` for Loading, Empty, Error, and Unauthorized states.
- Ensure toast notifications and alerts use consistent severity coloring (info: blue, success: emerald, warning: amber, error: rose).
