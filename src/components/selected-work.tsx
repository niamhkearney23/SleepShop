import { FadeIn } from "./fade-in";

export function SelectedWork() {
  return (
    <FadeIn>
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20 max-w-2xl">
        <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-8">
          Selected work.
        </h2>
        <p className="text-ink/50">Case studies in preparation.</p>
      </section>
    </FadeIn>
  );
}
