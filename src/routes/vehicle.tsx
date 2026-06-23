import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { useI18n, vehicleContent, engineStrokes } from "@/lib/i18n";

export const Route = createFileRoute("/vehicle")({
  head: () => ({
    meta: [
      { title: "Vehicle Knowledge & Four Stroke Engine — Drive With Renjith" },
      { name: "description", content: "Vehicle inspection, fluids, tyres, dashboard lights and how a four stroke petrol engine works." },
      { property: "og:title", content: "Vehicle Knowledge — Drive With Renjith" },
      { property: "og:description", content: "Educational content for every car owner." },
    ],
  }),
  component: Vehicle,
});

function Vehicle() {
  const { t, lang } = useI18n();
  return (
    <>
      <Section kicker={t("nav_vehicle")} title={t("vehicle_title")} subtitle={t("vehicle_sub")}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {vehicleContent[lang].map((v, i) => (
            <div key={v} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary font-display text-sm text-secondary-foreground">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="min-w-0 font-medium">{v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t("engine_title")} subtitle={t("engine_sub")} className="bg-ice rounded-3xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {engineStrokes[lang].map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-orange-gradient font-display text-lg text-primary-foreground shadow-glow">
                {s.n}
              </div>
              <h3 className="font-display text-lg">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
