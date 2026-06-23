import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { useI18n, programsContent } from "@/lib/i18n";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Training Programs — Drive With Renjith" },
      { name: "description", content: "Day, night, rain, hill, city, highway, parking masterclass, confidence and special practical training." },
      { property: "og:title", content: "Training Programs — Drive With Renjith" },
      { property: "og:description", content: "Complete one-to-one practical driving programs." },
    ],
  }),
  component: Programs,
});

function Programs() {
  const { t, lang } = useI18n();
  const programs = programsContent[lang];
  return (
    <Section kicker={t("nav_programs")} title={t("programs_title")} subtitle={t("programs_sub")}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <article key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-glow">
            <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-orange-gradient text-2xl text-primary-foreground shadow-glow">
              {p.icon}
            </div>
            <h3 className="font-display text-xl">{p.title}</h3>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {p.items.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
