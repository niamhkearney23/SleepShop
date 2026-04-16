import { FadeIn } from "./fade-in";

const services = [
  {
    label: "Partner profile",
    description:
      "Building named-partner visibility through considered LinkedIn content, conference speaking, and thought leadership publishing. We position individual partners as recognised voices in their practice areas, not through self-promotion, but through substantive contribution to professional discourse.",
  },
  {
    label: "Cross-border visibility",
    description:
      "Positioning firms for referral work between Australia and Malaysia through targeted SEO, jurisdiction-specific content, and direct outreach to complementary practices. We understand both markets because we have worked in both.",
  },
  {
    label: "Client intake",
    description:
      "Designing and implementing the systems that convert inbound enquiry into engaged matters. From initial response protocols to conflict-check workflows, we build the operational layer that most boutique firms are missing.",
  },
];

export function Practice() {
  return (
    <FadeIn>
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-14">
          Practice.
        </h2>
        <div className="space-y-12 max-w-2xl">
          {services.map((service) => (
            <div key={service.label}>
              <h3 className="font-display text-lg mb-3">{service.label}</h3>
              <p className="text-ink/80">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
