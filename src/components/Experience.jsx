import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { FadeInUp, StaggerContainer, staggerItem } from './AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Experience() {
  const { data } = usePortfolioData();
  const experience = data.experience;
  const accent = data.settings?.accentColor || '#0066FF';

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <FadeInUp>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: `${accent}15`, color: accent }}>
              Parcours
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight">Expérience Pro</h2>
          </div>
        </FadeInUp>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent" />

          {experience.map((exp, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: i * 0.2 }}
               className={`relative mb-16 last:mb-0 pl-20 md:pl-0 md:w-1/2 ${
                i % 2 === 0 ? 'md:pr-16 md:ml-0 md:text-right' : 'md:pl-16 md:ml-auto md:text-left'
              }`}
            >
              {/* Timeline Dot */}
              <div className={`absolute top-0 w-12 h-12 rounded-full border-4 border-white bg-white shadow-lg left-[0px] md:left-auto flex items-center justify-center z-10 ${
                i % 2 === 0 ? 'md:right-[-24px]' : 'md:left-[-24px]'
              }`}>
                 <Briefcase size={20} style={{ color: accent }} />
              </div>

              {/* Content Card */}
              <div className={`group relative p-8 rounded-3xl bg-white/50 backdrop-blur-md border border-[var(--color-border)] shadow-sm hover:shadow-xl hover:bg-white hover:border-[var(--color-accent)]/30 transition-all duration-300 ${
                 i % 2 === 0 ? 'origin-right' : 'origin-left'
              }`}>
                <div className={`flex flex-col gap-1 mb-4 ${i % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                   <span className="text-sm font-bold text-[var(--color-accent)] uppercase tracking-wider">{exp.period}</span>
                   <h3 className="text-xl font-bold font-heading">{exp.company}</h3>
                   <span className="text-base font-medium text-[var(--color-text-secondary)]">{exp.role}</span>
                </div>
                
                <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  {exp.description}
                </p>
                
                {exp.missions && exp.missions.length > 0 && (
                  <ul className={`space-y-2 text-sm text-[var(--color-text-muted)] ${i % 2 === 0 ? 'md:items-end flex flex-col' : 'md:items-start'}`}>
                    {exp.missions.map((mission, j) => (
                      <li key={j} className={`flex items-start gap-2 ${i % 2 === 0 ? 'md:flex-row-reverse md:text-right' : 'md:flex-row'}`}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--color-accent)]" />
                        {mission}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
