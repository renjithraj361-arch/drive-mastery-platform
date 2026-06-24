import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/refund")({
  head: () => ({ meta: [{ title: "Refund Policy — Drive With Renjith" }] }),
  component: () => (
    <Section kicker="Legal" title="Refund Policy">
      <div className="prose max-w-3xl text-sm leading-relaxed text-muted-foreground">
        <p>We stand behind our training quality with a 100% cash-back commitment for students who are not satisfied after completing the agreed sessions, subject to the conditions below.</p>
        <h3 className="mt-6 font-display text-lg text-foreground">Eligibility</h3>
        <p>Refund requests must be raised within 7 days of completing the final scheduled session, in writing (email or WhatsApp), explaining the reasons for dissatisfaction.</p>
        <h3 className="mt-6 font-display text-lg text-foreground">Booking fees</h3>
        <p>Booking fees paid online (via Razorpay/UPI) are refundable if the session is cancelled at least 24 hours in advance. Last-minute cancellations or no-shows are non-refundable.</p>
        <h3 className="mt-6 font-display text-lg text-foreground">Processing time</h3>
        <p>Approved refunds are processed back to the original payment method within 7 working days.</p>
        <h3 className="mt-6 font-display text-lg text-foreground">Contact</h3>
        <p>Email: drivewithrenjith@gmail.com — Phone/WhatsApp: +91 94474 80651.</p>
      </div>
    </Section>
  ),
});
