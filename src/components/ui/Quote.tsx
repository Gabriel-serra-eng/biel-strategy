import type { ReactNode } from "react";

interface QuoteProps {
  children: ReactNode;
  author?: string;
}

export function Quote({ children, author }: QuoteProps) {
  return (
    <blockquote style={{ margin: 0, display: "flex", gap: "var(--space-5)" }}>
      <span
        aria-hidden="true"
        style={{ width: 3, alignSelf: "stretch", background: "var(--carmesim-500)", flex: "0 0 3px" }}
      />
      <div>
        <p
          style={{
            margin: 0,
            font: "italic var(--weight-medium) var(--size-h3)/1.5 var(--font-sans)",
            color: "var(--text-strong)",
            maxWidth: "var(--measure)",
          }}
        >
          {children}
        </p>
        {author ? (
          <div
            style={{
              marginTop: "var(--space-3)",
              font: "var(--type-kicker)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            {author}
          </div>
        ) : null}
      </div>
    </blockquote>
  );
}
