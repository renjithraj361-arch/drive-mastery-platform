import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/programs", label: t("nav_programs") },
    { to: "/vehicle", label: t("nav_vehicle") },
    { to: "/safety", label: t("nav_safety") },
    { to: "/book", label: t("nav_book") },
    { to: "/about", label: t("nav_about") },
    { to: "/contact", label: t("nav_contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-gradient text-primary-foreground shadow-glow">
            <span className="font-display text-xl">R</span>
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-base sm:text-lg">{t("brand")}</div>
            <div className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">{t("tagline")}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <LangToggle lang={lang} setLang={setLang} />
        </nav>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className="i">☰</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2">
              <LangToggle lang={lang} setLang={setLang} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function LangToggle({ lang, setLang }: { lang: "en" | "ml"; setLang: (l: "en" | "ml") => void }) {
  return (
    <div className="ml-2 inline-flex rounded-full border border-border bg-secondary p-1 text-xs font-semibold">
      {(["en", "ml"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-3 py-1 transition ${lang === l ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l === "en" ? "EN" : "മല"}
        </button>
      ))}
    </div>
  );
}
