import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { data } = usePortfolioData();
  const accent = data.settings?.accentColor || '#0066FF';

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPw = data.settings?.adminPassword || 'password';
    if (password === adminPw) {
      sessionStorage.setItem('samfolio_admin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Mot de passe incorrect');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl mb-4" style={{ backgroundColor: `${accent}15` }}>
            <Lock size={28} style={{ color: accent }} />
          </div>
          <h1 className="text-2xl font-bold">Administration</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Connectez-vous pour accéder au panneau d'admin</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Mot de passe</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-sm focus:outline-none transition-colors pr-10"
                placeholder="Entrez le mot de passe"
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] cursor-pointer">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg cursor-pointer"
            style={{ backgroundColor: accent }}>
            Se connecter
          </button>

          <div className="mt-4 text-center">
            <a href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
              ← Retour au portfolio
            </a>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
