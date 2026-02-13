import { Check } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { Header } from '@/app/components/Header';
import { HomePage } from '@/app/HomePage';
import { ProductDetailPage } from '@/app/components/ProductDetailPage';
import { WhyGutBrainPage } from '@/app/components/WhyGutBrainPage';
import { IngredientsPage } from '@/app/components/IngredientsPage';
import { FAQsPage } from '@/app/components/FAQsPage';
import { JournalPage } from '@/app/components/JournalPage';
import EmailListPage from '@/app/components/EmailListPage';
import { NewsletterPopup } from '@/app/components/NewsletterPopup';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'pdp' | 'why-gut-brain' | 'ingredients' | 'faqs' | 'journal' | 'our-story' | 'science' | 'contact' | 'shipping' | 'guarantee' | 'email-list'>('home');

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigateToShop={() => setCurrentPage('pdp')} onNavigate={setCurrentPage} />;
      case 'pdp':
        return <ProductDetailPage onNavigate={setCurrentPage} />;
      case 'why-gut-brain':
        return <WhyGutBrainPage />;
      case 'ingredients':
        return <IngredientsPage />;
      case 'faqs':
        return <FAQsPage />;
      case 'journal':
        return <JournalPage />;
      case 'email-list':
        return <EmailListPage />;
      default:
        return <HomePage onNavigateToShop={() => setCurrentPage('pdp')} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
      <NewsletterPopup />
    </div>
  );
}