import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { useI18n, learningContent } from "@/lib/i18n";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Learning Details — Drive With Renjith" },
      { name: "description", content: "Detailed driving education: day, night, rain, hill, highway, city, parking, steering, braking, overtaking and side-judgement." },
      { property: "og:title", content: "Learning Details — Drive With Renjith" },
      { property: "og:description", content: "In-depth, road-tested driving knowledge explained step by step." },
    ],
  }),
  component: Learning,
});

function Learning() {
  const { t, lang } = useI18n();
  const topics = learningContent[lang];
  return (
    <Section kicker={t("nav_learning")} title={t("learning_title")} subtitle={t("learning_sub")}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <article key={topic.title} className="rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow">
            <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-orange-gradient text-2xl text-primary-foreground shadow-glow">
              {topic.icon}
            </div>
            <h3 className="font-display text-xl">{topic.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{topic.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
