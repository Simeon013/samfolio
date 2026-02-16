import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Network, Shield, Server, Cloud, Code, Database, Globe, Cpu, Terminal, Layers } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { FadeInUp, StaggerContainer, staggerItem } from '../components/AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

const iconMap = { 
  Network: Network, 
  Shield: Shield, 
  Server: Server, 
  Cloud: Cloud, 
  Code: Code,
  Database: Database,
  Globe: Globe,
  Cpu: Cpu,
  Terminal: Terminal
};

export default function SkillsPage() {
  const { data } = usePortfolioData();
  const skills = data.skills;
  const accent = data.settings?.accentColor || '#0066FF';

  // Group skills into "Core" and "Auxiliary" for Bento Layout
  const coreSkills = useMemo(() => skills.filter(s => ['Réseaux & Infrastructure', 'Sécurité'].includes(s.category)), [skills]);
  const otherSkills = useMemo(() => skills.filter(s => !['Réseaux & Infrastructure', 'Sécurité'].includes(s.category)), [skills]);

  return (
    <PageLayout
      title="Architecture & Expertise"
      subtitle="Vue d'ensemble de mon stack technique et de mes domaines de maîtrise."
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-20">
        
        {/* Core Competencies (Bento Hero) */}
        <div className="mb-12">
            <FadeInUp>
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent flex-grow" />
                    <span className="px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-[var(--color-accent)] font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                        <Layers size={14} /> Core_Competencies
                    </span>
                    <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent flex-grow" />
                </div>
            </FadeInUp>

            <div className="grid md:grid-cols-2 gap-4">
                {coreSkills.map((category, index) => (
                    <BentoCard key={index} category={category} accent={accent} isLarge />
                ))}
            </div>
        </div>

        {/* Other Skills (Grid) */}
        <div>
             <FadeInUp delay={0.2}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent flex-grow opacity-50" />
                    <span className="px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-gray-50/50 text-[var(--color-text-secondary)] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                        <Cpu size={12} /> Auxiliary_Modules
                    </span>
                    <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent flex-grow opacity-50" />
                </div>
            </FadeInUp>
            
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.1}>
                {otherSkills.map((category, index) => (
                    <motion.div key={index} variants={staggerItem} className="h-full">
                         <BentoCard category={category} accent={accent} />
                    </motion.div>
                ))}
            </StaggerContainer>
        </div>

      </div>
    </PageLayout>
  );
}

function BentoCard({ category, accent, isLarge = false }) {
  const Icon = iconMap[category.icon] || Code;

  return (
    <div className={`group relative h-full bg-white/30 backdrop-blur-xl border border-white/40 rounded-[1.5rem] overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:bg-white/40 hover:scale-[1.01] ${isLarge ? 'p-5 md:p-8' : 'p-4 md:p-5'}`}>
      {/* Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />
      <div className="absolute -inset-1 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none" />
      
      {/* Texture */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${accent} 1px, transparent 0)` , backgroundSize: '24px 24px' }} 
        />

      <div className="relative z-10 flex flex-col h-full">
         {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-5">
            <div className="flex items-center gap-3">
                <div className={`rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm border border-white/60 text-[var(--color-accent)] flex items-center justify-center ${isLarge ? 'w-10 h-10' : 'w-9 h-9'}`}>
                    <Icon size={isLarge ? 20 : 18} strokeWidth={1.5} />
                </div>
                <div>
                     <h3 className={`font-bold font-heading text-[var(--color-text-primary)] leading-none ${isLarge ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                        {category.category}
                    </h3>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[var(--color-text-muted)] opacity-70">
                        {category.items.length} Modules Active
                    </span>
                </div>
            </div>
        </div>

        {/* Skills List */}
        <div className={`grid gap-2 ${isLarge ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
            {category.items.map((skill, i) => (
                <div key={i} className="relative group/skill">
                    {/* Skill Bar Background */}
                    <div className="absolute inset-0 bg-white/40 rounded-lg border border-white/40 shadow-sm group-hover/skill:border-[var(--color-accent)]/30 transition-colors duration-300" />
                    
                    {/* Progress Fill (Subtle) */}
                    <div 
                        className="absolute inset-y-0 left-0 bg-[var(--color-accent)]/5 rounded-l-lg transition-all duration-1000 group-hover/skill:bg-[var(--color-accent)]/10" 
                        style={{ width: `${skill.level}%` }} 
                    />

                    <div className="relative px-3 py-2 flex items-center justify-between">
                        <span className="font-semibold text-xs text-[var(--color-text-primary)] relative z-10">
                            {skill.name}
                        </span>
                        <div className="flex items-center gap-1.5 lead-none">
                             {/* Circular Indicator */}
                            <div className="w-1 h-1 rounded-full bg-[var(--color-accent)]/40 group-hover/skill:bg-[var(--color-accent)] group-hover/skill:shadow-[0_0_5px_var(--color-accent)] transition-all duration-300" />
                            <span className="font-mono text-[10px] font-bold text-[var(--color-text-muted)] group-hover/skill:text-[var(--color-accent)] transition-colors">
                                {skill.level}%
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
       
       {/* Decorative Corner */}
       <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-bl-[80px] pointer-events-none border-b border-l border-white/10" />
    </div>
  );
}
