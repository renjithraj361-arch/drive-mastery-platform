import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-border/60 bg-ice">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="font-display text-2xl">{t("brand")}</div>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">{t("footer_built")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="tel:+919447480651" className="rounded-full bg-orange-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow">+91 94474 80651</a>
            <a href="tel:+919746133557" className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold">+91 97461 33557</a>
          </div>
        </div>
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/programs" className="hover:text-primary">{t("nav_programs")}</Link></li>
            <li><Link to="/vehicle" className="hover:text-primary">{t("nav_vehicle")}</Link></li>
            <li><Link to="/safety" className="hover:text-primary">{t("nav_safety")}</Link></li>
            <li><Link to="/book" className="hover:text-primary">{t("nav_book")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Legal</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary">{t("legal_about")}</Link></li>
            <li><Link to="/contact" className="hover:text-primary">{t("legal_contact")}</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">{t("legal_privacy")}</Link></li>
            <li><Link to="/terms" className="hover:text-primary">{t("legal_terms")}</Link></li>
            <li><Link to="/faq" className="hover:text-primary">{t("nav_faq")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {year} {t("brand")}. {t("footer_rights")}
      </div>
    </footer>
  );
}
