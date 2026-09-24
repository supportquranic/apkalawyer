# ApkaLawyer Coding Standards & Rules for Agents

## 1. Strict TypeScript Standards
- **Zero `any`**: Do not use `any` or loose type casting (`as unknown as T`). Create strict types or discriminated unions.
- **Explicit Interfaces**: Models must reside in `@/types/`. All API responses and mock payloads must conform to these types.
- **Component Props**: Define strict interfaces for all component props (e.g. `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>`).

## 2. Component Organization & Architecture
- **Keep Components Small**: Limit individual component files to under 250 lines. Break large views into sub-components.
- **Logic Extraction**: Extract complex calculations, filter logic, and state coordination into custom hooks (`@/hooks/`).
- **Data Access via Services**: Never import mock data objects directly in presentation components. Consume methods from `@/services`.
- **Pure Utility Functions**: Pure helper functions (currency formatting `PKR 15,000`, date parsing, status badge mapping) must reside in `@/utils/`.

## 3. Performance & React Best Practices
- **Lazy Loading**: Route pages should be loaded lazily with `React.lazy` and `Suspense`.
- **Stable References**: Use `useCallback` and `useMemo` where expensive computations or re-renders could impact list virtualization or responsiveness.
- **Key Prop Integrity**: Never use array index as key when items can be filtered, sorted, or reordered. Use unique entity IDs (e.g. `lawyer.id`, `matter.id`).
- **Clean Imports**: Use `@/` path alias rather than long relative paths (`../../../../components`).
