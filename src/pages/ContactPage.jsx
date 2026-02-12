import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, Link as LinkIcon, Github, Linkedin, Twitter, Facebook, Instagram, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FadeInUp } from '../components/AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

const socialIcons = {
  Github, Linkedin, Twitter, Facebook, Instagram
};

export default function ContactPage() {
  const { data } = usePortfolioData();
  const contact = data.contact;
  const accent = data.settings?.accentColor || '#0066FF';

  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`Nom: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`)}`;
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="w-full max-w-full overflow-x-clip bg-[var(--color-bg-primary)] min-h-screen pt-20">
      <Navbar />
      <main className="w-full overflow-x-clip section-padding">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] -z-10" />
        
        <div className="max-w-6xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-16 relative">
               <Link to="/" className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] transition-colors hidden lg:block">
                 <ArrowLeft size={20} className="text-[var(--color-text-muted)]" />
              </Link>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                 style={{ backgroundColor: `${accent}15`, color: accent }}>
                Me Contacter
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight text-[var(--color-text-primary)]">Démarrons un Projet</h1>
              <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">
                Une idée ? Un projet ? Ou simplement envie de discuter tech ? N'hésitez pas à me contacter.
              </p>
            </div>
          </FadeInUp>
  
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Info Card */}
            <FadeInUp delay={0.2} className="h-full">
              <div className="bg-[var(--color-bg-tertiary)] text-white p-10 rounded-[2.5rem] relative overflow-hidden h-full flex flex-col justify-between shadow-2xl min-h-[500px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--color-accent)] to-transparent rounded-full blur-[80px] opacity-20 pointer-events-none" />
                
                <div>
                  <h3 className="text-3xl font-bold font-heading mb-8">Coordonnées</h3>
                  <div className="space-y-8">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                        <Mail size={24} className="text-white" />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">Email</span>
                        <span className="text-lg font-semibold">{contact.email}</span>
                      </div>
                    </a>
  
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                        <Phone size={24} className="text-white" />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">Téléphone</span>
                        <span className="text-lg font-semibold">{contact.phone}</span>
                      </div>
                    </a>
  
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                        <MapPin size={24} className="text-white" />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">Localisation</span>
                        <span className="text-lg font-semibold">{data.hero.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="mt-12 pt-12 border-t border-white/10">
                  <span className="block text-sm text-gray-400 font-medium uppercase tracking-wider mb-6">Réseaux Sociaux</span>
                  <div className="flex gap-4">
                    {contact.socials.map((social) => {
                       const Icon = socialIcons[social.platform] || LinkIcon;
                       return (
                        <a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[var(--color-accent)] hover:border-transparent transition-all duration-300 hover:-translate-y-1"
                        >
                          <Icon size={20} />
                        </a>
                       );
                    })}
                  </div>
                </div>
              </div>
            </FadeInUp>
  
            {/* Contact Form */}
            <FadeInUp delay={0.4} className="bg-white p-10 rounded-[2.5rem] border border-[var(--color-border)] shadow-xl relative">
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label htmlFor="name" className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider ml-1">Nom</label>
                     <input
                       type="text"
                       id="name"
                       name="name"
                       value={formState.name}
                       onChange={handleChange}
                       required
                       className="w-full px-6 py-4 rounded-2xl bg-[var(--color-bg-secondary)] border-transparent focus:bg-white focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium"
                       placeholder="Votre nom"
                     />
                   </div>
                   <div className="space-y-2">
                     <label htmlFor="email" className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider ml-1">Email</label>
                     <input
                       type="email"
                       id="email"
                       name="email"
                       value={formState.email}
                       onChange={handleChange}
                       required
                       className="w-full px-6 py-4 rounded-2xl bg-[var(--color-bg-secondary)] border-transparent focus:bg-white focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium"
                       placeholder="votre@email.com"
                     />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider ml-1">Sujet</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-[var(--color-bg-secondary)] border-transparent focus:bg-white focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium"
                      placeholder="Sujet de votre message"
                    />
                 </div>
  
                 <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider ml-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-6 py-4 rounded-2xl bg-[var(--color-bg-secondary)] border-transparent focus:bg-white focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium resize-none"
                      placeholder="Décrivez votre projet..."
                    />
                 </div>
  
                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className="w-full py-4 rounded-2xl font-bold text-white shadow-lg shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/50 transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                   style={{ backgroundColor: accent }}
                 >
                   {isSubmitting ? (
                     <>
                       <Loader2 size={20} className="animate-spin" /> Envoi en cours...
                     </>
                   ) : isSuccess ? (
                     <>Message envoyé !</>
                   ) : (
                     <>
                       Envoyer le message <Send size={20} />
                     </>
                   )}
                 </button>
               </form>
            </FadeInUp>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
