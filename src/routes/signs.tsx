import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { useI18n, signsContent } from "@/lib/i18n";

export const Route = createFileRoute("/signs")({
  head: () => ({
    meta: [
      { title: "Kerala RTO Traffic Signs — Drive With Renjith" },
      { name: "description", content: "Warning, mandatory and informatory road signs explained in English and Malayalam." },
      { property: "og:title", content: "Kerala RTO Traffic Signs" },
      { property: "og:description", content: "Learn the signs you must know before driving on Kerala roads." },
    ],
  }),
  component: Signs,
});

function ShapeBadge({ shape, glyph }: { shape: "warning" | "mandatory" | "info"; glyph: string }) {
  if (shape === "warning") {
    return (
      <div className="relative grid h-16 w-16 place-items-center">
        <div className="absolute inset-0" style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)", background: "linear-gradient(180deg,#fde68a,#f59e0b)" }} />
        <span className="relative font-display text-2xl text-black">{glyph}</span>
      </div>
    );
  }
  if (shape === "mandatory") {
    return (
      <div className="relative grid h-16 w-16 place-items-center rounded-full border-[6px] border-red-600 bg-white">
        <span className="font-display text-base text-black">{glyph}</span>
      </div>
    );
  }
  return (
    <div className="grid h-16 w-16 place-items-center rounded-md bg-blue-700 text-white">
      <span className="font-display text-xl">{glyph}</span>
    </div>
  );
}

function Group({ title, signs }: { title: string; signs: ReturnType<typeof signsContent.en.warning.slice> }) {
  return (
    <div className="mt-10">
      <h3 className="mb-4 font-display text-2xl">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {signs.map((s) => (
          <div key={s.name} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
            <ShapeBadge shape={s.shape} glyph={s.glyph} />
            <div className="min-w-0">
              <div className="font-display text-lg">{s.name}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Signs() {
  const { t, lang } = useI18n();
  const c = signsContent[lang];
  return (
    <Section kicker={t("nav_signs")} title={t("signs_title")} subtitle={t("signs_sub")}>
      <Group title={t("signs_warning")} signs={c.warning} />
      <Group title={t("signs_mandatory")} signs={c.mandatory} />
      <Group title={t("signs_informatory")} signs={c.informatory} />
    </Section>
  );
}
