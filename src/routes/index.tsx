import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n, programsContent } from "@/lib/i18n";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Drive With Renjith — Train In Your Own Car" },
      { name: "description", content: "One-to-one driving training with 15+ years of trainer experience. Day, night, rain, hill, city, highway and parking masterclass." },
      { property: "og:title", content: "Drive With Renjith — Train In Your Own Car" },
      { property: "og:description", content: "Become a confident, safe, responsible and skilled driver. 100% cash back if not satisfied." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const programs = programsContent[lang].slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.25),transparent)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div className="text-primary-foreground">
            <div className="mb-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              {t("hero_kicker")}
            </div>
            <h1 className="font-display text-5xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
              {t("hero_title")}
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">{t("hero_sub")}</p>

            <ul className="mt-6 grid gap-2 text-sm font-medium">
              {[t("hero_bullet_1"), t("hero_bullet_2"), t("hero_bullet_3")].map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20">✓</span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-foreground shadow-glow transition hover:scale-[1.02]">
                {t("hero_cta_book")}
              </Link>
              <Link to="/programs" className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20">
                {t("hero_cta_start")}
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              <a href="tel:+919447480651" className="rounded-full bg-black/30 px-4 py-2 font-semibold text-white ring-1 ring-white/20 hover:bg-black/40">
                📞 +91 94474 80651
              </a>
              <a href="tel:+919746133557" className="rounded-full bg-black/30 px-4 py-2 font-semibold text-white ring-1 ring-white/20 hover:bg-black/40">
                📞 +91 97461 33557
              </a>
            </div>
          </div>

          {/* GURU card */}
          <div className="relative">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 text-primary-foreground shadow-glow backdrop-blur-xl sm:p-10">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{t("guru_title")}</div>
              <div className="mt-4 font-display text-2xl leading-tight text-balance sm:text-3xl">
                {t("guru_quote")}
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                {[["15+", "Years"], ["1000+", "Students"], ["100%", "Cash Back"]].map(([a, b]) => (
                  <div key={a} className="rounded-2xl bg-black/20 p-4 ring-1 ring-white/15">
                    <div className="font-display text-2xl">{a}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/70">{b}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <Section kicker={t("mission_title")} title={t("mission_title")} subtitle={t("mission_body")}>
        <div className="grid gap-4 sm:grid-cols-3">
          {["Practical", "Patient", "Personalised"].map((p) => (
            <div key={p} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="font-display text-3xl text-primary">{p}</div>
              <p className="mt-2 text-sm text-muted-foreground">Every lesson is designed around the student — your car, your pace, your roads.</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ABOUT TRAINER */}
      <Section title={t("about_title")} subtitle={t("about_body")} className="bg-ice rounded-3xl">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["City Roads", "Hill Roads", "Highways", "Narrow Streets"].map((c) => (
            <div key={c} className="rounded-xl border border-border bg-card px-5 py-4 text-sm font-semibold shadow-card">
              {c}
            </div>
          ))}
        </div>
      </Section>

      {/* PROGRAMS PREVIEW */}
      <Section kicker={t("programs_title")} title={t("programs_title")} subtitle={t("programs_sub")}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <article key={p.title} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-orange-gradient text-2xl text-primary-foreground shadow-glow">
                {p.icon}
              </div>
              <h3 className="font-display text-xl">{p.title}</h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {p.items.slice(0, 4).map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/programs" className="inline-flex items-center gap-2 rounded-full bg-orange-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow">
            {t("nav_programs")} →
          </Link>
        </div>
      </Section>

      {/* SPECIAL MESSAGE */}
      <Section className="bg-ice rounded-3xl">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-card sm:p-12">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{t("special_title")}</div>
          <p className="mt-4 text-lg leading-relaxed text-foreground">{t("special_body")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/book" className="rounded-full bg-orange-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow">
              {t("hero_cta_book")}
            </Link>
            <a href="tel:+919447480651" className="rounded-full border border-border bg-secondary px-6 py-3 text-sm font-bold">
              {t("hero_call")}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
