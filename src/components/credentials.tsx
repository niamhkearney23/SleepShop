import { FadeIn } from "./fade-in";

export function Credentials() {
  return (
    <FadeIn>
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20 max-w-2xl">
        <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-8">
          Credentials.
        </h2>
        <p className="text-ink/80">
          Merritt is led by Niamh Kearney, admitted to practice in Victoria, Australia,
          with professional roots in Melbourne and Kuala Lumpur. We work
          exclusively with boutique law firms, and our engagements are structured
          around the realities of legal practice — compliance obligations,
          partnership dynamics, and the long cycles of professional reputation.
        </p>
      </section>
    </FadeIn>
  );
}
