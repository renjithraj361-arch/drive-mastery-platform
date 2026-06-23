import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";

const faqs = [
  { q: "Do I need my own car?", a: "Yes. We train you in your own car so you become confident with the vehicle you drive every day." },
  { q: "I have a licence but no confidence. Can you help?", a: "Absolutely — that is exactly who this programme is for. We build practical confidence in real road conditions." },
  { q: "Is night and rain driving covered?", a: "Yes. Day, night, rain, hill, city, highway, narrow road and parking are all covered." },
  { q: "What is the refund policy?", a: "100% cash back if you are not satisfied with the training. Request within 24 hours of the session." },
  { q: "How do I book?", a: "Use the Book Training page or call +91 94474 80651 / +91 97461 33557." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Drive With Renjith" },
      { name: "description", content: "Common questions about training, confidence, refunds and booking." },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <Section kicker="Help" title="Frequently Asked Questions">
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 shadow-card open:shadow-glow">
            <summary className="cursor-pointer list-none font-display text-lg">
              <span className="mr-2 text-primary">›</span>
              {f.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
