import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, Shield, Lock, FileBadge, Server } from 'lucide-react';
import { FadeInUp, StaggerContainer, staggerItem } from './AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Certifications() {
  const { data } = usePortfolioData();
  const certs = data.certifications;
  const accent = data.settings?.accentColor || '#0066FF';
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="certifications" className="py-6 relative">
      <div className="max-w-6xl mx-auto px-4">
        
        <FadeInUp>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent flex-grow" />
             <span className="px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-[var(--color-accent)] font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2 whitespace-normal text-center">
              <Shield size={14} className="shrink-0" /> Certified_Protocol_Authority
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent flex-grow" />
          </div>
        </FadeInUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Always show first 4 items - Manual Stagger */}
          {certs.slice(0, 4).map((cert, i) => (
             <CertificationCard key={`${cert.name}-${i}`} cert={cert} index={i} />
          ))}

          {/* Conditionally show the rest */}
          <AnimatePresence mode="popLayout">
            {showAll && certs.slice(4).map((cert, i) => (
               <motion.div
                key={`${cert.name}-extra-${i}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative h-full"
              >
                  <CertificationCardContent cert={cert} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {certs.length > 4 && (
            <div className="flex justify-center mt-6">
                <button 
                    onClick={() => setShowAll(!showAll)}
                    className="group flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-[var(--color-accent)]/50 backdrop-blur-md transition-all duration-300 text-xs font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
                >
                    {showAll ? 'Réduire le dossier' : `Voir les ${certs.length - 4} autres certifications`}
                    <div className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}>
                        <div className="w-2 h-2 border-r-2 border-b-2 border-current rotate-45 mb-0.5" />
                    </div>
                </button>
            </div>
        )}
      </div>
    </section>
  );
}

function CertificationCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, translateY: -3 }}
      className="group relative h-full"
    >
      <CertificationCardContent cert={cert} />
    </motion.div>
  );
}

function CertificationCardContent({ cert }) {
  return (
    <>
      {/* Glow Effect - Neutralized */}
      <div className="absolute -inset-0.5 bg-white/40 rounded-[1.2rem] opacity-0 group-hover:opacity-50 transition duration-500 blur-md" />
      
      <div className="relative h-full bg-white/20 backdrop-blur-xl border border-white/40 rounded-[1rem] p-5 shadow-lg flex flex-col justify-between overflow-hidden group-hover:border-white/60 hover:bg-white/30 transition-all duration-300">
        {/* Inner Highlight */}
        <div className="absolute inset-0 rounded-[1rem] bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 pointer-events-none">
            <Award size={60} />
        </div>

        <div>
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm border border-white/50 text-[var(--color-accent)]">
                    {cert.category === 'Sécurité' ? <Shield size={20} /> : 
                    cert.category === 'Réseau' ? <Server size={20} /> : 
                    <Award size={20} />}
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                    cert.status === 'obtained' 
                    ? 'bg-emerald-100/50 border-emerald-200 text-emerald-700' 
                    : 'bg-amber-100/50 border-amber-200 text-amber-700'
                }`}>
                    {cert.status === 'obtained' ? <CheckCircle size={10} /> : <Lock size={10} />}
                    {cert.status === 'obtained' ? 'VALIDÉ' : 'EN COURS'}
                </div>
            </div>
            
            <h3 className="text-sm font-bold font-heading text-[var(--color-text-primary)] mb-1 leading-tight min-h-[2.5rem] flex items-center">
                {cert.name}
            </h3>
            
            <div className="h-px w-8 bg-[var(--color-accent)]/30 my-3" />
            
            <p className="font-mono text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wide mb-0.5">
                {cert.org}
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)] font-medium">
                {cert.date}
            </p>
        </div>
      </div>
    </>
  );
}
