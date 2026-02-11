import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Star, X, ExternalLink, ArrowRight } from 'lucide-react';
import { FadeInUp, StaggerContainer, staggerItem } from './AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Projects() {
  const { data } = usePortfolioData();
  const projects = data.projects;
  const accent = data.settings?.accentColor || '#0066FF';
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const allTags = [...new Set(projects.flatMap(p => p.tags))];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.tags.includes(filter));

  return (
    <section id="projects" className="section-padding bg-[var(--color-bg-primary)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <FadeInUp>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: `${accent}15`, color: accent }}>
              Réalisations
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight text-[var(--color-text-primary)]">Projets Majeurs</h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg">
              Une sélection de projets complexes menés à bien, de la conception au déploiement.
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            <button onClick={() => setFilter('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer border hover:-translate-y-0.5 ${
                filter === 'all' ? 'border-transparent text-white shadow-lg shadow-[var(--color-accent)]/20' : 'bg-white border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              }`} style={filter === 'all' ? { backgroundColor: accent } : {}}>
              Tous
            </button>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setFilter(tag)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer border hover:-translate-y-0.5 ${
                  filter === tag ? 'border-transparent text-white shadow-lg shadow-[var(--color-accent)]/20' : 'bg-white border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
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
              className="group relative bg-white rounded-3xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors duration-300 cursor-pointer h-full flex flex-col shadow-sm hover:shadow-xl hover:shadow-[var(--color-accent)]/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="p-8 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.featured && (
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400/20 text-yellow-600">
                      <Star size={16} fill="currentColor" />
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-[var(--color-accent)] transition-colors"
                  style={{ '--color-accent': accent }}>
                  {project.title}
                </h3>
                
                <p className="text-[var(--color-text-secondary)] mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="pt-6 border-t border-[var(--color-border-light)] flex items-center justify-between mt-auto">
                   <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Client</span>
                      <span className="text-sm font-semibold">{project.client || 'Confidentiel'}</span>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300 transform group-hover:-rotate-45">
                     <ArrowRight size={18} />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
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
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors cursor-pointer shadow-sm z-10">
                  <X size={20} />
                </button>

                <div className="p-8 sm:p-10 relative z-0">
                  <div className="mb-8 mt-4">
                    {selected.featured && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-bold uppercase tracking-wider mb-4 border border-yellow-100">
                        <Star size={12} fill="currentColor" /> Projet Phare
                      </span>
                    )}
                    <h3 className="text-3xl sm:text-4xl font-bold font-heading mb-2">{selected.title}</h3>
                    <p className="text-lg text-[var(--color-text-muted)]">{selected.client}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                     <div className="p-4 rounded-2xl bg-[var(--color-bg-secondary)]">
                        <span className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Rôle</span>
                        <div className="flex items-center gap-2 font-medium">
                           <User size={16} className="text-[var(--color-accent)]" /> {selected.role}
                        </div>
                     </div>
                     <div className="p-4 rounded-2xl bg-[var(--color-bg-secondary)]">
                        <span className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Période</span>
                        <div className="flex items-center gap-2 font-medium">
                           <Calendar size={16} className="text-[var(--color-accent)]" /> {selected.period}
                        </div>
                     </div>
                  </div>

                  <div className="prose prose-lg text-[var(--color-text-secondary)] mb-8">
                    <p>{selected.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.technologies.map(tech => (
                        <span key={tech} className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-[var(--color-border)] shadow-sm text-[var(--color-text-secondary)]">
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
