import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Drive With Renjith" },
      { name: "description", content: "How we collect and use information on Drive With Renjith." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <Section kicker="Legal" title="Privacy Policy">
      <div className="prose prose-slate max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>This page is maintained by Drive With Renjith to explain how personal information is handled when you book a training session or contact us through this website.</p>
        <h3 className="font-display text-lg text-foreground">Information we collect</h3>
        <p>When you submit a booking form we collect your name, mobile number, email (optional), preferred training type, date and time. This information is used only to confirm and schedule your training.</p>
        <h3 className="font-display text-lg text-foreground">How we use it</h3>
        <p>We use your details to contact you about your booking, share reminders and provide customer support. We do not sell or rent your information.</p>
        <h3 className="font-display text-lg text-foreground">Communication</h3>
        <p>Booking requests submitted through this website open WhatsApp on your device so you can send the details directly to our trainer.</p>
        <h3 className="font-display text-lg text-foreground">Contact</h3>
        <p>Questions about this policy? Call +91 94474 80651 or +91 97461 33557.</p>
      </div>
    </Section>
  );
}
