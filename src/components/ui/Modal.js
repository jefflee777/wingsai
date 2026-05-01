"use client";

import { motion, AnimatePresence } from "motion/react";
import { LuX } from "react-icons/lu";

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
}) {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-3xl",
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`relative bg-white rounded-[var(--radius-2xl)] border border-[var(--color-border)] shadow-[var(--shadow-xl)] w-full ${sizes[size]} overflow-hidden`}
          >
            {/* Header */}
            {(title || onClose) && (
              <div className="flex items-start justify-between p-5 pb-0">
                <div>
                  {title && (
                    <h3 className="text-lg font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)]">
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      {description}
                    </p>
                  )}
                </div>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
                  >
                    <LuX className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
