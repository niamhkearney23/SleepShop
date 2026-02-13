interface StripeCheckoutButtonProps {
  paymentLink?: string;
  subscriptionPaymentLink?: string;
  isSubscription?: boolean;
  className?: string;
}

export const StripeCheckoutButton = ({ 
  paymentLink = 'https://buy.stripe.com/test_7sY6oG1wR9yE0TVefc53O00',
  subscriptionPaymentLink,
  isSubscription = false,
  className = ''
}: StripeCheckoutButtonProps) => {
  const handleCheckout = () => {
    // Use subscription link if subscription is selected and link is provided
    const linkToUse = isSubscription && subscriptionPaymentLink ? subscriptionPaymentLink : paymentLink;
    // Open Stripe Payment Link in the same window
    window.location.href = linkToUse;
  };

  const baseStyles = "font-['Inter'] rounded-full transition-all duration-300 font-normal disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95";
  const variantStyles = "bg-[#5D4E7A] text-white hover:bg-[#796896] active:bg-[#4A3D5C] shadow-lg shadow-[#5D4E7A]/20 hover:shadow-xl hover:shadow-[#5D4E7A]/30";
  const sizeStyles = "px-10 py-5 sm:px-16 sm:py-6 text-[15px] sm:text-[16px] tracking-wide min-h-[56px] sm:min-h-[64px]";

  return (
    <button
      onClick={handleCheckout}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
    >
      Buy Now
    </button>
  );
};