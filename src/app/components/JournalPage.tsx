import { H1, H2, H3, Body, Caption, Footer } from '@/app/components/design-system';

export const JournalPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#FAF9F7] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <H1>Sleep Notes</H1>
          <Body className="mt-5 max-w-2xl mx-auto text-[#7A7A7A]">
            Thoughtful perspectives on sleep, stress, and the gut-brain connection
          </Body>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="space-y-16 sm:space-y-20">
            {/* Article 1 */}
            <article className="space-y-5 sm:space-y-6 pb-12 sm:pb-16 border-b border-[#E8E6E3]">
              <Caption className="text-[#B4A7D6]">January 2025</Caption>
              <H2 className="text-[28px] sm:text-[32px]">Why we don't use melatonin</H2>
              <Body>
                Melatonin has become the default sleep aid, but it's not without drawbacks. High doses can disrupt your body's natural melatonin production over time, and for many, it creates grogginess rather than genuine rest.
              </Body>
              <Body>
                We chose a different path. Dr Gut Pro-S works by supporting the gut-brain axis—the communication system that naturally regulates sleep, mood, and stress. Instead of forcing sleep with synthetic hormones, we nurture the conditions that allow restful sleep to happen on its own.
              </Body>
              <Body>
                The result? Most people wake feeling refreshed, not sedated. Your body learns to sleep well again, rather than depending on an external cue.
              </Body>
            </article>

            {/* Article 2 */}
            <article className="space-y-5 sm:space-y-6 pb-12 sm:pb-16 border-b border-[#E8E6E3]">
              <Caption className="text-[#B4A7D6]">December 2024</Caption>
              <H2 className="text-[28px] sm:text-[32px]">The gut produces 90% of your serotonin</H2>
              <Body>
                When we think about mood and sleep, we usually think about the brain. But research shows that 90% of serotonin—the neurotransmitter responsible for regulating mood and sleep—is produced in the gut.
              </Body>
              <Body>
                This is why gut health and mental health are so deeply connected. An imbalanced microbiome can affect serotonin production, making it harder to feel calm, manage stress, or fall asleep naturally.
              </Body>
              <Body>
                Supporting your gut with the right probiotics, prebiotics, and postbiotics isn't just about digestion—it's about giving your nervous system what it needs to function optimally.
              </Body>
            </article>

            {/* Article 3 */}
            <article className="space-y-5 sm:space-y-6 pb-12 sm:pb-16 border-b border-[#E8E6E3]">
              <Caption className="text-[#B4A7D6]">November 2024</Caption>
              <H2 className="text-[28px] sm:text-[32px]">Sleep hygiene isn't enough</H2>
              <Body>
                We've all heard the advice: no screens before bed, keep your room cool, stick to a schedule. And yes, sleep hygiene matters. But for many women, the issue runs deeper.
              </Body>
              <Body>
                Chronic stress, hormonal shifts, and gut imbalance can override even the best sleep habits. You can have blackout curtains and a perfect routine, but if your nervous system is stuck in fight-or-flight mode, sleep remains elusive.
              </Body>
              <Body>
                That's where a gut-brain approach makes a difference. By supporting the systems that regulate stress and calm from the inside out, you create the internal conditions for restful sleep—not just the external ones.
              </Body>
            </article>

            {/* Article 4 */}
            <article className="space-y-5 sm:space-y-6">
              <Caption className="text-[#B4A7D6]">October 2024</Caption>
              <H2 className="text-[28px] sm:text-[32px]">What 128 billion CFU really means</H2>
              <Body>
                You've probably seen probiotic labels with different CFU counts (colony-forming units). But what does it actually mean, and why does it matter?
              </Body>
              <Body>
                CFU refers to the number of live, active bacteria in each serving. The higher the count, the more beneficial strains reach your gut—where they can actually do their work. Many probiotics contain 1 to 10 billion CFU. We use 128 billion.
              </Body>
              <Body>
                This matters because not all probiotics survive the journey through your digestive system. A higher CFU count increases the likelihood that enough beneficial bacteria reach your gut to support microbiome balance, gut-brain communication, and ultimately, better sleep and mood.
              </Body>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
