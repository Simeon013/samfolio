import { GraduationCap, MapPin } from 'lucide-react';
import { FadeInUp, StaggerContainer, staggerItem } from './AnimationWrappers';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Education() {
  const { data } = usePortfolioData();
  const education = data.education;
  const languages = data.languages;
  const accent = data.settings?.accentColor || '#0066FF';

  return (
    <section id="education" className="section-padding bg-[var(--color-bg-secondary)] relative">
      <div className="max-w-4xl mx-auto px-4">
        <FadeInUp>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: `${accent}15`, color: accent }}>
              Diplômes
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight text-[var(--color-text-primary)]">Formation Académique</h2>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-16" stagger={0.1}>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="group p-8 rounded-3xl bg-white border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 card-hover flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg-secondary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={24} style={{ color: accent }} />
                </div>
                
                <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-[var(--color-accent)] transition-colors">{edu.degree}</h3>
                {edu.school && <p className="text-base font-medium text-[var(--color-text-secondary)] mb-4">{edu.school}</p>}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border-light)] text-sm text-[var(--color-text-muted)] mt-auto">
                <span className="font-mono bg-[var(--color-bg-secondary)] px-2 py-1 rounded-md">{edu.period}</span>
                {edu.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} /> {edu.location}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        {languages && languages.length > 0 && (
          <FadeInUp>
            <div className="p-8 rounded-3xl bg-white border border-[var(--color-border)] text-center max-w-2xl mx-auto shadow-sm">
              <h3 className="text-lg font-bold font-heading mb-6 uppercase tracking-wider text-[var(--color-text-muted)]">Langues</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                    <span className="font-bold text-[var(--color-text-primary)]">{lang.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border-dark)]" />
                    <span className="text-sm text-[var(--color-text-secondary)] font-medium">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}
      </div>
    </section>
  );
}
