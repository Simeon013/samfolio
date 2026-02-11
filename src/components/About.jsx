import { useRef, useEffect, useState } from 'react';
import { User } from 'lucide-react';
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
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: `${accent}15`, color: accent }}
            >
              À Propos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
              Qui suis-je ?
            </h2>
          </div>
        </FadeInUp>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <ScaleIn className="lg:col-span-2 flex justify-center">
            <div
              className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-3xl overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${accent}20, ${accent}05)` }}
            >
              {photo ? (
                <img src={photo} alt="Samuel GODONOU" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={80} className="text-[var(--color-text-muted)] opacity-30" />
                </div>
              )}
              <div
                className="absolute -bottom-2 -right-2 w-20 h-20 rounded-2xl opacity-20"
                style={{ backgroundColor: accent }}
              />
              <div
                className="absolute -top-2 -left-2 w-12 h-12 rounded-xl opacity-15"
                style={{ backgroundColor: accent }}
              />
            </div>
          </ScaleIn>

          <div className="lg:col-span-3">
            <FadeInUp delay={0.1}>
              <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
                {bio}
              </p>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="flex flex-wrap gap-3 mb-8">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </FadeInUp>
          </div>
        </div>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="text-center p-6 rounded-2xl bg-white border border-[var(--color-border)] card-hover"
            >
              <div className="text-3xl sm:text-4xl font-extrabold mb-1" style={{ color: accent }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-[var(--color-text-muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
