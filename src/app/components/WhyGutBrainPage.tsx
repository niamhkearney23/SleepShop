import { H1, H2, Body, Caption, Footer } from '@/app/components/design-system';

export const WhyGutBrainPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#FAF9F7] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <H1>Why the gut-brain connection matters</H1>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="space-y-8 sm:space-y-10">
            <Body>
              Your gut and brain are in constant conversation. This bi-directional communication system, known as the gut-brain axis, plays a crucial role in regulating mood, stress response, and sleep quality.
            </Body>
            
            <Body>
              Research shows that 90% of serotonin—a neurotransmitter essential for mood and sleep—is produced in the gut. When your gut microbiome is out of balance, it can affect your nervous system, making it harder to feel calm, cope with stress, or sleep deeply.
            </Body>
            
            <Body>
              Dr Gut Pro-S works by supporting your gut microbiome with a tri-biotic formula (prebiotics, probiotics, and postbiotics) alongside calming botanicals and minerals. This multi-faceted approach helps restore balance from the inside out.
            </Body>

            <div className="pt-6 sm:pt-8 border-t border-[#E8E6E3]">
              <Caption className="text-[#A8A8A8]">
                Referenced research: Cryan & Dinan (2012) Nature Reviews Neuroscience • Mayer et al. (2014) Journal of Clinical Investment • Foster & McVey Neufeld (2013) Neuroscience
              </Caption>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
