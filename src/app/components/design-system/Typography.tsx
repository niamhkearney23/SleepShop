import { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const H1 = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`font-['Playfair_Display'] text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.15] tracking-[-0.02em] text-[#4A3D5C] ${className}`}>
    {children}
  </h1>
);

export const H2 = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`font-['Playfair_Display'] text-[32px] sm:text-[42px] lg:text-[52px] leading-[1.3] tracking-[-0.02em] text-[#5D4E7A] ${className}`}>
    {children}
  </h2>
);

export const H3 = ({ children, className = '' }: TypographyProps) => (
  <h3 className={`font-['Playfair_Display'] text-[22px] lg:text-[28px] leading-[1.5] text-[#5D4E7A] ${className}`}>
    {children}
  </h3>
);

export const H4 = ({ children, className = '' }: TypographyProps) => (
  <h4 className={`font-['Playfair_Display'] text-[18px] lg:text-[20px] leading-[1.5] text-[#5D4E7A] ${className}`}>
    {children}
  </h4>
);

export const Body = ({ children, className = '' }: TypographyProps) => (
  <p className={`font-['Inter'] text-[15px] lg:text-[17px] leading-[1.8] text-[#7A7A7A] font-light ${className}`}>
    {children}
  </p>
);

export const Caption = ({ children, className = '' }: TypographyProps) => (
  <p className={`font-['Inter'] text-[13px] lg:text-[14px] leading-[1.7] text-[#A8A8A8] font-light ${className}`}>
    {children}
  </p>
);