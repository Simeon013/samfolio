import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Network, Shield, Server, Cloud, Code, ArrowRight } from 'lucide-react';
import { FadeInUp, StaggerContainer, staggerItem } from './AnimationWrappers';
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
      
      {/* Background Decor - Removed internal blobs to use global background */}
      
      <div className="max-w-6xl mx-auto relative z-10 px-6">
        <FadeInUp>
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--color-accent)]/30 bg-white/50 backdrop-blur-sm text-[var(--color-accent)] mb-4 shadow-sm">
              &lt;Compétences /&gt;
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-[var(--color-text-primary)]">Expertise Technique</h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl text-base font-medium">
              Aperçu des technologies maîtrisées.
            </p>
          </div>
        </FadeInUp>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {featuredSkills.map((group, gi) => {
            const Icon = iconMap[group.icon] || Code;
            return (
              <FadeInUp key={group.category} delay={gi * 0.1} className="h-full">
                <div className="h-full p-6 rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md shadow-lg hover:shadow-xl hover:bg-white/50 transition-all duration-300 group/card relative overflow-hidden ring-1 ring-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-black/5">
                      <div className="p-3 rounded-xl bg-white shadow-md text-[var(--color-accent)] group-hover/card:scale-110 transition-transform duration-300">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-bold font-heading text-[var(--color-text-primary)]">{group.category}</h3>
                    </div>

                    <div className="space-y-4">
                      {group.items.slice(0, 3).map((skill) => (
                        <div key={skill.name} className="flex items-center justify-between text-sm">
                           <span className="font-semibold text-[var(--color-text-secondary)]">{skill.name}</span>
                           <div className="h-2 w-32 rounded-full bg-[var(--color-bg-tertiary)]/5 overflow-hidden shadow-inner">
                             <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)]" style={{ width: `${skill.level}%` }} />
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

        <FadeInUp delay={0.2} className="text-center">
            <Link to="/skills" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-[var(--color-text-primary)] font-bold border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-lg transition-all shadow-sm group">
                Voir toutes les compétences <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </FadeInUp>
      </div>
    </section>
  );
}
