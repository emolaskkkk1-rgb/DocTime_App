import { useState } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { useRouter, type Route } from '@/router/Router';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t } = useI18n();
  const { route, navigate } = useRouter();
  const [open, setOpen] = useState(false);

  const go = (r: Route) => {
    navigate(r);
    setOpen(false);
  };

  const isActive = (name: string) => route.name === name;

  const navLinks = [
    { label: t.nav.home, route: { name: 'home' } as Route },
    { label: t.nav.doctors, route: { name: 'doctors' } as Route },
    { label: t.nav.dataProtection, route: { name: 'data-protection' } as Route },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <button
            onClick={() => go({ name: 'home' })}
            className="flex items-center gap-2 shrink-0"
            aria-label="DocTime home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
              <Stethoscope size={20} />
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Doc<span className="text-primary-600">Time</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => go(link.route)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.route.name)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-slate-600 hover:text-primary-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden pb-4 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => go(link.route)}
                className={`block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.route.name)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
