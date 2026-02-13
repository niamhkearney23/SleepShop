import { useState } from 'react';

interface FooterProps {
  className?: string;
  onNavigate?: (page: string) => void;
}

export const Footer = ({ className = '', onNavigate }: FooterProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-e1013b8c/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <footer className={`bg-gradient-to-br from-[#4A3D5C] to-[#5D4E7A] py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 lg:gap-16 mb-12 sm:mb-16">
          {/* Brand Column */}
          <div className="space-y-5 sm:space-y-6">
            <button
              onClick={() => onNavigate?.('home')}
              className="font-['Inter'] text-[14px] sm:text-[15px] tracking-[0.2em] text-white lowercase font-medium hover:text-[#B4A7D6] transition-colors touch-manipulation"
            >
              sleep shop
            </button>
            <p className="font-['Inter'] text-[13px] sm:text-[14px] text-white/80 leading-[1.7] font-light">
              Premium sleep supplements backed by science. Supporting your journey to better rest, naturally.
            </p>
          </div>

          {/* Column 1: Learn */}
          <div className="space-y-5 sm:space-y-6">
            <h3 className="font-['Playfair_Display'] text-[18px] sm:text-[20px] text-white leading-[1.5]">
              Learn
            </h3>
            <nav className="space-y-3 sm:space-y-4">
              <a 
                href="#why-gut-brain" 
                className="block font-['Inter'] text-[14px] sm:text-[15px] text-[#E8E8E8] font-light leading-relaxed hover:text-white transition-colors"
                onClick={(e) => handleClick(e, 'why-gut-brain')}
              >
                Why Gut-Brain
              </a>
              <a 
                href="#ingredients" 
                className="block font-['Inter'] text-[14px] sm:text-[15px] text-[#E8E8E8] font-light leading-relaxed hover:text-white transition-colors"
                onClick={(e) => handleClick(e, 'ingredients')}
              >
                Ingredients
              </a>
              <a 
                href="#faqs" 
                className="block font-['Inter'] text-[14px] sm:text-[15px] text-[#E8E8E8] font-light leading-relaxed hover:text-white transition-colors"
                onClick={(e) => handleClick(e, 'faqs')}
              >
                FAQs
              </a>
            </nav>
          </div>

          {/* Column 2: Newsletter */}
          <div className="space-y-5 sm:space-y-6">
            <h3 className="font-['Playfair_Display'] text-[18px] sm:text-[20px] text-white leading-[1.5]">
              Stay Connected
            </h3>
            <p className="font-['Inter'] text-[14px] sm:text-[15px] text-[#E8E8E8] font-light leading-relaxed">
              Sleep tips and wellness notes, delivered monthly.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-[#E8E8E8]/60 font-['Inter'] text-[14px] focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50"
                />
                <button 
                  onClick={handleSubscribe}
                  disabled={status === 'loading'}
                  className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-['Inter'] text-[14px] font-normal hover:bg-white/20 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {message && (
                <p className={`font-['Inter'] text-[13px] ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 sm:pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
            {/* Brand */}
            <div className="order-2 sm:order-1">
              <p className="font-['Inter'] text-[13px] text-[#E8E8E8]/60 font-light">
                © 2025 Sleep Shop. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 sm:gap-8 order-1 sm:order-2">
              <a 
                href="#privacy" 
                className="font-['Inter'] text-[13px] text-[#E8E8E8]/60 font-light hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a 
                href="#terms" 
                className="font-['Inter'] text-[13px] text-[#E8E8E8]/60 font-light hover:text-white transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};