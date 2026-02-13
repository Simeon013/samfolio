import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Star, X, ExternalLink, ArrowRight, Folder, Database, Eye, Terminal } from 'lucide-react';
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
      {/* Connector Line from Skills */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent via-[var(--color-accent)]/20 to-[var(--color-accent)]/50 z-20" />

      <div className="max-w-6xl mx-auto px-4 relative z-40">
        <FadeInUp>
          <div className="text-center mb-16">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium border border-[var(--color-accent)]/30 bg-white/50 backdrop-blur-sm text-[var(--color-accent)] mb-3 shadow-sm inline-flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
               // Réalisations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-[var(--color-text-primary)]">Projets & Déploiements</h2>
            <p className="text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed max-w-2xl mx-auto">
              Base de données des missions accomplies et solutions déployées.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" stagger={0.08}>
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              layout
              onClick={() => setSelected(project)}
              className="group relative rounded-xl overflow-hidden border border-white/40 bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 cursor-pointer h-full flex flex-col shadow-lg ring-1 ring-white/10 hover:ring-[var(--color-accent)]/30"
            >
              {/* Folder/File Header */}
              <div className="h-8 bg-white/10 border-b border-white/10 flex items-center justify-between px-3">
                 <div className="flex items-center gap-2">
                    <Folder size={12} className="text-[var(--color-accent)] opacity-70" />
                    <span className="font-mono text-[9px] text-[var(--color-text-muted)] tracking-wider">
                        FILE_ID: {8000 + index}
                    </span>
                 </div>
                 <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                 </div>
              </div>

              {/* Main Content */}
              <div className="p-5 flex flex-col h-full relative">
                 {/* Hover Scan Effect */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent)]/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out pointer-events-none z-0" />
                 
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-wrap gap-1.5">
                            {project.technologies.slice(0, 2).map(tech => (
                            <span key={tech} className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                                {tech}
                            </span>
                            ))}
                            {project.technologies.length > 2 && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium text-[var(--color-text-muted)] bg-white/10 border border-white/20">
                                    +{project.technologies.length - 2}
                                </span>
                            )}
                        </div>
                         {project.featured && (
                            <span className="text-[var(--color-accent)] animate-pulse">
                                <Star size={14} fill="currentColor" />
                            </span>
                        )}
                    </div>

                    <h3 className="text-lg font-bold font-heading mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">
                        {project.title}
                    </h3>
                    
                    <p className="text-xs text-[var(--color-text-secondary)] mb-4 line-clamp-3 leading-relaxed opacity-90">
                        {project.description}
                    </p>
                </div>

                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                   <div className="flex flex-col">
                       <span className="text-[9px] font-mono text-[var(--color-text-muted)] uppercase">Status</span>
                       <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                           <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                           Déployé
                       </span>
                   </div>
                   <button className="p-2 rounded-lg bg-white/40 text-[var(--color-text-primary)] hover:bg-[var(--color-accent)] hover:text-white transition-colors shadow-sm">
                       <Eye size={16} />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeInUp delay={0.2} className="text-center">
             <div className="relative inline-block">
                <Link to="/projects" className="inline-flex items-center gap-3 px-6 py-3 rounded-md bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-mono text-xs hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all group shadow-sm">
                    <Database size={14} /> ACCOUNT_ARCHIVES // ACCESS_ALL
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                {/* Decoration Lines */}
                <div className="absolute top-1/2 -left-12 w-8 h-px bg-[var(--color-border)]" />
                <div className="absolute top-1/2 -right-12 w-8 h-px bg-[var(--color-border)]" />
             </div>
        </FadeInUp>

        {/* Modal - Rendered locally with high z-index and safety checks */}
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
      </div>
    </section>
  );
}
