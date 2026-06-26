import type { ReactNode } from "react";

export function Section({
  id,
  kicker,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 ${className}`}>
      {(kicker || title || subtitle) && (
        <div className="mb-12 max-w-3xl">
          {kicker && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur">
              <span className="h-1 w-1 rounded-full bg-primary" />
              {kicker}
            </div>
          )}
          {title && (
            <h2 className="font-display text-4xl text-balance text-gradient sm:text-5xl lg:text-6xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
