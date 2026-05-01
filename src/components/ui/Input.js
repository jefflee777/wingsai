"use client";

import { forwardRef } from "react";

const Input = forwardRef(
  ({ label, error, hint, icon, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-base">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`
              w-full px-3.5 py-2.5 text-sm
              bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)]
              text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]
              focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]
              transition-colors duration-200
              ${icon ? "pl-10" : ""}
              ${error ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]" : ""}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-[var(--color-error)]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export const Textarea = forwardRef(
  ({ label, error, hint, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-3.5 py-2.5 text-sm min-h-[100px] resize-y
            bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)]
            text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]
            focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]
            transition-colors duration-200
            ${error ? "border-[var(--color-error)]" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-xs text-[var(--color-error)]">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export const Select = forwardRef(
  ({ label, error, options = [], placeholder, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full px-3.5 py-2.5 text-sm appearance-none
            bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)]
            text-[var(--color-text)]
            focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]
            transition-colors duration-200 cursor-pointer
            ${error ? "border-[var(--color-error)]" : ""}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-[var(--color-error)]">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Input;
