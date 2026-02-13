import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { FadeInUp } from './AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Contact() {
  const { data } = usePortfolioData();
  const accent = data.settings?.accentColor || '#0066FF';

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-transparent">
       {/* Global Background visible through transparency */}
       
      <div className="max-w-4xl mx-auto px-4 text-center">
        <FadeInUp>
          <div className="bg-white/30 backdrop-blur-3xl border border-white/40 p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:shadow-[var(--color-accent)]/10 transition-shadow duration-500 ring-1 ring-white/20">
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 shadow-sm">
                  Démarrons un Projet
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight text-[var(--color-text-primary)]">
                    Prêt à donner vie à vos idées ?
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg mb-10 font-medium">
                    Je suis toujours à l'écoute de nouveaux défis. Discutons de la manière dont je peux vous aider à atteindre vos objectifs.
                </p>
                <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg shadow-xl shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/40 hover:-translate-y-1 transition-all"
                    style={{ backgroundColor: accent }}
                >
                    Me Contacter <Send size={20} />
                </Link>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
