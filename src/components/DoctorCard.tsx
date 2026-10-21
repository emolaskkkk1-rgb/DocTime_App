import { MapPin, Video, Calendar, Check } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { useRouter } from '@/router/Router';
import { type Doctor, displayName, getNearestFreeSlot, specialtyLabel, districtLabel } from '@/data/doctors';
import { StarRating } from './StarRating';

interface DoctorCardProps {
  doctor: Doctor;
  compareSelected?: boolean;
  onCompareToggle?: (id: number) => void;
  compareDisabled?: boolean;
  showCompare?: boolean;
}

function formatDateShort(dateStr: string, lang: 'ka' | 'en'): string {
  const date = new Date(dateStr);
  const months = {
    ka: ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };
  const weekdays = {
    ka: ['კვ', 'ორ', 'სა', 'ოთ', 'ხთ', 'პა', 'შა'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };
  return `${weekdays[lang][date.getDay()]} ${date.getDate()} ${months[lang][date.getMonth()]}`;
}

export function DoctorCard({
  doctor,
  compareSelected = false,
  onCompareToggle,
  compareDisabled = false,
  showCompare = true,
}: DoctorCardProps) {
  const { lang, t } = useI18n();
  const { navigate } = useRouter();
  const nearest = getNearestFreeSlot(doctor);

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-card transition-all hover:border-primary-100 hover:shadow-card-hover sm:p-5">
      <div className="flex min-w-0 gap-4">
        <button onClick={() => navigate({ name: 'doctor', id: doctor.id })} className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24" aria-label={displayName(doctor, lang)}>
          <img src={doctor.photo} alt={displayName(doctor, lang)} loading="lazy" className="h-full w-full rounded-xl object-cover" />
          {doctor.videoConsult && (
            <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent-600 text-white ring-2 ring-white" title={t.profile.videoConsult}>
              <Video size={13} />
            </span>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <button
            onClick={() => navigate({ name: 'doctor', id: doctor.id })}
            className="line-clamp-2 min-w-0 break-words text-left text-base font-bold leading-tight text-slate-900 hover:text-primary-700 sm:text-lg"
          >
            {displayName(doctor, lang)}
          </button>
          <p className="mt-1 truncate text-sm font-medium text-primary-600">{specialtyLabel(doctor.specialty, lang)}</p>
          <p className="mt-1 flex min-w-0 items-center gap-1 text-xs text-slate-500">
            <MapPin size={12} className="shrink-0" />
            <span className="min-w-0 truncate">{doctor.clinic[lang]}, {districtLabel(doctor.district, lang)}</span>
          </p>
          <div className="mt-2 flex min-w-0 items-center gap-3">
            <StarRating rating={doctor.rating} count={doctor.reviewCount} />
            <span className="min-w-0 truncate text-xs text-slate-500">
              {t.doctors.yearsExp.replace('{years}', String(doctor.yearsExperience))}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-5">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <p className="whitespace-nowrap text-xl font-bold text-slate-900">
            {doctor.priceGel} <span className="text-base font-semibold text-primary-600">{t.doctors.gel}</span>
          </p>
          {nearest && (
            <p className="flex min-w-0 items-center gap-1 truncate text-right text-xs font-medium text-slate-600">
              <Calendar size={13} className="shrink-0 text-primary-500" />
              <span className="truncate">{lang === 'ka' ? 'უახლოესი:' : 'Nearest:'} {formatDateShort(nearest.date, lang)}, {nearest.time}</span>
            </p>
          )}
        </div>

        <div className="mt-4 flex min-w-0 items-center gap-2">
          <button
            onClick={() => navigate({ name: 'booking', doctorId: doctor.id })}
            className="min-w-0 flex-1 whitespace-nowrap rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 active:bg-primary-800"
          >
            {t.doctors.book}
          </button>
          {showCompare && (
            <button
              onClick={() => onCompareToggle?.(doctor.id)}
              disabled={compareDisabled && !compareSelected}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${compareSelected ? 'border-primary-300 bg-primary-50 text-primary-700' : 'border-slate-200 text-slate-600 hover:border-primary-200 hover:bg-primary-50/50 disabled:cursor-not-allowed disabled:opacity-50'}`}
              aria-pressed={compareSelected}
            >
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${compareSelected ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-300'}`}>
                {compareSelected && <Check size={12} />}
              </span>
              <span className="hidden sm:inline">{t.doctors.compare}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
