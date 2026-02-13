import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowDown, Terminal, Server, Shield, Globe, Cpu, Wifi } from 'lucide-react';
import ParticleNetwork from './ParticleNetwork';
import TypewriterEffect from './TypewriterEffect';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Hero() {
  const { data } = usePortfolioData();
  const { name, title, location } = data.hero;
  const accent = data.settings?.accentColor || '#0066FF';

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Terminal commands simulation
  const [terminalLines, setTerminalLines] = useState([
    { text: '> initialized system sequence...', color: 'text-green-400' },
    { text: '> loading network modules...', color: 'text-green-400' },
    { text: '> establishing secure connection...', color: 'text-yellow-400' },
    { text: '> access granted.', color: 'text-green-400' },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerminalLines(prev => [
        ...prev.slice(1),
        { text: `> user: ${name.split(' ')[0].toLowerCase()}`, color: 'text-blue-400' },
        { text: '> status: online', color: 'text-green-400' }
      ]);
    }, 4000);
    return () => clearTimeout(timer);
  }, [name]);

  const roles = [
    "Expert Sécurité Réseaux",
    "Admin Système & Cloud",
    "Technicien Support IT",
    "Passionné de Tech"
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-12 lg:py-0">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Particle Network on top of Global Background */}
        <ParticleNetwork />
        
        {/* Floating Tech Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
           <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/4 left-1/4"><Server size={64} /></motion.div>
           <motion.div animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }} className="absolute bottom-1/3 right-1/4"><Shield size={80} /></motion.div>
           <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} className="absolute top-1/3 right-1/3"><Globe size={50} /></motion.div>
           <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, delay: 0.5 }} className="absolute bottom-1/4 left-1/3"><Cpu size={70} /></motion.div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Introduction */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-[var(--color-accent)] text-xs font-mono mb-4 mx-auto lg:mx-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
            </span>
            Disponible pour missions
          </motion.div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 font-heading leading-tight">
            Salut, je suis <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] filter drop-shadow-sm">
              {name.split(' ').length > 2 ? `${name.split(' ')[0]} ${name.split(' ')[name.split(' ').length - 1]}` : name}
            </span>
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl text-[var(--color-text-secondary)] mb-6 font-medium h-[40px] flex items-center justify-center lg:justify-start">
             <span className="mr-2 text-[var(--color-text-muted)]">&gt;</span>
             <TypewriterEffect words={roles} typeSpeed={70} pauseTime={2500} />
          </div>

          <p className="text-lg text-[var(--color-text-muted)] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            {title}. J'aide les entreprises à sécuriser leurs infrastructures et à optimiser leurs réseaux pour une performance maximale.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10">
            <button
              onClick={() => scrollTo('projects')}
              className="px-8 py-4 rounded-xl text-white font-bold text-sm tracking-wide shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-[var(--color-accent)]/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: accent }}
            >
              <Terminal size={18} />
              Voir mes Projets
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 rounded-xl font-bold text-sm tracking-wide border hover:bg-[var(--color-bg-secondary)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
            >
              <MapPin size={18} />
              Me Contacter
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2" title="Infrastructure">
              <Server size={20} />
              <span className="text-sm font-mono hidden sm:inline">Infra</span>
            </div>
            <div className="flex items-center gap-2" title="Security">
              <Shield size={20} />
              <span className="text-sm font-mono hidden sm:inline">Sécurité</span>
            </div>
            <div className="flex items-center gap-2" title="Network">
              <Wifi size={20} />
              <span className="text-sm font-mono hidden sm:inline">Réseau</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Terminal Simulation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 bg-[#1e1e1e] rounded-xl shadow-2xl border border-white/10 overflow-hidden max-w-md mx-auto"
          >
            {/* Terminal Header */}
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs text-gray-400 font-mono ml-4 flex items-center gap-1">
                <Terminal size={10} />
                root@sam-portfolio:~
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm h-[320px] overflow-hidden text-gray-300 flex flex-col relative">
               {/* Scan Line Animation */}
               <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20 blur-sm animate-scan-line pointer-events-none" />

              {terminalLines.map((line, i) => (
                <div key={i} className={`mb-2 ${line.color} opacity-0 animate-fade-in-up`} style={{ animationDelay: `${i * 0.5}s`, animationFillMode: 'forwards' }}>
                  {line.text}
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span>CPU Usage</span>
                  <span className="text-green-400">12%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mb-4">
                  <div className="bg-green-500 h-1.5 rounded-full w-[12%]" />
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span>Memory</span>
                  <span className="text-blue-400">4.2GB / 16GB</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mb-4">
                  <div className="bg-blue-500 h-1.5 rounded-full w-[26%]" />
                </div>

                <div className="flex justify-between items-center mb-2">
                  <span>Network</span>
                  <span className="text-yellow-400">1.2 Gbps</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full">
                   <div className="bg-yellow-500 h-1.5 rounded-full w-[80%] animate-pulse" />
                </div>
              </div>
              
              <div className="mt-auto pt-4 flex items-center text-gray-500">
                <span>$</span>
                <span className="ml-2 w-2 h-4 bg-gray-500 animate-blink" />
              </div>
            </div>
          </motion.div>
          
          {/* Abstract blobs behind terminal */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--color-accent)] rounded-full blur-[80px] opacity-20 animate-blob" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500 rounded-full blur-[80px] opacity-20 animate-blob animation-delay-2000" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="p-3 rounded-full border border-[var(--color-border)] bg-white/30 backdrop-blur-md cursor-pointer hover:bg-white/50 transition-colors"
          onClick={() => scrollTo('about')}
        >
          <ArrowDown size={20} className="text-[var(--color-text-muted)]" />
        </motion.div>
      </motion.div>

    </section>
  );
}
