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
    <section id={id} className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 ${className}`}>
      {(kicker || title || subtitle) && (
        <div className="mb-10 max-w-3xl">
          {kicker && (
            <div className="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-foreground">
              {kicker}
            </div>
          )}
          {title && <h2 className="font-display text-3xl text-balance sm:text-4xl lg:text-5xl">{title}</h2>}
          {subtitle && <p className="mt-3 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
