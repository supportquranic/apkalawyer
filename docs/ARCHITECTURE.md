# ApkaLawyer Frontend Architecture

## 1. Architectural Philosophy
ApkaLawyer is built on a **Domain-Driven, Modular React Architecture**. The design guarantees clear separation of concerns, high maintainability, strict type-safety, and seamless evolution from a mock-driven prototype into a production-grade enterprise platform.

```
┌────────────────────────────────────────────────────────┐
│                   Presentation Layer                   │
│   (Pages, Route Layouts, Design System Components)     │
└───────────────────────────▲────────────────────────────┘
                            │
┌───────────────────────────┴────────────────────────────┐
│                    Feature Modules                     │
│    (lawyers, bookings, matters, hearings, docs, etc.)   │
└───────────────────────────▲────────────────────────────┘
                            │
┌───────────────────────────┴────────────────────────────┐
│                  Service Abstraction                   │
│   (Domain Service Interfaces: ILawyerService, etc.)   │
└───────────────────────────▲────────────────────────────┘
                            │
       ┌────────────────────┴───────────────────┐
       │                                        │
┌──────┴───────────────┐              ┌─────────┴──────────────┐
│  Phase 0/1: Mock     │              │  Future Phase: API /   │
│  Data & Services     │              │  Supabase Client       │
└──────────────────────┘              └────────────────────────┘
```

## 2. Layer Definitions

### 2.1 Atomic Design System (`src/components/ui/`)
Primitive, un-opinionated UI building blocks:
- `Button`: Primary, secondary, outline, ghost, danger, with loading and disabled states.
- `Card`: Bordered containers with header, content, and footer subcomponents.
- `Badge`: Status pills for hearing statuses, matter progress, verification tiers.
- `Modal`: Accessible dialogs with focus trapping and ESC support.
- `Input` / `Select` / `Textarea`: Accessible form controls with validation states.

### 2.2 Reusable State Feedback (`src/components/feedback/`)
- `LoadingState`: Modern skeletons and pulsing loaders.
- `EmptyState`: Contextual illustration, friendly title, and call to action.
- `ErrorState`: Actionable error box with retry button.
- `UnauthorizedState`: Friendly prompt explaining required role permissions.
- `NetworkErrorState`: Offline or failed connection indicator.

### 2.3 Service Layer (`src/services/`)
- All components interact with domain services through contracts defined in `src/services/interfaces/`.
- During Phase 0/1, concrete instances in `src/services/mock/` simulate network latency and return type-safe mock datasets from `src/data/mock/`.
- In future phases, these classes are replaced by HTTP/RPC clients without changing any UI component call-sites.
