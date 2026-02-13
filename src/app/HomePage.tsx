import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button, Section, IngredientCard, TestimonialCard, H2, Body, H1, Caption, H3, Footer } from '@/app/components/design-system';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface HomePageProps {
  onNavigateToShop: () => void;
  onNavigate?: (page: string) => void;
}

export const HomePage = ({ onNavigateToShop, onNavigate }: HomePageProps) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <>
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#B4A7D6]/10 to-transparent blur-3xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-[60%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#5D4E7A]/8 to-transparent blur-3xl"
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[15%] w-[250px] h-[250px] rounded-full bg-gradient-to-br from-[#B4A7D6]/12 to-transparent blur-3xl"
          animate={{
            y: [0, 25, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Section */}
      <Section background="cream" padding="hero">
        <div className="relative bg-gradient-to-br from-[#FAF9F7] via-[#F7F5F2] to-[#B4A7D6]/10 overflow-hidden">
          <motion.div 
            ref={heroRef}
            style={{ y, opacity }}
            className="relative max-w-[900px] mx-auto text-center space-y-8 sm:space-y-10 px-4 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <H1>Rest comes naturally when your gut and mind are in harmony</H1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <Body className="max-w-2xl mx-auto">
                A science-backed supplement designed to support your sleep, ease stress, and promote calm—without melatonin or sedation
              </Body>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Button variant="primary" onClick={onNavigateToShop}>
                Shop Now
              </Button>
            </motion.div>
            
            {/* Hero Image - MORE COMPELLING */}
            <motion.div 
              className="pt-8 sm:pt-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1645750646327-8c560ef5cb8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWQlMjB3aGl0ZSUyMHNoZWV0cyUyMG1vcm5pbmd8ZW58MXx8fHwxNzcwOTQ2ODMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Luxury bed with pristine white sheets - premium sleep experience"
                className="w-full max-w-3xl mx-auto rounded-2xl object-cover aspect-[16/10] shadow-2xl shadow-[#5D4E7A]/30"
              />
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Trust Indicators - CREATIVE VERSION */}
      <Section background="white" padding="default">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 max-w-[1100px] mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {[
            { text: 'Patented in Australia' },
            { text: 'Formulated by Doctors' },
            { text: 'Third-party tested' },
            { text: 'Non-habit forming' }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-3 sm:gap-4 text-center"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#5D4E7A] tracking-wide font-medium leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* How It Works */}
      <Section background="white" padding="generous">
        <div className="max-w-[1200px] mx-auto space-y-16 sm:space-y-20 px-4 pb-12 sm:pb-16 lg:pb-20 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <H2>How it works</H2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
            {[
              {
                step: '1',
                title: 'The gut-brain connection',
                description: 'Your gut and brain communicate constantly. A balanced microbiome supports calm, clarity, and better sleep.'
              },
              {
                step: '2',
                title: 'Tri-biotic formula',
                description: 'Our blend of prebiotics, probiotics, and postbiotics works together to support your gut health from multiple angles.'
              },
              {
                step: '3',
                title: 'Natural support',
                description: 'Gentle botanicals and minerals work with your body\'s rhythms. No sedation, no grogginess, no habit formation.'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.15} direction="up">
                <div className="text-center space-y-5 sm:space-y-6">
                  <motion.div 
                    className="font-['Playfair_Display'] text-[56px] sm:text-[64px] text-[#B4A7D6]/30 leading-none"
                    whileHover={{ scale: 1.1, color: '#B4A7D6' }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.step}
                  </motion.div>
                  <H3>{item.title}</H3>
                  <Body>{item.description}</Body>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Ingredients Spotlight */}
      <Section background="cream" padding="default">
        <div className="max-w-[1100px] mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16 sm:mb-20">
              <H2>What's inside</H2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
            {[
              {
                name: '128B CFU Probiotics',
                description: 'Live culture strains that support the gut-brain axis. More beneficial bacteria reach where they work best.'
              },
              {
                name: 'Magnesium Glycinate',
                description: 'The most bioavailable form of magnesium. Supports GABA production for natural calm.'
              },
              {
                name: 'Jujube Kernel',
                description: 'A traditional botanical used for centuries. May support restful sleep and nervous system health.'
              },
              {
                name: 'Pre & Postbiotics',
                description: 'Nourishes beneficial bacteria and supports digestive balance. Works with probiotics for complete support.'
              }
            ].map((ingredient, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className="space-y-4 sm:space-y-3">
                  <H3>{ingredient.name}</H3>
                  <Body>{ingredient.description}</Body>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section background="white" padding="default">
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16 sm:mb-20">
              <H2>Real experiences</H2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
            {[
              {
                quote: "I fall asleep more easily now. Wake up feeling like I actually rested.",
                name: 'Emma K.',
                detail: 'After 2 weeks'
              },
              {
                quote: "My mornings feel lighter. I'm calmer throughout the day, less reactive.",
                name: 'Sarah M.',
                detail: 'After 3 weeks'
              },
              {
                quote: "I was skeptical about probiotics for sleep. This surprised me. It just works.",
                name: 'Jess L.',
                detail: 'After 1 month'
              }
            ].map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.15} direction="up">
                <motion.div 
                  className="space-y-6 sm:space-y-5 p-8 rounded-2xl bg-[#FAF9F7]/50 border border-[#E8E6E3]"
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(93, 78, 122, 0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <Body className="italic">"{testimonial.quote}"</Body>
                  <div className="space-y-1">
                    <p className="font-['Inter'] text-[14px] text-[#5D4E7A] font-medium">
                      {testimonial.name}
                    </p>
                    <Caption>{testimonial.detail}</Caption>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA - Calm and Non-Pushy */}
      <Section background="cream" padding="default">
        <div className="max-w-[800px] mx-auto text-center space-y-8 sm:space-y-10 px-4 relative z-10">
          <ScrollReveal delay={0.2}>
            <H2>Start your journey</H2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <Body className="max-w-lg mx-auto">
              See if Dr Gut Pro-S works for you. Most people notice a difference within the first week.
            </Body>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <Button variant="primary" onClick={onNavigateToShop}>
              Shop Sleep
            </Button>
          </ScrollReveal>
          
          <ScrollReveal delay={0.5}>
            <p className="font-['Inter'] text-[13px] text-[#A8A8A8] pt-3 sm:pt-4 font-light leading-relaxed">
              Free shipping Australia-wide • 60-day money-back guarantee
            </p>
          </ScrollReveal>
        </div>
      </Section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </>
  );
};