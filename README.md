# Next-Gen Zestine Enterprise React architecture

This professional architecture transitions Zestine to a scalable, production-ready stack using React, Vite, TypeScript, and cleanly separated GSAP micro-animations.

## 1. Folder Structure Overview

```text
zestine/
├── src/
│   ├── app/                 # Application foundation (app entry, layout wrappers, router layer)
│   ├── assets/              # Global static assets
│   ├── components/          # Sharable UI elements (e.g., buttons, inputs, dialogs)
│   ├── config/              # Environment vars processing (`env.ts`)
│   ├── context/             # React Context global state slices
│   ├── features/            # Scalable domain-logic modules
│   │   └── hero/            # └── Example Hero Section Feature
│   │       ├── components/  #     └── Feature-specific UI
│   │       ├── hooks/       #     └── Feature-specific logic & animations
│   │       └── index.ts     #     └── Public API exports for feature
│   ├── hooks/               # Reusable global hooks (e.g., `useGsapAnimation.ts`)
│   ├── services/            # API, fetch abstractions
│   └── utils/               # Glob helpers & type declarations
├── .env                     # Local environment file
├── tsconfig.json            # Strict Typescript paths overrides mapped to `@/`
└── vite.config.ts           # Bundler configurations with paths plugins
```

## 2. Setting Up & Running the Application

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Dev Server:**
   ```bash
   npm run dev
   ```

## 3. Notable Reusable Paradigms

1. **Absolute Imports:** Import everything easily starting from `@/` -> `import App from '@/app/App'`
2. **GSAP Reusable Logic:** The hook `useGsapAnimation` enforces cleanup automatically avoiding GSAP ghost leaks. Check out its usage inside `/src/features/hero/components/HeroSection.tsx`

## Deliverables Mappings

- **Folder structure:** See Tree overview above (`src/app/`, `src/features/`)
- **Sample App.tsx:** Resides in `src/app/App.tsx` and bootstrapped exclusively in `src/app/main.tsx`
- **Sample feature module:** Resides in `src/features/hero/`
- **Sample GSAP animation hook:** Reusable abstractions found in `src/hooks/useGsapAnimation.ts`. Implementations located inside `src/features/hero/hooks/`.
- **Setup instructions:** Detailed inside **Section 2**.
