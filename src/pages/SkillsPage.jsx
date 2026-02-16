import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Shield, Server, Cloud, Code, Terminal, Cpu, Zap, Activity, Database, Lock } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { FadeInUp, StaggerContainer, staggerItem, ScaleIn } from '../components/AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

const iconMap = { Network, Shield, Server, Cloud, Code };

export default function SkillsPage() {
  const { data } = usePortfolioData();
  const skills = data.skills;
  const accent = data.settings?.accentColor || '#0066FF';

  // Sort/Group skills for the dashboard layout
  // Primary: Network, Security
  // Secondary: Systems, Cloud, Dev
  const primaryCategories = ['Réseaux & Infrastructure', 'Sécurité'];
  const primarySkills = skills.filter(s => primaryCategories.includes(s.category));
  const secondarySkills = skills.filter(s => !primaryCategories.includes(s.category));

  return (
    <PageLayout
      title="Expertise Technique"
      subtitle="Arsenal technique et outils opérationnels."
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dashboard Header / Status */}
        <FadeInUp>
          <div className="rounded-2xl bg-white/10 border border-white/20 p-4 md:p-6 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 shadow-[0_0_15px_var(--color-accent)]/20 relative overflow-hidden group">
                    <Cpu size={24} />
                    <div className="absolute inset-0 bg-white/40 animate-[shimmer_2s_infinite] -translate-x-full group-hover:animate-shine" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-[var(--color-text-primary)]">Système Opérationnel</h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-secondary)]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    STATUS: ONLINE // VER. 3.0.1
                  </div>
                </div>
              </div>

              {/* Mini Stats */}
              <div className="flex gap-4 md:gap-8">
                  <div className="text-center">
                      <div className="text-2xl font-bold font-heading text-[var(--color-text-primary)]">{skills.reduce((acc, cat) => acc + cat.items.length, 0)}</div>
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">Total Modules</div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                      <div className="text-2xl font-bold font-heading text-[var(--color-text-primary)]">{skills.length}</div>
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">Categories</div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                      <div className="text-2xl font-bold font-heading text-[var(--color-text-primary)]">100%</div>
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">Efficiency</div>
                  </div>
              </div>
          </div>
        </FadeInUp>

        {/* SECTION 1: PRIME COMPETENCIES (Network & Security) */}
        <section>
             <div className="flex items-center gap-3 mb-6 px-2">
                <span className="px-3 py-1 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-[var(--color-accent)] font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                  <Activity size={12} /> Compétences Critiques
                </span>
                <div className="h-px bg-gradient-to-r from-[var(--color-border)] to-transparent flex-grow opacity-50" />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {primarySkills.map((category, idx) => {
                    const Icon = iconMap[category.icon] || Shield;
                    return (
                        <FadeInUp key={category.category} delay={idx * 0.2}>
                            <div className="group h-full p-1 rounded-[2rem] bg-gradient-to-br from-white/40 to-white/5 hover:from-[var(--color-accent)]/20 hover:to-purple-500/20 transition-all duration-500 relative">
                                <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
                                
                                <div className="relative h-full bg-white/30 backdrop-blur-2xl rounded-[1.8rem] border border-white/40 p-6 md:p-8 overflow-hidden">
                                     {/* Background Tech Patterns */}
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-12 pointer-events-none">
                                        <Icon size={180} />
                                    </div>

                                    {/* Header */}
                                    <div className="flex items-center gap-4 mb-8 relative z-10">
                                        <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-white/50 shadow-lg text-[var(--color-accent)] ring-1 ring-white/50 group-hover:scale-110 transition-transform duration-500">
                                            <Icon size={32} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold font-heading text-[var(--color-text-primary)]">{category.category}</h3>
                                            <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-muted)]">
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 4 ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`} />
                                                    ))}
                                                </div>
                                                <span>Niveau: Avancé</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills Grid */}
                                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
                                        {category.items.map((skill, si) => (
                                            <div key={skill.name} className="group/skill">
                                                <div className="flex justify-between items-end mb-2">
                                                    <span className="font-bold text-sm text-[var(--color-text-secondary)] group-hover/skill:text-[var(--color-accent)] transition-colors">
                                                        {skill.name}
                                                    </span>
                                                    <span className="font-mono text-xs font-bold text-[var(--color-accent)]">{skill.level}%</span>
                                                </div>
                                                {/* Advanced Progress Bar */}
                                                <div className="h-2 w-full bg-[#e2e8f0]/40 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.level}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1.5, delay: 0.2 + (si * 0.1), ease: "easeOut" }}
                                                        className="h-full relative rounded-full"
                                                        style={{ background: `linear-gradient(90deg, ${accent}, #a855f7)` }}
                                                    >
                                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/80 shadow-[0_0_10px_white]" />
                                                    </motion.div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeInUp>
                    );
                })}
            </div>
        </section>

        {/* SECTION 2: OPERATIONAL TOOLS (Systems, Cloud, Dev) */}
        <section>
             <div className="flex items-center gap-3 mb-6 mt-12 px-2">
                <span className="px-3 py-1 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-[var(--color-accent)] font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                  <Database size={12} /> Modules Complémentaires
                </span>
                <div className="h-px bg-gradient-to-r from-[var(--color-border)] to-transparent flex-grow opacity-50" />
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
                 {secondarySkills.map((category, idx) => {
                    const Icon = iconMap[category.icon] || Server;
                    return (
                        <motion.div 
                            key={category.category} 
                            variants={staggerItem}
                            whileHover={{ translateY: -5 }}
                            className="group rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 p-6 shadow-lg hover:bg-white/30 hover:shadow-xl hover:border-white/50 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 rounded-xl bg-white/60 shadow-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] group-hover:scale-110 transition-all duration-300">
                                    <Icon size={20} />
                                </div>
                                <h3 className="font-bold font-heading text-[var(--color-text-primary)]">{category.category}</h3>
                            </div>

                             <div className="space-y-4">
                                {category.items.map((skill, si) => (
                                    <div key={skill.name} className="relative">
                                        <div className="flex justify-between text-xs mb-1.5">
                                            <span className="font-medium text-[var(--color-text-secondary)]">{skill.name}</span>
                                        </div>
                                        {/* Segmented Progress Bar for "Tools" */}
                                        <div className="flex gap-1 h-1.5">
                                            {[...Array(5)].map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`flex-1 rounded-full ${
                                                        (i + 1) * 20 <= skill.level 
                                                        ? 'bg-[var(--color-accent)]' 
                                                        : (i * 20 < skill.level) 
                                                            ? 'bg-[var(--color-accent)]/40' // Partial
                                                            : 'bg-[var(--color-border)]/30'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </StaggerContainer>
        </section>

      </div>
    </PageLayout>
  );
}
