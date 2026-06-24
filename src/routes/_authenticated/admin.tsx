import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Section } from "@/components/Section";
import { useI18n } from "@/lib/i18n";
import { adminListBookings, adminListPayments, adminUpdateBookingStatus, amIAdmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — Drive With Renjith" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

function Admin() {
  const { t } = useI18n();
  const isAdminFn = useServerFn(amIAdmin);
  const adminQ = useQuery({ queryKey: ["am-i-admin"], queryFn: () => isAdminFn() });
  const [tab, setTab] = useState<"bookings" | "payments">("bookings");

  if (adminQ.isLoading) return <Section title={t("admin_title")}><p className="text-sm text-muted-foreground">Loading…</p></Section>;
  if (!adminQ.data) return <Section title={t("admin_title")}><p className="text-sm text-muted-foreground">{t("admin_no_access")}</p></Section>;

  return (
    <Section kicker={t("nav_admin")} title={t("admin_title")}>
      <div className="mb-6 inline-flex rounded-full border border-border bg-secondary p-1 text-xs font-semibold">
        <button onClick={() => setTab("bookings")} className={`rounded-full px-4 py-1.5 ${tab === "bookings" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{t("admin_all_bookings")}</button>
        <button onClick={() => setTab("payments")} className={`rounded-full px-4 py-1.5 ${tab === "payments" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{t("admin_all_payments")}</button>
      </div>
      {tab === "bookings" ? <AdminBookings /> : <AdminPayments />}
    </Section>
  );
}

function exportCsv(rows: any[], filename: string) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(","), ...rows.map((r) => keys.map((k) => JSON.stringify(r[k] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function AdminBookings() {
  const { t } = useI18n();
  const fetchFn = useServerFn(adminListBookings);
  const updateFn = useServerFn(adminUpdateBookingStatus);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin-bookings"], queryFn: () => fetchFn() });
  const mut = useMutation({
    mutationFn: (p: { id: string; status: any }) => updateFn({ data: p }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-bookings"] }),
  });
  const rows = q.data ?? [];
  return (
    <div>
      <div className="mb-3 flex justify-end">
        <button onClick={() => exportCsv(rows, "bookings.csv")} className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-semibold">{t("admin_export")}</button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-widest text-muted-foreground">
            <tr><th className="p-3 text-left">Date</th><th className="p-3 text-left">Name</th><th className="p-3 text-left">Mobile</th><th className="p-3 text-left">Type</th><th className="p-3 text-left">When</th><th className="p-3 text-left">Status</th></tr>
          </thead>
          <tbody>
            {rows.map((b: any) => (
              <tr key={b.id} className="border-t border-border/60">
                <td className="p-3">{new Date(b.created_at).toLocaleDateString()}</td>
                <td className="p-3">{b.full_name}</td>
                <td className="p-3">{b.mobile}</td>
                <td className="p-3">{b.training_type}</td>
                <td className="p-3">{b.preferred_date} {b.preferred_time}</td>
                <td className="p-3">
                  <select defaultValue={b.status} onChange={(e) => mut.mutate({ id: b.id, status: e.target.value })} className="rounded-md border border-input bg-background px-2 py-1 text-xs">
                    {["pending", "confirmed", "cancelled", "completed"].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminPayments() {
  const { t } = useI18n();
  const fetchFn = useServerFn(adminListPayments);
  const q = useQuery({ queryKey: ["admin-payments"], queryFn: () => fetchFn() });
  const rows = q.data ?? [];
  return (
    <div>
      <div className="mb-3 flex justify-end">
        <button onClick={() => exportCsv(rows, "payments.csv")} className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-semibold">{t("admin_export")}</button>
      </div>
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
                <td className="p-3">{p.status}</td>
                <td className="p-3 font-mono text-xs">{p.provider_order_id ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
