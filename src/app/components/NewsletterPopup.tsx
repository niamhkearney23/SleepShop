import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already subscribed or dismissed
    const hasSubscribed = localStorage.getItem('newsletter_subscribed');
    const hasDismissed = localStorage.getItem('newsletter_dismissed');
    
    if (!hasSubscribed && !hasDismissed) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter_dismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e1013b8c/subscribe`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setIsSuccess(true);
      localStorage.setItem('newsletter_subscribed', 'true');
      
      // Close after 2 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Newsletter subscription error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 sm:p-10 pointer-events-auto relative transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-[#999999] hover:text-[#5D4E7A] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            // Success State
            <div className="text-center">
              <div className="w-16 h-16 bg-[#B4A7D6]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#B4A7D6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl text-[#4A3D5C] mb-3">
                Welcome to the Sleep Shop family
              </h3>
              <p className="font-['Inter'] text-[15px] text-[#7A7A7A] leading-relaxed">
                Check your inbox for your welcome gift
              </p>
            </div>
          ) : (
            // Form State
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-[#B4A7D6]/20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-7 h-7 text-[#B4A7D6]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl text-[#4A3D5C] mb-3">
                  Sleep better, starting tonight
                </h3>
                <p className="font-['Inter'] text-[15px] text-[#7A7A7A] leading-relaxed">
                  Join 1,200+ men and women improving their sleep naturally. Get 15% off your first order.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-5 py-4 border border-[#E8E6E3] rounded-full font-['Inter'] text-[15px] text-[#5D4E7A] placeholder:text-[#CCCCCC] focus:outline-none focus:border-[#B4A7D6] transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5D4E7A] text-white font-['Inter'] text-[15px] py-4 rounded-full hover:bg-[#796896] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#5D4E7A]/20"
                >
                  {isSubmitting ? 'Subscribing...' : 'Get My 15% Off'}
                </button>

                <p className="text-center text-[12px] text-[#999999] font-['Inter'] mt-4">
                  Unsubscribe anytime. No spam, just sleep science & exclusive offers.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};