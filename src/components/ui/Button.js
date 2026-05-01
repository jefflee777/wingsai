"use client";

import { forwardRef } from "react";

const variants = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:opacity-90",
  secondary:
    "bg-[var(--color-primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-secondary)] active:opacity-90",
  accent:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] active:opacity-90",
  ghost:
    "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-alt)] active:opacity-90",
  outline:
    "bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
  danger:
    "bg-[var(--color-error)] text-white hover:opacity-90 active:opacity-80",
};

const sizes = {
  xs: "px-2.5 py-1 text-xs gap-1",
  sm: "px-3.5 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2",
  xl: "px-6 py-3 text-base gap-2.5",
};

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled = false,
      icon,
      iconRight,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center font-medium
          rounded-[var(--radius-lg)] transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer select-none
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {!loading && icon && <span className="text-base">{icon}</span>}
        {children}
        {iconRight && <span className="text-base">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
