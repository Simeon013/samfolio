import { Link } from 'react-router-dom';
import { Send, Terminal, Wifi, Shield, ArrowRight } from 'lucide-react';
import { FadeInUp } from './AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Contact() {
  const { data } = usePortfolioData();
  const accent = data.settings?.accentColor || '#0066FF';

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-transparent pb-32">
       {/* Background Decor */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-accent)]/5 blur-[100px] rounded-full pointer-events-none" />

       {/* Connector Line from Projects */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent via-[var(--color-accent)]/20 to-[var(--color-accent)]/50 z-20" />

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <FadeInUp>
          <div className="relative group">
              {/* Terminal Container - Light Glass */}
            <div className="bg-white/30 backdrop-blur-xl border border-white/40 p-1 rounded-2xl shadow-xl overflow-hidden ring-1 ring-white/20">
                
                {/* Terminal Header */}
                <div className="bg-white/30 border-b border-white/20 px-4 py-2 flex items-center justify-between">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                    <div className="text-[10px] font-mono text-[var(--color-text-muted)] flex items-center gap-2 uppercase tracking-widest">
                        <Shield size={10} /> Secure_Connection
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 md:p-12 relative flex flex-col items-center text-[var(--color-text-primary)]">
                    {/* Animated Grid Background inside Terminal */}
                    <div className="absolute inset-0 opacity-[0.03]" 
                        style={{ backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(to right, ${accent} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} 
                    />

                    <div className="mb-6 relative">
                        <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center border border-white/60 mx-auto shadow-lg backdrop-blur-sm">
                            <Send size={28} className="text-[var(--color-accent)] animate-pulse" />
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading tracking-tight">
                        Discutons de votre projet
                    </h2>
                    
                    <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto text-base mb-8 font-medium leading-relaxed">
                        Vous avez une idée ou un défi technique ?<br/>
                        Mon canal est ouvert pour échanger sur vos besoins.
                    </p>

                    <Link 
                        to="/contact" 
                        className="group/btn relative inline-flex items-center gap-3 px-8 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white font-bold text-sm tracking-wide rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[var(--color-accent)]/40 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                             Envoyer un Message <ArrowRight size={18} />
                        </span>
                        {/* Button Scan Effect */}
                         <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                    </Link>
                </div>
            </div>

            {/* Decorative Elements behind terminal */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-[var(--color-accent)]/30 rounded-tr-3xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-[var(--color-accent)]/30 rounded-bl-3xl -z-10" />
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
