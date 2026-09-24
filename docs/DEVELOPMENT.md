# ApkaLawyer Developer Setup & Workflow

## 1. Prerequisites
- **Node.js**: >= 20.0.0 (Recommended: v24.x LTS)
- **Package Manager**: `npm`

## 2. Quick Start Commands

```bash
# Install dependencies
npm install

# Run Vite development server (Hot Module Reloading)
npm run dev

# Execute strict TypeScript type verification
npm run build

# Run fast code linting
npm run lint
```

## 3. Project Configuration Files
- `vite.config.ts`: Configures `@vitejs/plugin-react`, `@tailwindcss/vite`, and `@/*` alias.
- `tsconfig.app.json`: Strict TypeScript compiler configuration.
- `src/styles/index.css`: Tailwind v4 import and global utility classes.
- `.env.example`: Public runtime environment variable templates.

## 4. Code Conventions
- Use `@/` import aliases instead of long relative paths.
- All new components must have clean prop interfaces with zero TypeScript errors.
- Never write hardcoded mock arrays inside presentation files. Add items to `src/data/mock/` and expose them through `src/services/`.
