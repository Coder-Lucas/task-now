# AGENTS.md

This document provides guidance for intelligent coding agents (such as opencode) when working on the SharpNote project.

## Project Overview

SharpNote is a Next.js 16-based PWA application that provides Markdown note-taking functionality, using a storage abstraction layer design. The project uses TypeScript, React 19, and Tailwind CSS v4, following a component-based architecture.

**Storage Architecture:**

- **Current Implementation**: IndexedDB based on Dexie.js (`@lib/db.ts`)
- **Storage Interface**: The `INoteStorage` interface supports easy future replacement of backend storage

## Environment Requirements

- **Node.js**: 22.22.3
- **pnpm**: 11.6.0
- **TypeScript**: 5.9.3
- **ESLint**: 9.39.2
- **Prettier**: 3.8.1

## Build Commands

```bash
# Install dependencies (requires pnpm v11.6.0)
pnpm i

# Start development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type

# Linting
pnpm lint

# Format verification
pnpm check

# Code formatting (writes changes)
pnpm format
```

## Code Quality Check Process

The project uses multi-layered code quality checks to ensure code conforms to standards:

### 1. Type Checking (pnpm type)

Uses TypeScript compiler for strict type checking:

```bash
pnpm type
```

- Enables all strict flags (`strict: true`, `alwaysStrict: true`)
- Enables strict type checking such as `noImplicitAny`, `strictNullChecks`
- Ensures type safety is the primary principle of development

### 2. Code Quality Check (pnpm lint)

Uses ESLint to check code quality and potential issues:

```bash
pnpm lint
```

- Based on `eslint-config-next/core-web-vitals`
- Based on `eslint-config-next/typescript`
- Uses `eslint-config-prettier/flat` to avoid conflicts with Prettier

### 3. Code Format Verification (pnpm check)

Uses Prettier to verify code formatting:

```bash
pnpm check
```

### 4. Complete Quality Check Process

Run the following commands before committing code:

```bash
# Run all checks in sequence
pnpm type && pnpm lint && pnpm check
```

## Editor Configuration

The project uses `.editorconfig` to provide basic editor settings:

- Character set: UTF-8

Recommended VSCode extensions:

- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense

## Code Style Guide

### Import Organization

Organize imports in the following order:

1. React imports (named imports)
2. Next.js imports (mixed)
3. Third-party libraries (default + named)
4. Path alias internal modules

```typescript
// React imports (type imports use the type keyword)
import { type ReactNode } from "react";

// Next.js imports (mixed)
import { type Metadata, type Viewport } from "next";
import Image from "next/image";
import Link from "next/link";

// Third-party libraries (default + named)
import Dexie, { type Table } from "dexie";
import { HiOutlineCheckCircle } from "react-icons/hi";

// Path alias internal modules
import Header from "#/header.tsx";
import { createNote } from "@lib/db.ts";
import "@styles/main.css";
```

### Path Aliases

Use path aliases defined in `tsconfig.json`:

- `#/*` → `src/components/*`
- `@/*` → `src/app/*`
- `@hooks/*` → `src/hooks/*`
- `@lib/*` → `src/lib/*`
- `@styles/*` → `src/styles/*`
- `~/*` → `./*`

### Code Formatting Rules

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

**Formatting Rules Key Points:**

- Use `prettier-plugin-organize-imports` to automatically organize imports
- Use `prettier-plugin-tailwindcss` to automatically sort Tailwind class names
- Unlimited line width (`printWidth: Infinity`)
- Use 4 spaces for indentation
- Use LF line endings
- No trailing commas
- Use double quotes

### TypeScript Usage Guidelines

- Use strict TypeScript mode (all strict flags enabled)
- All type definitions use the `T` prefix:
    ```typescript
    type TNote = {
        readonly id: string;
        readonly name: string;
        readonly text: string;
        readonly time: string;
        readonly deletedAt: string | null;
    };
    type TRootLayoutProps = {
        readonly children: React.ReactNode;
    };
    ```
- Use `Readonly<{}>` when additional type safety is needed:
    ```typescript
    type TItemProps = Readonly<{
        readonly children?: React.ReactNode;
        readonly href?: string;
    }>;
    ```
- Component functions can use implicit types or explicit props types
- Database functions use explicit return types:
    ```typescript
    const createNote: ({ name, text }: Pick<TNote, "name" | "text">) => Promise<TNote | undefined> = async ({ name, text }) => {
        // Implementation
        return note;
    };
    ```
- Use `React.ReactNode` (global type) instead of importing from react

### Naming Conventions

- **Components**: PascalCase (e.g., `Header`, `Footer`, `CTA`, `Index`)
- **Files**: Match component names (e.g., `header.tsx`, `footer.tsx`, `button.tsx`)
- **Variables/Functions**: camelCase (e.g., `createNote`, `retrieveNote`, `init`)
- **Constants**: camelCase or UPPER_SNAKE_CASE (for configuration constants)
- **Types**: Use `T` prefix (e.g., `TNote`, `TRootLayoutProps`, `TItemProps`)
- **Classes**: PascalCase (e.g., `SharpNoteDB`)
- **Database utility functions**: PascalCase, starting with class name (e.g., `SharpNoteDB.uuid()`)

### Error Handling Guidelines

Use try-catch blocks for error handling:

```typescript
try {
    await db.notes.add({ name, text });
    console.info("INFO: Note added successfully");
} catch (e) {
    console.error(`ERROR: ${e}`);
    throw e;
}
```

Database initialization error handling:

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

**Error Handling Key Points:**

- Use `console.info` to log successful operations
- Use `console.error` to log errors
- Always throw errors to notify callers
- Check browser environment during database initialization

### Console Logging Guidelines

Follow these logging patterns:

- `console.info("INFO: ...")` for successful operations
- `console.error(`ERROR: ${e}`)` for errors
- Initialization messages placed in global scope

Example:

```typescript
console.info("INFO: Note added successfully");
console.info("INFO: Database created successfully");
console.error(`ERROR: ${e}`);
```

## Components and React Patterns

### Client/Server Components

Add `"use client"` at the top of files containing:

- `useState`, `useEffect`, or other hooks
- Event handlers (onClick, onChange, etc.)
- Browser-only APIs
- Database operations (since IndexedDB is browser-only)

Keep server components as the default (no directive needed).

### Component Structure Examples

**Simple Function Component:**

```typescript
"use client";

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

type TButtonProps = {
    readonly children?: React.ReactNode;
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

import Image from "next/image";
import Link from "next/link";

type TItemProps = {
    readonly children?: React.ReactNode;
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

### Component Export Conventions

- Components use default exports:
    ```typescript
    export default Header;
    ```
- Utility functions, types, and metadata use named exports:
    ```typescript
    export { createNote };
    export { metadata, viewport };
    ```
- Special components use prefixes: `NextError`, `NextLoading`, `RootLayout`
- Page components use PascalCase naming (e.g., `Index`, `Manifest`, `Fn`)

## Tailwind CSS Guidelines

- Use Tailwind v4, with `@import "tailwindcss";` in CSS files
- Use `@tailwindcss/postcss` in PostCSS configuration
- Use dark mode classes: `dark:bg-zinc-950`, `dark:text-zinc-50`
- Use `scheme-light-dark` for color scheme support
- Color scheme: accent uses `indigo-700/300`, background uses `zinc-50/950`
- Use utility classes for transitions: `transition-colors duration-200 ease-in-out`
- Use glassmorphism effects: `backdrop-blur-xs`, `backdrop-saturate-150`
- Main container uses flow layout: `flow-root`

## PWA Configuration

- Configure manifest in `src/app/manifest.ts`
- Set viewport and theme color in layout metadata
- Use appropriate PWA metadata for app installation
- Ensure `scheme-light-dark` is used for correct color scheme support
- Theme color: `oklch(98.5% 0 0)`
- Background color: `oklch(14.1% 0.005 285.823)`

## File Organization

```
src/
├── app/           # Next.js App Router pages, layouts, manifest.ts, robots.ts, sitemap.ts
├── components/    # Reusable UI components
├── lib/           # Utility functions and database logic
├── styles/        # Global styles and Tailwind imports
└── hooks/         # Custom React Hooks (if any)
```

## Database Schema

SharpNote uses Dexie.js with IndexedDB for local-first data persistence.

### Database Setup

```typescript
import Dexie, { type Table } from "dexie";

type TNote = {
    readonly id: string;
    readonly name: string;
    readonly text: string;
    readonly time: string;
    readonly deletedAt: string | null;
};

class SharpNoteDB extends Dexie {
    notes: Table<TNote, string, TNote> = undefined!;

    constructor() {
        super("SharpNoteDB");
    }

    async init() {
        if (typeof window === "undefined") {
            throw new Error("Database can only be initialized in browser environment");
        }
        try {
            this.version(1).stores({
                notes: "id, name, text, time, deletedAt"
            });
            await this.open();
        } catch (e) {
            console.error(`ERROR: ${e}`);
            throw e;
        }
    }
}
```

### Database Functions

```typescript
import { createNote, retrieveNote, updateNote, type TNote } from "@lib/db.ts";

const MyComponent = () => {
    // CRUD operations
    const handleCreate = async () => {
        await createNote({ name: "New Note", text: "Content" });
    };

    // ...
};
```

### Available Functions (`@lib/db.ts`)

- `createNote({ name, text })` - Create a new note
- `retrieveNote(id)` - Get a note by ID
- `retrieveNotes()` - Get all active notes
- `retrieveDeletedNotes()` - Get all deleted notes (trash)
- `updateNote(id, { name, text })` - Update a note
- `softDeleteNote(id)` - Move a note to trash
- `restoreNote(id)` - Restore a note from trash
- `permanentlyDeleteNote(id)` - Permanently delete a note
- `searchNotes(query)` - Search notes by name or content
- `cleanExpiredNotes()` - Clean up expired notes in trash (retention period: 30 days)

## Metadata Configuration

- Export `metadata` and `viewport` objects using named exports
- Configure viewport with `colorScheme: "light dark"` and theme color
- Use correct Chinese language setting: `lang="zh-Hans-CN"`
- Include comprehensive PWA and SEO metadata

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

## Image and Link Usage

- Use `preload={true}` for critical images (e.g., favicon)
- Use `prefetch={true}` for navigation links
- Specify `alt`, `height`, `width` for all images
- Use relative paths for internal navigation

```typescript
<Image alt="favicon" height={48} preload={true} src="/favicon.svg" width={48} />
<Link href="/" prefetch={true}>...</Link>
```
