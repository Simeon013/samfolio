import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck, ScanLine, ArrowLeft } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const { data } = usePortfolioData();
  const accent = data.settings?.accentColor || '#0066FF';

  const handleLogin = (e) => {
    e.preventDefault();
    setIsScanning(true);
    
    setTimeout(() => {
      const adminPw = data.settings?.adminPassword || 'password';
      if (password === adminPw) {
        sessionStorage.setItem('samfolio_admin', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Accès refusé. Identifiants invalides.');
        setIsScanning(false);
        setTimeout(() => setError(''), 3000);
      }
    }, 1500); // Fake scan delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] px-4 relative overflow-hidden">
      {/* Global Background (Same as PageLayout to maintain consistency) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-secondary)] via-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] opacity-80" />
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
          />
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
             <div className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-[var(--color-accent)]/10 rounded-full blur-[120px] animate-blob" />
          </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-2xl p-8 relative overflow-hidden group">
          
          {/* Scanning Effect Overlay */}
          {isScanning && (
            <motion.div 
              initial={{ top: '-10%' }}
              animate={{ top: '110%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-[var(--color-accent)]/50 blur-sm z-20"
            />
          )}

          <div className="text-center mb-8 relative">
            <div className="inline-flex relative mb-4">
               <div className="p-4 rounded-2xl bg-white/40 shadow-inner backdrop-blur-md relative z-10">
                 <ShieldCheck size={32} style={{ color: accent }} />
               </div>
               {/* Pulse Effect */}
               <div className="absolute inset-0 bg-[var(--color-accent)]/20 rounded-2xl blur-xl animate-pulse" />
            </div>
            
            <h1 className="text-2xl font-bold font-heading text-[var(--color-text-primary)]">Système Sécurisé</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-2 font-medium">Authentification requise pour l'accès administrateur</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 ml-1">Clé d'accès</label>
              <div className="relative group/input">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within/input:text-[var(--color-accent)] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isScanning}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/50 border border-white/30 focus:bg-white/80 focus:border-[var(--color-accent)]/50 focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium text-sm placeholder:text-[var(--color-text-muted)]/50"
                  placeholder="••••••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  disabled={isScanning}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer transition-colors">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold text-center flex items-center justify-center gap-2"
              >
                <ShieldCheck size={14} /> {error}
              </motion.div>
            )}

            <button type="submit"
              disabled={isScanning}
              className="w-full py-4 rounded-xl text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent)]/20 hover:-translate-y-0.5 disabled:opacity-80 disabled:cursor-wait flex items-center justify-center gap-2 relative overflow-hidden"
              style={{ backgroundColor: accent }}>
              
              {isScanning ? (
                 <>
                   <ScanLine size={18} className="animate-pulse" /> Vérification...
                 </>
              ) : (
                 <>Accéder au Terminal</>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors px-4 py-2 rounded-full hover:bg-white/40">
              <ArrowLeft size={14} /> Retour au portfolio
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
