import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: "Cookie Policy — Drive With Renjith" }] }),
  component: () => (
    <Section kicker="Legal" title="Cookie Policy">
      <div className="prose max-w-3xl text-sm leading-relaxed text-muted-foreground">
        <p>We use a small number of essential cookies and local storage entries to keep you signed in, remember your language preference (English/Malayalam), and provide a secure booking experience.</p>
        <p className="mt-4">We do not use cookies for advertising tracking. Third-party services we rely on (authentication, payments, hosting) may set their own essential cookies as required to deliver those services.</p>
        <p className="mt-4">You can clear cookies from your browser at any time. Doing so will sign you out and reset your preferences.</p>
      </div>
    </Section>
  ),
});
