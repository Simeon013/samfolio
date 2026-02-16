import { motion } from 'framer-motion';
import { Network, MapPin, Shield, Activity, Globe, Wifi, Server } from 'lucide-react';
import { FadeInUp } from './AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function BioIdentity() {
  const { data } = usePortfolioData();
  const hero = data.hero;
  const about = data.about;
  const languages = data.languages;
  const accent = data.settings?.accentColor || '#0066FF';

  return (
    <section className="mb-6">
      <FadeInUp>
        <div className="relative group max-w-5xl mx-auto">
            {/* Holographic Background Effect - Neutralized */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-accent)]/20 to-purple-500/20 rounded-[2.5rem] opacity-0 group-hover:opacity-20 transition duration-500 blur-3xl"></div>
            
            <div className="relative bg-white/30 backdrop-blur-xl border border-white/40 rounded-[2rem] p-5 md:p-8 overflow-hidden shadow-xl ring-1 ring-white/20">
                {/* Inner White Glow for Glass Edge */}
                <div className="absolute inset-0 rounded-[2rem] border border-white/20 pointer-events-none" />
                
                {/* Network Pattern Overlay - Very Subtle */}
                <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" 
                     style={{ backgroundImage: `radial-gradient(${accent} 1px, transparent 1px), radial-gradient(${accent} 1px, transparent 1px)`, backgroundSize: '30px 30px', backgroundPosition: '0 0, 15px 15px' }} 
                />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="relative z-10 grid md:grid-cols-[240px_1fr] gap-8 items-start">
                    {/* Identity Column */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
                             {/* Rotating Network Rings */}
                            <div className="absolute inset-0 rounded-full border-2 border-[var(--color-accent)]/20 animate-[spin_20s_linear_infinite]" />
                            <div className="absolute inset-3 rounded-full border border-dashed border-[var(--color-accent)]/30 animate-[spin_25s_linear_infinite_reverse]" />
                            <div className="absolute -inset-2 rounded-full border border-[var(--color-accent)]/10 animate-[pulse_4s_ease-in-out_infinite]" />
                            
                            {/* Avatar Container */}
                            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-white shadow-xl group/avatar bg-gray-100">
                                {about.photo ? (
                                    <img 
                                        src={about.photo} 
                                        alt={hero.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                        <Server size={48} className="text-slate-400 opacity-50" />
                                    </div>
                                )}
                            </div>
                            
                            {/* Orbiting Nodes - Neutralized */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-3 h-3 bg-[var(--color-accent)] rounded-full shadow-[0_0_10px_var(--color-accent)]" />
                        </div>
                        
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-white backdrop-blur-md shadow-md mb-4">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-bold font-mono text-[var(--color-text-primary)] tracking-widest uppercase">NET_SEC: ONLINE</span>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-2 w-full">
                             {about.stats.slice(0, 2).map((stat, i) => (
                                 <div key={i} className="p-2 rounded-xl bg-white/50 border border-white/50 shadow-sm backdrop-blur-sm">
                                     <div className="text-lg font-bold text-[var(--color-accent)]">{stat.value}{stat.suffix}</div>
                                     <div className="text-[9px] uppercase font-bold text-[var(--color-text-muted)] leading-tight">{stat.label}</div>
                                 </div>
                             ))}
                        </div>
                    </div>

                    {/* Bio Data Column */}
                    <div className="flex flex-col h-full pt-2">
                         <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="px-2.5 py-1 rounded-md bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <Shield size={10} /> Sec_Level: Admin
                            </span>
                            <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-600 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <Wifi size={10} /> Infra: Optimized
                            </span>
                         </div>
                         
                         <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2 text-[var(--color-text-primary)] tracking-tight leading-tight">
                            {hero.name}
                         </h1>
                         <h2 className="text-lg md:text-xl font-medium text-[var(--color-text-secondary)] mb-6 flex items-center gap-2">
                            <Activity size={18} className="text-[var(--color-accent)]" /> 
                            {hero.title}
                         </h2>

                         {/* Description / Bio */}
                         <div className="prose prose-sm text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-2xl">
                             <p>{about.bio}</p>
                         </div>

                         <div className="grid md:grid-cols-2 gap-6 items-end mt-auto">
                             {/* Location & Role */}
                             <div className="space-y-3">
                                 <div className="flex items-center gap-2 text-[var(--color-text-primary)] text-sm font-medium">
                                     <div className="p-1.5 rounded-md bg-white shadow-sm text-[var(--color-accent)]">
                                        <MapPin size={16} />
                                     </div>
                                     {hero.location}
                                 </div>
                                 <div className="flex items-center gap-2 text-[var(--color-text-primary)] text-sm font-medium">
                                     <div className="p-1.5 rounded-md bg-white shadow-sm text-[var(--color-accent)]">
                                        <Network size={16} />
                                     </div>
                                     {hero.subtitle}
                                 </div>
                             </div>

                             {/* Languages - Integrated Here */}
                             {languages && (
                                 <div className="p-4 rounded-xl bg-white/50 border border-white/50 shadow-sm backdrop-blur-sm">
                                     <h3 className="text-[10px] font-bold uppercase text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                                        <Globe size={12} /> Langues
                                     </h3>
                                     <div className="space-y-2">
                                         {languages.map(lang => (
                                             <div key={lang.name} className="flex items-center justify-between">
                                                 <span className="font-semibold text-xs text-[var(--color-text-primary)]">{lang.name}</span>
                                                 <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                                                     {lang.level}
                                                 </span>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                             )}
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </FadeInUp>
    </section>
  );
}
