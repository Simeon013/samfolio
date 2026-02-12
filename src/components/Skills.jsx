import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Network, Shield, Server, Cloud, Code } from 'lucide-react';
import { FadeInUp, StaggerContainer, staggerItem } from './AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

const iconMap = { Network, Shield, Server, Cloud, Code };

export default function Skills() {
  const { data } = usePortfolioData();
  const skills = data.skills;
  const accent = data.settings?.accentColor || '#0066FF';
  
  // Show only first 4 categories on homepage for brevity
  const featuredSkills = skills.slice(0, 4);

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-[var(--color-bg-tertiary)] text-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent)]/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 px-6">
        <FadeInUp>
          <div className="flex flex-col items-center mb-12 text-center">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-4">
              &lt;Skills /&gt;
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Expertise Technique</h2>
            <p className="text-gray-400 max-w-2xl text-base font-light">
              Aperçu de mes compétences clés.
            </p>
          </div>
        </FadeInUp>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {featuredSkills.map((group, gi) => {
            const Icon = iconMap[group.icon] || Code;
            return (
              <FadeInUp key={group.category} delay={gi * 0.1} className="h-full">
                <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--color-accent)]/50 transition-all duration-500 group/card relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                      <div className="p-2 rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent)]">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-xl font-bold font-heading">{group.category}</h3>
                    </div>

                    <div className="space-y-3">
                      {group.items.slice(0, 3).map((skill) => (
                        <div key={skill.name} className="flex items-center justify-between text-sm">
                           <span className="font-medium text-gray-300">{skill.name}</span>
                           <div className="h-1.5 w-24 rounded-full bg-black/50 border border-white/5 overflow-hidden">
                             <div className="h-full rounded-full bg-[var(--color-accent)]" style={{ width: `${skill.level}%` }} />
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
            <Link to="/skills" className="px-8 py-3 rounded-full bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-dark)] transition-colors shadow-lg shadow-[var(--color-accent)]/25 inline-block">
                Voir toutes les compétences
            </Link>
        </FadeInUp>
      </div>
    </section>
  );
}
