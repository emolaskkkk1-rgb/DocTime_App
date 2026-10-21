import {
  ShieldCheck,
  Database,
  Phone,
  Mail,
  User,
  BarChart3,
  Lock,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

export function DataProtectionPage() {
  const { t } = useI18n();

  const collectedItems = [
    { icon: User, text: t.dataProtection.collectedName },
    { icon: Phone, text: t.dataProtection.collectedPhone },
    { icon: Mail, text: t.dataProtection.collectedEmail },
    { icon: BarChart3, text: t.dataProtection.collectedUsage },
  ];

  const sections = [
    { icon: HelpCircle, title: t.dataProtection.whyTitle, desc: t.dataProtection.whyDesc },
    { icon: Lock, title: t.dataProtection.securityTitle, desc: t.dataProtection.securityDesc },
    { icon: FileText, title: t.dataProtection.rightsTitle, desc: t.dataProtection.rightsDesc },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
          <ShieldCheck size={28} />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
          {t.dataProtection.title}
        </h1>
        <p className="mt-2 text-slate-500">{t.dataProtection.subtitle}</p>
      </div>

      <p className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 text-sm leading-relaxed text-slate-600 shadow-card sm:p-6">
        {t.dataProtection.intro}
      </p>

      {/* What we collect */}
      <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Database size={20} className="text-primary-500" />
          {t.dataProtection.collectedTitle}
        </h2>
        <ul className="mt-4 space-y-3">
          {collectedItems.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <item.icon size={16} />
              </span>
              <span className="text-sm leading-relaxed text-slate-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why / How / Rights */}
      <div className="mt-6 space-y-4">
        {sections.map((s, i) => (
          <section key={i} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
              <s.icon size={18} className="text-primary-500" />
              {s.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
          </section>
        ))}
      </div>

      {/* Contact */}
      <section className="mt-6 rounded-2xl bg-primary-600 px-5 py-6 text-center text-white sm:px-6">
        <h2 className="text-base font-bold">{t.dataProtection.contactTitle}</h2>
        <p className="mt-2 text-sm text-primary-50">{t.dataProtection.contactDesc}</p>
      </section>
    </div>
  );
}
