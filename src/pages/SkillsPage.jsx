import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Shield, Server, Cloud, Code } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { FadeInUp, StaggerContainer, staggerItem } from '../components/AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

const iconMap = { Network, Shield, Server, Cloud, Code };

export default function SkillsPage() {
  const { data } = usePortfolioData();
  const skills = data.skills;
  const accent = data.settings?.accentColor || '#0066FF';
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = activeCategory
    ? skills.filter(s => s.category === activeCategory)
    : skills;

  return (
    <PageLayout
      title="Expertise Technique"
      subtitle="Détail de l'ensemble de mes compétences, outils et technologies maîtrisés."
    >
        {/* Filters */}
        <FadeInUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer border backdrop-blur-sm ${
                !activeCategory 
                  ? 'border-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20' 
                  : 'bg-white/80 border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              }`}
              style={!activeCategory ? { backgroundColor: accent } : {}}
            >
              // Tout voir
            </button>
            {skills.map(s => (
              <button
                key={s.category}
                onClick={() => setActiveCategory(s.category)}
                 className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer border backdrop-blur-sm ${
                  activeCategory === s.category
                    ? 'border-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20' 
                    : 'bg-white/80 border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                }`}
                style={activeCategory === s.category ? { backgroundColor: accent } : {}}
              >
                {s.category}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((group, gi) => {
            const Icon = iconMap[group.icon] || Code;
            return (
              <FadeInUp key={group.category} delay={gi * 0.1}>
                 <div className="h-full p-6 md:p-8 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-lg hover:shadow-xl hover:bg-white/60 transition-all duration-300 group/card relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[var(--color-border)]/50">
                      <div className="p-3 rounded-xl bg-white shadow-md text-[var(--color-accent)] group-hover/card:scale-110 transition-transform duration-300">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-bold font-heading text-[var(--color-text-primary)]">{group.category}</h3>
                    </div>
                    
                    <StaggerContainer className="space-y-5" stagger={0.05}>
                      {group.items.map((skill, si) => (
                        <motion.div key={skill.name} variants={staggerItem} className="group/skill">
                          <div className="flex items-center justify-between mb-2">
                             <span className="font-semibold text-sm text-[var(--color-text-secondary)] group-hover/skill:text-[var(--color-accent)] transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-xs font-mono text-[var(--color-accent)] opacity-70 group-hover/skill:opacity-100 font-bold">
                              {skill.level}%
                            </span>
                          </div>
                           <div className="h-1.5 rounded-full bg-[var(--color-bg-tertiary)]/5 border border-white/20 overflow-hidden shadow-inner">
                            <motion.div
                              className="h-full rounded-full relative"
                              style={{ 
                                background: `linear-gradient(90deg, ${accent}, #a855f7)`
                              }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, delay: 0.2 + (si * 0.1), ease: "easeOut" }}
                            >
                               <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite] translate-x-[-100%]" />
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </StaggerContainer>
                  </div>
                </div>
              </FadeInUp>
            );
          })}
        </div>
    </PageLayout>
  );
}
