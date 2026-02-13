import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Star, X, ExternalLink, ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { FadeInUp, StaggerContainer, staggerItem } from '../components/AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function ProjectsPage() {
  const { data } = usePortfolioData();
  const projects = data.projects;
  const accent = data.settings?.accentColor || '#0066FF';
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const allTags = [...new Set(projects.flatMap(p => p.tags))];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.tags.includes(filter));

  return (
    <PageLayout
      title="Toutes mes Réalisations"
      subtitle="Une vue d'ensemble de mes projets, défis techniques et solutions déployées."
    >
          <FadeInUp delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              <button onClick={() => setFilter('all')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer border hover:-translate-y-0.5 ${
                  filter === 'all' ? 'border-transparent text-white shadow-lg shadow-[var(--color-accent)]/20' : 'bg-white/80 border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                }`} style={filter === 'all' ? { backgroundColor: accent } : {}}>
                Tous
              </button>
              {allTags.map(tag => (
                <button key={tag} onClick={() => setFilter(tag)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer border hover:-translate-y-0.5 ${
                    filter === tag ? 'border-transparent text-white shadow-lg shadow-[var(--color-accent)]/20' : 'bg-white/80 border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                  }`} style={filter === tag ? { backgroundColor: accent } : {}}>
                  {tag}
                </button>
              ))}
            </div>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.08}>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                variants={staggerItem}
                layout
                onClick={() => setSelected(project)}
                className="group relative rounded-3xl overflow-hidden border border-white/60 bg-white/40 backdrop-blur-xl hover:bg-white/60 hover:shadow-xl hover:shadow-[var(--color-accent)]/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full flex flex-col shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
                
                <div className="p-8 flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-wrap gap-2">
                       {/* Mobile-first tag size optimization */}
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
                  
                  <p className="text-[var(--color-text-secondary)] mb-6 line-clamp-3 flex-grow leading-relaxed font-medium">
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

          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
              >
                <motion.div
                  key="modal-content"
                  initial={{ scale: 0.95, opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ scale: 0.95, opacity: 0, y: 20, filter: 'blur(10px)' }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-2xl border border-white/40 rounded-2xl w-full max-w-xl shadow-2xl relative overflow-hidden group/modal ring-1 ring-white/20 mx-4 md:mx-0"
                >
                  {/* Glass Reflection Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                  
                  {/* Background Decor */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-accent)]/20 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--color-accent)]/20 rounded-full blur-[80px] pointer-events-none" />

                    {/* Clean Header */}
                    <div className="h-10 border-b border-white/10 flex items-center justify-end px-4 relative z-10">
                        <button 
                          onClick={() => setSelected(null)} 
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-[var(--color-text-primary)] transition-all"
                        >
                          <X size={14} />
                        </button>
                    </div>

                  <div className="p-5 md:p-8 relative z-10 max-h-[75vh] overflow-y-auto custom-scrollbar">
                      
                      {/* Compact Header */}
                      <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            {selected?.featured && (
                              <span className="p-1 rounded bg-yellow-400/20 text-yellow-600">
                                <Star size={10} fill="currentColor" />
                              </span>
                            )}
                            <h3 className="text-xl md:text-2xl font-bold font-heading text-[var(--color-text-primary)]">
                              {selected?.title}
                            </h3>
                          </div>
                          <p className="text-xs font-mono text-[var(--color-accent)] opacity-80">
                            {selected?.client || 'Projet Personnel'}
                          </p>
                      </div>

                      {/* Compact Stats */}
                      <div className="flex gap-3 mb-4 text-xs">
                        <div className="px-2.5 py-1.5 rounded-lg bg-white/40 border border-white/20 backdrop-blur-sm">
                            <span className="text-[9px] uppercase text-[var(--color-text-muted)] block mb-0.5">Rôle</span>
                            <span className="font-medium text-[var(--color-text-primary)]">{selected?.role}</span>
                        </div>
                        <div className="px-2.5 py-1.5 rounded-lg bg-white/40 border border-white/20 backdrop-blur-sm">
                            <span className="text-[9px] uppercase text-[var(--color-text-muted)] block mb-0.5">Date</span>
                            <span className="font-medium text-[var(--color-text-primary)]">{selected?.period}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="prose prose-sm max-w-none mb-6 text-[var(--color-text-secondary)] leading-relaxed text-xs md:text-sm">
                        <p>{selected?.description}</p>
                      </div>

                      {/* Tags */}
                      {selected?.technologies && (
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {selected.technologies.map(tech => (
                              <span key={tech} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/30 border border-white/20 text-[var(--color-text-primary)] shadow-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                      )}
                      
                      {/* Simple Action */}
                      <div className="pt-4 border-t border-white/10">
                        <button className="w-full py-2.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white font-bold text-xs tracking-wide shadow-lg shadow-[var(--color-accent)]/20 transition-all flex items-center justify-center gap-2 group/btn">
                            <span>Voir le projet</span>
                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
    </PageLayout>
  );
}
