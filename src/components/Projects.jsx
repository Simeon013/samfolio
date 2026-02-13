import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Star, X, ExternalLink, ArrowRight, Folder, Database, Eye } from 'lucide-react';
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

      <div className="max-w-6xl mx-auto px-4 relative z-10">
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

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[var(--color-bg-primary)]/95 backdrop-blur-xl border border-[var(--color-border)] rounded-xl overflow-hidden w-full max-w-2xl shadow-2xl relative"
              >
                 {/* Modal Header */}
                 <div className="h-12 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50 flex items-center justify-between px-4">
                     <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-muted)]">
                        <Folder size={14} />
                        PROJECT_FILE // {selected.title.toUpperCase().replace(/\s/g, '_')}
                     </div>
                     <button onClick={() => setSelected(null)} className="p-1 hover:bg-red-500/10 hover:text-red-500 rounded transition-colors">
                        <X size={18} />
                     </button>
                 </div>

                <div className="p-8 relative">
                   <div className="flex flex-wrap gap-2 mb-6">
                      {selected.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-400/10 text-yellow-600 text-[10px] font-bold uppercase tracking-wider border border-yellow-400/20">
                          <Star size={10} fill="currentColor" /> Priorité Haute
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-400/10 text-green-600 text-[10px] font-bold uppercase tracking-wider border border-green-400/20">
                          Status: Terminé
                      </span>
                   </div>

                   <h3 className="text-3xl font-bold font-heading mb-2 text-[var(--color-text-primary)]">{selected.title}</h3>
                   <p className="text-sm font-mono text-[var(--color-accent)] mb-8">{selected.client || 'Projet Personnel'}</p>

                   <div className="grid sm:grid-cols-2 gap-4 mb-8 text-sm">
                      <div className="p-3 rounded bg-[var(--color-bg-secondary)]/50 border border-[var(--color-border)]/50">
                         <span className="block text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Rôle</span>
                         <div className="font-medium text-[var(--color-text-primary)]">{selected.role}</div>
                      </div>
                      <div className="p-3 rounded bg-[var(--color-bg-secondary)]/50 border border-[var(--color-border)]/50">
                         <span className="block text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Timeline</span>
                         <div className="font-medium text-[var(--color-text-primary)]">{selected.period}</div>
                      </div>
                   </div>

                   <div className="prose prose-sm text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                     <p>{selected.description}</p>
                   </div>

                   <div className="border-t border-[var(--color-border)] pt-6">
                     <h4 className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-3">Stack Technique</h4>
                     <div className="flex flex-wrap gap-2">
                       {selected.technologies.map(tech => (
                         <span key={tech} className="px-2 py-1 rounded text-xs font-medium bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-mono">
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
