import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  Stethoscope,
  MapPin,
  CalendarPlus,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { useRouter } from '@/router/Router';
import { getDoctorById, displayName, specialtyLabel, districtLabel } from '@/data/doctors';
import { StarRating } from '@/components/StarRating';

const MONTHS_KA = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS_KA = ['კვ', 'ორ', 'სა', 'ოთ', 'ხთ', 'პა', 'შა'];
const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function BookingPage({
  doctorId,
  initialDate,
  initialTime,
}: {
  doctorId: number;
  initialDate?: string;
  initialTime?: string;
}) {
  const { lang, t } = useI18n();
  const { navigate } = useRouter();
  const doctor = getDoctorById(doctorId);

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(initialDate || null);
  const [selectedTime, setSelectedTime] = useState<string | null>(initialTime || null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [createAccount, setCreateAccount] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingRef] = useState(() => `DT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
  const [confirmed, setConfirmed] = useState(false);

  if (!doctor) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-slate-400">Doctor not found.</p>
        <button onClick={() => navigate({ name: 'doctors' })} className="mt-4 text-primary-600">
          ← {t.profile.back}
        </button>
      </div>
    );
  }

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = t.booking.nameRequired;
    if (!phone.trim()) errs.phone = t.booking.phoneRequired;
    else if (!/^[+]?[\d\s-]{6,}$/.test(phone.trim())) errs.phone = t.booking.invalidPhone;
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = t.booking.invalidEmail;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (selectedDate && selectedTime) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const addToCalendar = () => {
    if (!selectedDate || !selectedTime) return;
    const dt = new Date(`${selectedDate}T${selectedTime}:00`);
    const end = new Date(dt.getTime() + 30 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const title = `${displayName(doctor, lang)} — ${specialtyLabel(doctor.specialty, lang)}`;
    const desc = `${t.booking.doctor}: ${displayName(doctor, lang)}\n${t.booking.clinic}: ${doctor.clinic[lang]}`;
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//DocTime//Booking//EN',
      'BEGIN:VEVENT',
      `UID:${bookingRef}@doctime.ge`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(dt)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc.replace(/\n/g, '\\n')}`,
      `LOCATION:${doctor.clinic[lang]}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `doctime-${bookingRef}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const steps = [t.booking.step1, t.booking.step2, t.booking.step3];

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-8">
      <button
        onClick={() => navigate({ name: 'doctor', id: doctor.id })}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-600"
      >
        <ArrowLeft size={16} />
        {displayName(doctor, lang)}
      </button>

      <h1 className="text-2xl font-bold text-slate-900">{t.booking.title}</h1>

      {/* Progress bar */}
      {!confirmed && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            {steps.map((label, i) => {
              const num = i + 1;
              const isActive = step === num;
              const isDone = step > num;
              return (
                <div key={i} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${
                        isDone
                          ? 'bg-primary-600 text-white'
                          : isActive
                          ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isDone ? <Check size={16} /> : num}
                    </div>
                    <span className={`mt-1.5 hidden text-xs font-medium sm:block ${isActive || isDone ? 'text-primary-700' : 'text-slate-400'}`}>
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`mx-2 h-0.5 flex-1 rounded-full ${step > num ? 'bg-primary-600' : 'bg-slate-100'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Doctor summary card */}
      {!confirmed && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card">
          <img src={doctor.photo} alt="" className="h-14 w-14 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold text-slate-900">{displayName(doctor, lang)}</p>
            <p className="text-sm text-primary-600">{specialtyLabel(doctor.specialty, lang)}</p>
            <p className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={11} /> {doctor.clinic[lang]}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary-700">
              {doctor.priceGel} {t.doctors.gel}
            </p>
          </div>
        </div>
      )}

      {/* Step 1: Date & time */}
      {!confirmed && step === 1 && (
        <div className="mt-6 animate-fade-in">
          <BookingCalendar
            doctor={doctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectDate={(d) => {
              setSelectedDate(d);
              setSelectedTime(null);
            }}
            onSelectTime={setSelectedTime}
            lang={lang}
            t={t}
          />
        </div>
      )}

      {/* Step 2: Details */}
      {!confirmed && step === 2 && (
        <div className="mt-6 animate-fade-in space-y-5">
          {/* Summary of selected slot */}
          <div className="flex items-center gap-3 rounded-xl bg-primary-50 px-4 py-3">
            <CalendarIcon size={18} className="text-primary-600" />
            <div className="flex-1">
              <p className="text-xs text-primary-600">{t.booking.selectedDateTime}</p>
              <p className="text-sm font-semibold text-primary-900">
                {formatDateLong(selectedDate!, lang)}, {selectedTime}
              </p>
            </div>
          </div>

          {/* Account / guest choice */}
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setCreateAccount(false)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                !createAccount ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <User size={20} className="text-primary-600" />
                {!createAccount && <Check size={18} className="text-primary-600" />}
              </div>
              <p className="mt-2 text-sm font-bold text-slate-900">{t.booking.guestOption}</p>
              <p className="mt-0.5 text-xs text-slate-500">{t.booking.guestOptionDesc}</p>
            </button>
            <button
              type="button"
              onClick={() => setCreateAccount(true)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                createAccount ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <ShieldCheck size={20} className="text-primary-600" />
                {createAccount && <Check size={18} className="text-primary-600" />}
              </div>
              <p className="mt-2 text-sm font-bold text-slate-900">{t.booking.accountOption}</p>
              <p className="mt-0.5 text-xs text-slate-500">{t.booking.accountOptionDesc}</p>
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <Field label={t.booking.fullName} icon={<User size={16} />} error={errors.name}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.booking.fullName}
                className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </Field>
            <Field label={t.booking.phone} icon={<Phone size={16} />} error={errors.phone}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+995 5XX XXX XXX"
                className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </Field>
            <Field label={t.booking.email} icon={<Mail size={16} />} error={errors.email}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </Field>
            {createAccount && (
              <Field label={t.booking.password} icon={<ShieldCheck size={16} />}>
                <input
                  type="password"
                  value=""
                  onChange={() => {}}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </Field>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Confirmation review */}
      {!confirmed && step === 3 && (
        <div className="mt-6 animate-fade-in">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">{t.booking.summary}</h2>
            <dl className="mt-4 divide-y divide-slate-50">
              <SummaryRow icon={<Stethoscope size={15} />} label={t.booking.doctor} value={displayName(doctor, lang)} />
              <SummaryRow icon={<User size={15} />} label={t.booking.specialty} value={specialtyLabel(doctor.specialty, lang)} />
              <SummaryRow icon={<MapPin size={15} />} label={t.booking.clinic} value={doctor.clinic[lang]} />
              <SummaryRow icon={<CalendarIcon size={15} />} label={t.booking.date} value={formatDateLong(selectedDate!, lang)} />
              <SummaryRow icon={<Clock size={15} />} label={t.booking.time} value={selectedTime!} />
              <SummaryRow icon={<User size={15} />} label={t.booking.patient} value={name} />
              <SummaryRow icon={<Phone size={15} />} label={t.booking.phone} value={phone} />
              {email && <SummaryRow icon={<Mail size={15} />} label={t.booking.email} value={email} />}
              <div className="flex items-center justify-between py-3">
                <dt className="flex items-center gap-2 text-sm font-medium text-slate-500">{t.booking.price}</dt>
                <dd className="text-xl font-bold text-primary-700">
                  {doctor.priceGel} {t.doctors.gel}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-amber-50 px-4 py-3">
              <MessageSquare size={18} className="mt-0.5 shrink-0 text-amber-500" />
              <p className="text-sm text-amber-800">{t.booking.smsNote}</p>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="mt-5 w-full rounded-xl bg-primary-600 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-700 active:bg-primary-800"
          >
            {t.common.confirm}
          </button>
        </div>
      )}

      {/* Navigation buttons */}
      {!confirmed && step < 3 && (
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => (step === 1 ? navigate({ name: 'doctor', id: doctor.id }) : setStep(step - 1))}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            {t.booking.back}
          </button>
          <button
            onClick={handleNext}
            disabled={step === 1 && (!selectedDate || !selectedTime)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:bg-slate-200 disabled:text-slate-400"
          >
            {t.booking.next}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
      {!confirmed && step === 3 && (
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            {t.booking.back}
          </button>
        </div>
      )}

      {/* Confirmation screen */}
      {confirmed && (
        <div className="mt-8 animate-fade-up text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
            <CheckCircle2 size={36} className="text-primary-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-900">{t.booking.confirmation}</h2>
          <p className="mt-2 text-sm text-slate-500">{t.booking.confirmationDesc}</p>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-card sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <span className="text-xs font-medium text-slate-400">{t.booking.bookingRef}</span>
              <span className="font-mono text-sm font-bold text-primary-700">{bookingRef}</span>
            </div>
            <dl className="mt-3 divide-y divide-slate-50">
              <SummaryRow icon={<Stethoscope size={15} />} label={t.booking.doctor} value={displayName(doctor, lang)} />
              <SummaryRow icon={<CalendarIcon size={15} />} label={t.booking.date} value={formatDateLong(selectedDate!, lang)} />
              <SummaryRow icon={<Clock size={15} />} label={t.booking.time} value={selectedTime!} />
              <SummaryRow icon={<MapPin size={15} />} label={t.booking.clinic} value={doctor.clinic[lang]} />
              <SummaryRow icon={<User size={15} />} label={t.booking.patient} value={name} />
              <div className="flex items-center justify-between py-3">
                <dt className="flex items-center gap-2 text-sm font-medium text-slate-500">{t.booking.price}</dt>
                <dd className="text-lg font-bold text-primary-700">
                  {doctor.priceGel} {t.doctors.gel}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-primary-50 px-4 py-3 text-left">
            <MessageSquare size={18} className="mt-0.5 shrink-0 text-primary-500" />
            <p className="text-sm text-primary-800">{t.booking.smsNote}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={addToCalendar}
              className="flex items-center justify-center gap-2 rounded-xl border border-primary-200 bg-white px-5 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50"
            >
              <CalendarPlus size={18} />
              {t.booking.addToCalendar}
            </button>
            <button
              onClick={() => navigate({ name: 'doctors' })}
              className="rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700"
            >
              {t.booking.newBooking}
            </button>
            <button
              onClick={() => navigate({ name: 'home' })}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              {t.booking.goHome}
            </button>
          </div>
        </div>
      )}

      {/* Sticky mobile action bar */}
      {!confirmed && (
        <div className="h-16 lg:hidden" />
      )}
    </div>
  );
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-white px-3.5 py-3 transition-colors focus-within:ring-2 focus-within:ring-primary-100 ${
          error ? 'border-red-300 focus-within:border-red-400' : 'border-slate-200 focus-within:border-primary-400'
        }`}
      >
        <span className="text-slate-400">{icon}</span>
        {children}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <span className="text-slate-400">{icon}</span>
        {label}
      </dt>
      <dd className="text-sm font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

function formatDateLong(dateStr: string, lang: 'ka' | 'en'): string {
  const d = new Date(dateStr);
  const months = lang === 'ka' ? MONTHS_KA : MONTHS_EN;
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

function BookingCalendar({
  doctor,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  lang,
  t,
}: {
  doctor: ReturnType<typeof getDoctorById>;
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDate: (d: string) => void;
  onSelectTime: (t: string) => void;
  lang: 'ka' | 'en';
  t: any;
}) {
  const [weekOffset, setWeekOffset] = useState(0);
  if (!doctor) return null;

  const today = new Date('2026-10-20');
  const start = new Date(today);
  start.setDate(today.getDate() + weekOffset * 7);
  const wd = lang === 'ka' ? WEEKDAYS_KA : WEEKDAYS_EN;
  const months = lang === 'ka' ? MONTHS_KA : MONTHS_EN;

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    const dayAvail = doctor.availability.find((a) => a.date === dateStr);
    return {
      date: dateStr,
      dayNum: d.getDate(),
      weekday: wd[d.getDay()],
      hasFree: dayAvail ? dayAvail.slots.some((s) => s.free) : false,
    };
  });

  const monthLabel = `${months[start.getMonth()]} ${start.getFullYear()}`;
  const selectedDayAvail = selectedDate ? doctor.availability.find((a) => a.date === selectedDate) : null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-6">
      <h2 className="text-base font-bold text-slate-900">{t.booking.chooseDate}</h2>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setWeekOffset((o) => Math.max(0, o - 1))}
          disabled={weekOffset === 0}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-slate-50"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-slate-700">{monthLabel}</span>
        <button
          onClick={() => setWeekOffset((o) => Math.min(1, o + 1))}
          disabled={weekOffset >= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-slate-50"
        >
          ›
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {weekDays.map((day) => {
          const isSelected = selectedDate === day.date;
          return (
            <button
              key={day.date}
              onClick={() => day.hasFree && onSelectDate(day.date)}
              disabled={!day.hasFree}
              className={`flex flex-col items-center rounded-lg py-2.5 transition-all ${
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

      {selectedDayAvail && (
        <div className="mt-5">
          <h3 className="mb-2 text-sm font-semibold text-slate-700">{t.booking.chooseTime}</h3>
          {selectedDayAvail.slots.some((s) => s.free) ? (
            <div className="grid grid-cols-4 gap-2">
              {selectedDayAvail.slots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.free && onSelectTime(slot.time)}
                  disabled={!slot.free}
                  className={`rounded-lg py-2.5 text-sm font-medium transition-all ${
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
      )}
    </div>
  );
}
