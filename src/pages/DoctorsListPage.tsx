import { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, X, ArrowUpDown, Video, Check, Trash2, Search } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { useRouter } from '@/router/Router';
import {
  doctors as allDoctors,
  SPECIALTIES,
  DISTRICTS,
  INSURANCE_PARTNERS,
  specialtyLabel,
  displayName,
  districtLabel,
  insuranceLabel,
  getNearestFreeSlot,
  type Doctor,
  type SpecialtyKey,
  type DistrictKey,
  type InsuranceKey,
} from '@/data/doctors';
import { DoctorCard } from '@/components/DoctorCard';
import { StarRating } from '@/components/StarRating';

type SortKey = 'availability' | 'priceLow' | 'priceHigh' | 'rating';

const PRICE_MIN = 40;
const PRICE_MAX = 160;

export function DoctorsListPage() {
  const { lang, t } = useI18n();
  const { route } = useRouter();

  const initialQuery = route.name === 'doctors' ? route.query || '' : '';
  const initialSpec =
    route.name === 'doctors' && route.specialty ? (route.specialty as SpecialtyKey) : undefined;

  const [search, setSearch] = useState(initialQuery);
  const [specialty, setSpecialty] = useState<SpecialtyKey | ''>(initialSpec || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [district, setDistrict] = useState<DistrictKey | ''>('');
  const [insurance, setInsurance] = useState<InsuranceKey | ''>('');
  const [minRating, setMinRating] = useState(0);
  const [videoOnly, setVideoOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('availability');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<number[]>([]);

  useEffect(() => {
    if (route.name === 'doctors') {
      setSearch(route.query || '');
      setSpecialty((route.specialty as SpecialtyKey) || '');
    }
  }, [route]);

  const filtered = useMemo(() => {
    let list = allDoctors.filter((d) => {
      if (specialty && d.specialty !== specialty) return false;
      if (d.priceGel < priceRange[0] || d.priceGel > priceRange[1]) return false;
      if (district && d.district !== district) return false;
      if (insurance && !d.insurance.includes(insurance)) return false;
      if (d.rating < minRating) return false;
      if (videoOnly && !d.videoConsult) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const hay = `${d.name.ka} ${d.name.en} ${specialtyLabel(d.specialty, 'ka')} ${specialtyLabel(d.specialty, 'en')} ${d.clinic.ka} ${d.clinic.en}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'priceLow':
          return a.priceGel - b.priceGel;
        case 'priceHigh':
          return b.priceGel - a.priceGel;
        case 'rating':
          return b.rating - a.rating;
        case 'availability': {
          const an = getNearestFreeSlot(a);
          const bn = getNearestFreeSlot(b);
          if (!an && !bn) return 0;
          if (!an) return 1;
          if (!bn) return -1;
          return an.date.localeCompare(bn.date) || an.time.localeCompare(bn.time);
        }
      }
    });
    return list;
  }, [specialty, priceRange, district, insurance, minRating, videoOnly, search, sort]);

  const resetFilters = () => {
    setSpecialty('');
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setDistrict('');
    setInsurance('');
    setMinRating(0);
    setVideoOnly(false);
    setSearch('');
  };

  const toggleCompare = (id: number) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const compareDocs = compareIds
    .map((id) => allDoctors.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const activeFilterCount =
    (specialty ? 1 : 0) +
    (district ? 1 : 0) +
    (insurance ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (videoOnly ? 1 : 0) +
    (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX ? 1 : 0);

  const FiltersContent = (
    <div className="space-y-6">
      {/* Specialty */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">{t.doctors.specialty}</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSpecialty('')}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              specialty === '' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.specialties.all}
          </button>
          {SPECIALTIES.map((s) => (
            <button
              key={s}
              onClick={() => setSpecialty(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                specialty === s ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {specialtyLabel(s, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">{t.doctors.priceRange}</label>
        <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
          <span className="font-semibold text-primary-700">
            {priceRange[0]} {t.doctors.gel}
          </span>
          <span className="font-semibold text-primary-700">
            {priceRange[1]} {t.doctors.gel}
          </span>
        </div>
        <div className="relative h-6">
          <div
            className="pointer-events-none absolute left-0 right-0 top-2.5 h-1.5 rounded-full bg-slate-200"
            style={{
              background: `linear-gradient(to right, #e2e8f0 ${((priceRange[0] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%, #0d9488 ${((priceRange[0] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%, #0d9488 ${((priceRange[1] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%, #e2e8f0 ${((priceRange[1] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%)`,
            }}
          />
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])}
            className="range-input absolute inset-0 z-10 w-full"
            aria-label={t.common.min}
          />
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])}
            className="range-input absolute inset-0 z-20 w-full"
            aria-label={t.common.max}
          />
        </div>
      </div>

      {/* District */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">{t.doctors.city}</label>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value as DistrictKey | '')}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
        >
          <option value="">{t.doctors.anyCity}</option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {districtLabel(d, lang)}
            </option>
          ))}
        </select>
      </div>

      {/* Insurance */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">{t.doctors.insurance}</label>
        <select
          value={insurance}
          onChange={(e) => setInsurance(e.target.value as InsuranceKey | '')}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
        >
          <option value="">{t.doctors.anyInsurance}</option>
          {INSURANCE_PARTNERS.map((i) => (
            <option key={i} value={i}>
              {insuranceLabel(i, lang)}
            </option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">{t.doctors.rating}</label>
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                minRating === r ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r === 0 ? t.specialties.all : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Video consult */}
      <div>
        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={videoOnly}
            onChange={(e) => setVideoOnly(e.target.checked)}
            className="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-400"
          />
          <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <Video size={15} className="text-accent-600" />
            {t.doctors.videoConsult}
          </span>
        </label>
      </div>

      <button
        onClick={resetFilters}
        className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
      >
        {t.doctors.reset}
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
      {/* Page header + search */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.doctors.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{t.doctors.resultsCount.replace('{count}', String(filtered.length))}</p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100">
            <Search size={18} className="shrink-0 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search.placeholder}
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-slate-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              <option value="availability">{t.doctors.sortAvailability}</option>
              <option value="priceLow">{t.doctors.sortPriceLow}</option>
              <option value="priceHigh">{t.doctors.sortPriceHigh}</option>
              <option value="rating">{t.doctors.sortRating}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop filters sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-20 rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
            <h2 className="mb-4 text-base font-bold text-slate-900">{t.doctors.filtersTitle}</h2>
            {FiltersContent}
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Mobile filter toggle */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm"
            >
              <SlidersHorizontal size={16} />
              {t.doctors.filters}
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Active filter chips (mobile) */}
          {activeFilterCount > 0 && (
            <div className="mb-4 flex flex-wrap gap-2 lg:hidden">
              {specialty && (
                <Chip onRemove={() => setSpecialty('')}>{specialtyLabel(specialty, lang)}</Chip>
              )}
              {district && <Chip onRemove={() => setDistrict('')}>{districtLabel(district, lang)}</Chip>}
              {insurance && <Chip onRemove={() => setInsurance('')}>{insuranceLabel(insurance, lang)}</Chip>}
              {videoOnly && <Chip onRemove={() => setVideoOnly(false)}>{t.doctors.videoConsult}</Chip>}
              {(priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX) && (
                <Chip onRemove={() => setPriceRange([PRICE_MIN, PRICE_MAX])}>
                  {priceRange[0]}-{priceRange[1]} {t.doctors.gel}
                </Chip>
              )}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
              <p className="text-slate-400">{t.doctors.noResults}</p>
              <button
                onClick={resetFilters}
                className="mt-4 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
              >
                {t.doctors.reset}
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((doc) => (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  compareSelected={compareIds.includes(doc.id)}
                  compareDisabled={compareIds.length >= 3}
                  onCompareToggle={toggleCompare}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-white p-5 animate-fade-in">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{t.doctors.filtersTitle}</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            {FiltersContent}
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-6 w-full rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700"
            >
              {t.doctors.apply}
            </button>
          </div>
        </div>
      )}

      {/* Compare bar */}
      {compareIds.length > 0 && (
        <CompareBar
          docs={compareDocs}
          lang={lang}
          onRemove={(id) => toggleCompare(id)}
          onClear={() => setCompareIds([])}
        />
      )}
    </div>
  );
}

function Chip({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
      {children}
      <button onClick={onRemove} className="text-primary-400 hover:text-primary-700">
        <X size={12} />
      </button>
    </span>
  );
}

function CompareBar({
  docs,
  lang,
  onRemove,
  onClear,
}: {
  docs: Doctor[];
  lang: 'ka' | 'en';
  onRemove: (id: number) => void;
  onClear: () => void;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900">
              {t.doctors.compareTitle.replace('{count}', String(docs.length))}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={onClear}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100"
              >
                <Trash2 size={14} />
                <span className="hidden sm:inline">{t.doctors.compareClear}</span>
              </button>
              <button
                onClick={() => setOpen(true)}
                disabled={docs.length < 2}
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
              >
                {t.doctors.compare}
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setOpen(false)} />
          <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl animate-fade-up">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {t.doctors.compareTitle.replace('{count}', String(docs.length))}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-3 pr-4 text-left text-xs font-semibold uppercase text-slate-400"></th>
                    {docs.map((d) => (
                      <th key={d.id} className="py-3 px-3 text-left">
                        <div className="flex flex-col items-start gap-2">
                          <img src={d.photo} alt="" className="h-16 w-16 rounded-lg object-cover" />
                          <span className="text-sm font-bold text-slate-900">{displayName(d, lang)}</span>
                          <button
                            onClick={() => onRemove(d.id)}
                            className="text-xs text-slate-400 hover:text-red-500"
                          >
                            {t.doctors.compareRemove}
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <CompareRow label={t.doctors.compareSpecialty}>
                    {docs.map((d) => (
                      <td key={d.id} className="py-3 px-3 text-slate-700">{specialtyLabel(d.specialty, lang)}</td>
                    ))}
                  </CompareRow>
                  <CompareRow label={t.doctors.compareExperience}>
                    {docs.map((d) => (
                      <td key={d.id} className="py-3 px-3 text-slate-700">{d.yearsExperience} {t.common.years}</td>
                    ))}
                  </CompareRow>
                  <CompareRow label={t.doctors.compareRating}>
                    {docs.map((d) => (
                      <td key={d.id} className="py-3 px-3">
                        <StarRating rating={d.rating} size={13} showValue count={d.reviewCount} countLabel="" />
                      </td>
                    ))}
                  </CompareRow>
                  <CompareRow label={t.doctors.comparePrice}>
                    {docs.map((d) => (
                      <td key={d.id} className="py-3 px-3 text-base font-bold text-primary-700">
                        {d.priceGel} {t.doctors.gel}
                      </td>
                    ))}
                  </CompareRow>
                  <CompareRow label={t.doctors.compareVideo}>
                    {docs.map((d) => (
                      <td key={d.id} className="py-3 px-3">
                        {d.videoConsult ? (
                          <span className="inline-flex items-center gap-1 text-accent-600"><Check size={15} /> {t.doctors.yes}</span>
                        ) : (
                          <span className="text-slate-400">{t.doctors.no}</span>
                        )}
                      </td>
                    ))}
                  </CompareRow>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CompareRow({ label, children }: { label: string; children: React.ReactNode }) {
  const { t } = useI18n();
  return (
    <tr className="border-b border-slate-50">
      <td className="py-3 pr-4 text-xs font-semibold uppercase text-slate-400">{label}</td>
      {children}
    </tr>
  );
}
