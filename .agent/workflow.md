# ApkaLawyer Development Workflow for Agents

## Step-by-Step Implementation Lifecycle

Every feature or modification must follow this rigorous 8-stage engineering process:

```
[1. Planning & Requirements]
              ↓
[2. Architecture & Type Contracts]
              ↓
[3. Service & Mock Layer Extension]
              ↓
[4. Component & UI Implementation]
              ↓
[5. Responsive & Mobile QA]
              ↓
[6. Accessibility & Keyboard QA]
              ↓
[7. Security & Input Verification]
              ↓
[8. Documentation & Build Validation]
```

### Stage 1: Planning
- Review existing documentation in `docs/` and rules in `.agent/`.
- Identify affected domains, routes, and user roles (`client`, `lawyer`, `admin`).

### Stage 2: Architecture & Types
- Define or extend domain entities in `src/types/`.
- Ensure strict discriminator fields and nullable handling.

### Stage 3: Service Layer
- Define service signatures in `src/services/interfaces/`.
- Implement mock asynchronous handlers with error and latency simulations in `src/services/mock/`.

### Stage 4: Component Implementation
- Build atomic UI elements in `src/components/ui/` if missing.
- Implement domain features in `src/features/<domain>/`.
- Connect page views in `src/pages/<role>/`.

### Stage 5: Responsive QA
- Verify layouts at 360px (mobile), 768px (tablet), 1024px (small desktop), and 1440px (wide desktop).
- Ensure drawers and dropdowns do not cause horizontal scrolling.

### Stage 6: Accessibility QA
- Verify tab order, ARIA attributes, semantic headings, and focus rings.

### Stage 7: Security Verification
- Ensure no secret leakage, valid input boundaries, and no unsafe inner HTML.

### Stage 8: Build Verification
- Execute `npm run build` and ensure zero TypeScript or bundling errors.
