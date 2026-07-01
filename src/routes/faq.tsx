import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section kicker="Help" title="Frequently Asked Questions">
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`overflow-hidden rounded-2xl border bg-card shadow-card transition-all ${
                isOpen ? "border-primary/50 shadow-glow" : "border-border"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display text-base sm:text-lg text-foreground break-words">
                  {f.q}
                </span>
                <span
                  aria-hidden
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-gradient text-primary-foreground text-lg font-bold transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
