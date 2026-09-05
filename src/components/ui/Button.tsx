"use client";

import { useRef, type ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "primary" | "outline" | "invert" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
  onClick?: () => void;
  magnetic?: boolean;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  magnetic = true,
  className = "",
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  useMagnetic(magnetic ? ref : { current: null });

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

/** Scroll suave in-page — usado pelos CTAs enquanto o WhatsApp comercial não é validado. */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
