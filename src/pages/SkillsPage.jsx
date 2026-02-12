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
    <div className="min-h-screen bg-[var(--color-bg-tertiary)] text-white relative overflow-hidden pt-24 pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent)]/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeInUp>
          <div className="flex flex-col items-center mb-16 text-center">
            <Link to="/" className="absolute left-0 top-0 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors hidden lg:block">
               <ArrowLeft size={20} className="text-gray-400" />
            </Link>
            
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-4">
              &lt;Skills /&gt;
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Expertise Technique Complète</h1>
            <p className="text-gray-400 max-w-2xl text-lg font-light">
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
                  ? 'border-[var(--color-accent)] text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]' 
                  : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/30'
              }`}
              style={!activeCategory ? { backgroundColor: `${accent}20` } : {}}
            >
              // Tout voir
            </button>
            {skills.map(s => (
              <button
                key={s.category}
                onClick={() => setActiveCategory(s.category)}
                 className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border backdrop-blur-sm ${
                  activeCategory === s.category
                    ? 'border-[var(--color-accent)] text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]' 
                    : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/30'
                }`}
                style={activeCategory === s.category ? { backgroundColor: `${accent}20` } : {}}
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
                <div className="h-full p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--color-accent)]/50 transition-all duration-500 group/card relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                      <div className="p-3 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent)]">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold font-heading">{group.category}</h3>
                    </div>
                    <StaggerContainer className="space-y-6" stagger={0.05}>
                      {group.items.map((skill, si) => (
                        <motion.div key={skill.name} variants={staggerItem} className="group/skill">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-200 group-hover/skill:text-white transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-xs font-mono text-[var(--color-accent)] opacity-70 group-hover/skill:opacity-100">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-black/50 border border-white/5 overflow-hidden">
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
