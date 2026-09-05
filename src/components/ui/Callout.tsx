import type { ReactNode } from "react";

interface CalloutProps {
  title?: string;
  children: ReactNode;
}

export function Callout({ title, children }: CalloutProps) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        borderLeft: "3px solid var(--carmesim-500)",
        padding: "var(--space-6)",
      }}
    >
      {title ? (
        <div
          style={{
            font: "var(--weight-bold) var(--size-h4)/1.3 var(--font-display)",
            color: "var(--text-strong)",
            marginBottom: "var(--space-3)",
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{ font: "var(--type-body)", color: "var(--text-body)", maxWidth: "var(--measure)" }}>
        {children}
      </div>
    </div>
  );
}
