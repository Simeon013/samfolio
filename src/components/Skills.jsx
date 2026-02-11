import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Shield, Server, Cloud, Code } from 'lucide-react';
import { FadeInUp, StaggerContainer, staggerItem } from './AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

const iconMap = { Network, Shield, Server, Cloud, Code };

export default function Skills() {
  const { data } = usePortfolioData();
  const skills = data.skills;
  const accent = data.settings?.accentColor || '#0066FF';
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = activeCategory
    ? skills.filter(s => s.category === activeCategory)
    : skills;

  return (
    <section id="skills" className="section-padding bg-[var(--color-bg-tertiary)] text-white relative isolate overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: `${accent}20`, color: accent }}>
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight">Compétences Techniques</h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">
              Une maîtrise complète des technologies modernes pour des infrastructures robustes et sécurisées.
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer border hover:-translate-y-0.5 ${
                !activeCategory 
                  ? 'border-transparent text-white shadow-lg shadow-[var(--color-accent)]/20' 
                  : 'bg-white/5 border-white/10 text-[var(--color-text-muted)] hover:bg-white/10 hover:text-white'
              }`}
              style={!activeCategory ? { backgroundColor: accent } : {}}
            >
              Toutes
            </button>
            {skills.map(s => (
              <button
                key={s.category}
                onClick={() => setActiveCategory(s.category)}
                 className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer border hover:-translate-y-0.5 ${
                  activeCategory === s.category
                    ? 'border-transparent text-white shadow-lg shadow-[var(--color-accent)]/20' 
                    : 'bg-white/5 border-white/10 text-[var(--color-text-muted)] hover:bg-white/10 hover:text-white'
                }`}
                style={activeCategory === s.category ? { backgroundColor: accent } : {}}
              >
                {s.category}
              </button>
            ))}
          </div>
        </FadeInUp>

        <div className="space-y-12">
          {filtered.map((group, gi) => {
            const Icon = iconMap[group.icon] || Code;
            return (
              <FadeInUp key={group.category} delay={gi * 0.1}>
                <div className="p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-500 group/card">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover/card:scale-110 transition-transform duration-300">
                      <Icon size={24} style={{ color: accent }} />
                    </div>
                    <h3 className="text-2xl font-bold font-heading">{group.category}</h3>
                  </div>
                  <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.05}>
                    {group.items.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={staggerItem}
                        className="group flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs font-mono text-gray-500 group-hover:text-[var(--color-accent)] transition-colors">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full relative overflow-hidden"
                            style={{ backgroundColor: accent }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          >
                             <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] translate-x-[-100%]" />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </StaggerContainer>
                </div>
              </FadeInUp>
            );
          })}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
