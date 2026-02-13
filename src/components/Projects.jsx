import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Star, X, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeInUp, StaggerContainer, staggerItem } from './AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Projects() {
  const { data } = usePortfolioData();
  const projects = data.projects;
  const accent = data.settings?.accentColor || '#0066FF';
  const [selected, setSelected] = useState(null);

  // Show only featured projects, max 3
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  return (
    <section id="projects" className="section-padding bg-transparent relative overflow-hidden text-[var(--color-text-primary)]">
       {/* Background Decor - Removed internal blobs to use global background */}

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <FadeInUp>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--color-accent)]/30 bg-white/50 backdrop-blur-sm text-[var(--color-accent)] mb-4 shadow-sm">
               // Réalisations
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight text-[var(--color-text-primary)]">Réalisations Phares</h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              Une sélection de mes travaux les plus significatifs.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" stagger={0.08}>
          {displayProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              layout
              onClick={() => setSelected(project)}
              className="group relative rounded-3xl overflow-hidden border border-white/40 bg-white/30 backdrop-blur-md hover:bg-white/50 hover:shadow-xl hover:shadow-[var(--color-accent)]/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full flex flex-col shadow-lg ring-1 ring-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
              
              <div className="p-8 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-white/50 text-[var(--color-text-secondary)] border border-[var(--color-border)]/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.featured && (
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100/50 text-yellow-600 border border-yellow-200 shadow-sm">
                      <Star size={16} fill="currentColor" />
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-[var(--color-accent)] transition-colors text-[var(--color-text-primary)]"
                  style={{ '--color-accent': accent }}>
                  {project.title}
                </h3>
                
                <p className="text-[var(--color-text-secondary)] mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="pt-6 border-t border-[var(--color-border)]/30 flex items-center justify-between mt-auto">
                   <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Client</span>
                      <span className="text-sm font-semibold text-[var(--color-text-primary)]">{project.client || 'Confidentiel'}</span>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300 transform group-hover:-rotate-45 shadow-sm border border-white/50">
                     <ArrowRight size={18} />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeInUp delay={0.2} className="text-center">
            <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-[var(--color-text-primary)] font-bold border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-lg transition-all shadow-sm group">
                Découvrir tous les projets <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </FadeInUp>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[2rem] p-0 max-w-2xl w-full shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent)]/5" />
                
                <button onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors cursor-pointer shadow-sm z-50 border border-[var(--color-border)]">
                  <X size={20} className="text-[var(--color-text-muted)]" />
                </button>

                <div className="p-8 sm:p-10 relative z-0">
                  <div className="mb-8 mt-4">
                    {selected.featured && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-bold uppercase tracking-wider mb-4 border border-yellow-100">
                        <Star size={12} fill="currentColor" /> Projet Phare
                      </span>
                    )}
                    <h3 className="text-3xl sm:text-4xl font-bold font-heading mb-2 text-[var(--color-text-primary)]">{selected.title}</h3>
                    <p className="text-lg text-[var(--color-text-muted)]">{selected.client}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                     <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]/50">
                        <span className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Rôle</span>
                        <div className="flex items-center gap-2 font-medium text-[var(--color-text-primary)]">
                           <User size={16} className="text-[var(--color-accent)]" /> {selected.role}
                        </div>
                     </div>
                     <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]/50">
                        <span className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Période</span>
                        <div className="flex items-center gap-2 font-medium text-[var(--color-text-primary)]">
                           <Calendar size={16} className="text-[var(--color-accent)]" /> {selected.period}
                        </div>
                     </div>
                  </div>

                  <div className="prose prose-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                    <p>{selected.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] pb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.technologies.map(tech => (
                        <span key={tech} className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-[var(--color-border)] text-[var(--color-text-secondary)] shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
