import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/payment/success")({
  head: () => ({ meta: [{ title: "Payment Successful — Drive With Renjith" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <Section title="Payment Successful">
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-card">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-green-500/20 text-3xl">✓</div>
        <p className="text-sm text-muted-foreground">Thank you! Your booking is confirmed. We'll reach out on WhatsApp shortly.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/dashboard" className="rounded-full bg-orange-gradient px-4 py-2 text-sm font-bold text-primary-foreground shadow-glow">View Bookings</Link>
          <Link to="/" className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-bold">Home</Link>
        </div>
      </div>
    </Section>
  ),
});
