import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  MapPin,
  Video,
  Stethoscope,
  GraduationCap,
  Languages,
  Check,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { useRouter } from '@/router/Router';
import { getDoctorById, displayName, specialtyLabel, districtLabel, insuranceLabel } from '@/data/doctors';
import { StarRating } from '@/components/StarRating';

const WEEKDAYS_KA = ['კვ', 'ორ', 'სა', 'ოთ', 'ხთ', 'პა', 'შა'];
const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS_KA = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function DoctorProfilePage({ doctorId }: { doctorId: number }) {
  const { lang, t } = useI18n();
  const { navigate } = useRouter();
  const doctor = getDoctorById(doctorId);

  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const weekDays = useMemo(() => {
    if (!doctor) return [];
    const today = new Date('2026-10-20');
    const start = new Date(today);
    start.setDate(today.getDate() + weekOffset * 7);
    const days: { date: string; label: string; dayNum: number; weekday: string; hasFree: boolean }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayAvail = doctor.availability.find((a) => a.date === dateStr);
      const wd = lang === 'ka' ? WEEKDAYS_KA : WEEKDAYS_EN;
      days.push({
        date: dateStr,
        label: `${d.getDate()}`,
        dayNum: d.getDate(),
        weekday: wd[d.getDay()],
        hasFree: dayAvail ? dayAvail.slots.some((s) => s.free) : false,
      });
    }
    return days;
  }, [doctor, weekOffset, lang]);

  if (!doctor) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-slate-400">Doctor not found.</p>
        <button onClick={() => navigate({ name: 'doctors' })} className="mt-4 text-primary-600">
          ← {t.profile.back}
        </button>
      </div>
    );
  }

  const selectedDayAvail = selectedDate
    ? doctor.availability.find((a) => a.date === selectedDate)
    : null;

  const monthLabel = (() => {
    if (weekDays.length === 0) return '';
    const first = new Date(weekDays[0].date);
    const months = lang === 'ka' ? MONTHS_KA : MONTHS_EN;
    return `${months[first.getMonth()]} ${first.getFullYear()}`;
  })();

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      navigate({ name: 'booking', doctorId: doctor.id, date: selectedDate, time: selectedTime });
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8">
      <button
        onClick={() => navigate({ name: 'doctors' })}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-600"
      >
        <ArrowLeft size={16} />
        {t.profile.back}
      </button>

      {/* Profile header */}
      <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:flex-row sm:items-start sm:p-6">
        <img
          src={doctor.photo}
          alt={displayName(doctor, lang)}
          className="h-32 w-32 rounded-2xl object-cover sm:h-36 sm:w-36"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">{displayName(doctor, lang)}</h1>
          <p className="text-lg font-medium text-primary-600">{specialtyLabel(doctor.specialty, lang)}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <StarRating rating={doctor.rating} showValue size={16} count={doctor.reviewCount} countLabel={t.profile.reviewsCount.replace('{count}', '')} />
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <Stethoscope size={15} className="text-primary-500" />
              {doctor.yearsExperience} {lang === 'ka' ? 'წლის გამოცდილება' : 'years experience'}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-primary-500" />
              {doctor.clinic[lang]}, {districtLabel(doctor.district, lang)}
            </span>
            {doctor.videoConsult && (
              <span className="flex items-center gap-1.5 font-medium text-accent-600">
                <Video size={15} />
                {t.profile.videoConsult}
              </span>
            )}
          </div>
          {/* Insurance */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {doctor.insurance.map((ins) => (
              <span key={ins} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {insuranceLabel(ins, lang)}
              </span>
            ))}
          </div>
        </div>
        {/* Price box */}
        <div className="shrink-0 rounded-xl bg-primary-50 px-5 py-3 text-center">
          <p className="text-xs text-primary-600">{t.profile.experience && t.doctors.from}</p>
          <p className="text-2xl font-bold text-primary-700">
            {doctor.priceGel} <span className="text-lg">{t.doctors.gel}</span>
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left: About, education, languages, reviews */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">{t.profile.about}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{doctor.about[lang]}</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <GraduationCap size={16} className="text-primary-500" />
                  {t.profile.education}
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                  {doctor.education.map((e, i) => (
                    <li key={i} className="flex gap-1.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-400" />
                      {e[lang]}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <Languages size={16} className="text-primary-500" />
                  {t.profile.languages}
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {doctor.languages[lang].map((l) => (
                    <span key={l} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">{t.profile.reviews}</h2>
            <div className="mt-4 flex items-center gap-5 rounded-xl bg-slate-50 p-4">
              <div className="shrink-0 text-center">
                <p className="text-3xl font-bold text-slate-900">{doctor.rating.toFixed(1)}</p>
                <StarRating rating={doctor.rating} size={14} className="mt-1" />
                <p className="mt-1 text-xs text-slate-400">{doctor.reviewCount} {t.common.reviews}</p>
              </div>
              <div className="min-w-0 flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const share = doctor.reviews.filter((review) => review.rating >= star).length / doctor.reviews.length;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="w-3 text-right">{star}</span>
                      <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full rounded-full bg-amber-400" style={{ width: `${Math.max(share * 100, star === 5 ? 36 : 8)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 space-y-4">
              {doctor.reviews.map((rev) => (
                <div key={rev.id} className="border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">{rev.author}</span>
                    <StarRating rating={rev.rating} size={13} />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">"{rev.text[lang]}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Availability calendar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
            <h2 className="flex items-center gap-1.5 text-lg font-bold text-slate-900">
              <CalendarIcon size={18} className="text-primary-500" />
              {t.profile.availability}
            </h2>
            <p className="mt-1 text-xs text-slate-400">{t.profile.availabilityHint}</p>

            {/* Week navigation */}
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => setWeekOffset((o) => Math.max(0, o - 1))}
                disabled={weekOffset === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-slate-50"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm font-semibold text-slate-700">{monthLabel}</span>
              <button
                onClick={() => setWeekOffset((o) => Math.min(1, o + 1))}
                disabled={weekOffset >= 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-slate-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Day selector */}
            <div className="mt-4 grid grid-cols-7 gap-1.5">
              {weekDays.map((day) => {
                const isSelected = selectedDate === day.date;
                return (
                  <button
                    key={day.date}
                    onClick={() => {
                      if (day.hasFree) {
                        setSelectedDate(day.date);
                        setSelectedTime(null);
                      }
                    }}
                    disabled={!day.hasFree}
                    className={`flex flex-col items-center rounded-lg py-2 transition-all ${
                      isSelected
                        ? 'bg-primary-600 text-white'
                        : day.hasFree
                        ? 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                        : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-[10px] font-medium opacity-70">{day.weekday}</span>
                    <span className="text-sm font-bold">{day.dayNum}</span>
                  </button>
                );
              })}
            </div>

            {/* Time slots */}
            {selectedDayAvail ? (
              <div className="mt-5">
                <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <Clock size={14} className="text-primary-500" />
                  {t.profile.availability}
                </h3>
                {selectedDayAvail.slots.some((s) => s.free) ? (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedDayAvail.slots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.free && setSelectedTime(slot.time)}
                        disabled={!slot.free}
                        className={`rounded-lg py-2 text-sm font-medium transition-all ${
                          selectedTime === slot.time
                            ? 'bg-primary-600 text-white shadow-sm'
                            : slot.free
                            ? 'border border-primary-200 bg-white text-primary-700 hover:bg-primary-50'
                            : 'border border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed line-through'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">{t.profile.noSlot}</p>
                )}
              </div>
            ) : (
              <div className="mt-5 rounded-lg bg-slate-50 px-3 py-6 text-center">
                <CalendarIcon size={24} className="mx-auto text-slate-300" />
                <p className="mt-2 text-sm text-slate-400">{t.profile.availabilityHint}</p>
              </div>
            )}

            {/* Book button */}
            <button
              onClick={handleBook}
              disabled={!selectedDate || !selectedTime}
              className="mt-5 w-full rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              {selectedDate && selectedTime
                ? `${t.profile.book} · ${selectedTime}`
                : t.profile.book}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky mobile booking bar */}
      <div className="h-20 lg:hidden" />
      {selectedDate && selectedTime && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
          <div className="mx-auto flex max-w-md items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-400">{t.booking.selectedDateTime}</p>
              <p className="text-sm font-semibold text-slate-900">
                {formatDateLong(selectedDate, lang)}, {selectedTime}
              </p>
            </div>
            <button
              onClick={handleBook}
              className="flex items-center gap-1.5 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Check size={16} />
              {t.profile.book}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatDateLong(dateStr: string, lang: 'ka' | 'en'): string {
  const d = new Date(dateStr);
  const months = lang === 'ka' ? MONTHS_KA : MONTHS_EN;
  return `${d.getDate()} ${months[d.getMonth()]}`;
}
