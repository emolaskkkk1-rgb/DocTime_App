import { Stethoscope, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { useRouter, type Route } from '@/router/Router';

export function Footer() {
  const { t } = useI18n();
  const { navigate } = useRouter();

  const go = (r: Route) => navigate(r);

  return (
    <footer className="mt-16 border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                <Stethoscope size={18} />
              </span>
              <span className="text-lg font-bold text-slate-900">
                Doc<span className="text-primary-600">Time</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">{t.footer.about}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">{t.footer.links}</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <button onClick={() => go({ name: 'home' })} className="hover:text-primary-600">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => go({ name: 'doctors' })} className="hover:text-primary-600">
                  {t.nav.doctors}
                </button>
              </li>
              <li>
                <button onClick={() => go({ name: 'data-protection' })} className="hover:text-primary-600">
                  {t.footer.privacy}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">{t.footer.contact}</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-primary-500 shrink-0" />
                {t.footer.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-primary-500 shrink-0" />
                {t.footer.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-primary-500 shrink-0" />
                {t.footer.email}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <button onClick={() => go({ name: 'data-protection' })} className="flex items-center gap-2 hover:text-primary-600">
                  <Shield size={15} className="text-primary-500 shrink-0" />
                  {t.footer.privacy}
                </button>
              </li>
              <li className="text-slate-400">{t.footer.terms}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} DocTime. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
