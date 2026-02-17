import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, Link as LinkIcon, Github, Linkedin, Twitter, Facebook, Instagram, MessageSquare } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { FadeInUp } from '../components/AnimationWrappers';
import { usePortfolioData } from '../hooks/usePortfolioData';

const socialIcons = {
  Github, Linkedin, LinkedIn: Linkedin, Twitter, Facebook, Instagram
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
    <PageLayout
      title="Démarrons un Projet"
      subtitle="Une idée ? Un projet ? Ou simplement envie de discuter tech ? N'hésitez pas à me contacter."
    >
        <div className="max-w-6xl mx-auto pb-20">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            
            {/* Left: Info Card (Compact Glass) */}
            <FadeInUp delay={0.2} className="w-full lg:col-span-2 lg:h-full">
              <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl md:rounded-[2rem] overflow-hidden shadow-lg p-4 lg:p-6 relative flex flex-col justify-between group h-full">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="relative z-10 space-y-6 lg:space-y-8">
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold font-heading mb-4 lg:mb-6 flex items-center gap-2 text-[var(--color-text-primary)]">
                       <span className="p-2 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                          <MessageSquare size={18} />
                       </span>
                       Coordonnées
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-5">
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-3 lg:gap-4 group/item p-3 rounded-xl hover:bg-white/40 transition-all border border-transparent hover:border-white/40 bg-white/10 lg:bg-transparent">
                        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/60 flex items-center justify-center group-hover/item:bg-[var(--color-accent)] transition-colors shadow-sm shrink-0">
                          <Mail size={16} className="text-[var(--color-accent)] group-hover/item:text-white transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Email</span>
                          <span className="text-sm font-medium text-[var(--color-text-primary)] truncate block">{contact.email}</span>
                        </div>
                      </a>

                      <a href={`tel:${contact.phone}`} className="flex items-center gap-3 lg:gap-4 group/item p-3 rounded-xl hover:bg-white/40 transition-all border border-transparent hover:border-white/40 bg-white/10 lg:bg-transparent">
                        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/60 flex items-center justify-center group-hover/item:bg-[var(--color-accent)] transition-colors shadow-sm shrink-0">
                          <Phone size={16} className="text-[var(--color-accent)] group-hover/item:text-white transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Téléphone</span>
                          <span className="text-sm font-medium text-[var(--color-text-primary)] truncate block">{contact.phone}</span>
                        </div>
                      </a>

                      <div className="flex items-center gap-3 lg:gap-4 p-3 rounded-xl hover:bg-white/40 transition-all border border-transparent hover:border-white/40 bg-white/10 lg:bg-transparent sm:col-span-2 lg:col-span-1">
                        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/60 flex items-center justify-center shadow-sm shrink-0">
                          <MapPin size={16} className="text-[var(--color-accent)]" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Localisation</span>
                          <span className="text-sm font-medium text-[var(--color-text-primary)] truncate block">{data.hero.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Socials */}
                  <div>
                    <span className="block text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-3 px-1 lg:px-3">Réseaux Sociaux</span>
                    <div className="flex gap-2 px-1 lg:px-3">
                      {contact.socials.map((social) => {
                        const Icon = socialIcons[social.platform] || LinkIcon;
                        return (
                          <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 lg:w-9 lg:h-9 rounded-full bg-white/60 border border-white/50 flex items-center justify-center hover:bg-[var(--color-accent)] hover:border-transparent hover:text-white text-[var(--color-text-primary)] transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                          >
                            <Icon size={18} />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Right: Contact Form (Refined Glass) */}
            <FadeInUp delay={0.4} className="w-full lg:col-span-3">
               <div className="bg-white/30 backdrop-blur-xl p-4 md:p-8 rounded-3xl md:rounded-[2rem] border border-white/40 shadow-xl relative">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider ml-1">Nom</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/30 focus:bg-white/60 focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium text-sm placeholder:text-[var(--color-text-muted)]/50"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider ml-1">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/30 focus:bg-white/60 focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium text-sm placeholder:text-[var(--color-text-muted)]/50"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                       <label htmlFor="subject" className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider ml-1">Sujet</label>
                       <input
                         type="text"
                         id="subject"
                         name="subject"
                         value={formState.subject}
                         onChange={handleChange}
                         required
                         className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/30 focus:bg-white/60 focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium text-sm placeholder:text-[var(--color-text-muted)]/50"
                         placeholder="Sujet de votre message"
                       />
                    </div>

                    <div className="space-y-1.5">
                       <label htmlFor="message" className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider ml-1">Message</label>
                       <textarea
                         id="message"
                         name="message"
                         value={formState.message}
                         onChange={handleChange}
                         required
                         rows={5}
                         className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/30 focus:bg-white/60 focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium text-sm resize-none placeholder:text-[var(--color-text-muted)]/50"
                         placeholder="Décrivez votre projet..."
                       />
                    </div>

                    <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg shadow-[var(--color-accent)]/20 hover:shadow-[var(--color-accent)]/40 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group/btn"
                          style={{ backgroundColor: accent }}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={16} className="animate-spin" /> Envoi en cours...
                            </>
                          ) : isSuccess ? (
                            <>Message envoyé !</>
                          ) : (
                            <>
                              Envoyer le message <Send size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                    </div>
                  </form>
               </div>
            </FadeInUp>
          </div>
        </div>
    </PageLayout>
  );
}
