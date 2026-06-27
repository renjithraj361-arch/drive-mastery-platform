import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n, programsContent } from "@/lib/i18n";
import { Section } from "@/components/Section";
import { AdSlot } from "@/components/AdSlot";
import heroCar from "@/assets/hero-car.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Drive With Renjith — Premium Driving Mastery" },
      {
        name: "description",
        content:
          "Train in your own car with India's most trusted private driving mentor. 15+ years of expertise, one-to-one cinematic coaching, 100% cash back guarantee.",
      },
      { property: "og:title", content: "Drive With Renjith — Premium Driving Mastery" },
      {
        property: "og:description",
        content: "Become a confident, safe and skilled driver. Cinematic one-to-one mentorship.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const programs = programsContent[lang].slice(0, 6);

  return (
    <>
      {/* HEADER BANNER AD */}
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <AdSlot slot="header" />
      </div>

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-hero" />
        <img
          src={heroCar}
          alt=""
          aria-hidden
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40 [mask-image:radial-gradient(80%_70%_at_70%_40%,black,transparent)]"
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_100%,oklch(0.13_0.012_60),transparent)]" />
        {/* Grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(70% 60% at 50% 30%, black, transparent)",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-32 lg:pb-40">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              {t("hero_kicker")}
            </div>

            <h1 className="font-display text-[3.25rem] leading-[0.95] text-balance text-gradient sm:text-7xl lg:text-[5.5rem]">
              Train In <br />
              <span className="text-gradient-orange">Your Own Car.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("hero_sub")}
            </p>

            <ul className="mt-8 grid gap-3 text-sm font-medium text-foreground/90">
              {[t("hero_bullet_1"), t("hero_bullet_2"), t("hero_bullet_3")].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-orange-gradient text-[11px] font-bold text-primary-foreground shadow-glow">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/book" className="btn-premium btn-premium-hover">
                {t("hero_cta_book")}
                <span aria-hidden>→</span>
              </Link>
              <Link to="/learning" className="btn-ghost-premium">
                {t("hero_cta_learning")}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border/60 pt-6">
              <a
                href="tel:+919447480651"
                className="group flex items-center gap-3 text-sm font-semibold text-foreground/90 transition hover:text-primary"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/40 backdrop-blur transition group-hover:border-primary/60">
                  📞
                </span>
                +91 94474 80651
              </a>
              <a
                href="tel:+919746133557"
                className="group flex items-center gap-3 text-sm font-semibold text-foreground/90 transition hover:text-primary"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/40 backdrop-blur transition group-hover:border-primary/60">
                  📞
                </span>
                +91 97461 33557
              </a>
            </div>
          </div>

          {/* GURU glass card */}
          <div className="relative animate-float">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-orange-gradient opacity-30 blur-3xl" />
            <div className="glass rounded-[2rem] p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                  {t("guru_title")}
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  ))}
                </div>
              </div>
              <blockquote className="mt-6 font-serif text-2xl leading-snug text-balance text-foreground sm:text-3xl">
                {t("guru_quote")}
              </blockquote>
              <div className="mt-8 h-px bg-[var(--gradient-gold-line)]" />
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                {[
                  ["15+", "Years"],
                  ["1000+", "Students"],
                  ["100%", "Cash Back"],
                ].map(([a, b]) => (
                  <div
                    key={a}
                    className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur"
                  >
                    <div className="font-display text-3xl text-gradient-orange">{a}</div>
                    <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {b}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="relative border-y border-border/60 bg-card/20 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground sm:px-6 lg:px-8">
            <span>★ Trusted by 1000+ drivers</span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span>15+ years of mastery</span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span>Kerala RTO certified</span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span>100% cash back guarantee</span>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <Section kicker={t("mission_title")} title={t("mission_title")} subtitle={t("mission_body")}>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { title: "Practical", body: "Every lesson is engineered around real roads — your car, your pace, your route." },
            { title: "Patient", body: "Calm, methodical mentorship that turns hesitation into instinct." },
            { title: "Personalised", body: "Bespoke programs tailored to age, experience and personal goals." },
          ].map((p, i) => (
            <div
              key={p.title}
              className="glass group relative overflow-hidden rounded-3xl p-7 transition hover:-translate-y-1"
            >
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-primary">0{i + 1}</div>
              <div className="mt-4 font-display text-4xl text-gradient">{p.title}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/30" />
            </div>
          ))}
        </div>
      </Section>

      {/* ABOUT TRAINER */}
      <Section title={t("about_title")} subtitle={t("about_body")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "City Roads", icon: "🏙️" },
            { label: "Hill Roads", icon: "⛰️" },
            { label: "Highways", icon: "🛣️" },
            { label: "Narrow Streets", icon: "🚦" },
          ].map((c) => (
            <div
              key={c.label}
              className="glass group flex items-center gap-4 rounded-2xl px-5 py-5 transition hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-orange-gradient text-xl shadow-glow">
                {c.icon}
              </span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Mastered</div>
                <div className="font-display text-lg">{c.label}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* IN-CONTENT AD */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSlot slot="in-content" />
      </div>

      {/* PROGRAMS + SIDEBAR */}
      <Section kicker={t("programs_title")} title={t("programs_title")} subtitle={t("programs_sub")}>
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-6 sm:grid-cols-2">
            {programs.map((p, i) => (
            <article
              key={p.title}
              className="glass group relative overflow-hidden rounded-3xl p-7 transition hover:-translate-y-2"
            >
              <div className="absolute right-5 top-5 font-display text-5xl text-foreground/5 transition group-hover:text-primary/20">
                0{i + 1}
              </div>
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-orange-gradient text-2xl text-primary-foreground shadow-glow ring-1 ring-white/20">
                {p.icon}
              </div>
              <h3 className="font-display text-2xl text-gradient">{p.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {p.items.slice(0, 4).map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {i}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/programs" className="btn-premium btn-premium-hover">
            {t("nav_programs")}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Section>

      {/* CONTACT ACTION CARDS */}
      <Section kicker="Get in touch" title="Start Your Journey Today">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { icon: "📞", label: "Call directly", value: "+91 94474 80651", href: "tel:+919447480651" },
            { icon: "💬", label: "WhatsApp instantly", value: "Chat now", href: "https://wa.me/919447480651" },
            { icon: "📅", label: "Reserve a slot", value: "Book training", href: "/book" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="glass group flex items-center justify-between gap-4 rounded-3xl p-6 transition hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-gradient text-2xl shadow-glow ring-1 ring-white/20">
                  {c.icon}
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                    {c.label}
                  </div>
                  <div className="font-display text-lg text-foreground">{c.value}</div>
                </div>
              </div>
              <span className="text-2xl text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary">
                →
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* SPECIAL MESSAGE */}
      <Section>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] p-1">
          <div className="absolute inset-0 bg-orange-gradient opacity-80" />
          <div className="absolute inset-px rounded-[calc(2rem-1px)] bg-background" />
          <div className="relative rounded-[calc(2rem-1px)] p-10 sm:p-14">
            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
              {t("special_title")}
            </div>
            <p className="mt-5 font-serif text-xl leading-relaxed text-foreground sm:text-2xl">
              {t("special_body")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book" className="btn-premium btn-premium-hover">
                {t("hero_cta_book")}
                <span aria-hidden>→</span>
              </Link>
              <a href="tel:+919447480651" className="btn-ghost-premium">
                {t("hero_call")}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
