import { useState } from 'react';
import {
  Search,
  Stethoscope,
  CalendarCheck,
  MessageSquareText,
  BadgePercent,
  ShieldCheck,
  Building2,
  ArrowRight,
  Quote,
  HeartPulse,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { useRouter } from '@/router/Router';
import { StarRating } from '@/components/StarRating';
import { DoctorCard } from '@/components/DoctorCard';
import { SPECIALTIES, specialtyLabel, displayName, doctors } from '@/data/doctors';

export function HomePage() {
  const { lang, t } = useI18n();
  const { navigate } = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ name: 'doctors', query: search.trim() || undefined });
  };

  const handleSpecialty = (spec: string) => {
    navigate({ name: 'doctors', specialty: spec });
  };

  const steps = [
    { icon: Search, title: t.home.step1Title, desc: t.home.step1Desc },
    { icon: CalendarCheck, title: t.home.step2Title, desc: t.home.step2Desc },
    { icon: Stethoscope, title: t.home.step3Title, desc: t.home.step3Desc },
  ];

  const trustFeatures = [
    { icon: MessageSquareText, title: t.home.reviewPatients, desc: t.home.reviewPatientsDesc },
    { icon: BadgePercent, title: t.home.transparentPrices, desc: t.home.transparentPricesDesc },
    { icon: ShieldCheck, title: t.home.dataProtection, desc: t.home.dataProtectionDesc },
    { icon: Building2, title: t.home.insurancePartners, desc: t.home.insurancePartnersDesc },
  ];

  const featuredReviews = doctors.slice(0, 3).flatMap((d) =>
    d.reviews.slice(0, 1).map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text[lang],
      doctor: displayName(d, lang),
    }))
  );

  const insuranceLogos = ['imedi', 'bdo', 'alpha', 'unison', 'ardi', 'gp'];
  const topDoctors = [...doctors].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0 -z-10">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/Gemini_Generated_Image_2hqrlk2hqrlk2hqr.jpeg"
            aria-hidden="true"
          >
            <source src="/images/hero-video.mp4" type="video/mp4" />
          </video>
          <img
            src="/images/Gemini_Generated_Image_2hqrlk2hqrlk2hqr.jpeg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/85 via-slate-950/75 to-slate-950/95" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-2xl text-center animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-primary-100 ring-1 ring-inset ring-white/15">
              <HeartPulse size={14} />
              {t.tagline}
            </span>
            <h1 className="mx-auto mt-5 max-w-xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {t.home.heroTitle}
            </h1>
            <p className="mt-4 text-base text-slate-200 sm:text-lg">{t.home.heroSubtitle}</p>
          </div>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="mx-auto mt-8 max-w-2xl animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white p-2 shadow-card-hover focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-100">
              <Search size={20} className="ml-2 shrink-0 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.search.placeholder}
                className="min-w-0 flex-1 bg-transparent text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
                aria-label={t.search.placeholder}
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 active:bg-primary-800"
              >
                {t.search.button}
              </button>
            </div>
          </form>

          {/* Quick specialty chips */}
          <div className="mx-auto mt-6 max-w-3xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <p className="mb-2.5 text-center text-sm font-medium text-slate-200">{t.home.quickChipsTitle}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SPECIALTIES.map((spec) => (
                <button
                  key={spec}
                  onClick={() => handleSpecialty(spec)}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:border-primary-300 hover:bg-white/20 hover:text-white active:scale-95"
                >
                  {specialtyLabel(spec, lang)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.home.howTitle}</h2>
          <p className="mt-2 text-slate-500">{t.home.howSubtitle}</p>
        </div>
        <div className="mt-8 grid items-stretch gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-card"
            >
              <span className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <step.icon size={26} />
              </div>
              <h3 className="relative mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular specialties */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.home.popularSpecialties}</h2>
            <p className="mt-2 text-slate-500">{t.home.quickChipsTitle}</p>
          </div>
          <button onClick={() => navigate({ name: 'doctors' })} className="hidden items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800 sm:flex">
            {t.home.ctaButton} <ArrowRight size={16} />
          </button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.map((spec) => {
            const count = doctors.filter((doctor) => doctor.specialty === spec).length;
            return (
              <button key={spec} onClick={() => handleSpecialty(spec)} className="flex h-full min-w-0 items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-card transition-all hover:border-primary-200 hover:shadow-card-hover">
                <span className="min-w-0">
                  <span className="block truncate text-base font-bold text-slate-900">{specialtyLabel(spec, lang)}</span>
                  <span className="mt-1 block text-sm text-slate-500">{t.home.availableDoctors.replace('{count}', String(count))}</span>
                </span>
                <span className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary-700">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Top-rated doctors */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.home.topDoctors}</h2>
            <p className="mt-2 text-slate-500">{t.home.whySubtitle}</p>
          </div>
          <button onClick={() => navigate({ name: 'doctors' })} className="hidden items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800 sm:flex">
            {t.nav.doctors} <ArrowRight size={16} />
          </button>
        </div>
        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
          {topDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} showCompare={false} />)}
        </div>
      </section>

      {/* Why trust DocTime */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.home.whyTitle}</h2>
            <p className="mt-2 text-slate-500">{t.home.whySubtitle}</p>
          </div>
          <div className="mt-8 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustFeatures.map((f, i) => (
              <div key={i} className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <f.icon size={22} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{f.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Insurance partners */}
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-card">
            <p className="text-center text-sm font-semibold text-slate-700">{t.home.insurancePartners}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {insuranceLogos.map((ins) => (
                <span key={ins} className="text-lg font-bold text-slate-300">
                  {ins.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.home.reviewsTitle}</h2>
        </div>
        <div className="mt-8 grid items-stretch gap-6 md:grid-cols-3">
          {featuredReviews.map((rev, i) => (
            <div key={i} className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <Quote size={28} className="text-primary-200" />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">"{rev.text}"</p>
              <div className="mt-4 border-t border-slate-50 pt-4">
                <StarRating rating={rev.rating} size={15} />
                <p className="mt-1.5 text-sm font-semibold text-slate-900">{rev.author}</p>
                <p className="text-xs text-slate-400">{rev.doctor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{t.home.ctaTitle}</h2>
          <p className="mt-3 text-primary-50">{t.home.ctaSubtitle}</p>
          <button
            onClick={() => navigate({ name: 'doctors' })}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-primary-700 shadow-lg transition-transform hover:scale-[1.03] active:scale-100"
          >
            {t.home.ctaButton}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
