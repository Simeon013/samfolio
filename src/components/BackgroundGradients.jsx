import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function BackgroundGradients() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden">
      {/* Base Layer */}
      <div className="absolute inset-0 bg-[#FAFAFA] -z-50" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] -z-40 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Mobile: 1 static blob with CSS only (no Framer Motion overhead) */}
      {/* Desktop: 3 animated blobs with Framer Motion */}
      {isMobile ? (
        <>
          <div
            className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] rounded-full blur-[60px] opacity-30 animate-blob will-change-transform"
            style={{ background: 'radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-[-10%] left-[-5%] w-[250px] h-[250px] rounded-full blur-[50px] opacity-25 animate-blob animation-delay-2000 will-change-transform"
            style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }}
          />
        </>
      ) : (
        <>
          <motion.div
            animate={{
              x: [-50, 100, -50],
              y: [-50, 50, -50],
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[100px] opacity-40"
            style={{ background: 'radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)' }}
          />
          
          <motion.div
            animate={{
              x: [50, -100, 50],
              y: [50, -50, 50],
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full mix-blend-multiply filter blur-[100px] opacity-40"
            style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }}
          />
          
          <motion.div
            animate={{
              x: [-30, 30, -30],
              y: [-30, 30, -30],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[90px] opacity-30"
            style={{ background: 'radial-gradient(circle, #EC4899 0%, transparent 60%)' }}
          />
        </>
      )}
    </div>
  );
}
