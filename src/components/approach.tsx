import { FadeIn } from "./fade-in";

const steps = [
  {
    number: "1",
    label: "Diagnostic call",
    description:
      "A 30-minute conversation to understand your firm's position, ambitions, and constraints.",
  },
  {
    number: "2",
    label: "Scoped proposal",
    description:
      "A written proposal with defined deliverables, timeline, and fee. No open-ended retainers at the outset.",
  },
  {
    number: "3",
    label: "90-day sprint",
    description:
      "Focused execution against agreed priorities. Monthly reporting against measurable outcomes.",
  },
  {
    number: "4",
    label: "Ongoing retainer",
    description:
      "For firms that want continued support, a standing engagement at reduced scope.",
  },
];

export function Approach() {
  return (
    <FadeIn>
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-14">
          Approach.
        </h2>
        <div className="space-y-8 max-w-2xl">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6">
              <span className="font-display text-lg text-ink/30 shrink-0 w-6">
                {step.number}
              </span>
              <div>
                <span className="font-display text-lg">{step.label}</span>
                <p className="mt-1 text-ink/80">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
