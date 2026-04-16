import { FadeIn } from "./fade-in";

export function Problem() {
  return (
    <FadeIn>
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20 max-w-2xl">
        <p className="mb-6">
          Most boutique law firms are poorly served by their marketing.
          Generalist agencies pitch campaigns built for consumer brands, with
          little understanding of legal compliance, referral dynamics, or the way
          professional reputation actually works. The result is wasted retainers
          and a LinkedIn presence that reads like it was written by someone who
          has never seen the inside of a courtroom.
        </p>
        <p>
          Internally, the situation is no better. Partners know they should be
          building profile, but the work falls between roles — too strategic for
          a junior marketing hire, too operational for the partners themselves.
          Consistency suffers. Opportunities pass.
        </p>
      </section>
    </FadeIn>
  );
}
