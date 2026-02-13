import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, Link as LinkIcon, Github, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import PageLayout from '../components/PageLayout';
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
    <PageLayout
      title="Démarrons un Projet"
      subtitle="Une idée ? Un projet ? Ou simplement envie de discuter tech ? N'hésitez pas à me contacter."
    >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Info Card - Glass Style */}
          <FadeInUp delay={0.2} className="h-full">
            <div className="bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-xl border border-white/50 text-[var(--color-text-primary)] p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden h-full flex flex-col justify-between shadow-2xl min-h-[500px] ring-1 ring-white/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold font-heading mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-secondary)]">Coordonnées</h3>
                <div className="space-y-8">
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/60 flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors duration-300 shadow-sm group-hover:shadow-[var(--color-accent)]/30 group-hover:text-white">
                      <Mail size={24} className="text-[var(--color-accent)] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <span className="block text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider mb-1">Email</span>
                      <span className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{contact.email}</span>
                    </div>
                  </a>

                  <a href={`tel:${contact.phone}`} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/60 flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors duration-300 shadow-sm group-hover:shadow-[var(--color-accent)]/30 group-hover:text-white">
                      <Phone size={24} className="text-[var(--color-accent)] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <span className="block text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider mb-1">Téléphone</span>
                      <span className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{contact.phone}</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/60 flex items-center justify-center shadow-sm">
                      <MapPin size={24} className="text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <span className="block text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider mb-1">Localisation</span>
                      <span className="text-lg font-semibold text-[var(--color-text-primary)]">{data.hero.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-[var(--color-border)]/50 relative z-10">
                <span className="block text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider mb-6">Réseaux Sociaux</span>
                <div className="flex gap-4">
                  {contact.socials.map((social) => {
                     const Icon = socialIcons[social.platform] || LinkIcon;
                     return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/60 border border-white/50 flex items-center justify-center hover:bg-[var(--color-accent)] hover:border-transparent hover:text-white text-[var(--color-text-primary)] transition-all duration-300 hover:-translate-y-1 shadow-sm"
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
          <FadeInUp delay={0.4} className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/50 shadow-xl relative ring-1 ring-white/20">
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
                     className="w-full px-6 py-4 rounded-2xl bg-[var(--color-bg-secondary)]/50 border-transparent focus:bg-white focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium"
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
                     className="w-full px-6 py-4 rounded-2xl bg-[var(--color-bg-secondary)]/50 border-transparent focus:bg-white focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium"
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
                    className="w-full px-6 py-4 rounded-2xl bg-[var(--color-bg-secondary)]/50 border-transparent focus:bg-white focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium"
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
                    className="w-full px-6 py-4 rounded-2xl bg-[var(--color-bg-secondary)]/50 border-transparent focus:bg-white focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all outline-none font-medium resize-none"
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
    </PageLayout>
  );
}
