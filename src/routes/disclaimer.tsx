import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({ meta: [{ title: "Disclaimer — Drive With Renjith" }] }),
  component: () => (
    <Section kicker="Legal" title="Disclaimer">
      <div className="prose max-w-3xl text-sm leading-relaxed text-muted-foreground">
        <p>The content on this website is for general educational purposes only. While we make every effort to keep information accurate and current, road rules, RTO signs, and procedures may change without notice.</p>
        <p className="mt-4">Practical driving training is delivered in the student's own vehicle. The student remains the registered owner/operator of the vehicle and is responsible for valid insurance, road tax, fitness, and a valid driving licence at all times during practice sessions.</p>
        <p className="mt-4">Drive With Renjith and its trainers will not be held liable for any loss, damage, or injury arising from misuse of the information on this website or from any incident outside the trainer's direct supervision.</p>
      </div>
    </Section>
  ),
});
