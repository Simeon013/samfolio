import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Type, UserCircle, Wrench, FolderKanban, Award,
  Briefcase, GraduationCap, Mail, Settings, LogOut, Save, Plus,
  Trash2, GripVertical, ChevronDown, ChevronRight, Upload, Eye,
  Palette, Globe, RefreshCw, Download, FileUp, Rocket, Menu, X
} from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const sections = [
  { id: 'hero', label: 'Hero / Accueil', icon: Type },
  { id: 'about', label: 'À Propos', icon: UserCircle },
  { id: 'skills', label: 'Compétences', icon: Wrench },
  { id: 'projects', label: 'Projets', icon: FolderKanban },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'experience', label: 'Expérience', icon: Briefcase },
  { id: 'education', label: 'Formation', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'settings', label: 'Paramètres', icon: Settings },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data, updateSection, updateSettings, resetData, exportData, exportAsSourceFile, publishToGitHub, importData } = usePortfolioData();
  const [activeSection, setActiveSection] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [saved, setSaved] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState(null); // 'success' | 'error' | 'config_missing' | null
  const accent = data.settings?.accentColor || '#0066FF';

  const handlePublish = async () => {
    setPublishing(true);
    setPublishStatus(null);
    const result = await publishToGitHub();
    setPublishing(false);
    if (result.success) {
      setPublishStatus('success');
      setTimeout(() => setPublishStatus(null), 4000);
    } else if (result.error === 'config_missing') {
      setPublishStatus('config_missing');
      setActiveSection('settings');
      setTimeout(() => setPublishStatus(null), 5000);
    } else {
      setPublishStatus('error');
      setTimeout(() => setPublishStatus(null), 5000);
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem('samfolio_admin')) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('samfolio_admin');
    navigate('/admin');
  };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (importData(ev.target.result)) showSaved();
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="h-screen bg-[var(--color-bg-primary)] flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Global Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-secondary)] via-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] opacity-80" />
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
          />
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
             <div className="absolute top-[10%] left-[5%] w-[30vw] h-[30vw] bg-[var(--color-accent)]/10 rounded-full blur-[120px] animate-blob" />
             <div className="absolute bottom-[10%] right-[5%] w-[25vw] h-[25vw] bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          </div>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-30
        ${sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0 md:w-20'}
        bg-white/30 backdrop-blur-xl border-r border-white/40
        flex flex-col transition-all duration-300 shrink-0 shadow-xl
      `}>
        <div className="p-5 border-b border-white/20 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-lg shadow-[var(--color-accent)]/20"
            style={{ backgroundColor: accent }}>S</div>
          <div className="min-w-0">
             <span className="block font-bold text-sm text-[var(--color-text-primary)] truncate">Admin Panel</span>
             <span className="block text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">v2.0 System</span>
          </div>
          {/* Close button on mobile */}
          <button onClick={() => setSidebarOpen(false)} className="ml-auto md:hidden p-1 rounded-lg hover:bg-white/40 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sections.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setActiveSection(id); if (window.innerWidth < 768) setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer group relative overflow-hidden ${
                activeSection === id
                  ? 'text-white shadow-md'
                  : 'text-[var(--color-text-secondary)] hover:bg-white/40 hover:text-[var(--color-text-primary)]'
              }`}
              style={activeSection === id ? { backgroundColor: accent } : {}}>
              
              {activeSection === id && (
                 <div className="absolute inset-0 bg-white/20 animate-pulse-slow pointer-events-none" />
              )}

              <Icon size={20} className={`shrink-0 transition-transform ${activeSection === id ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/20 space-y-1 bg-white/10">
          <a href="/" target="_blank"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--color-text-secondary)] hover:bg-white/40 transition-all">
            <Eye size={20} className="shrink-0" />
            <span>Voir le site</span>
          </a>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all cursor-pointer">
            <LogOut size={20} className="shrink-0" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10">
        <header className="sticky top-0 z-20 bg-white/30 backdrop-blur-xl border-b border-white/40 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl hover:bg-white/40 cursor-pointer text-[var(--color-text-secondary)] transition-colors shrink-0">
              <Menu size={20} />
            </button>
            <h1 className="text-base md:text-xl font-bold font-heading text-[var(--color-text-primary)] flex items-center gap-2 truncate">
               {sections.find(s => s.id === activeSection)?.icon && (
                  <span className="p-1 md:p-1.5 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] shrink-0">
                    {(() => {
                        const Icon = sections.find(s => s.id === activeSection)?.icon;
                        return <Icon size={16} />;
                    })()}
                  </span>
               )}
               <span className="truncate">{sections.find(s => s.id === activeSection)?.label}</span>
            </h1>
          </div>
          <div className="flex items-center gap-1 md:gap-3 shrink-0">
            {saved && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-600 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                 <Save size={12} /> Sauvegardé
              </span>
            )}
            <div className="hidden md:block h-6 w-px bg-white/40 mx-1" />
            <button onClick={exportData}
              className="hidden md:block p-2.5 rounded-xl hover:bg-white/40 text-[var(--color-text-secondary)] cursor-pointer hover:text-[var(--color-accent)] transition-all" title="Exporter JSON (backup)">
              <Download size={20} />
            </button>
            <button onClick={handleImport}
              className="hidden md:block p-2.5 rounded-xl hover:bg-white/40 text-[var(--color-text-secondary)] cursor-pointer hover:text-[var(--color-accent)] transition-all" title="Importer JSON">
              <FileUp size={20} />
            </button>
            <div className="hidden md:block h-6 w-px bg-white/40 mx-1" />
            <button onClick={handlePublish} disabled={publishing}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-xl text-white text-xs font-bold cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-wait ${
                publishStatus === 'success' ? 'bg-emerald-500' : publishStatus === 'error' || publishStatus === 'config_missing' ? 'bg-red-500' : ''
              }`}
              style={!publishStatus ? { backgroundColor: accent } : {}}
              title="Publier les modifications sur le site">
              {publishing ? (
                <><RefreshCw size={14} className="animate-spin" /> <span className="hidden sm:inline">Publication...</span></>
              ) : publishStatus === 'success' ? (
                <><Save size={14} /> <span className="hidden sm:inline">En ligne !</span></>
              ) : publishStatus === 'config_missing' ? (
                <><Settings size={14} /> <span className="hidden sm:inline">Configurer</span></>
              ) : publishStatus === 'error' ? (
                <><Settings size={14} /> <span className="hidden sm:inline">Erreur</span></>
              ) : (
                <><Rocket size={16} /> <span className="hidden sm:inline">Publier</span></>
              )}
            </button>
          </div>
        </header>

        <div className="p-4 md:p-10 max-w-5xl mx-auto pb-32">
          {activeSection === 'hero' && <HeroEditor data={data} updateSection={updateSection} accent={accent} onSave={showSaved} />}
          {activeSection === 'about' && <AboutEditor data={data} updateSection={updateSection} accent={accent} onSave={showSaved} />}
          {activeSection === 'skills' && <SkillsEditor data={data} updateSection={updateSection} accent={accent} onSave={showSaved} />}
          {activeSection === 'projects' && <ProjectsEditor data={data} updateSection={updateSection} accent={accent} onSave={showSaved} />}
          {activeSection === 'certifications' && <CertsEditor data={data} updateSection={updateSection} accent={accent} onSave={showSaved} />}
          {activeSection === 'experience' && <ExperienceEditor data={data} updateSection={updateSection} accent={accent} onSave={showSaved} />}
          {activeSection === 'education' && <EducationEditor data={data} updateSection={updateSection} accent={accent} onSave={showSaved} />}
          {activeSection === 'contact' && <ContactEditor data={data} updateSection={updateSection} accent={accent} onSave={showSaved} />}
          {activeSection === 'settings' && <SettingsEditor data={data} updateSettings={updateSettings} updateSection={updateSection} accent={accent} onSave={showSaved} resetData={resetData} />}
        </div>
      </main>
    </div>
  );
}

/* --- INPUT HELPERS --- */
function Field({ label, value, onChange, type = 'text', placeholder, textarea, rows = 3 }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="mb-5">
      <label className="block text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 ml-1">{label}</label>
      <Tag type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} rows={textarea ? rows : undefined}
        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 text-sm focus:outline-none focus:bg-white/80 focus:border-[var(--color-accent)]/50 focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all resize-none placeholder:text-[var(--color-text-muted)]/50"
        placeholder={placeholder} />
    </div>
  );
}

function Card({ children, title, className = '' }) {
  return (
    <div className={`bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] p-6 mb-6 relative overflow-hidden ${className}`}>
      {/* Decorative gradient match */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-30 pointer-events-none" />
      <div className="relative z-10">
         {title && (
           <h3 className="text-lg font-bold font-heading text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
             <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" /> 
             {title}
           </h3>
         )}
         {children}
      </div>
    </div>
  );
}

function SaveBtn({ onClick, accent }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold cursor-pointer transition-all hover:shadow-lg hover:shadow-[var(--color-accent)]/20 hover:-translate-y-0.5 active:translate-y-0"
      style={{ backgroundColor: accent }}>
      <Save size={18} /> Sauvegarder
    </button>
  );
}

/* --- HERO EDITOR --- */
function HeroEditor({ data, updateSection, accent, onSave }) {
  const [local, setLocal] = useState(data.hero);
  const save = () => { updateSection('hero', local); onSave(); };
  return (
    <>
      <Card title="Informations principales">
        <Field label="Nom complet" value={local.name} onChange={(v) => setLocal({ ...local, name: v })} />
        <Field label="Titre" value={local.title} onChange={(v) => setLocal({ ...local, title: v })} />
        <Field label="Sous-titre" value={local.subtitle} onChange={(v) => setLocal({ ...local, subtitle: v })} />
        <Field label="Localisation" value={local.location} onChange={(v) => setLocal({ ...local, location: v })} />
      </Card>
      <Card title="Boutons d'action">
        <Field label="CTA primaire" value={local.cta1} onChange={(v) => setLocal({ ...local, cta1: v })} />
        <Field label="CTA secondaire" value={local.cta2} onChange={(v) => setLocal({ ...local, cta2: v })} />
      </Card>
      <SaveBtn onClick={save} accent={accent} />
    </>
  );
}

/* --- ABOUT EDITOR --- */
function AboutEditor({ data, updateSection, accent, onSave }) {
  const [local, setLocal] = useState(data.about);

  const updateStat = (i, key, val) => {
    const stats = [...local.stats];
    stats[i] = { ...stats[i], [key]: key === 'value' ? Number(val) || 0 : val };
    setLocal({ ...local, stats });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLocal({ ...local, photo: ev.target.result });
    reader.readAsDataURL(file);
  };

  const save = () => { updateSection('about', local); onSave(); };
  return (
    <>
      <Card title="Photo de profil">
        <div className="flex items-center gap-4">
          {local.photo && <img src={local.photo} alt="" className="w-20 h-20 rounded-xl object-cover" />}
          <label className="px-4 py-2 rounded-xl bg-[var(--color-bg-secondary)] text-sm font-medium cursor-pointer hover:bg-[var(--color-border)] transition-colors">
            <Upload size={16} className="inline mr-2" />Changer la photo
            <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
          </label>
        </div>
      </Card>
      <Card title="Biographie">
        <Field label="Texte de présentation" value={local.bio} onChange={(v) => setLocal({ ...local, bio: v })} textarea rows={5} />
      </Card>
      <Card title="Chiffres clés">
        {local.stats.map((s, i) => (
          <div key={i} className="flex gap-3 mb-3">
            <div className="w-20">
              <Field label="Valeur" value={s.value} onChange={(v) => updateStat(i, 'value', v)} type="number" />
            </div>
            <div className="w-16">
              <Field label="Suffixe" value={s.suffix} onChange={(v) => updateStat(i, 'suffix', v)} />
            </div>
            <div className="flex-1">
              <Field label="Label" value={s.label} onChange={(v) => updateStat(i, 'label', v)} />
            </div>
          </div>
        ))}
      </Card>
      <Card title="Soft Skills">
        <div className="flex flex-wrap gap-2 mb-4">
          {local.softSkills.map((s, i) => (
            <span key={i} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/40 border border-white/40 text-sm font-medium group">
              {s}
              <button onClick={() => setLocal({ ...local, softSkills: local.softSkills.filter((_, j) => j !== i) })}
                className="ml-1 text-[var(--color-text-muted)] group-hover:text-red-500 cursor-pointer transition-colors"><Trash2 size={12} /></button>
            </span>
          ))}
        </div>
        <button onClick={() => {
          const skill = prompt('Nouveau soft skill:');
          if (skill) setLocal({ ...local, softSkills: [...local.softSkills, skill] });
        }} className="text-sm font-medium cursor-pointer flex items-center gap-1" style={{ color: accent }}>
          <Plus size={14} /> Ajouter
        </button>
      </Card>
      <SaveBtn onClick={save} accent={accent} />
    </>
  );
}

/* --- SKILLS EDITOR --- */
function SkillsEditor({ data, updateSection, accent, onSave }) {
  const [local, setLocal] = useState(data.skills);
  const [openCat, setOpenCat] = useState(0);

  const updateItem = (ci, ii, key, val) => {
    const cats = [...local];
    const items = [...cats[ci].items];
    items[ii] = { ...items[ii], [key]: key === 'level' ? Number(val) || 0 : val };
    cats[ci] = { ...cats[ci], items };
    setLocal(cats);
  };

  const addItem = (ci) => {
    const cats = [...local];
    cats[ci] = { ...cats[ci], items: [...cats[ci].items, { name: 'Nouvelle compétence', level: 50 }] };
    setLocal(cats);
  };

  const removeItem = (ci, ii) => {
    const cats = [...local];
    cats[ci] = { ...cats[ci], items: cats[ci].items.filter((_, j) => j !== ii) };
    setLocal(cats);
  };

  const addCategory = () => {
    const name = prompt('Nom de la catégorie:');
    if (name) setLocal([...local, { category: name, icon: 'Code', items: [] }]);
  };

  const save = () => { updateSection('skills', local); onSave(); };

  return (
    <>
      {local.map((cat, ci) => (
        <Card key={ci}>
          <button onClick={() => setOpenCat(openCat === ci ? -1 : ci)}
            className="w-full flex items-center justify-between mb-2 cursor-pointer">
            <h3 className="text-sm font-bold">{cat.category}</h3>
            {openCat === ci ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openCat === ci && (
            <>
              <Field label="Nom de la catégorie" value={cat.category}
                onChange={(v) => { const c = [...local]; c[ci] = { ...c[ci], category: v }; setLocal(c); }} />
              {cat.items.map((item, ii) => (
                <div key={ii} className="flex gap-3 items-end mb-2">
                  <div className="flex-1">
                    <Field label="Compétence" value={item.name} onChange={(v) => updateItem(ci, ii, 'name', v)} />
                  </div>
                  <div className="w-20">
                    <Field label="Niveau" value={item.level} onChange={(v) => updateItem(ci, ii, 'level', v)} type="number" />
                  </div>
                  <button onClick={() => removeItem(ci, ii)} className="p-2 text-red-400 hover:text-red-600 cursor-pointer mb-4">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button onClick={() => addItem(ci)} className="text-sm font-medium cursor-pointer flex items-center gap-1" style={{ color: accent }}>
                <Plus size={14} /> Ajouter une compétence
              </button>
            </>
          )}
        </Card>
      ))}
      <div className="flex items-center gap-3">
        <button onClick={addCategory} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-[var(--color-border-dark)] text-sm font-medium cursor-pointer"
          style={{ color: accent }}>
          <Plus size={14} /> Nouvelle catégorie
        </button>
        <SaveBtn onClick={save} accent={accent} />
      </div>
    </>
  );
}

/* --- PROJECTS EDITOR --- */
function ProjectsEditor({ data, updateSection, accent, onSave }) {
  const [local, setLocal] = useState(data.projects);
  const [editing, setEditing] = useState(null);

  const update = (i, key, val) => {
    const p = [...local];
    p[i] = { ...p[i], [key]: val };
    setLocal(p);
  };

  const addProject = () => {
    setLocal([...local, {
      id: `project-${Date.now()}`, title: 'Nouveau Projet', client: '', period: '',
      role: '', description: '', technologies: [], tags: [], featured: false,
    }]);
    setEditing(local.length);
  };

  const remove = (i) => { setLocal(local.filter((_, j) => j !== i)); };

  const save = () => { updateSection('projects', local); onSave(); };

  return (
    <>
      {local.map((p, i) => (
        <Card key={p.id || i}>
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => setEditing(editing === i ? null : i)} className="flex items-center gap-2 cursor-pointer">
              {editing === i ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span className="font-bold text-sm">{p.title}</span>
              {p.featured && <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: accent }}>★ Phare</span>}
            </button>
            <button onClick={() => remove(i)} className="p-1.5 text-red-400 hover:text-red-600 cursor-pointer"><Trash2 size={16} /></button>
          </div>
          {editing === i && (
            <>
              <Field label="Titre" value={p.title} onChange={(v) => update(i, 'title', v)} />
              <Field label="Client" value={p.client} onChange={(v) => update(i, 'client', v)} />
              <Field label="Période" value={p.period} onChange={(v) => update(i, 'period', v)} />
              <Field label="Rôle" value={p.role} onChange={(v) => update(i, 'role', v)} />
              <Field label="Description" value={p.description} onChange={(v) => update(i, 'description', v)} textarea rows={4} />
              <Field label="Technologies (séparées par des virgules)" value={p.technologies.join(', ')}
                onChange={(v) => update(i, 'technologies', v.split(',').map(s => s.trim()).filter(Boolean))} />
              <Field label="Tags (séparés par des virgules)" value={p.tags.join(', ')}
                onChange={(v) => update(i, 'tags', v.split(',').map(s => s.trim()).filter(Boolean))} />
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={p.featured} onChange={(e) => update(i, 'featured', e.target.checked)} />
                Projet phare
              </label>
            </>
          )}
        </Card>
      ))}
      <div className="flex items-center gap-3">
        <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-[var(--color-border-dark)] text-sm font-medium cursor-pointer"
          style={{ color: accent }}>
          <Plus size={14} /> Ajouter un projet
        </button>
        <SaveBtn onClick={save} accent={accent} />
      </div>
    </>
  );
}

/* --- CERTIFICATIONS EDITOR --- */
function CertsEditor({ data, updateSection, accent, onSave }) {
  const [local, setLocal] = useState(data.certifications);
  const [editing, setEditing] = useState(null);

  const update = (i, key, val) => {
    const c = [...local];
    c[i] = { ...c[i], [key]: val };
    setLocal(c);
  };

  const add = () => {
    setLocal([...local, { name: 'Nouvelle Certification', org: '', date: '', category: 'Réseau', status: 'obtained', link: '' }]);
    setEditing(local.length);
  };

  const remove = (i) => { setLocal(local.filter((_, j) => j !== i)); };
  const save = () => { updateSection('certifications', local); onSave(); };

  return (
    <>
      {local.map((c, i) => (
        <Card key={i}>
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => setEditing(editing === i ? null : i)} className="flex items-center gap-2 cursor-pointer">
              {editing === i ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span className="font-bold text-sm">{c.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === 'obtained' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {c.status === 'obtained' ? 'Obtenue' : 'En cours'}
              </span>
            </button>
            <button onClick={() => remove(i)} className="p-1.5 text-red-400 hover:text-red-600 cursor-pointer"><Trash2 size={16} /></button>
          </div>
          {editing === i && (
            <>
              <Field label="Nom" value={c.name} onChange={(v) => update(i, 'name', v)} />
              <Field label="Organisation" value={c.org} onChange={(v) => update(i, 'org', v)} />
              <Field label="Date" value={c.date} onChange={(v) => update(i, 'date', v)} />
              <Field label="Catégorie" value={c.category} onChange={(v) => update(i, 'category', v)} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Statut</label>
                <select value={c.status} onChange={(e) => update(i, 'status', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-sm">
                  <option value="obtained">Obtenue</option>
                  <option value="in-progress">En cours</option>
                </select>
              </div>
              <Field label="Lien de vérification" value={c.link} onChange={(v) => update(i, 'link', v)} placeholder="https://..." />
            </>
          )}
        </Card>
      ))}
      <div className="flex items-center gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-[var(--color-border-dark)] text-sm font-medium cursor-pointer"
          style={{ color: accent }}><Plus size={14} /> Ajouter</button>
        <SaveBtn onClick={save} accent={accent} />
      </div>
    </>
  );
}

/* --- EXPERIENCE EDITOR --- */
function ExperienceEditor({ data, updateSection, accent, onSave }) {
  const [local, setLocal] = useState(data.experience);
  const [editing, setEditing] = useState(null);

  const update = (i, key, val) => {
    const e = [...local];
    e[i] = { ...e[i], [key]: val };
    setLocal(e);
  };

  const add = () => {
    setLocal([...local, { company: 'Nouvelle Entreprise', role: '', period: '', description: '', missions: [] }]);
    setEditing(local.length);
  };

  const remove = (i) => { setLocal(local.filter((_, j) => j !== i)); };
  const save = () => { updateSection('experience', local); onSave(); };

  return (
    <>
      {local.map((exp, i) => (
        <Card key={i}>
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => setEditing(editing === i ? null : i)} className="flex items-center gap-2 cursor-pointer">
              {editing === i ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span className="font-bold text-sm">{exp.company}</span>
            </button>
            <button onClick={() => remove(i)} className="p-1.5 text-red-400 hover:text-red-600 cursor-pointer"><Trash2 size={16} /></button>
          </div>
          {editing === i && (
            <>
              <Field label="Entreprise" value={exp.company} onChange={(v) => update(i, 'company', v)} />
              <Field label="Poste" value={exp.role} onChange={(v) => update(i, 'role', v)} />
              <Field label="Période" value={exp.period} onChange={(v) => update(i, 'period', v)} />
              <Field label="Description" value={exp.description} onChange={(v) => update(i, 'description', v)} textarea />
              <Field label="Missions (une par ligne)" value={exp.missions.join('\n')}
                onChange={(v) => update(i, 'missions', v.split('\n').filter(Boolean))} textarea rows={5} />
            </>
          )}
        </Card>
      ))}
      <div className="flex items-center gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-[var(--color-border-dark)] text-sm font-medium cursor-pointer"
          style={{ color: accent }}><Plus size={14} /> Ajouter</button>
        <SaveBtn onClick={save} accent={accent} />
      </div>
    </>
  );
}

/* --- EDUCATION EDITOR --- */
function EducationEditor({ data, updateSection, accent, onSave }) {
  const [local, setLocal] = useState(data.education);
  const [editing, setEditing] = useState(null);

  const update = (i, key, val) => {
    const e = [...local];
    e[i] = { ...e[i], [key]: val };
    setLocal(e);
  };

  const add = () => {
    setLocal([...local, { degree: 'Nouveau Diplôme', school: '', period: '', location: '' }]);
    setEditing(local.length);
  };

  const remove = (i) => { setLocal(local.filter((_, j) => j !== i)); };
  const save = () => { updateSection('education', local); onSave(); };

  return (
    <>
      {local.map((edu, i) => (
        <Card key={i}>
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => setEditing(editing === i ? null : i)} className="flex items-center gap-2 cursor-pointer">
              {editing === i ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span className="font-bold text-sm">{edu.degree}</span>
            </button>
            <button onClick={() => remove(i)} className="p-1.5 text-red-400 hover:text-red-600 cursor-pointer"><Trash2 size={16} /></button>
          </div>
          {editing === i && (
            <>
              <Field label="Diplôme" value={edu.degree} onChange={(v) => update(i, 'degree', v)} />
              <Field label="École" value={edu.school} onChange={(v) => update(i, 'school', v)} />
              <Field label="Période" value={edu.period} onChange={(v) => update(i, 'period', v)} />
              <Field label="Localisation" value={edu.location} onChange={(v) => update(i, 'location', v)} />
            </>
          )}
        </Card>
      ))}
      <div className="flex items-center gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-[var(--color-border-dark)] text-sm font-medium cursor-pointer"
          style={{ color: accent }}><Plus size={14} /> Ajouter</button>
        <SaveBtn onClick={save} accent={accent} />
      </div>
    </>
  );
}

/* --- CONTACT EDITOR --- */
function ContactEditor({ data, updateSection, accent, onSave }) {
  const [local, setLocal] = useState(data.contact);

  const updateSocial = (i, key, val) => {
    const soc = [...local.socials];
    soc[i] = { ...soc[i], [key]: val };
    setLocal({ ...local, socials: soc });
  };

  const addSocial = () => {
    setLocal({ ...local, socials: [...local.socials, { platform: 'Nouveau', url: '', icon: 'ExternalLink' }] });
  };

  const removeSocial = (i) => {
    setLocal({ ...local, socials: local.socials.filter((_, j) => j !== i) });
  };

  const handleCV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLocal({ ...local, cvFile: url });
  };

  const save = () => { updateSection('contact', local); onSave(); };

  return (
    <>
      <Card title="Informations de contact">
        <Field label="Email" value={local.email} onChange={(v) => setLocal({ ...local, email: v })} />
        <Field label="Téléphone" value={local.phone} onChange={(v) => setLocal({ ...local, phone: v })} />
      </Card>
      <Card title="Réseaux sociaux">
        {local.socials.map((s, i) => (
          <div key={i} className="flex gap-3 items-end mb-3">
            <div className="w-32">
              <Field label="Plateforme" value={s.platform} onChange={(v) => updateSocial(i, 'platform', v)} />
            </div>
            <div className="flex-1">
              <Field label="URL" value={s.url} onChange={(v) => updateSocial(i, 'url', v)} />
            </div>
            <div className="w-28">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Icône</label>
                <select value={s.icon} onChange={(e) => updateSocial(i, 'icon', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-sm">
                  <option value="Linkedin">LinkedIn</option>
                  <option value="Github">GitHub</option>
                  <option value="ExternalLink">Autre</option>
                </select>
              </div>
            </div>
            <button onClick={() => removeSocial(i)} className="p-2 text-red-400 hover:text-red-600 cursor-pointer mb-4">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button onClick={addSocial} className="text-sm font-medium cursor-pointer flex items-center gap-1" style={{ color: accent }}>
          <Plus size={14} /> Ajouter un réseau
        </button>
      </Card>
      <Card title="CV">
        <label className="px-4 py-2 rounded-xl bg-[var(--color-bg-secondary)] text-sm font-medium cursor-pointer hover:bg-[var(--color-border)] transition-colors inline-flex items-center gap-2">
          <Upload size={16} />Changer le CV (PDF)
          <input type="file" accept=".pdf" onChange={handleCV} className="hidden" />
        </label>
      </Card>
      <SaveBtn onClick={save} accent={accent} />
    </>
  );
}

/* --- SETTINGS EDITOR --- */
function SettingsEditor({ data, updateSettings, updateSection, accent, onSave, resetData }) {
  const [color, setColor] = useState(accent);
  const [pw, setPw] = useState('');
  const [seoLocal, setSeoLocal] = useState(data.seo);
  const [animEnabled, setAnimEnabled] = useState(data.settings?.animationsEnabled !== false);
  const [ghToken, setGhToken] = useState(localStorage.getItem('samfolio_gh_token') || '');
  const [ghRepo, setGhRepo] = useState(localStorage.getItem('samfolio_gh_repo') || '');
  const [ghSaved, setGhSaved] = useState(false);

  const saveGitHub = () => {
    localStorage.setItem('samfolio_gh_token', ghToken);
    localStorage.setItem('samfolio_gh_repo', ghRepo);
    setGhSaved(true);
    setTimeout(() => setGhSaved(false), 2000);
  };

  const saveColor = () => { updateSettings('accentColor', color); onSave(); };
  const savePassword = () => {
    if (pw.length >= 4) { updateSettings('adminPassword', pw); setPw(''); onSave(); }
  };
  const saveSeo = () => { updateSection('seo', seoLocal); onSave(); };
  const saveAnim = (val) => { setAnimEnabled(val); updateSettings('animationsEnabled', val); onSave(); };

  return (
    <>
      <Card title="🚀 Publication GitHub (Auto-deploy)">
        <p className="text-xs text-[var(--color-text-muted)] mb-4 leading-relaxed">
          Connectez votre repo GitHub pour publier directement depuis l'admin. Chaque publication met à jour le site automatiquement via Vercel.
        </p>
        <Field label="Repository (ex: Simeon013/samfolio)" value={ghRepo} onChange={setGhRepo} placeholder="owner/repo" />
        <Field label="Token GitHub (Personal Access Token)" value={ghToken} onChange={setGhToken} type="password" placeholder="ghp_xxxxxxxxxxxx" />
        <p className="text-[10px] text-[var(--color-text-muted)] mb-3 leading-relaxed">
          Créez un token sur <a href="https://github.com/settings/tokens?type=beta" target="_blank" rel="noreferrer" className="underline" style={{ color: accent }}>github.com/settings/tokens</a> → Fine-grained → Sélectionnez votre repo → Permissions : Contents (Read and Write).
        </p>
        <button onClick={saveGitHub}
          className="px-4 py-2 rounded-xl text-white text-sm font-medium cursor-pointer flex items-center gap-2"
          style={{ backgroundColor: accent }}>
          <Save size={14} /> {ghSaved ? '✓ Sauvegardé !' : 'Sauvegarder la config'}
        </button>
      </Card>

      <Card title="Couleur d'accent">
        <div className="flex items-center gap-4">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
            className="w-12 h-12 rounded-xl border border-[var(--color-border)] cursor-pointer" />
          <Field label="Hex" value={color} onChange={setColor} />
          <button onClick={saveColor} className="px-4 py-2 rounded-xl text-white text-sm font-medium cursor-pointer"
            style={{ backgroundColor: color }}>Appliquer</button>
        </div>
      </Card>

      <Card title="Mot de passe admin">
        <Field label="Nouveau mot de passe" value={pw} onChange={setPw} type="password" placeholder="Minimum 4 caractères" />
        <button onClick={savePassword} disabled={pw.length < 4}
          className="px-4 py-2 rounded-xl text-white text-sm font-medium cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: accent }}>Changer le mot de passe</button>
      </Card>

      <Card title="Animations">
        <label className="flex items-center gap-3 cursor-pointer">
          <div className={`relative w-11 h-6 rounded-full transition-colors ${animEnabled ? '' : 'bg-gray-300'}`}
            style={animEnabled ? { backgroundColor: accent } : {}}
            onClick={() => saveAnim(!animEnabled)}>
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${animEnabled ? 'left-[22px]' : 'left-0.5'}`} />
          </div>
          <span className="text-sm font-medium">Activer les animations</span>
        </label>
      </Card>

      <Card title="SEO & Métadonnées">
        <Field label="Titre de la page" value={seoLocal.title} onChange={(v) => setSeoLocal({ ...seoLocal, title: v })} />
        <Field label="Description" value={seoLocal.description} onChange={(v) => setSeoLocal({ ...seoLocal, description: v })} textarea />
        <Field label="Mots-clés" value={seoLocal.keywords} onChange={(v) => setSeoLocal({ ...seoLocal, keywords: v })} />
        <button onClick={saveSeo} className="px-4 py-2 rounded-xl text-white text-sm font-medium cursor-pointer"
          style={{ backgroundColor: accent }}>Sauvegarder SEO</button>
      </Card>

      <Card title="Données">
        <div className="flex items-center gap-3">
          <button onClick={resetData}
            className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-medium cursor-pointer hover:bg-red-100 transition-colors flex items-center gap-2">
            <RefreshCw size={14} /> Réinitialiser toutes les données
          </button>
        </div>
      </Card>
    </>
  );
}
