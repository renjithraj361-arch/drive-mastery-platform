import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Section } from "@/components/Section";
import { useI18n, programsContent } from "@/lib/i18n";
import { useAuth } from "@/lib/use-auth";
import { createBooking } from "@/lib/bookings.functions";
import { createRazorpayOrder } from "@/lib/payments.functions";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Training — Drive With Renjith" },
      { name: "description", content: "Book your one-to-one driving training slot online — secure UPI payment available." },
      { property: "og:title", content: "Book Training — Drive With Renjith" },
    ],
  }),
  component: Book,
});

function Book() {
  const { t, lang } = useI18n();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const programs = programsContent[lang];
  const createFn = useServerFn(createBooking);
  const payFn = useServerFn(createRazorpayOrder);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>, pay: boolean) {
    e.preventDefault();
    if (!user) { navigate({ to: "/auth" }); return; }
    const f = new FormData(e.currentTarget);
    const data = {
      full_name: String(f.get("name") || "").trim(),
      mobile: String(f.get("mobile") || "").trim(),
      email: String(f.get("email") || "").trim(),
      training_type: String(f.get("type") || "").trim(),
      preferred_date: String(f.get("date") || "").trim(),
      preferred_time: String(f.get("time") || "").trim(),
    };
    if (!data.full_name || !data.mobile || !data.training_type || !data.preferred_date || !data.preferred_time) {
      setStatus("Please fill in all required fields.");
      return;
    }
    setBusy(true); setStatus(null);
    try {
      const booking = await createFn({ data });
      // Always also fire a WhatsApp message for the trainer
      const msg = encodeURIComponent(
        `New Training Booking — Drive With Renjith\n\nBooking: ${booking.id}\nName: ${data.full_name}\nMobile: ${data.mobile}\nEmail: ${data.email}\nTraining: ${data.training_type}\nDate: ${data.preferred_date}\nTime: ${data.preferred_time}`,
      );
      window.open(`https://wa.me/919447480651?text=${msg}`, "_blank", "noopener");

      if (pay) {
        try {
          const order = await payFn({ data: { booking_id: booking.id } });
          await openRazorpay(order, () => navigate({ to: "/payment/success" }), () => navigate({ to: "/payment/failed" }));
        } catch (e) {
          setStatus(`Payments are not configured yet — booking saved as pending. (${(e as Error).message})`);
        }
      } else {
        setStatus(t("book_saved"));
      }
    } catch (e) {
      setStatus((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <Section title={t("book_title")}><p className="text-sm text-muted-foreground">Loading…</p></Section>;
  }

  if (!user) {
    return (
      <Section kicker={t("nav_book")} title={t("book_title")} subtitle={t("book_sub")}>
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-card">
          <p className="text-sm text-muted-foreground">{t("book_signin_required")}</p>
          <Link to="/auth" className="mt-4 inline-block rounded-full bg-orange-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow">{t("nav_signin")}</Link>
        </div>
      </Section>
    );
  }

  return (
    <Section kicker={t("nav_book")} title={t("book_title")} subtitle={t("book_sub")}>
      <form
        onSubmit={(e) => {
          const action = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value;
          submit(e, action === "pay");
        }}
        className="grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8 lg:grid-cols-2"
      >
        <Field label={t("book_name")} name="name" required defaultValue={(user.user_metadata as any)?.full_name ?? ""} />
        <Field label={t("book_mobile")} name="mobile" type="tel" required pattern="[0-9+\\s\\-]{7,15}" />
        <Field label={t("book_email")} name="email" type="email" defaultValue={user.email ?? ""} />
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

        <div className="lg:col-span-2 flex flex-col gap-2 sm:flex-row">
          <button type="submit" name="action" value="save" disabled={busy} className="flex-1 rounded-full bg-orange-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-[1.01] disabled:opacity-60">
            {t("book_submit")}
          </button>
          <button type="submit" name="action" value="pay" disabled={busy} className="flex-1 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-bold disabled:opacity-60">
            {t("book_pay")}
          </button>
        </div>
        {status && <p className="lg:col-span-2 text-center text-sm text-muted-foreground">{status}</p>}

      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Or call directly:{" "}
        <a href="tel:+919447480651" className="font-semibold text-primary">+91 94474 80651</a>{" · "}
        <a href="tel:+919746133557" className="font-semibold text-primary">+91 97461 33557</a>
      </p>
    </Section>
  );
}

function Field({ label, name, type = "text", required, pattern, defaultValue }: { label: string; name: string; type?: string; required?: boolean; pattern?: string; defaultValue?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}{required && " *"}</label>
      <input name={name} type={type} required={required} pattern={pattern} defaultValue={defaultValue} maxLength={120}
        className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" />
    </div>
  );
}

async function loadRazorpay(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if ((window as any).Razorpay) return true;
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

async function openRazorpay(order: { key_id: string; order_id: string; amount: number; currency: string }, onSuccess: () => void, onFail: () => void) {
  const ok = await loadRazorpay();
  if (!ok) { alert("Could not load payment gateway."); return; }
  const rzp = new (window as any).Razorpay({
    key: order.key_id,
    amount: order.amount,
    currency: order.currency,
    order_id: order.order_id,
    name: "Drive With Renjith",
    description: "Training booking fee",
    handler: () => onSuccess(),
    modal: { ondismiss: () => onFail() },
    theme: { color: "#f97316" },
  });
  rzp.on("payment.failed", () => onFail());
  rzp.open();
}
