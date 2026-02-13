import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Shield, Server, Cloud, Code, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <div className="min-h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] relative overflow-hidden pt-24 pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
        <div 
          className="absolute inset-0 opacity-[0.4]" 
          style={{ backgroundImage: `radial-gradient(${accent} 0.5px, transparent 0.5px), radial-gradient(${accent} 0.5px, transparent 0.5px)`, backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeInUp>
          <div className="flex flex-col items-center mb-16 text-center">
            <Link to="/" className="absolute left-0 top-0 p-2 rounded-full border border-[var(--color-border)] bg-white/50 hover:bg-white hover:shadow-md transition-all hidden lg:block group">
               <ArrowLeft size={20} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]" />
            </Link>
            
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-4 shadow-sm">
              &lt;Skills /&gt;
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-[var(--color-text-primary)]">Expertise Technique Complète</h1>
            <p className="text-[var(--color-text-secondary)] max-w-2xl text-lg font-medium">
              Détail de l'ensemble de mes compétences, outils et technologies maîtrisés.
            </p>
          </div>
        </FadeInUp>

        {/* Filters */}
        <FadeInUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border backdrop-blur-sm ${
                !activeCategory 
                  ? 'border-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20' 
                  : 'bg-white border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              }`}
              style={!activeCategory ? { backgroundColor: accent } : {}}
            >
              // Tout voir
            </button>
            {skills.map(s => (
              <button
                key={s.category}
                onClick={() => setActiveCategory(s.category)}
                 className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border backdrop-blur-sm ${
                  activeCategory === s.category
                    ? 'border-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20' 
                    : 'bg-white border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                }`}
                style={activeCategory === s.category ? { backgroundColor: accent } : {}}
              >
                {s.category}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((group, gi) => {
            const Icon = iconMap[group.icon] || Code;
            return (
              <FadeInUp key={group.category} delay={gi * 0.1}>
                 <div className="h-full p-8 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-lg hover:shadow-xl hover:bg-white/60 transition-all duration-300 group/card relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[var(--color-border)]/50">
                      <div className="p-3 rounded-xl bg-white shadow-md text-[var(--color-accent)] group-hover/card:scale-110 transition-transform duration-300">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-bold font-heading text-[var(--color-text-primary)]">{group.category}</h3>
                    </div>
                    
                    <StaggerContainer className="space-y-6" stagger={0.05}>
                      {group.items.map((skill, si) => (
                        <motion.div key={skill.name} variants={staggerItem} className="group/skill">
                          <div className="flex items-center justify-between mb-2">
                             <span className="font-semibold text-[var(--color-text-secondary)] group-hover/skill:text-[var(--color-accent)] transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-xs font-mono text-[var(--color-accent)] opacity-70 group-hover/skill:opacity-100 font-bold">
                              {skill.level}%
                            </span>
                          </div>
                           <div className="h-2 rounded-full bg-[var(--color-bg-tertiary)]/5 border border-white/20 overflow-hidden shadow-inner">
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
      </div>
    </div>
  );
}
