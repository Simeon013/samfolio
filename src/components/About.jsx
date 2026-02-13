import { useRef, useEffect, useState } from 'react';
import { User, Terminal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeInUp, ScaleIn, StaggerContainer, staggerItem } from './AnimationWrappers';
import { motion, useInView } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const { data } = usePortfolioData();
  const { bio, photo, stats, softSkills } = data.about;
  const accent = data.settings?.accentColor || '#0066FF';

  return (
    <section id="about" className="section-padding py-8 md:py-10 relative overflow-hidden">
      {/* Connector Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[var(--color-accent)]/20 to-[var(--color-accent)]/50 z-20" />
      
      {/* Background Decor - Preserved but scaled down */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      
      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(to right, ${accent} 1px, transparent 1px), linear-gradient(to bottom, ${accent} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-5xl mx-auto relative z-10 px-4">
        <FadeInUp>
          <div className="flex flex-col items-center mb-10 text-center">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium border border-[var(--color-accent)]/30 bg-white/50 backdrop-blur-sm text-[var(--color-accent)] mb-3 shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              // Profil
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 tracking-tight text-[var(--color-text-primary)]">
              Qui suis-je ?
            </h2>
          </div>
        </FadeInUp>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Digital Identity Card (Glass) */}
          <div className="lg:col-span-5">
             <ScaleIn className="relative group h-full">
              <div className="relative h-full rounded-2xl overflow-hidden border border-white/40 bg-white/30 backdrop-blur-xl shadow-lg p-4 ring-1 ring-white/20 group/card">
                {/* Decorative Tech Corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--color-accent)]/50 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--color-accent)]/50 rounded-br-xl" />
                
                {/* Scan Line Animation - One-time on enter */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-accent)]/50 blur-[2px] shadow-[0_0_10px_var(--color-accent)] z-20 animate-scan-fast pointer-events-none opacity-0 group-hover/card:opacity-100" />

                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 border border-white/20 shadow-inner max-h-[350px] mx-auto">
                   {photo ? (
                    <img src={photo} alt="Samuel GODONOU" className="w-full h-full object-cover transition-all duration-700 group-hover/card:scale-105 filter grayscale group-hover/card:grayscale-0" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <User size={48} className="text-[var(--color-text-muted)] opacity-30" />
                    </div>
                  )}
                  
                  {/* Digital Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                  
                  {/* ID Info */}
                  <div className="absolute bottom-3 left-3 right-3 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white overflow-hidden shadow-lg">
                    <div className="flex justify-between items-center text-[9px] font-mono text-[var(--color-accent-light)] mb-0.5 uppercase tracking-wider">
                      <span>ID: 9482-SEC</span>
                      <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Verified</span>
                    </div>
                    <div className="font-bold text-base leading-tight truncate">Samuel GODONOU</div>
                    <div className="text-[10px] text-gray-200 font-mono">Admin Sys & Réseaux</div>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>

          {/* Right Column: Bio & Tech Stack - More Compact */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <FadeInUp delay={0.1}>
              <div className="rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md p-6 shadow-md ring-1 ring-white/20 relative overflow-hidden group/bio">
                 <div className="absolute top-0 right-0 p-3 opacity-10 group-hover/bio:opacity-20 transition-opacity">
                    <Terminal size={80} />
                 </div>
                <h3 className="text-base font-bold font-heading mb-3 text-[var(--color-text-primary)] flex items-center gap-2">
                   <Terminal size={18} className="text-[var(--color-accent)]" />
                   Initialisation...
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed text-justify relative z-10 font-medium">
                  {bio}
                </p>
              </div>
            </FadeInUp>

            {/* Tech Stack Bubbles */}
            <FadeInUp delay={0.2}>
              <div className="rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md p-5 shadow-sm ring-1 ring-white/20">
                 <h3 className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-full h-px bg-[var(--color-border)]/50" />
                    Dominance_Technique
                    <span className="w-full h-px bg-[var(--color-border)]/50" />
                 </h3>
                 <div className="flex flex-wrap justify-center gap-1.5">
                  {softSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-[11px] font-semibold font-mono border border-white/40 bg-white/20 backdrop-blur-sm text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300 cursor-default shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.3} className="flex justify-end mt-2">
              <Link to="/about" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-accent)] text-white text-xs font-bold shadow-lg shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/50 hover:-translate-y-1 transition-all duration-300 group">
                Dossier complet <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}
