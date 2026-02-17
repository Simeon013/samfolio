import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Star, X, ArrowRight, Layers, Tag, ExternalLink, SlidersHorizontal } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { FadeInUp, StaggerContainer, staggerItem } from '../components/AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function ProjectsPage() {
  const { data } = usePortfolioData();
  const projects = data.projects;
  const accent = data.settings?.accentColor || '#0066FF';
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique tags for filter
  const allTags = ['all', ...new Set(projects.flatMap(p => p.tags))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.tags.includes(filter));

  return (
    <PageLayout
      title="Projets & Réalisations"
      subtitle="Une sélection de mes missions techniques et déploiements d'infrastructures."
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-20">
        
        {/* Filter Bar */}
        {/* Grid Header & Controls */}
        <div className="flex flex-col mb-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                 <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                        <Layers size={14} />
                    </span>
                    <h2 className="text-base md:text-lg font-bold text-[var(--color-text-primary)]">
                        {filter === 'all' ? 'Toutes les réalisations' : filter}
                        <span className="ml-2 text-[10px] font-medium text-[var(--color-text-muted)] bg-white/10 px-1.5 py-0.5 rounded-full">
                            {filteredProjects.length}
                        </span>
                    </h2>
                 </div>

                 <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-[10px] font-bold uppercase tracking-wider ${
                        showFilters 
                        ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent)]/20' 
                        : 'bg-white/5 border-white/10 text-[var(--color-text-secondary)] hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                    <SlidersHorizontal size={12} />
                    <span className="hidden sm:inline">Filtres</span>
                 </button>
            </div>

            <AnimatePresence>
                {showFilters && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-1">
                            <div className="flex flex-wrap gap-2">
                                {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => { setFilter(tag); }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                                    filter === tag 
                                        ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-md' 
                                        : 'bg-white/5 border-white/10 text-[var(--color-text-secondary)] hover:bg-white/10 hover:border-white/20'
                                    }`}
                                >
                                    {tag === 'all' ? 'Tout voir' : tag}
                                </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Projects Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(project)}
                className="group relative h-full cursor-pointer"
              >
                <div className="h-full bg-white/30 backdrop-blur-xl border border-white/40 rounded-[1.5rem] overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/40 hover:-translate-y-1 flex flex-col">
                  
                  {/* Card Header Effect */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="p-4 md:p-5 flex flex-col h-full relative z-10">
                    
                    {/* Top Row: Tags & Featured */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-[var(--color-accent)]/5 text-[var(--color-accent)] border border-[var(--color-accent)]/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.featured && (
                         <div className="p-1 rounded-full bg-yellow-400/10 text-yellow-600 border border-yellow-400/20 shadow-sm">
                           <Star size={10} fill="currentColor" />
                         </div>
                      )}
                    </div>

                    {/* Title & Client */}
                    <div className="mb-3">
                       <h3 className="text-base font-bold font-heading text-[var(--color-text-primary)] mb-0.5 leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                         {project.title}
                       </h3>
                       <p className="text-[10px] font-medium text-[var(--color-text-muted)] flex items-center gap-1">
                         <User size={10} />
                         {project.client}
                       </p>
                    </div>

                    {/* Description (Truncated) */}
                    <p className="text-[11px] md:text-xs text-[var(--color-text-secondary)] line-clamp-3 mb-4 flex-grow leading-relaxed">
                      {project.description}
                    </p>

                    {/* Footer Row */}
                    <div className="pt-4 border-t border-white/10 mt-auto flex items-center justify-between">
                       <div className="flex items-center gap-2 text-[10px] font-medium text-[var(--color-text-muted)]">
                          <Calendar size={12} />
                          {project.period}
                       </div>
                       
                       <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center border border-white/40 group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300 shadow-sm">
                          <ArrowRight size={14} className="group-hover:-rotate-45 transition-transform duration-300" />
                       </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </StaggerContainer>

        {/* Modal Detail View */}
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
              layoutId={selected.id}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/40 backdrop-blur-2xl border border-white/30 rounded-[2rem] w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh] ring-1 ring-white/20"
            >
               {/* Decorative Background */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
               
               {/* Modal Header */}
               <div className="p-5 md:p-6 pb-0 flex justify-between items-start relative z-10">
                  <div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-2"
                      >
                         <span className="px-2 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-[10px] font-bold border border-[var(--color-accent)]/10">
                            {selected.tags[0]}
                         </span>
                         {selected.featured && (
                            <span className="flex items-center gap-1 text-[10px] font-medium text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded-full border border-yellow-100">
                               <Star size={8} fill="currentColor" /> Starred
                            </span>
                         )}
                      </motion.div>
                      <h2 className="text-xl md:text-2xl font-bold font-heading text-[var(--color-text-primary)]">
                        {selected.title}
                      </h2>
                      <p className="text-xs font-medium text-[var(--color-text-muted)] mt-1">
                        {selected.client} • {selected.period}
                      </p>
                  </div>
                  <button 
                    onClick={() => setSelected(null)}
                    className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-[var(--color-text-primary)]"
                  >
                    <X size={16} />
                  </button>
               </div>

               {/* Modal Content - Scrollable */}
               <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar relative z-10">
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                     <div className="md:col-span-2 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-2">
                           <Layers size={12} /> Description
                        </h4>
                        <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                           {selected.description}
                        </p>
                     </div>
                     <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-2">
                           <User size={12} /> Rôle
                        </h4>
                        <p className="text-xs font-medium text-[var(--color-text-primary)]">
                           {selected.role}
                        </p>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-2">
                        <Tag size={12} /> Technologies
                     </h4>
                     <div className="flex flex-wrap gap-1.5">
                        {selected.technologies.map(tech => (
                           <span key={tech} className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs font-medium text-[var(--color-text-primary)] shadow-sm">
                              {tech}
                           </span>
                        ))}
                     </div>
                  </div>

               </div>

               {/* Modal Footer */}
               <div className="p-5 border-t border-gray-100 bg-white/50 backdrop-blur-sm flex justify-end gap-3 rounded-b-[2rem]">
                  <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-xl font-medium text-xs text-[var(--color-text-secondary)] hover:bg-black/5 transition-colors">
                     Fermer
                  </button>
                  <button className="px-5 py-2 rounded-xl font-bold text-xs bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                     Voir les détails <ExternalLink size={14} />
                  </button>
               </div>

            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>

      </div>
    </PageLayout>
  );
}
