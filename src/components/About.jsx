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
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Decor: Animated Blobs for Glassmorphism */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <FadeInUp>
          <div className="flex flex-col items-start md:items-center mb-12 text-left md:text-center w-full">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-4">
              &lt;About /&gt;
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight">Introduction</h2>
            <div className="h-1 w-20 bg-[var(--color-accent)] rounded-full hidden md:block"></div>
          </div>
        </FadeInUp>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column: Photo & Quick Info (Glass Card) */}
          <ScaleIn className="relative group">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--color-bg-tertiary)]">
                 {photo ? (
                  <img src={photo} alt="Samuel GODONOU" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={64} className="text-[var(--color-text-muted)] opacity-30" />
                  </div>
                )}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                
                {/* Floating Name on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-mono text-xs text-[var(--color-accent)] mb-1">Status: Online</div>
                  <div className="font-bold text-lg leading-tight">Samuel GODONOU</div>
                </div>
              </div>
            </div>
          </ScaleIn>

          {/* Right Column: Bio, Skills, Stats */}
          <div className="flex flex-col gap-6">
            <FadeInUp delay={0.1}>
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-sm">
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed text-justify">
                  {bio}
                </p>
              </div>
            </FadeInUp>

            {/* Compact Stats (Glass Cards) */}
            <StaggerContainer className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-sm hover:border-[var(--color-accent)]/30 transition-all text-center group"
                >
                  <div className="text-2xl font-black font-mono text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>

            {/* Soft Skills */}
            <FadeInUp delay={0.2} className="pt-2">
              <h3 className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Stack & Skills_</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-sm text-xs font-medium font-mono border border-white/20 bg-white/5 backdrop-blur-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-accent)] hover:underline underline-offset-4 group/link">
                Découvrir mon parcours complet <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}
