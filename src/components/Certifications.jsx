import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Clock } from 'lucide-react';
import { FadeInUp, StaggerContainer, staggerItem } from './AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Certifications() {
  const { data } = usePortfolioData();
  const certs = data.certifications;
  const accent = data.settings?.accentColor || '#0066FF';
  const [filter, setFilter] = useState('all');

  const categories = [...new Set(certs.map(c => c.category))];
  const filtered = filter === 'all' ? certs : certs.filter(c => c.category === filter);

  return (
    <section id="certifications" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: `${accent}15`, color: accent }}>
              Certifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">Certifications & Formations</h2>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                filter === 'all' ? 'text-white' : 'text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)]'
              }`} style={filter === 'all' ? { backgroundColor: accent } : {}}>
              Toutes ({certs.length})
            </button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  filter === cat ? 'text-white' : 'text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)]'
                }`} style={filter === cat ? { backgroundColor: accent } : {}}>
                {cat}
              </button>
            ))}
          </div>
        </FadeInUp>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" stagger={0.05}>
          {filtered.map((cert, i) => (
            <motion.div
              key={`${cert.name}-${i}`}
              variants={staggerItem}
              layout
              className="group p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] card-hover glow-hover"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-xl shrink-0" style={{ backgroundColor: `${accent}15` }}>
                  <Award size={18} style={{ color: accent }} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold leading-tight mb-0.5">{cert.name}</h3>
                  <p className="text-xs text-[var(--color-text-muted)]">{cert.org}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-text-muted)]">{cert.date}</span>
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  cert.status === 'obtained' ? 'text-emerald-600' : 'text-amber-500'
                }`}>
                  {cert.status === 'obtained' ? (
                    <><CheckCircle size={12} /> Obtenue</>
                  ) : (
                    <><Clock size={12} /> En cours</>
                  )}
                </span>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
