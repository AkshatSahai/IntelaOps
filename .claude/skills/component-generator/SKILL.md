# Skill: Component Generator

Generates new React components following project conventions.

## When to Use

When adding a new UI component to `src/components/`.

## Rules

1. Read DESIGN.md at project root (if it exists) before generating any component
2. Use Tailwind CSS only — no inline styles, no CSS modules
3. Named export (not default export)
4. Add `"use client"` directive only if the component uses hooks or browser APIs
5. Accept a `className?: string` prop and merge with `cn()` for composability
6. Props interface defined inline above the component
7. Return type must be explicit: `React.JSX.Element`

## Template

```tsx
import { cn } from "@/lib/utils";

interface MyComponentProps {
  // props here
  className?: string;
}

export function MyComponent({ className }: MyComponentProps): React.JSX.Element {
  return (
    <div className={cn("base-classes", className)}>
      {/* content */}
    </div>
  );
}
```

## File Location

`src/components/<category>/<component-name>.tsx`

Categories: `chat/`, `roles/`, `layout/`, `ui/` (shadcn primitives only)
