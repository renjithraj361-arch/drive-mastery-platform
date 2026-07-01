import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/60 bg-[oklch(0.1_0.012_60)]">
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--gradient-gold-line)]" />
      <div className="absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-gradient text-primary-foreground shadow-glow ring-1 ring-white/20">
              <span className="font-display text-xl">R</span>
            </div>
            <div>
              <div className="font-display text-xl tracking-wider">{t("brand")}</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/80">
                {t("tagline")}
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">{t("footer_built")}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href="tel:+919447480651" className="btn-premium btn-premium-hover !px-4 !py-2.5 !text-xs">
              +91 94474 80651
            </a>
            <a href="tel:+919746133557" className="btn-ghost-premium !px-4 !py-2.5 !text-xs">
              +91 97461 33557
            </a>
          </div>
        </div>
        <div>
          <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Explore</div>
          <ul className="space-y-3 text-sm text-white/85">
            <li><Link to="/programs" className="transition hover:text-primary">{t("nav_programs")}</Link></li>
            <li><Link to="/learning" className="transition hover:text-primary">{t("nav_learning")}</Link></li>
            <li><Link to="/vehicle" className="transition hover:text-primary">{t("nav_vehicle")}</Link></li>
            <li><Link to="/safety" className="transition hover:text-primary">{t("nav_safety")}</Link></li>
            <li><Link to="/signs" className="transition hover:text-primary">{t("nav_signs")}</Link></li>
            <li><Link to="/book" className="transition hover:text-primary">{t("nav_book")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Company</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/about" className="transition hover:text-foreground">{t("legal_about")}</Link></li>
            <li><Link to="/contact" className="transition hover:text-foreground">{t("legal_contact")}</Link></li>
            <li><Link to="/privacy" className="transition hover:text-foreground">{t("legal_privacy")}</Link></li>
            <li><Link to="/terms" className="transition hover:text-foreground">{t("legal_terms")}</Link></li>
            <li><Link to="/refund" className="transition hover:text-foreground">{t("legal_refund")}</Link></li>
            <li><Link to="/disclaimer" className="transition hover:text-foreground">{t("legal_disclaimer")}</Link></li>
            <li><Link to="/cookies" className="transition hover:text-foreground">{t("legal_cookies")}</Link></li>
            <li><Link to="/faq" className="transition hover:text-foreground">{t("nav_faq")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {year} {t("brand")} · {t("footer_rights")}
      </div>
    </footer>
  );
}
