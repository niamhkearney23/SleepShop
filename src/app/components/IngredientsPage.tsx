import { H1, H2, H3, Body, Caption, Footer } from '@/app/components/design-system';

export const IngredientsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#FAF9F7] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <H1>Complete ingredient list</H1>
          <Body className="mt-5 max-w-2xl mx-auto text-[#7A7A7A]">
            Every ingredient is chosen for its role in supporting gut health, nervous system function, and restful sleep
          </Body>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="space-y-8 sm:space-y-10">
            {[
              {
                name: 'Probiotic Blend (128 billion CFU)',
                strains: 'Lactobacillus plantarum, Lactobacillus rhamnosus, Bifidobacterium lactis, Bifidobacterium longum',
                purpose: 'Supports gut microbiome diversity and gut-brain communication. May help regulate stress response and promote restful sleep.'
              },
              {
                name: 'Magnesium Glycinate',
                amount: '300mg',
                purpose: 'Highly bioavailable form of magnesium that supports GABA production, promotes relaxation, and may improve sleep quality without causing digestive upset.'
              },
              {
                name: 'Jujube Kernel Extract (Ziziphus jujuba)',
                amount: '500mg',
                purpose: 'Traditional botanical used to support restful sleep and calm the nervous system. May help reduce sleep latency and improve sleep duration.'
              },
              {
                name: 'Prebiotic Fiber (Inulin)',
                amount: '2g',
                purpose: 'Nourishes beneficial gut bacteria and supports digestive health. Helps probiotics thrive and establish in the gut.'
              },
              {
                name: 'Postbiotic Compounds',
                type: 'Short-chain fatty acids (SCFAs)',
                purpose: 'Metabolites produced by beneficial bacteria that support gut barrier function and may influence neurotransmitter production.'
              },
              {
                name: 'L-Theanine',
                amount: '200mg',
                purpose: 'Amino acid found in green tea that promotes calm focus and may support alpha brain wave activity associated with relaxation.'
              },
              {
                name: 'Vitamin B6 (as Pyridoxal-5-Phosphate)',
                amount: '10mg',
                purpose: 'Active form of B6 that supports neurotransmitter synthesis including serotonin and GABA. Essential for nervous system health.'
              },
              {
                name: 'Zinc Picolinate',
                amount: '15mg',
                purpose: 'Supports immune function and gut barrier integrity. May play a role in mood regulation and stress response.'
              }
            ].map((ingredient, index) => (
              <div key={index} className="pb-8 sm:pb-8 border-b border-[#E8E6E3] last:border-0 last:pb-0">
                <div className="space-y-3 sm:space-y-3">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <H3 className="text-[17px] sm:text-[18px]">{ingredient.name}</H3>
                    {ingredient.amount && (
                      <Caption className="text-[#7A7A7A]">{ingredient.amount}</Caption>
                    )}
                    {ingredient.strains && (
                      <Caption className="text-[#7A7A7A] block w-full mt-1">{ingredient.strains}</Caption>
                    )}
                    {ingredient.type && (
                      <Caption className="text-[#7A7A7A]">{ingredient.type}</Caption>
                    )}
                  </div>
                  <Body className="text-[15px] sm:text-[15px]">{ingredient.purpose}</Body>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-[#E8E6E3]">
            <Caption className="text-[#A8A8A8] text-center">
              Free from: Artificial colors, flavors, preservatives, gluten, dairy, soy, and GMOs
            </Caption>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
