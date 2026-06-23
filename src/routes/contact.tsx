import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Drive With Renjith" },
      { name: "description", content: "Call or WhatsApp our driving trainer to book your training session." },
      { property: "og:title", content: "Contact — Drive With Renjith" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  return (
    <Section kicker={t("nav_contact")} title={t("legal_contact")} subtitle="Call or WhatsApp us — we usually reply within minutes.">
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          { label: "Primary", num: "+91 94474 80651", tel: "+919447480651" },
          { label: "Secondary", num: "+91 97461 33557", tel: "+919746133557" },
        ].map((c) => (
          <a key={c.tel} href={`tel:${c.tel}`} className="rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-glow">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">{c.label}</div>
            <div className="mt-2 font-display text-2xl">{c.num}</div>
            <div className="mt-1 text-sm text-muted-foreground">Tap to call</div>
          </a>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="https://wa.me/919447480651" target="_blank" rel="noopener" className="rounded-full bg-orange-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow">
          WhatsApp Us
        </a>
      </div>
    </Section>
  );
}
