import { Globe } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { LANGS, type Lang } from '@/i18n/translations';

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1" role="group" aria-label="Language">
      {!compact && <Globe size={15} className="ml-1.5 text-slate-500" />}
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code as Lang)}
          className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${
            lang === l.code
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          aria-pressed={lang === l.code}
        >
          {l.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
