import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function PageLayout({ children, title, subtitle, showParticles = false }) {
  return (
    <div className="w-full max-w-full overflow-x-clip bg-[var(--color-bg-primary)] min-h-screen pt-20 flex flex-col">
      <ScrollToTop />
      <Navbar />
      
      {/* Global Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-secondary)] via-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] opacity-80" />
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
          />
          {/* Blobs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
             <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] bg-[var(--color-accent)]/10 rounded-full blur-[120px] animate-blob" />
             <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          </div>
      </div>

      <main className="flex-grow w-full relative z-10 section-padding">
        {title && (
          <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 text-[var(--color-text-primary)]"
            >
              {title}
            </motion.h1>
            {subtitle && (
               <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg font-medium"
               >
                 {subtitle}
               </motion.p>
            )}
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4">
           {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
