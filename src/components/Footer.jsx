import { Heart, Activity, ShieldCheck, GitBranch } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Footer() {
  const { data } = usePortfolioData();
  const accent = data.settings?.accentColor || '#0066FF';
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-white/10 bg-black/5 backdrop-blur-sm relative z-50">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: System Status */}
        <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-[9px] font-mono text-green-600 font-bold uppercase tracking-wider">
                 <Activity size={10} /> Système En Ligne
             </div>
             <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[9px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                 <ShieldCheck size={10} /> Sécurisé
             </div>
        </div>

        {/* Center: Copyright */}
        <p className="text-[10px] text-[var(--color-text-muted)] font-mono tracking-wide text-center">
          © {year} {data.hero.name}. Designed as <span className="font-bold">Portfolio_OS v2.1</span>
        </p>

        {/* Right: Credits */}
        <div className="flex items-center gap-4 text-[10px] font-medium text-[var(--color-text-secondary)]">
          <span className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-help">
            <GitBranch size={10} /> main_branch
          </span>
           <span className="flex items-center gap-1 opacity-70">
              Fait avec <Heart size={10} style={{ color: accent }} fill={accent} />
           </span>
        </div>
      </div>
    </footer>
  );
}
