"use client";

const variants = {
  default: "bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)]",
  primary: "bg-[var(--color-primary-light)] text-[var(--color-primary)]",
  success: "bg-[var(--color-success-light)] text-[var(--color-success)]",
  warning: "bg-[var(--color-warning-light)] text-[var(--color-warning)]",
  error: "bg-[var(--color-error-light)] text-[var(--color-error)]",
  purple: "bg-[var(--color-purple-light)] text-[var(--color-purple)]",
  accent: "bg-[var(--color-accent-light)] text-[var(--color-accent)]",
};

export default function Badge({
  children,
  variant = "default",
  dot = false,
  icon,
  className = "",
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[var(--radius-full)]
        text-xs font-medium whitespace-nowrap
        ${variants[variant]}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full bg-current ${
            variant === "primary" ? "animate-pulse-dot" : ""
          }`}
        />
      )}
      {icon && <span className="text-xs">{icon}</span>}
      {children}
    </span>
  );
}
