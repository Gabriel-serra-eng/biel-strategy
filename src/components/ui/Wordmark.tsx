interface WordmarkProps {
  size?: number;
  className?: string;
}

export function Wordmark({ size = 16, className = "" }: WordmarkProps) {
  return (
    <span
      className={("wordmark " + className).trim()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4em",
        font: `var(--weight-bold) ${size}px/1 var(--font-sans)`,
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        color: "var(--white)",
      }}
    >
      <span>BIEL</span>
      <span style={{ color: "var(--carmesim-500)" }}>STRATEGY</span>
    </span>
  );
}
