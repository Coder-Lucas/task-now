# AGENTS.md

This document provides guidelines for agentic coding agents working in this repository.

## Project Overview

SharpNote is a Next.js 16 PWA application for Markdown note-taking with local-first storage (IndexedDB via Dexie). The project uses TypeScript, React 19, Tailwind CSS v4, and follows a component-based architecture.

## Environment Requirements

- **Node.js**: 22.15.1
- **pnpm**: 10.29.2
- **TypeScript**: 5.9.3
- **ESLint**: 9.39.2
- **Prettier**: 3.8.1

## Build Commands

```bash
# Install dependencies (requires pnpm 10.29.2)
pnpm i

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type

# Linting
pnpm lint

# Prettier check (format validation)
pnpm check

# Formatting (write changes)
pnpm format
```

## Editor Configuration

The project uses `.editorconfig` for basic editor settings:

- charset: UTF-8

## Code Style Guidelines

### Imports

Organize imports in the following order:

1. React imports (named)
2. Next.js imports (mixed)
3. Third-party libraries (default + named)
4. Path aliases for internal modules

```typescript
// React imports (named with type keyword for type-only imports)
import { type ReactNode } from "react";

// Next.js imports (mixed)
import { type Metadata, type Viewport } from "next";
import Image from "next/image";
import Link from "next/link";

// Third-party libraries (default + named)
import Dexie, { type Table } from "dexie";
import { HiOutlineCheckCircle } from "react-icons/hi";

// Path aliases for internal modules
import Header from "#/header.tsx";
import { createNote } from "@lib/db.ts";
import "@styles/main.css";
```

### Path Aliases

Configure imports using these aliases defined in `tsconfig.json`:

- `#/*` → `src/components/*`
- `@/*` → `src/app/*`
- `@hooks/*` → `src/hooks/*`
- `@lib/*` → `src/lib/*`
- `@styles/*` → `src/styles/*`
- `~/*` → `./*`

### TypeScript

- Use strict TypeScript with all strict flags enabled (`strict: true`, `alwaysStrict: true`)
- Prefix all type definitions with `T`:
    ```typescript
    type TNote = {
        readonly id: string;
        readonly name: string;
        readonly text: string;
        readonly time: string;
        readonly deletedAt: string | null;
    };
    type TRootLayoutProps = {
        readonly children: ReactNode;
    };
    ```
- Use `Readonly<{}>` for component props when additional type safety is needed:
    ```typescript
    type TItemProps = Readonly<{
        readonly children?: ReactNode;
        readonly href?: string;
    }>;
    ```
- Component functions can use implicit typing or explicit props type:
    ```typescript
    const Header = () => { ... };
    const Item = ({ children = null, href = "about:blank" }: TItemProps) => { ... };
    ```
- Use explicit return types for database functions:
    ```typescript
    const createNote: ({ name, text }: Pick<TNote, "name" | "text">) => Promise<TNote | undefined> = async ({ name, text }) => {
        // implementation
        return note;
    };
    ```

### Naming Conventions

- **Components**: PascalCase (e.g., `Header`, `Footer`, `CTA`, `Index`)
- **Files**: Match component name (e.g., `header.tsx`, `footer.tsx`, `button.tsx`)
- **Variables/functions**: camelCase (e.g., `createNote`, `retrieveNote`, `init`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for config constants
- **Types**: Prefix with `T` (e.g., `TNote`, `TRootLayoutProps`, `TItemProps`)
- **Classes**: PascalCase (e.g., `SharpNoteDB`)
- **Database utility functions**: PascalCase prefixed with class name (e.g., `SharpNoteDB.uuid()`)

### ESLint & Formatting

**ESLint Configuration** (`eslint.config.js`):

```javascript
import Vitals from "eslint-config-next/core-web-vitals";
import Typescript from "eslint-config-next/typescript";
import Prettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";

const config = defineConfig([...Vitals, ...Typescript, Prettier]);

export default config;
```

- Extends `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`, and `eslint-config-prettier/flat`
- Run `pnpm lint` to check code quality

**Prettier Configuration** (`prettier.config.js`):

```javascript
const config = {
    arrowParens: "always",
    bracketSpacing: true,
    embeddedLanguageFormatting: "off",
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "ignore",
    jsxSingleQuote: false,
    objectWrap: "preserve",
    plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
    printWidth: Infinity,
    semi: true,
    singleAttributePerLine: false,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "none"
};
export default config;
```

- Uses `prettier-plugin-organize-imports` for import organization
- Uses `prettier-plugin-tailwindcss` for Tailwind class sorting
- Run `pnpm format` before committing to auto-format code
- Run `pnpm check` to validate formatting

### Components & React Patterns

- Use `"use client"` directive for client-side components
- Component functions can use implicit typing or explicit props type:
    ```typescript
    const Footer = () => { ... };
    const Button = ({ children = null, onClick = () => {} }: TButtonProps) => { ... };
    ```
- Destructure props with default values when appropriate:
    ```typescript
    const Item = ({ children = null, href = "about:blank" }: TItemProps) => { ... };
    ```
- Use `ReactNode` for children that accept any valid React content
- Use default exports for components:
    ```typescript
    export default Header;
    ```
- Use named exports for utilities, types, and metadata:
    ```typescript
    export { createNote };
    export { metadata, viewport };
    ```
- Special components use prefixes: `NextError`, `NextLoading`, `RootLayout`
- Page components use PascalCase naming (e.g., `Index`, `Manifest`, `Fn`)
- Database functions use explicit return types

### Error Handling

Use try-catch blocks with proper logging:

```typescript
try {
    await db.notes.add({ name, text });
    console.info("INFO: Note添加成功");
} catch (e) {
    console.error(`ERROR: ${e}`);
    throw e;
}
```

Database initialization with error handling:

```typescript
async init() {
    try {
        this.version(1).stores({
            notes: "id, name, text, time, deletedAt"
        });
        await this.open();
    } catch (e) {
        console.error(`ERROR: ${e}`);
        throw e;
    }
    return undefined;
}
```

### Tailwind CSS

- Use Tailwind v4 with `@import "tailwindcss";` in CSS files
- Use `@tailwindcss/postcss` in PostCSS configuration
- Use dark mode classes: `dark:bg-zinc-950`, `dark:text-zinc-50`
- Use color scheme support with `scheme-light-dark`
- Use `font-serif` for body text (project requirement)
- Color palette: `indigo-700/300` for accent, `zinc-50/950` for backgrounds
- Consistent spacing and layout patterns from existing components
- Use utility classes for transitions: `transition-colors duration-200 ease-in-out`
- Use `backdrop-blur-xs` and `backdrop-saturate-150` for glassmorphism effects
- Use flow layout: `flow-root` for main containers

### PWA Configuration

- Configure manifest in `src/app/manifest.ts`
- Set viewport and theme color in layout metadata
- Use proper PWA metadata for app installation
- Ensure proper color scheme support with `scheme-light-dark`
- Theme color: `oklch(98.5% 0 0)`
- Background color: `oklch(14.1% 0.005 285.823)`

### File Organization

```
src/
├── app/           # Next.js App Router pages, layouts, manifest.ts, robots.ts, sitemap.ts
├── components/    # Reusable UI components
├── lib/           # Utilities and database logic
├── styles/        # Global styles and Tailwind imports
└── hooks/         # Custom React hooks (when added)
```

### Client / Server Components

- Add `"use client"` at the top of files containing:
    - `useState`, `useEffect`, or other hooks
    - Event handlers (onClick, onChange, etc.)
    - Browser-only APIs
- Keep server components as default (no directive needed)
- Database operations typically require `"use client"` due to browser-only IndexedDB

### Console Logging

Follow this pattern for console output:

- `console.info("INFO: ...")` for successful operations (uses Chinese text in practice)
- `console.error(`ERROR: ${e}`)` for errors
- Place initialization messages in global scope

Examples:

```typescript
console.info("INFO: Note添加成功");
console.info("INFO: 数据库创建完成");
console.error(`ERROR: ${e}`);
```

### Database Patterns (Dexie.js)

- Extend `Dexie` class for database operations
- Define tables using `Table<T, K, T>` generic types
- Use `version().stores()` to define schema
- Initialize with `async init()` method
- Return `undefined` explicitly from init methods
- Use static methods for utility functions like UUID generation

```typescript
class SharpNoteDB extends Dexie {
    notes: Table<TNote, string, TNote> = undefined!;

    static uuid() {
        return v7();
    }

    constructor() {
        super("SharpNoteDB");
        return this;
    }

    async init() {
        try {
            this.version(1).stores({
                notes: "id, name, text, time, deletedAt"
            });
            await this.open();
        } catch (e) {
            console.error(`ERROR: ${e}`);
            throw e;
        }
        return undefined;
    }
}

const db: SharpNoteDB = new SharpNoteDB();
db.init().then();

export { SharpNoteDB };
export default db;
```

### Metadata Configuration

- Use named exports for `metadata` and `viewport` objects
- Configure viewport with `colorScheme: "light dark"` and theme color
- Use proper Chinese locale settings: `lang="zh-Hans-CN"`
- Include comprehensive metadata for PWA and SEO

```typescript
const metadata: Metadata = {
    authors: {
        name: "Lucas",
        url: "https://github.com/Coder-Lucas"
    },
    applicationName: "SharpNote",
    description: "...",
    icons: [...],
    manifest: "/manifest.webmanifest",
    title: "SharpNote"
};

const viewport: Viewport = {
    colorScheme: "light dark",
    themeColor: "oklch(98.5% 0 0)"
};
```

### Image and Link Usage

- Use `preload={true}` for critical images (favicon)
- Use `prefetch={true}` for navigation links
- Specify `alt`, `height`, `width` for all images
- Use relative paths for internal navigation

```typescript
<Image alt="favicon" height={48} preload={true} src="/favicon.svg" width={48} />
<Link href="/" prefetch={true}>...</Link>
```

### Component Structure Examples

**Simple Functional Component:**

```typescript
"use client";

import { type ReactNode } from "react";

const Footer = () => {
    return (
        <footer className="mt-32 flex h-24 w-full items-center justify-center bg-indigo-700 dark:bg-indigo-300">
            <small className="text-sm text-zinc-50 dark:text-zinc-950">Copyright © 2025-2026 Lucas</small>
        </footer>
    );
};

export default Footer;
```

**Component with Props:**

```typescript
"use client";

import { type ReactNode } from "react";

type TButtonProps = {
    readonly children?: ReactNode;
    readonly onClick?: () => unknown;
};

const Button = ({ children = null, onClick = () => {} }: TButtonProps) => {
    return (
        <button className="rounded-lg border border-zinc-300 px-8 py-4 transition-colors hover:border-zinc-500 hover:bg-zinc-300 dark:border-zinc-700 dark:text-indigo-300 dark:hover:bg-zinc-700" onClick={onClick} type="button">
            {children}
        </button>
    );
};

export default Button;
```

**Navigation Item Component:**

```typescript
"use client";

import { type ReactNode } from "react";
import Link from "next/link";

type TItemProps = {
    readonly children?: ReactNode;
    readonly href?: string;
};

const Item = ({ children = null, href = "about:blank" }: TItemProps) => {
    return (
        <li className="h-16 w-auto">
            <Link href={href} prefetch={true}>{children}</Link>
        </li>
    );
};

export default Item;
```
