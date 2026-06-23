import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/Section";
import { useI18n, programsContent } from "@/lib/i18n";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Training — Drive With Renjith" },
      { name: "description", content: "Book your one-to-one driving training slot. We will confirm on WhatsApp." },
      { property: "og:title", content: "Book Training — Drive With Renjith" },
      { property: "og:description", content: "Pick a date, time and training type. We'll handle the rest." },
    ],
  }),
  component: Book,
});

function Book() {
  const { t, lang } = useI18n();
  const programs = programsContent[lang];
  const [status, setStatus] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const mobile = String(f.get("mobile") || "").trim();
    const email = String(f.get("email") || "").trim();
    const type = String(f.get("type") || "").trim();
    const date = String(f.get("date") || "").trim();
    const time = String(f.get("time") || "").trim();

    if (!name || !mobile || !type || !date || !time) {
      setStatus("Please fill in all required fields.");
      return;
    }

    const msg = encodeURIComponent(
      `New Training Booking — Drive With Renjith\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nTraining: ${type}\nDate: ${date}\nTime: ${time}`
    );
    setStatus(t("book_success"));
    window.open(`https://wa.me/919447480651?text=${msg}`, "_blank", "noopener");
  }

  return (
    <Section kicker={t("nav_book")} title={t("book_title")} subtitle={t("book_sub")}>
      <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8 lg:grid-cols-2">
        <Field label={t("book_name")} name="name" required />
        <Field label={t("book_mobile")} name="mobile" type="tel" required pattern="[0-9+\\s]{7,15}" />
        <Field label={t("book_email")} name="email" type="email" />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("book_type")} *</label>
          <select name="type" required className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm">
            <option value="">—</option>
            {programs.map((p) => (
              <option key={p.title} value={p.title}>{p.title}</option>
            ))}
          </select>
        </div>
        <Field label={t("book_date")} name="date" type="date" required />
        <Field label={t("book_time")} name="time" type="time" required />

        <div className="lg:col-span-2">
          <button type="submit" className="w-full rounded-full bg-orange-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-[1.01]">
            {t("book_submit")}
          </button>
          {status && <p className="mt-3 text-center text-sm text-muted-foreground">{status}</p>}
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Or call directly:{" "}
        <a href="tel:+919447480651" className="font-semibold text-primary">+91 94474 80651</a>{" · "}
        <a href="tel:+919746133557" className="font-semibold text-primary">+91 97461 33557</a>
      </p>
    </Section>
  );
}

function Field({ label, name, type = "text", required, pattern }: { label: string; name: string; type?: string; required?: boolean; pattern?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}{required && " *"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        pattern={pattern}
        maxLength={120}
        className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}
