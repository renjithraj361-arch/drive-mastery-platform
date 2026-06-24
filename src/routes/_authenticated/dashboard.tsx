import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/use-auth";
import { listMyBookings, listMyPayments, cancelBooking } from "@/lib/bookings.functions";
import { createRazorpayOrder } from "@/lib/payments.functions";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "My Dashboard — Drive With Renjith" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

type Tab = "profile" | "bookings" | "payments";

function Dashboard() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("profile");

  const tabs: { id: Tab; label: string }[] = [
    { id: "profile", label: t("dashboard_profile") },
    { id: "bookings", label: t("dashboard_bookings") },
    { id: "payments", label: t("dashboard_payments") },
  ];

  return (
    <Section kicker={t("nav_dashboard")} title={t("dashboard_title")}>
      <div className="mb-6 flex flex-wrap gap-1 rounded-full border border-border bg-secondary p-1 text-xs font-semibold">
        {tabs.map((x) => (
          <button key={x.id} onClick={() => setTab(x.id)} className={`flex-1 rounded-full px-3 py-1.5 transition ${tab === x.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {x.label}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <Row k="Email" v={user?.email ?? "—"} />
          <Row k="Phone" v={user?.phone ?? "—"} />
          <Row k="User ID" v={user?.id ?? "—"} />
          <Row k="Joined" v={user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"} />
        </div>
      )}
      {tab === "bookings" && <BookingsList />}
      {tab === "payments" && <PaymentsList />}
    </Section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/60 py-3 last:border-0">
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{k}</div>
      <div className="text-right text-sm break-all">{v}</div>
    </div>
  );
}

function BookingsList() {
  const { t } = useI18n();
  const fetchBookings = useServerFn(listMyBookings);
  const cancelFn = useServerFn(cancelBooking);
  const payFn = useServerFn(createRazorpayOrder);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const q = useQuery({ queryKey: ["my-bookings"], queryFn: () => fetchBookings() });
  const cancel = useMutation({
    mutationFn: (id: string) => cancelFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-bookings"] }),
  });

  async function pay(bookingId: string, amount: number) {
    try {
      const order = await payFn({ data: { booking_id: bookingId } });
      await openRazorpay(order, amount, () => navigate({ to: "/payment/success" }), () => navigate({ to: "/payment/failed" }));
    } catch (e) {
      alert((e as Error).message);
    }
  }

  if (q.isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const rows = q.data ?? [];
  if (!rows.length) return <p className="text-sm text-muted-foreground">{t("dashboard_empty")}</p>;
  return (
    <div className="grid gap-3">
      {rows.map((b: any) => (
        <div key={b.id} className="grid gap-2 rounded-2xl border border-border bg-card p-4 shadow-card sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="font-display text-lg">{b.training_type}</div>
            <div className="text-xs text-muted-foreground">{b.preferred_date} • {b.preferred_time}</div>
            <div className="mt-1 text-xs"><span className="rounded-full bg-secondary px-2 py-0.5 font-semibold uppercase tracking-widest">{b.status}</span> · ₹{b.amount}</div>
          </div>
          <div className="flex gap-2">
            {b.status === "pending" && (
              <button onClick={() => pay(b.id, Number(b.amount))} className="rounded-full bg-orange-gradient px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-glow">
                {t("dashboard_pay_now")}
              </button>
            )}
            {b.status !== "cancelled" && b.status !== "completed" && (
              <button onClick={() => cancel.mutate(b.id)} className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-semibold">
                {t("dashboard_cancel")}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function PaymentsList() {
  const { t } = useI18n();
  const fetchPayments = useServerFn(listMyPayments);
  const q = useQuery({ queryKey: ["my-payments"], queryFn: () => fetchPayments() });
  if (q.isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const rows = q.data ?? [];
  if (!rows.length) return <p className="text-sm text-muted-foreground">{t("dashboard_empty")}</p>;
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
      <table className="w-full text-sm">
        <thead className="bg-secondary text-xs uppercase tracking-widest text-muted-foreground">
          <tr><th className="p-3 text-left">Date</th><th className="p-3 text-left">Booking</th><th className="p-3 text-left">Amount</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Order</th></tr>
        </thead>
        <tbody>
          {rows.map((p: any) => (
            <tr key={p.id} className="border-t border-border/60">
              <td className="p-3">{new Date(p.created_at).toLocaleString()}</td>
              <td className="p-3 font-mono text-xs">{p.booking_id.slice(0, 8)}</td>
              <td className="p-3">₹{p.amount} {p.currency}</td>
              <td className="p-3"><span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold uppercase tracking-widest">{p.status}</span></td>
              <td className="p-3 font-mono text-xs">{p.provider_order_id ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

async function openRazorpay(order: { key_id: string; order_id: string; amount: number; currency: string }, amount: number, onSuccess: () => void, onFail: () => void) {
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
