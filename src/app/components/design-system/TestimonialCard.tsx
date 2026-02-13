interface TestimonialCardProps {
  quote: string;
  author: string;
}

export const TestimonialCard = ({ quote, author }: TestimonialCardProps) => {
  return (
    <div className="space-y-8">
      <p className="font-['Playfair_Display'] text-[20px] lg:text-[24px] leading-[1.65] text-[#5D4E7A] italic font-normal">
        "{quote}"
      </p>
      <p className="font-['Inter'] text-[14px] tracking-wide text-[#7A7A7A] font-light">— {author}</p>
    </div>
  );
};