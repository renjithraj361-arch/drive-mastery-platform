/**
 * AdSlot — AdSense-ready placeholder.
 *
 * Reserves layout space (prevents CLS) and provides a stable wrapper for
 * future Google AdSense <ins class="adsbygoogle" /> insertion. No live ad
 * code is loaded; in production you can swap the inner placeholder with
 * the real <ins> tag and call (adsbygoogle = window.adsbygoogle || []).push({}).
 */
type Slot = "header" | "in-content" | "sidebar" | "footer";

const SIZES: Record<Slot, { className: string; label: string }> = {
  header: {
    className: "mx-auto w-full max-w-[970px] h-[90px] sm:h-[90px] min-h-[90px]",
    label: "Header Banner · 970×90 / 728×90 / 320×50",
  },
  "in-content": {
    className: "mx-auto w-full max-w-[728px] min-h-[250px] sm:min-h-[280px]",
    label: "In-Content · Responsive",
  },
  sidebar: {
    className: "w-full max-w-[300px] min-h-[600px]",
    label: "Sidebar · 300×600 / 300×250",
  },
  footer: {
    className: "mx-auto w-full max-w-[970px] min-h-[100px]",
    label: "Footer Banner · 970×90 / 320×100",
  },
};

export function AdSlot({
  slot,
  className = "",
  desktopOnly = false,
}: {
  slot: Slot;
  className?: string;
  desktopOnly?: boolean;
}) {
  const cfg = SIZES[slot];
  return (
    <aside
      aria-label="Advertisement"
      data-ad-slot={slot}
      className={[
        "my-8 flex items-center justify-center rounded-2xl border border-dashed border-border/70 bg-card/30 px-4 py-4 text-center backdrop-blur",
        desktopOnly ? "hidden lg:flex" : "",
        cfg.className,
        className,
      ].join(" ")}
    >
      {/* AdSense ins tag goes here in production:
          <ins class="adsbygoogle" style={{ display: "block" }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true" />
      */}
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">
        {cfg.label}
      </div>
    </aside>
  );
}
