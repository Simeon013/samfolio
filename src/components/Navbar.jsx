import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Lightbulb, Folder, Award, Briefcase, GraduationCap, Mail } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const navLinks = [
  { id: 'hero', icon: Home, label: 'Accueil' },
  { id: 'about', icon: User, label: 'À Propos' },
  { id: 'skills', icon: Lightbulb, label: 'Compétences' },
  { id: 'projects', icon: Folder, label: 'Projets' },
  { id: 'certifications', icon: Award, label: 'Certifs' },
  { id: 'experience', icon: Briefcase, label: 'Expérience' },
  { id: 'education', icon: GraduationCap, label: 'Formation' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data } = usePortfolioData();
  const accent = data.settings?.accentColor || '#0066FF';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
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
        <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full nav-pill shadow-lg shadow-black/5">
          {navLinks.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive ? 'text-white shadow-md' : 'text-black/40 hover:text-black/80 hover:bg-black/5'
                }`}
                style={isActive ? { backgroundColor: accent } : {}}
              >
                 {isActive && <Icon size={14} className="animate-in fade-in zoom-in duration-300" />}
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Pill */}
        <div className="md:hidden flex items-center justify-between p-2 rounded-full nav-pill shadow-lg shadow-black/5 min-w-[280px]">
           <span className="pl-4 font-bold text-lg tracking-tight" style={{fontFamily: 'var(--font-heading)'}}>
             S.G<span style={{color: accent}}>.</span>
           </span>
            
           <button
             onClick={() => setMobileOpen(!mobileOpen)}
             className="p-3 rounded-full hover:bg-black/5 transition-colors"
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
            className="fixed top-24 left-4 right-4 z-40 md:hidden bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="p-4 grid grid-cols-2 gap-2">
              {navLinks.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all ${
                    activeSection === id
                      ? 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] font-bold shadow-inner'
                      : 'hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  <Icon size={24} style={activeSection === id ? { color: accent } : { opacity: 0.5 }} />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
