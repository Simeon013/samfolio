import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { data } = usePortfolioData();
  const accent = data.settings?.accentColor || '#0066FF';

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 p-2 md:p-3 rounded-full cursor-pointer nav-pill transition-all duration-300 hover:-translate-y-1 group opacity-60 hover:opacity-100"
          style={{ border: `1px solid ${accent}20` }}
          aria-label="Retour en haut"
        >
           <ArrowUp size={20} style={{ color: accent }} className="relative z-10 md:w-6 md:h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
