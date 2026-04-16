export function Hero() {
  return (
    <section className="px-6 pt-24 pb-20 md:px-12 md:pt-32 md:pb-28 lg:px-20 lg:pt-40 lg:pb-36 max-w-3xl">
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-ink">
        Brand and business development for boutique law firms.
      </h1>
      <p className="mt-6 text-lg md:text-xl text-ink/70 max-w-xl leading-relaxed">
        Cross-border counsel for firms building profile across Australia and
        Malaysia.
      </p>
      <a
        href="#enquiries"
        className="inline-block mt-8 text-forest border-b border-forest/40 hover:border-forest transition-colors"
      >
        Request a diagnostic &rarr;
      </a>
    </section>
  );
}
