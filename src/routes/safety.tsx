import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { useI18n, safetyContent } from "@/lib/i18n";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Road Safety & Kerala RTO Traffic Signs — Drive With Renjith" },
      { name: "description", content: "Defensive driving, blind spot awareness and Kerala RTO warning, mandatory and informatory signs." },
      { property: "og:title", content: "Road Safety — Drive With Renjith" },
      { property: "og:description", content: "Learn the rules of the road, the safe way." },
    ],
  }),
  component: Safety,
});

const signCategories = {
  en: [
    { title: "Warning Signs", color: "bg-orange-gradient", samples: ["Right Hand Curve", "Steep Ascent", "Slippery Road", "Pedestrian Crossing", "School Ahead", "Narrow Bridge"] },
    { title: "Mandatory Signs", color: "bg-[oklch(0.55_0.22_27)]", samples: ["Stop", "Give Way", "No Entry", "No Parking", "Speed Limit", "No Overtaking"] },
    { title: "Informatory Signs", color: "bg-[oklch(0.5_0.13_240)]", samples: ["Hospital", "Petrol Pump", "Parking", "Public Telephone", "First Aid", "Eating Place"] },
  ],
  ml: [
    { title: "മുന്നറിയിപ്പ് സൈനുകൾ", color: "bg-orange-gradient", samples: ["വലത് വളവ്", "കുത്തനെയുള്ള കയറ്റം", "വഴുക്കുന്ന റോഡ്", "പെഡസ്ട്രിയൻ ക്രോസിങ്", "സ്കൂൾ", "ഇടുങ്ങിയ പാലം"] },
    { title: "നിർബന്ധിത സൈനുകൾ", color: "bg-[oklch(0.55_0.22_27)]", samples: ["സ്റ്റോപ്പ്", "വഴി കൊടുക്കുക", "പ്രവേശനമില്ല", "പാർക്കിങ് ഇല്ല", "സ്പീഡ് ലിമിറ്റ്", "ഓവർടേക്കിങ് ഇല്ല"] },
    { title: "വിവര സൈനുകൾ", color: "bg-[oklch(0.5_0.13_240)]", samples: ["ആശുപത്രി", "പെട്രോൾ പമ്പ്", "പാർക്കിങ്", "ടെലിഫോൺ", "ഫസ്റ്റ് എയ്ഡ്", "ഭക്ഷണശാല"] },
  ],
};

function Safety() {
  const { t, lang } = useI18n();
  return (
    <>
      <Section kicker={t("nav_safety")} title={t("safety_title")}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {safetyContent[lang].map((s) => (
            <div key={s} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">Safety</div>
              <div className="mt-1 font-display text-xl">{s}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t("signs_title")} subtitle={t("signs_sub")} className="bg-ice rounded-3xl">
        <div className="grid gap-6 lg:grid-cols-3">
          {signCategories[lang].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className={`mb-4 inline-block rounded-full ${c.color} px-3 py-1 text-xs font-bold uppercase tracking-widest text-white`}>
                {c.title}
              </div>
              <ul className="space-y-2 text-sm">
                {c.samples.map((s) => (
                  <li key={s} className="flex items-center gap-2 border-b border-border/50 pb-2 last:border-0">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-secondary-foreground">▲</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
