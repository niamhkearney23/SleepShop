interface HeaderProps {
  onNavigate: (page: 'home' | 'pdp') => void;
  currentPage: 'home' | 'pdp';
}

export const Header = ({ onNavigate, currentPage }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E8E6E3] shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <button
            onClick={() => onNavigate('home')}
            className="font-['Inter'] text-[13px] sm:text-[14px] tracking-[0.2em] text-[#5D4E7A] lowercase font-medium hover:text-[#796896] transition-colors touch-manipulation min-h-[44px] flex items-center"
          >
            sleep shop
          </button>
          <nav className="flex items-center gap-4 sm:gap-8">
            <button 
              onClick={() => onNavigate('pdp')}
              className={`font-['Inter'] text-[13px] sm:text-[14px] font-medium transition-colors touch-manipulation min-h-[44px] px-2 ${
                currentPage === 'pdp' 
                  ? 'text-[#5D4E7A]' 
                  : 'text-[#7A7A7A] hover:text-[#5D4E7A]'
              }`}
            >
              Shop
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};