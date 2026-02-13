import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button, CollapsibleSection, H1, H2, H3, Body, Caption, Footer } from '@/app/components/design-system';
import { StripeCheckoutButton } from '@/app/components/StripeCheckoutButton';
import { Check, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export const ProductDetailPage = ({ onNavigate }: { onNavigate?: (page: string) => void }) => {
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Real Dr GUT PRO S product images from drgut.co
  const productImages = [
    { 
      src: 'https://drgut.co/wp-content/uploads/2025/01/Pro-S-Box-with-Award.png',
      alt: 'Dr Gut Pro-S Product Box with Natural Health Awards 2025' 
    },
    { 
      src: 'https://drgut.co/wp-content/uploads/2025/01/Designed-for-Your-Nightly-Wind-Down.png',
      alt: 'Designed for Your Nightly Wind-Down' 
    },
    { 
      src: 'https://drgut.co/wp-content/uploads/2025/01/98-reported-better-sleep-quality.png',
      alt: '98% reported better sleep quality' 
    },
    { 
      src: 'https://drgut.co/wp-content/uploads/2025/01/Scientifically-developed.png',
      alt: 'Scientifically developed formula' 
    },
    { 
      src: 'https://drgut.co/wp-content/uploads/2025/01/Pro-S-Box-with-Award.png',
      alt: 'Dr Gut Pro-S Product Box' 
    },
  ];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Product Section */}
      <section className="bg-[#FAF9F7] pt-8 sm:pt-12 pb-16 sm:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
            {/* Left - Product Images */}
            <motion.div 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="rounded-3xl overflow-hidden bg-white aspect-square flex items-center justify-center">
                <img 
                  src={productImages[selectedImage].src}
                  alt={productImages[selectedImage].alt}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-5 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index 
                        ? 'border-[#B4A7D6] shadow-md' 
                        : 'border-[#E8E6E3] hover:border-[#B4A7D6]/50'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover aspect-square"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right - Product Details */}
            <motion.div 
              className="space-y-8 sm:space-y-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              {/* Product Name & Benefit */}
              <motion.div className="space-y-4 sm:space-y-5" variants={fadeInUp}>
                <h1 className="font-['Playfair_Display'] text-[36px] sm:text-[42px] lg:text-[52px] leading-[1.2] tracking-[-0.02em] text-[#4A3D5C]">
                  Dr Gut Pro-S
                </h1>
                <p className="font-['Inter'] text-[17px] sm:text-[18px] lg:text-[20px] leading-[1.7] sm:leading-[1.6] text-[#7A7A7A] font-light">
                  A science-backed gut-brain supplement that naturally improves sleep, reduces stress, and calms the mood—without melatonin or sedation
                </p>
                
                {/* Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[#B4A7D6]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-['Inter'] text-[13px] text-[#5D4E7A] font-medium">4.8 / 5</span>
                    <span className="font-['Inter'] text-[12px] text-[#7A7A7A] font-light">— 1236+ happy customers</span>
                  </div>
                </div>
                
                {/* Key Highlight */}
                <div className="pt-2">
                  <p className="font-['Inter'] text-[15px] text-[#5D4E7A] font-medium">
                    128 billion CFU Probiotics
                  </p>
                </div>
              </motion.div>

              {/* Price */}
              <motion.div className="space-y-5 sm:space-y-6 pb-6 sm:pb-8 border-b border-[#E8E6E3]" variants={fadeInUp}>
                <div className="flex items-baseline gap-3">
                  <span className="font-['Inter'] text-[28px] sm:text-[32px] text-[#4A3D5C] font-light">
                    ${isSubscription ? '31' : '39'}
                  </span>
                  {isSubscription && (
                    <span className="font-['Inter'] text-[15px] sm:text-[16px] text-[#7A7A7A] line-through font-light">
                      $39
                    </span>
                  )}
                </div>

                {/* Subscription Toggle */}
                <button
                  onClick={() => setIsSubscription(!isSubscription)}
                  className="flex items-start gap-4 group touch-manipulation min-h-[56px] py-2"
                >
                  <div className={`w-6 h-6 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-1 ${
                    isSubscription 
                      ? 'bg-[#5D4E7A] border-[#5D4E7A]' 
                      : 'border-[#E8E6E3] group-hover:border-[#5D4E7A]'
                  }`}>
                    {isSubscription && <Check className="w-3.5 h-3.5 sm:w-3 sm:h-3 text-white" />}
                  </div>
                  <div className="text-left">
                    <p className="font-['Inter'] text-[15px] sm:text-[15px] text-[#5D4E7A] font-medium mb-1">
                      Subscribe & Save 20%
                    </p>
                    <p className="font-['Inter'] text-[13px] sm:text-[13px] text-[#7A7A7A] font-light leading-relaxed">
                      Delivered every 10 days, cancel anytime
                    </p>
                  </div>
                </button>
              </motion.div>

              {/* Key Benefits */}
              <motion.div className="space-y-6 sm:space-y-5" variants={fadeInUp}>
                {[
                  'Supports restful sleep through the gut-brain connection',
                  'May help ease stress and promote emotional balance',
                  'Contains 128B CFU probiotics with calming botanicals'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1 w-5 h-5 sm:w-5 sm:h-5 rounded-full bg-[#B4A7D6]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#B4A7D6]" />
                    </div>
                    <p className="font-['Inter'] text-[15px] sm:text-[15px] leading-[1.8] sm:leading-[1.8] text-[#5D4E7A] font-light">
                      {benefit}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Quantity & Add to Cart */}
              <motion.div className="space-y-5 sm:space-y-4 pt-4 sm:pt-6" variants={fadeInUp}>
                <div className="flex items-center gap-4 sm:gap-4">
                  <label className="font-['Inter'] text-[14px] text-[#7A7A7A] font-light">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4 border border-[#E8E6E3] rounded-full px-5 py-3 touch-manipulation">
                    <button
                      onClick={decrementQuantity}
                      className="text-[#5D4E7A] hover:text-[#796896] transition-colors active:scale-95 p-1"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-['Inter'] text-[15px] text-[#5D4E7A] font-medium min-w-[2ch] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="text-[#5D4E7A] hover:text-[#796896] transition-colors active:scale-95 p-1"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <StripeCheckoutButton 
                  paymentLink="https://buy.stripe.com/fZu8wIf6rgcO4Fe2ZPa7C02"
                  subscriptionPaymentLink="https://buy.stripe.com/3cIaEQbUf1hUc7G9oda7C01"
                  isSubscription={isSubscription}
                  className="w-full" 
                />

                <p className="font-['Inter'] text-[13px] text-center text-[#A8A8A8] font-light pt-3 sm:pt-2 leading-relaxed px-4">
                  Free shipping Australia-wide • 60-day money-back guarantee
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <motion.section 
        className="bg-[#F7F5F2] py-14 sm:py-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-16">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-12 text-center"
            variants={staggerContainer}
          >
            {[
              'Patented in Australia',
              'Formulated by Doctors',
              'Natural, Non-Sedative',
              'Backed by Science'
            ].map((item, index) => (
              <motion.div key={index} className="py-2" variants={fadeInUp}>
                <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#8B7AA8] tracking-wide font-normal leading-relaxed">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Accordion Section - Product Details */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <motion.div 
          className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-16 space-y-8 sm:space-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <CollapsibleSection title="How To Consume">
              <div className="font-['Inter'] text-[15px] lg:text-[17px] leading-[1.8] text-[#7A7A7A] font-light space-y-4">
                <p>Take 1–2 sachets daily, before or after meals.</p>
                <p>Mixed with 200ml of chilled or room temperature water, or your favourite beverage.</p>
                <p>No blender needed—just stir or shake and enjoy.</p>
              </div>
            </CollapsibleSection>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <CollapsibleSection title="Key Ingredients">
              <div className="space-y-7 sm:space-y-6">
                {[
                  {
                    name: 'Probiotic Blend (128B CFU)',
                    description: 'Supports gut microbiome diversity and gut-brain communication. May help regulate stress response and promote restful sleep.'
                  },
                  {
                    name: 'Magnesium Glycinate (300mg)',
                    description: 'Highly bioavailable form that supports GABA production and promotes relaxation without digestive upset.'
                  },
                  {
                    name: 'Jujube Kernel Extract (500mg)',
                    description: 'Traditional botanical used to support restful sleep and calm the nervous system.'
                  },
                  {
                    name: 'L-Theanine (200mg)',
                    description: 'Amino acid that promotes calm focus and alpha brain wave activity associated with relaxation.'
                  }
                ].map((ingredient, index) => (
                  <div key={index} className="space-y-2">
                    <p className="font-normal text-[#8B7AA8]">{ingredient.name}</p>
                    <p>{ingredient.description}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <CollapsibleSection title="Why We're Different">
              <div className="space-y-7 sm:space-y-6">
                <div className="space-y-2">
                  <p className="font-normal text-[#8B7AA8]">High CFU Count</p>
                  <p>We use 128 billion CFU per serving. More beneficial strains reach your gut where they work best.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-normal text-[#8B7AA8]">Tri-biotic Formula</p>
                  <p>Combines prebiotics, probiotics, and postbiotics. This approach supports your gut microbiome more thoroughly.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-normal text-[#8B7AA8]">Sleep and Mood Support</p>
                  <p>Includes magnesium glycinate and jujube kernel. These ingredients work together to promote calm and support rest.</p>
                </div>
              </div>
            </CollapsibleSection>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <CollapsibleSection title="What to Expect">
              <div className="space-y-7 sm:space-y-6">
                <div className="space-y-2">
                  <p className="font-normal text-[#8B7AA8]">Within the first week</p>
                  <p>Many customers notice improvements in sleep quality. 80% reported deeper sleep after one week of consistent use.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-normal text-[#8B7AA8]">After 10 days</p>
                  <p>70% of customers reported better energy levels and less digestive discomfort throughout the day.</p>
                </div>
                <p className="text-[#A8A8A8] pt-3 sm:pt-2 text-[13px] italic leading-relaxed">
                  Individual results may vary. Consistent use supports best outcomes.
                </p>
              </div>
            </CollapsibleSection>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <CollapsibleSection title="Common Questions">
              <div className="space-y-7 sm:space-y-6">
                <div className="space-y-2">
                  <p className="font-normal text-[#8B7AA8] mb-2">Will I feel groggy in the morning?</p>
                  <p>No. This formula supports your natural sleep cycles. Most people wake feeling refreshed, not sedated.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-normal text-[#8B7AA8] mb-2">Is it habit-forming?</p>
                  <p>Not when taken as directed. All ingredients are non-habit forming and support your body's natural processes.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-normal text-[#8B7AA8] mb-2">How long until I notice results?</p>
                  <p>Most people notice changes within 3 to 5 days. Consistent use for 2 to 4 weeks supports best outcomes.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-normal text-[#8B7AA8] mb-2">Can I take this with other supplements?</p>
                  <p>Yes, in most cases. If you're taking medication or have health concerns, consult your healthcare provider first.</p>
                </div>
              </div>
            </CollapsibleSection>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};