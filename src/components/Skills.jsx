import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Network, Shield, Server, Cloud, Code, ArrowRight, Terminal } from 'lucide-react';
import { FadeInUp, ScaleIn, StaggerContainer, staggerItem } from './AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

const iconMap = { Network, Shield, Server, Cloud, Code };

export default function Skills() {
  const { data } = usePortfolioData();
  const skills = data.skills;
  const accent = data.settings?.accentColor || '#0066FF';
  
  // Show only featured skills, max 4 categories
  const featuredSkills = skills.slice(0, 4);

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-transparent text-[var(--color-text-primary)]">
      {/* Connector Line Top */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent via-[var(--color-accent)]/20 to-[var(--color-accent)]/50 z-20" />
      
      <div className="max-w-6xl mx-auto relative z-10 px-4 md:px-6">
        <FadeInUp>
          <div className="flex flex-col items-center mb-12 text-center">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium border border-[var(--color-accent)]/30 bg-white/50 backdrop-blur-sm text-[var(--color-accent)] mb-3 shadow-sm flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              // Compétences
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-[var(--color-text-primary)]">Arsenal Technique</h2>
          </div>
        </FadeInUp>

        {/* Unified "Control Panel" Dashboard */}
        <ScaleIn className="w-full">
            <div className="rounded-3xl border border-white/40 bg-white/20 backdrop-blur-xl shadow-2xl relative overflow-hidden ring-1 ring-white/10 group/dashboard">
                {/* Dashboard Header / Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-white/10 border-b border-white/20 flex items-center px-4 justify-between z-20">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                    <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest opacity-70">
                        PORTFOLIO_SYSTEM // SKILLS_MODULE
                    </div>
                    <div className="w-16" /> {/* Spacer */}
                </div>

                {/* Main Content Grid */}
                <div className="p-6 pt-16 relative z-10">
                    {/* Background Grid Pattern */}
                     <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
                        style={{ backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(to right, ${accent} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
                     />

                    {/* System Initialization / Intro */}
                    <div className="mb-8 px-2 relative z-10">
                        <h3 className="text-base md:text-lg font-bold font-heading mb-3 text-[var(--color-text-primary)] flex items-center gap-2">
                            <Terminal size={18} className="text-[var(--color-accent)]" />
                            Vue d'ensemble technique
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed max-w-3xl">
                             Un aperçu des technologies et outils que j'utilise au quotidien pour concevoir des infrastructures robustes et sécurisées.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 relative z-10">
                    {featuredSkills.map((group, gi) => {
                        const Icon = iconMap[group.icon] || Code;
                        return (
                            <div key={group.category} className="relative group/module p-5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300">
                                {/* Module Decoration */}
                                <div className="absolute top-2 right-2 text-[var(--color-accent)]/20 group-hover/module:text-[var(--color-accent)]/40 transition-colors">
                                    <Icon size={48} strokeWidth={1} className="opacity-20" />
                                </div>
                                
                                <h3 className="flex items-center gap-3 text-lg font-bold font-heading text-[var(--color-text-primary)] mb-4 relative z-10">
                                    <span className="p-1.5 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                                        <Icon size={16} />
                                    </span>
                                    {group.category}
                                </h3>

                                <div className="space-y-3 relative z-10">
                                    {group.items.slice(0, 4).map((skill, si) => (
                                        <div key={skill.name} className="flex flex-col gap-1">
                                            <div className="flex justify-between items-end text-xs">
                                                <span className="font-semibold text-[var(--color-text-secondary)] font-mono">{skill.name}</span>
                                                <span className="text-[9px] text-[var(--color-text-muted)]">{skill.level}%</span>
                                            </div>
                                            {/* Slim Tech Progress Bar */}
                                            <div className="h-1 w-full bg-[var(--color-bg-tertiary)]/30 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[var(--color-accent)] relative group-hover/module:animate-pulse" 
                                                    style={{ width: `${skill.level}%` }}
                                                >
                                                     <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
                </div>

                {/* Dashboard Footer */}
                 <div className="h-12 border-t border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-between px-6 z-20 relative">
                     <div className="text-[10px] font-mono text-[var(--color-text-muted)] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        All Systems Operational
                     </div>
                     <Link to="/skills" className="text-xs font-bold text-[var(--color-accent)] hover:underline flex items-center gap-1 group/link">
                        Scan Complete // See Details 
                        <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                     </Link>
                 </div>
            </div>
        </ScaleIn>

        <FadeInUp delay={0.2} className="text-center flex justify-center mt-8">
             {/* Connector Line Bottom to Projects */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-[var(--color-accent)]/50 to-transparent z-0" />
        </FadeInUp>
      </div>
    </section>
  );
}
