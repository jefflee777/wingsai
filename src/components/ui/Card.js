"use client";

export default function Card({
  children,
  className = "",
  hover = false,
  padding = "p-5",
  ...props
}) {
  return (
    <div
      className={`
        bg-white rounded-[var(--radius-xl)] border border-[var(--color-border)]
        ${padding}
        ${hover ? "hover:shadow-[var(--shadow-md)] hover:border-[var(--color-border-strong)] transition-all duration-200 cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3
      className={`text-base font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)] ${className}`}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }) {
  return (
    <p className={`text-sm text-[var(--color-text-secondary)] ${className}`}>
      {children}
    </p>
  );
}
