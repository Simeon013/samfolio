import { motion } from 'framer-motion';
import { Briefcase, Terminal, ArrowRight, Code } from 'lucide-react';
import { FadeInUp } from './AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Experience() {
  const { data } = usePortfolioData();
  const experience = data.experience;
  const accent = data.settings?.accentColor || '#0066FF';

  return (
    <section id="experience" className="py-6 relative">
      <div className="max-w-5xl mx-auto px-4">
        <FadeInUp>
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent flex-grow opacity-50" />
            <span className="px-3 py-1.5 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-[var(--color-accent)] font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <Terminal size={12} /> System_Logs
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent flex-grow opacity-50" />
          </div>
        </FadeInUp>

        <div className="relative pl-8 md:pl-0">
          {/* Main Data Trunk */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent)]/20 to-transparent md:-translate-x-1/2" />
          
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.6, delay: i * 0.1 }}
                 className={`relative flex items-center w-full ${
                  i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                  {/* Connection Node */}
                  <div className={`absolute left-[7px] md:left-1/2 md:-translate-x-[4px] w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)] z-20 ring-2 ring-white`}>
                      <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[var(--color-accent)]" />
                  </div>

                  {/* Connector Line (Mobile) */}
                   <div className="absolute md:hidden left-[11px] top-1/2 w-6 h-px bg-[var(--color-accent)]/50" />
                  
                  {/* Connector Line (Desktop) */}
                  <div className={`hidden md:block absolute top-1/2 w-8 h-px bg-[var(--color-accent)]/30 ${
                      i % 2 === 0 ? 'right-1/2 translate-x-1/2 origin-left' : 'left-1/2 -translate-x-1/2 origin-right'
                  }`} />

                  {/* Card */}
                  <div className={`relative w-full md:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  }`}>
                      <div className="group relative overflow-hidden rounded-xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                          {/* Inner Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                          
                          {/* Top Bar (Terminal Style) */}
                          <div className="h-6 bg-white/30 border-b border-white/20 flex items-center justify-between px-3 relative z-10">
                              <div className="flex gap-1">
                                  <div className="w-2 h-2 rounded-full bg-red-400/50" />
                                  <div className="w-2 h-2 rounded-full bg-amber-400/50" />
                                  <div className="w-2 h-2 rounded-full bg-emerald-400/50" />
                              </div>
                              <span className="font-mono text-[9px] text-[var(--color-text-muted)] opacity-70">EXEC.LOG.{2024 - i}</span>
                          </div>

                          <div className="p-5">
                                <div className="flex flex-col mb-2">
                                    <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] mb-0.5 flex items-center gap-1.5">
                                        <Code size={10} /> {exp.period}
                                    </span>
                                    <h3 className="text-base font-bold font-heading text-[var(--color-text-primary)] leading-tight">{exp.role}</h3>
                                    <span className="text-xs font-medium text-[var(--color-text-secondary)]">@ {exp.company}</span>
                                </div>

                                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4 font-medium">
                                    {exp.description}
                                </p>

                                {exp.missions && (
                                    <div className="space-y-1.5">
                                        {exp.missions.map((mission, idx) => (
                                            <div key={idx} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)] pb-1.5 border-b border-dashed border-[var(--color-border)]/50 last:border-0 last:pb-0">
                                                <ArrowRight size={12} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                                                <span className="opacity-90">{mission}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                          </div>
                          
                          {/* Glowing corner accent - Neutralized */}
                          <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-white/20 to-transparent rounded-bl-2xl -z-10 transition-transform duration-500 group-hover:scale-150`} />
                      </div>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
