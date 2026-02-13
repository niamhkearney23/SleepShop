import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'large';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', className = '', children, ...props }, ref) => {
    const baseStyles = "font-['Inter'] rounded-full transition-all duration-300 font-normal disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95";
    
    const variantStyles = {
      primary: "bg-[#5D4E7A] text-white hover:bg-[#796896] active:bg-[#4A3D5C] shadow-lg shadow-[#5D4E7A]/20 hover:shadow-xl hover:shadow-[#5D4E7A]/30",
      secondary: "bg-transparent border-2 border-[#5D4E7A] text-[#5D4E7A] hover:bg-[#5D4E7A] hover:text-white active:bg-[#4A3D5C] hover:shadow-lg hover:shadow-[#5D4E7A]/20",
      ghost: "bg-transparent text-[#5D4E7A] hover:bg-[#F7F5F2] active:bg-[#E8E6E3]"
    };
    
    const sizeStyles = {
      default: "px-8 py-4 sm:px-12 sm:py-5 text-[15px] tracking-wide min-h-[52px] sm:min-h-[56px]",
      large: "px-10 py-5 sm:px-16 sm:py-6 text-[16px] tracking-wide min-h-[56px] sm:min-h-[64px]"
    };
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';