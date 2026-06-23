import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Drive With Renjith" },
      { name: "description", content: "Terms of use and training service conditions." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <Section kicker="Legal" title="Terms & Conditions">
      <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>By booking a training session with Drive With Renjith you agree to the following terms.</p>
        <h3 className="font-display text-lg text-foreground">Training</h3>
        <p>Training is conducted on a one-to-one basis in the student's own car. The student must hold a valid driving licence and the vehicle must be road-worthy and insured.</p>
        <h3 className="font-display text-lg text-foreground">Safety</h3>
        <p>Students must follow all traffic rules and trainer instructions during the session. The trainer reserves the right to stop a session if safety is compromised.</p>
        <h3 className="font-display text-lg text-foreground">Refund</h3>
        <p>If you are not satisfied with the training you receive, we offer a 100% cash back — please raise the request within 24 hours of the session.</p>
        <h3 className="font-display text-lg text-foreground">Changes</h3>
        <p>These terms may be updated from time to time. Continued use of the service indicates acceptance of the latest version.</p>
      </div>
    </Section>
  );
}
