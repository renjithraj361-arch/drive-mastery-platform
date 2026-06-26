import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/use-auth";
import { supabase } from "@/integrations/supabase/client";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/programs", label: t("nav_programs") },
    { to: "/learning", label: t("nav_learning") },
    { to: "/vehicle", label: t("nav_vehicle") },
    { to: "/safety", label: t("nav_safety") },
    { to: "/signs", label: t("nav_signs") },
    { to: "/book", label: t("nav_book") },
    { to: "/about", label: t("nav_about") },
    { to: "/contact", label: t("nav_contact") },
  ] as const;

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3 group">
          <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-orange-gradient text-primary-foreground shadow-glow ring-1 ring-white/20 transition-transform group-hover:scale-105">
            <span className="font-display text-xl">R</span>
            <span className="absolute inset-0 rounded-2xl shimmer opacity-60" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-base tracking-wider text-foreground sm:text-lg">
              {t("brand")}
            </div>
            <div className="truncate text-[9px] font-semibold uppercase tracking-[0.3em] text-primary/80">
              {t("tagline")}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="relative rounded-full px-3 py-2 text-[13px] font-medium text-muted-foreground transition hover:text-foreground data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-full px-3 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground"
              >
                {t("nav_dashboard")}
              </Link>
              <button
                onClick={signOut}
                className="rounded-full px-3 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground"
              >
                {t("nav_signout")}
              </button>
            </>
          ) : (
            <Link to="/auth" className="ml-2 btn-premium btn-premium-hover !py-2 !px-4 !text-xs">
              {t("nav_signin")}
            </Link>
          )}
          <LangToggle lang={lang} setLang={setLang} />
        </nav>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/40 backdrop-blur xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16" strokeLinecap="round" />
                <path d="M4 12h16" strokeLinecap="round" />
                <path d="M4 17h10" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-2xl xl:hidden animate-fade-up">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition hover:bg-card hover:text-foreground data-[status=active]:bg-card data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground"
                >
                  {t("nav_dashboard")}
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="rounded-xl px-3 py-3 text-left text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground"
                >
                  {t("nav_signout")}
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="btn-premium btn-premium-hover mt-2 justify-center"
              >
                {t("nav_signin")}
              </Link>
            )}
            <div className="pt-3">
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
    <div className="ml-2 inline-flex rounded-full border border-border bg-card/40 p-1 text-xs font-semibold backdrop-blur">
      {(["en", "ml"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-3 py-1 transition ${
            lang === l
              ? "bg-orange-gradient text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l === "en" ? "EN" : "മല"}
        </button>
      ))}
    </div>
  );
}
