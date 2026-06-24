import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/payment/failed")({
  head: () => ({ meta: [{ title: "Payment Failed — Drive With Renjith" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <Section title="Payment Failed">
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-card">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-red-500/20 text-3xl">✕</div>
        <p className="text-sm text-muted-foreground">Your payment didn't go through. No amount has been charged. Please try again from your dashboard.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/dashboard" className="rounded-full bg-orange-gradient px-4 py-2 text-sm font-bold text-primary-foreground shadow-glow">Try Again</Link>
          <Link to="/contact" className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-bold">Contact Support</Link>
        </div>
      </div>
    </Section>
  ),
});
