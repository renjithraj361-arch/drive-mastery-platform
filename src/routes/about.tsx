import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Drive With Renjith" },
      { name: "description", content: "15+ years of professional driving training. Practical, patient and personalised lessons in your own car." },
      { property: "og:title", content: "About — Drive With Renjith" },
      { property: "og:description", content: "Meet the trainer and our mission." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useI18n();
  return (
    <>
      <Section kicker={t("guru_title")} title={t("about_title")} subtitle={t("about_body")}>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card sm:p-12">
          <blockquote className="font-display text-2xl leading-snug text-balance text-foreground sm:text-3xl">
            {t("guru_quote")}
          </blockquote>
          <div className="mt-6 h-px w-16 bg-primary" />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t("mission_body")}</p>
        </div>
      </Section>
    </>
  );
}
