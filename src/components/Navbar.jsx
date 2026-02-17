import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Lightbulb, Folder, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolioData } from '../hooks/usePortfolioData';

const navLinks = [
  { path: '/', label: 'Accueil', icon: Home },
  { path: '/about', label: 'À Propos', icon: User },
  { path: '/skills', label: 'Compétences', icon: Lightbulb },
  { path: '/projects', label: 'Projets', icon: Folder },
  { path: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data } = usePortfolioData();
  const accent = data.settings?.accentColor || '#0066FF';

  const isActiveLink = (path) => {
      if (path === '/') return location.pathname === '/';
      return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90%]"
      >
        {/* Desktop Pill */}
        <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full nav-pill shadow-lg shadow-black/5 bg-white/90 backdrop-blur-md border border-white/20">
          {navLinks.map(({ path, label, icon: Icon }) => {
            const isActive = isActiveLink(path);
            return (
              <Link
                key={path}
                to={path}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive ? 'text-white shadow-md' : 'text-black/60 hover:text-black/90 hover:bg-black/5'
                }`}
                style={isActive ? { backgroundColor: accent } : {}}
              >
                 {isActive && <Icon size={14} className="animate-in fade-in zoom-in duration-300" />}
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Pill */}
        <div className="md:hidden flex items-center justify-between p-2 rounded-full nav-pill shadow-lg shadow-black/5 min-w-[280px] bg-white/90 backdrop-blur-md border border-white/20">
           <Link to="/" className="pl-4 font-bold text-lg tracking-tight flex items-center gap-1" style={{fontFamily: 'var(--font-heading)'}}>
             S.G<span style={{color: accent}}>.</span>
           </Link>
            
           <button
             onClick={() => setMobileOpen(!mobileOpen)}
             className="p-3 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
             style={mobileOpen ? { color: accent, backgroundColor: `${accent}15` } : {}}
           >
             {mobileOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 md:hidden bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden ring-1 ring-white/10"
          >
            <div className="p-4 grid grid-cols-2 gap-2">
              {navLinks.map(({ path, label, icon: Icon }) => {
                const isActive = isActiveLink(path);
                return (
                    <Link
                    key={path}
                    to={path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all ${
                        isActive
                        ? 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] font-bold shadow-inner'
                        : 'hover:bg-black/5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                    >
                    <Icon size={24} style={isActive ? { color: accent } : { opacity: 0.5 }} />
                    <span className="text-sm">{label}</span>
                    </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
