import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  background?: 'cream' | 'white' | 'light';
  padding?: 'default' | 'large' | 'small';
  className?: string;
}

export const Section = ({ 
  children, 
  background = 'cream', 
  padding = 'default',
  className = '' 
}: SectionProps) => {
  const backgroundStyles = {
    cream: 'bg-[#FAF9F7]',
    white: 'bg-white',
    light: 'bg-[#F7F5F2]'
  };
  
  const paddingStyles = {
    small: 'py-16',
    default: 'py-32',
    large: 'py-40'
  };
  
  return (
    <section className={`${backgroundStyles[background]} ${paddingStyles[padding]} ${className}`}>
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        {children}
      </div>
    </section>
  );
};
