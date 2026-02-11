import { motion } from 'framer-motion';
import { MapPin, ArrowDown } from 'lucide-react';
import ParticleNetwork from './ParticleNetwork';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Hero() {
  const { data } = usePortfolioData();
  const { name, title, subtitle, location, cta1, cta2 } = data.hero;
  const accent = data.settings?.accentColor || '#0066FF';

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
         <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-[1]"></div> 
        <ParticleNetwork />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg-primary)] z-[2]" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border"
            style={{ backgroundColor: `${accent}10`, color: accent, borderColor: `${accent}20` }}
          >
            Portfolio Officiel
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 font-heading"
        >
          {name.split(' ').map((word, i) => (
            <span key={i} className="inline-block mr-3 md:mr-5">
              {i === 0 ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] filter drop-shadow-sm">{word}</span>
              ) : (
                <span className="text-[var(--color-text-primary)]">{word}</span>
              )}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-2xl md:text-3xl text-[var(--color-text-secondary)] mb-4 font-medium max-w-3xl mx-auto"
        >
          {title} <span className="mx-2 text-[var(--color-accent)]">•</span> {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-2 text-[var(--color-text-muted)] mb-12 font-mono"
        >
          <MapPin size={16} />
          <span className="text-sm uppercase tracking-wider">{location}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="group relative px-8 py-4 rounded-full text-white font-bold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent)]/30 hover:-translate-y-1 cursor-pointer"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] transition-transform duration-300 group-hover:scale-105" />
            <span className="relative z-10">{cta1}</span>
          </button>
          
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-4 rounded-full font-bold text-sm tracking-wide border transition-all duration-300 hover:bg-[var(--color-bg-secondary)] hover:-translate-y-1 cursor-pointer bg-white/50 backdrop-blur-sm"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
          >
            {cta2}
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="p-3 rounded-full border border-[var(--color-border)] bg-white/30 backdrop-blur-md"
        >
          <ArrowDown size={20} className="text-[var(--color-text-muted)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
