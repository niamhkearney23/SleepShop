import { H1, H2, H3, Body, Footer } from '@/app/components/design-system';

export const FAQsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#FAF9F7] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <H1>Common questions</H1>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="space-y-10 sm:space-y-12">
            {[
              {
                question: 'How long until I notice results?',
                answer: 'Most people notice improvements in sleep quality within 3 to 7 days of consistent use. However, the gut microbiome takes time to shift. For optimal results, we recommend taking Dr Gut Pro-S for at least 2 to 4 weeks. Some customers report feeling calmer and more balanced within the first week, while deeper sleep improvements often develop over 2 to 3 weeks.'
              },
              {
                question: 'Will this make me feel groggy in the morning?',
                answer: 'No. Unlike sedatives or high-dose melatonin, Dr Gut Pro-S works with your body\'s natural rhythms. It doesn\'t force sleep—it supports the conditions that allow restful sleep to happen naturally. Most customers wake feeling refreshed and clear-headed, not sedated.'
              },
              {
                question: 'Can I take this with other supplements or medications?',
                answer: 'Dr Gut Pro-S is generally well-tolerated alongside other supplements. However, if you\'re taking prescription medications—especially for sleep, anxiety, or immune function—we recommend consulting your healthcare provider before starting any new supplement. This ensures there are no interactions with your current treatment plan.'
              },
              {
                question: 'Is this habit-forming?',
                answer: 'Not when taken as directed. All ingredients in Dr Gut Pro-S are non-habit forming and work by supporting your body\'s natural processes rather than overriding them. You can stop taking it at any time without withdrawal symptoms, though we recommend consistent use for best results.'
              },
              {
                question: 'Why doesn\'t this contain melatonin?',
                answer: 'Melatonin can be helpful for short-term sleep issues, but it doesn\'t address the root cause—often an imbalanced gut-brain axis. High doses of melatonin can also disrupt your body\'s natural production over time. Dr Gut Pro-S takes a different approach by supporting the systems that naturally regulate sleep, stress, and mood from the inside out.'
              },
              {
                question: 'How should I take this?',
                answer: 'Take 2 capsules daily, preferably in the evening 1 to 2 hours before bed. Take with food to support optimal absorption. For best results, use consistently for at least 2 to 4 weeks while maintaining healthy sleep habits.'
              },
              {
                question: 'Is this safe during pregnancy or breastfeeding?',
                answer: 'While the ingredients in Dr Gut Pro-S are generally recognized as safe, we always recommend consulting your healthcare provider before taking any new supplement during pregnancy or while breastfeeding. Your doctor can assess your individual needs and health status.'
              },
              {
                question: 'What if it doesn\'t work for me?',
                answer: 'We offer a 60-day money-back guarantee. If you don\'t notice improvements in your sleep or stress levels after consistent use, simply contact our customer care team for a full refund. We stand behind the quality and efficacy of Dr Gut Pro-S.'
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-4 sm:space-y-4">
                <H3 className="text-[18px] sm:text-[19px]">{faq.question}</H3>
                <Body className="text-[15px] sm:text-[16px] leading-[1.8]">{faq.answer}</Body>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
