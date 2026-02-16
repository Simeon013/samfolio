import { useState } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; // Added import
import { GraduationCap, MapPin, Cpu, BookOpen } from 'lucide-react';
import { FadeInUp, StaggerContainer, staggerItem } from './AnimationWrappers';

import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Education() {
  const { data } = usePortfolioData();
  const education = data.education;
  const accent = data.settings?.accentColor || '#0066FF';
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="education" className="py-6 relative">
      <div className="max-w-6xl mx-auto px-4">
        
        <FadeInUp>
          <div className="flex items-center gap-3 mb-8">
            <span className="px-3 py-1 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-[var(--color-accent)] font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2 whitespace-normal text-center">
              <Cpu size={12} className="shrink-0" /> Knowledge_Modules
            </span>
            <div className="h-px bg-gradient-to-r from-[var(--color-border)] to-transparent flex-grow opacity-50" />
          </div>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.1}>
          {education.slice(0, showAll ? education.length : 3).map((edu, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="group relative overflow-hidden p-[1px] rounded-2xl bg-gradient-to-br from-white/40 to-white/10 transition-colors duration-500"
            >
              <div className="relative h-full bg-white/20 backdrop-blur-xl rounded-2xl p-5 border border-white/40 hover:bg-white/30 transition-all duration-300 flex flex-col shadow-lg">
                  {/* Glass Shine */}
                  <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                  {/* Decorative Header */}
                  <div className="flex justify-between items-start mb-4">
                      <div className="p-2 rounded-xl bg-white shadow-sm border border-white/50 text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300">
                        <GraduationCap size={20} strokeWidth={1.5} />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-[var(--color-text-muted)] opacity-60 bg-white/50 px-1.5 py-0.5 rounded border border-white/30">
                          MOD.0{i+1}
                      </span>
                  </div>

                  <h3 className="text-base font-bold font-heading mb-1 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-tight">
                      {edu.degree}
                  </h3>
                  
                  {edu.school && (
                      <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] text-sm font-medium mb-4">
                          <BookOpen size={12} className="opacity-70" />
                          {edu.school}
                      </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-[var(--color-border)]/50 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono font-bold">
                          {edu.period}
                      </span>
                      {edu.location && (
                        <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                            <MapPin size={10} /> {edu.location}
                        </span>
                      )}
                  </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        {education.length > 3 && (
            <div className="flex justify-center mt-6">
                <button 
                    onClick={() => setShowAll(!showAll)}
                    className="group flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-[var(--color-accent)]/50 backdrop-blur-md transition-all duration-300 text-xs font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
                >
                    {showAll ? 'Réduire' : `Afficher tout (${education.length})`}
                    <div className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}>
                        <div className="w-2 h-2 border-r-2 border-b-2 border-current rotate-45 mb-0.5" />
                    </div>
                </button>
            </div>
        )}
      </div>
    </section>
  );
}

function EducationCard({ edu, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden p-[1px] rounded-2xl bg-gradient-to-br from-white/40 to-white/10 transition-colors duration-500"
    >
      <EducationCardContent edu={edu} index={index} />
    </motion.div>
  );
}

function EducationCardContent({ edu, index }) {
  return (
    <div className="relative h-full bg-white/20 backdrop-blur-xl rounded-2xl p-5 border border-white/40 hover:bg-white/30 transition-all duration-300 flex flex-col shadow-lg">
        {/* Glass Shine */}
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        {/* Decorative Header */}
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-xl bg-white shadow-sm border border-white/50 text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300">
              <GraduationCap size={20} strokeWidth={1.5} />
            </div>
            <span className="font-mono text-[10px] font-bold text-[var(--color-text-muted)] opacity-60 bg-white/50 px-1.5 py-0.5 rounded border border-white/30">
                MOD.0{index + 1}
            </span>
        </div>

        <h3 className="text-base font-bold font-heading mb-1 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-tight">
            {edu.degree}
        </h3>
        
        {edu.school && (
            <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] text-sm font-medium mb-4">
                <BookOpen size={12} className="opacity-70" />
                {edu.school}
            </div>
        )}

        <div className="mt-auto pt-4 border-t border-[var(--color-border)]/50 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono font-bold">
                {edu.period}
            </span>
            {edu.location && (
              <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                  <MapPin size={10} /> {edu.location}
              </span>
            )}
        </div>
    </div>
  );
}
