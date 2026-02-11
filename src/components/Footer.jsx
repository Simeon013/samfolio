import { Heart } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Footer() {
  const { data } = usePortfolioData();
  const accent = data.settings?.accentColor || '#0066FF';
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm text-[var(--color-text-muted)]">
          © {year} {data.hero.name}. Tous droits réservés.
        </p>
        <p className="text-xs text-[var(--color-text-muted)] mt-1 flex items-center justify-center gap-1">
          Conçu avec <Heart size={12} style={{ color: accent }} fill={accent} /> en France
        </p>
      </div>
    </footer>
  );
}
