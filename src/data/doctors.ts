import type { Lang } from '@/i18n/translations';

export type SpecialtyKey =
  | 'therapist'
  | 'cardiologist'
  | 'dermatologist'
  | 'ent'
  | 'pediatrician'
  | 'dentist';

export type DistrictKey =
  | 'vera'
  | 'vakhe'
  | 'saburtalo'
  | 'didube'
  | 'nadzaladevi'
  | 'isani'
  | 'chugureti'
  | 'old';

export type InsuranceKey = 'imedi' | 'bdo' | 'alpha' | 'unison' | 'ardi' | 'gp';

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: { ka: string; en: string };
  date: string;
}

export interface TimeSlot {
  time: string;
  free: boolean;
}

export interface DayAvailability {
  date: string;
  slots: TimeSlot[];
}

export interface Doctor {
  id: number;
  gender: 'female' | 'male';
  photo: string;
  name: { ka: string; en: string };
  specialty: SpecialtyKey;
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  priceGel: number;
  clinic: { ka: string; en: string };
  district: DistrictKey;
  videoConsult: boolean;
  insurance: InsuranceKey[];
  about: { ka: string; en: string };
  education: { ka: string; en: string }[];
  languages: { ka: string[]; en: string[] };
  reviews: Review[];
  availability: DayAvailability[];
}

export const SPECIALTIES: SpecialtyKey[] = [
  'therapist',
  'cardiologist',
  'dermatologist',
  'ent',
  'pediatrician',
  'dentist',
];

export const DISTRICTS: DistrictKey[] = [
  'vera',
  'vakhe',
  'saburtalo',
  'didube',
  'nadzaladevi',
  'isani',
  'chugureti',
  'old',
];

export const INSURANCE_PARTNERS: InsuranceKey[] = [
  'imedi',
  'bdo',
  'alpha',
  'unison',
  'ardi',
  'gp',
];

const doctorPhotos = [
  '/images/Gemini_Generated_Image_2hqrlk2hqrlk2hqr.jpeg',
  'https://images.pexels.com/photos/32160037/pexels-photo-32160037.jpeg?auto=compress&cs=tinysrgb&h=600&w=450',
  '/images/Gemini_Generated_Image_amfiwpamfiwpamfi.jpeg',
  'https://images.pexels.com/photos/6129500/pexels-photo-6129500.jpeg?auto=compress&cs=tinysrgb&h=600&w=450',
  '/images/Gemini_Generated_Image_eralheeralheeral.jpeg',
  'https://images.pexels.com/photos/32254658/pexels-photo-32254658.jpeg?auto=compress&cs=tinysrgb&h=600&w=450',
  '/images/Gemini_Generated_Image_evjvigevjvigevjv.jpeg',
  'https://images.pexels.com/photos/29995617/pexels-photo-29995617.jpeg?auto=compress&cs=tinysrgb&h=600&w=450',
  'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&h=600&w=450',
  'https://images.pexels.com/photos/5722165/pexels-photo-5722165.jpeg?auto=compress&cs=tinysrgb&h=600&w=450',
  'https://images.pexels.com/photos/5234463/pexels-photo-5234463.jpeg?auto=compress&cs=tinysrgb&h=600&w=450',
  'https://images.pexels.com/photos/28755708/pexels-photo-28755708.jpeg?auto=compress&cs=tinysrgb&h=600&w=450',
];

const reviewBank: { author: string; rating: number; text: { ka: string; en: string } }[] = [
  {
    author: 'ნინო კ.',
    rating: 5,
    text: {
      ka: 'ძალიან კმაყოფილი ვარ. ექიმმა დეტალურად გამიმართა კონსულტაცია და ყველა კითხვას უპასუხა.',
      en: 'Very satisfied. The doctor gave a detailed consultation and answered all my questions.',
    },
  },
  {
    author: 'გიორგი მ.',
    rating: 5,
    text: {
      ka: 'პროფესიონალი ექიმი, მომხიბვლელი დამოკიდებულება. დაჯავშნა მარტივი იყო.',
      en: 'Professional doctor, charming attitude. Booking was easy.',
    },
  },
  {
    author: 'ანა ბ.',
    rating: 4,
    text: {
      ka: 'კარგი კონსულტაცია, ოდნავ დაგვიანდა, მაგრამ საერთო ჯამში კმაყოფილი ვარ.',
      en: 'Good consultation, slightly late, but overall satisfied.',
    },
  },
  {
    author: 'დავით ლ.',
    rating: 5,
    text: {
      ka: 'საუკეთესო ექიმი, რომელთანაც ვყოფილვარ. მადლობა DocTime-ს.',
      en: 'The best doctor I have visited. Thanks to DocTime.',
    },
  },
  {
    author: 'მარიამი ჯ.',
    rating: 4,
    text: {
      ka: 'კონსულტაცია დამაკმაყოფილა. კლინიკა სუფთა და კომფორტულია.',
      en: 'The consultation met my expectations. The clinic is clean and comfortable.',
    },
  },
  {
    author: 'ლევანი დ.',
    rating: 5,
    text: {
      ka: 'ძალიან მადლობელი ვარ. პროფესიონალური მიდგომა და ზრდილობიანი პერსონალი.',
      en: 'I am very grateful. Professional approach and courteous staff.',
    },
  },
  {
    author: 'სოფო ნ.',
    rating: 5,
    text: {
      ka: 'ყველაფერი იდეალურად მივიდა. გასაოცარი სერვისი.',
      en: 'Everything went perfectly. Amazing service.',
    },
  },
  {
    author: 'თემურ რ.',
    rating: 4,
    text: {
      ka: 'ექიმი კომპეტენტურია, მაგრამ მოლოდინის დრო იყო ცოტა ხანგრძლივი.',
      en: 'The doctor is competent, but the wait was a bit long.',
    },
  },
];

function makeReviews(seed: number, count: number): Review[] {
  const out: Review[] = [];
  for (let i = 0; i < count; i++) {
    const base = reviewBank[(seed + i) % reviewBank.length];
    out.push({
      id: `r-${seed}-${i}`,
      author: base.author,
      rating: base.rating,
      text: base.text,
      date: `2026-0${((i % 6) + 3)}-1${i % 9}`,
    });
  }
  return out;
}

function makeAvailability(seed: number): DayAvailability[] {
  const days: DayAvailability[] = [];
  const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
  const today = new Date('2026-10-20');
  for (let d = 0; d < 14; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    const dow = date.getDay();
    if (dow === 0) continue;
    const slots: TimeSlot[] = times.map((time, idx) => ({
      time,
      free: (seed + d * 3 + idx * 2) % 5 !== 0 && (seed + d + idx) % 7 !== 0,
    }));
    days.push({ date: date.toISOString().slice(0, 10), slots });
  }
  return days;
}

export function getNearestFreeSlot(doc: Doctor): { date: string; time: string } | null {
  for (const day of doc.availability) {
    const free = day.slots.find((s) => s.free);
    if (free) return { date: day.date, time: free.time };
  }
  return null;
}

const doctorBlueprints: Omit<Doctor, 'photo' | 'reviews' | 'availability'>[] = [
  {
    id: 1,
    gender: 'female',
    name: { ka: 'ნინო ბერიძე', en: 'Nino Beridze' },
    specialty: 'therapist',
    yearsExperience: 12,
    rating: 4.8,
    reviewCount: 47,
    priceGel: 60,
    clinic: { ka: 'კლინიკა „ჯანს“, ვერა', en: 'Clinic "Jans", Vera' },
    district: 'vera',
    videoConsult: true,
    insurance: ['imedi', 'alpha', 'ardi'],
    about: {
      ka: 'თერაპევტი 12 წლის გამოცდილებით. სპეციალიზებულია ქრონიკული დაავადებების მართვასა და პროფილაქტიკაში.',
      en: 'Therapist with 12 years of experience. Specialises in chronic disease management and prevention.',
    },
    education: [
      { ka: 'თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, 2010', en: 'Tbilisi State Medical University, 2010' },
      { ka: 'რეზიდენტურა — შინაგან სნეულებათა ცენტრი, 2014', en: 'Residency — Internal Medicine Centre, 2014' },
    ],
    languages: { ka: ['ქართული', 'ინგლისური', 'რუსული'], en: ['Georgian', 'English', 'Russian'] },
  },
  {
    id: 2,
    gender: 'male',
    name: { ka: 'გიორგი მაისურაძე', en: 'Giorgi Maisuradze' },
    specialty: 'cardiologist',
    yearsExperience: 18,
    rating: 4.9,
    reviewCount: 63,
    priceGel: 120,
    clinic: { ka: 'გულ-სისხლძარღვთა ცენტრი, ვაკე', en: 'Cardiovascular Centre, Vake' },
    district: 'vakhe',
    videoConsult: false,
    insurance: ['imedi', 'bdo', 'gp'],
    about: {
      ka: 'კარდიოლოგი 18 წლის გამოცდილებით. ექოკარდიოგრაფიისა და არითმიის მკურნალობის ექსპერტი.',
      en: 'Cardiologist with 18 years of experience. Expert in echocardiography and arrhythmia treatment.',
    },
    education: [
      { ka: 'თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, 2006', en: 'Tbilisi State Medical University, 2006' },
      { ka: 'სტაჟირება — ბერლინის კარდიოლოგიის ცენტრი, 2012', en: 'Fellowship — Berlin Cardiology Centre, 2012' },
    ],
    languages: { ka: ['ქართული', 'ინგლისური', 'გერმანული'], en: ['Georgian', 'English', 'German'] },
  },
  {
    id: 3,
    gender: 'female',
    name: { ka: 'თეონა კვარაცხელია', en: 'Teona Kvaratskhelia' },
    specialty: 'dermatologist',
    yearsExperience: 9,
    rating: 4.7,
    reviewCount: 38,
    priceGel: 90,
    clinic: { ka: '„დერმა-კლინიკი“, საბურთალო', en: 'Derma-Clinic, Saburtalo' },
    district: 'saburtalo',
    videoConsult: true,
    insurance: ['alpha', 'unison', 'ardi'],
    about: {
      ka: 'დერმატოლოგი, სპეციალიზებული კანის ქრონიკულ დაავადებებსა და კოსმეტოლოგიაში.',
      en: 'Dermatologist specialising in chronic skin conditions and cosmetology.',
    },
    education: [
      { ka: 'თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, 2013', en: 'Tbilisi State Medical University, 2013' },
    ],
    languages: { ka: ['ქართული', 'ინგლისური'], en: ['Georgian', 'English'] },
  },
  {
    id: 4,
    gender: 'male',
    name: { ka: 'ალექსანდრე ჟორდანია', en: 'Aleksandre Zhordania' },
    specialty: 'ent',
    yearsExperience: 15,
    rating: 4.6,
    reviewCount: 29,
    priceGel: 80,
    clinic: { ka: '„ენტ-ცენტრი“, ჩუღურეთი', en: 'ENT Centre, Chugureti' },
    district: 'chugureti',
    videoConsult: false,
    insurance: ['imedi', 'bdo'],
    about: {
      ka: 'ოტორინოლარინგოლოგი 15 წლის გამოცდილებით. ვირთხებისა და ყელის ქირურგიაში სპეციალისტი.',
      en: 'ENT specialist with 15 years of experience. Specialist in nasal and throat surgery.',
    },
    education: [
      { ka: 'თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, 2009', en: 'Tbilisi State Medical University, 2009' },
    ],
    languages: { ka: ['ქართული', 'რუსული', 'ინგლისური'], en: ['Georgian', 'Russian', 'English'] },
  },
  {
    id: 5,
    gender: 'female',
    name: { ka: 'მაია ცეცხლაძე', en: 'Maia Tsetskhladze' },
    specialty: 'pediatrician',
    yearsExperience: 20,
    rating: 5.0,
    reviewCount: 71,
    priceGel: 70,
    clinic: { ka: '„ბავშვთა კლინიკა“, ისანი', en: 'Children\'s Clinic, Isani' },
    district: 'isani',
    videoConsult: true,
    insurance: ['imedi', 'alpha', 'unison', 'ardi', 'gp'],
    about: {
      ka: 'პედიატრი 20 წლის გამოცდილებით. ბავშვთა ზრდა-განვითარებისა და ვაქცინაციის ექსპერტი.',
      en: 'Pediatrician with 20 years of experience. Expert in child growth, development and vaccination.',
    },
    education: [
      { ka: 'თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, 2004', en: 'Tbilisi State Medical University, 2004' },
    ],
    languages: { ka: ['ქართული', 'ინგლისური', 'რუსული'], en: ['Georgian', 'English', 'Russian'] },
  },
  {
    id: 6,
    gender: 'male',
    name: { ka: 'ზაზა გოგია', en: 'Zaza Gogia' },
    specialty: 'dentist',
    yearsExperience: 11,
    rating: 4.5,
    reviewCount: 34,
    priceGel: 100,
    clinic: { ka: '„სმაილ-სტუდიო“, ვერა', en: 'Smile Studio, Vera' },
    district: 'vera',
    videoConsult: false,
    insurance: ['bdo', 'gp'],
    about: {
      ka: 'სტომატოლოგი, სპეციალიზებული ესთეტიკურ რესტავრაციასა და ორთოდონტიაში.',
      en: 'Dentist specialising in aesthetic restoration and orthodontics.',
    },
    education: [
      { ka: 'თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, 2011', en: 'Tbilisi State Medical University, 2011' },
    ],
    languages: { ka: ['ქართული', 'ინგლისური'], en: ['Georgian', 'English'] },
  },
  {
    id: 7,
    gender: 'female',
    name: { ka: 'ქეთევან აბულაძე', en: 'Ketevan Abuladze' },
    specialty: 'cardiologist',
    yearsExperience: 14,
    rating: 4.7,
    reviewCount: 41,
    priceGel: 110,
    clinic: { ka: '„ჰიპოკრატი“, საბურთალო', en: 'Hippocrates, Saburtalo' },
    district: 'saburtalo',
    videoConsult: true,
    insurance: ['imedi', 'alpha', 'gp'],
    about: {
      ka: 'კარდიოლოგი, რომელიც ფოკუსირებულია ჰიპერტენზიისა და გულის უკმარობის მართვაზე.',
      en: 'Cardiologist focused on hypertension and heart failure management.',
    },
    education: [
      { ka: 'თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, 2010', en: 'Tbilisi State Medical University, 2010' },
    ],
    languages: { ka: ['ქართული', 'ინგლისური'], en: ['Georgian', 'English'] },
  },
  {
    id: 8,
    gender: 'male',
    name: { ka: 'საბა კობახიძე', en: 'Saba Kobakhidze' },
    specialty: 'therapist',
    yearsExperience: 7,
    rating: 4.4,
    reviewCount: 22,
    priceGel: 50,
    clinic: { ka: '„ოჯახის ექიმი“, დიდუბე', en: 'Family Doctor, Didube' },
    district: 'didube',
    videoConsult: true,
    insurance: ['unison', 'ardi'],
    about: {
      ka: 'ახალგაზრდა თერაპევტი, რომელიც დარეკომენდებულია ოჯახურ მედიცინასა და პროფილაქტიკაში.',
      en: 'Young therapist recommended for family medicine and prevention.',
    },
    education: [
      { ka: 'თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, 2017', en: 'Tbilisi State Medical University, 2017' },
    ],
    languages: { ka: ['ქართული', 'ინგლისური'], en: ['Georgian', 'English'] },
  },
  {
    id: 9,
    gender: 'female',
    name: { ka: 'ლიკა ფერაძე', en: 'Lika Pkhakadze' },
    specialty: 'dermatologist',
    yearsExperience: 13,
    rating: 4.8,
    reviewCount: 52,
    priceGel: 110,
    clinic: { ka: '„კანის ცენტრი“, ვაკე', en: 'Skin Centre, Vake' },
    district: 'vakhe',
    videoConsult: true,
    insurance: ['imedi', 'bdo', 'alpha'],
    about: {
      ka: 'დერმატოლოგი 13 წლის გამოცდილებით. სპეციალიზებული ფსორიაზისა და ეგზემის მკურნალობაში.',
      en: 'Dermatologist with 13 years of experience. Specialised in psoriasis and eczema treatment.',
    },
    education: [
      { ka: 'თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, 2011', en: 'Tbilisi State Medical University, 2011' },
    ],
    languages: { ka: ['ქართული', 'ინგლისური', 'ფრანგული'], en: ['Georgian', 'English', 'French'] },
  },
  {
    id: 10,
    gender: 'male',
    name: { ka: 'ვაჟა ჩიქოვანი', en: 'Vazha Chikovani' },
    specialty: 'ent',
    yearsExperience: 22,
    rating: 4.9,
    reviewCount: 58,
    priceGel: 130,
    clinic: { ka: '„მედ-აუდიო“, ნაძალადევი', en: 'Med-Audio, Nadzaladevi' },
    district: 'nadzaladevi',
    videoConsult: false,
    insurance: ['imedi', 'bdo', 'alpha', 'unison'],
    about: {
      ka: 'ვეტერანი ოტორინოლარინგოლოგი. სმენის დარღვევების დიაგნოსტიკისა და მკურნალობის ლიდერი.',
      en: 'Veteran ENT specialist. Leader in diagnosis and treatment of hearing disorders.',
    },
    education: [
      { ka: 'თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, 2002', en: 'Tbilisi State Medical University, 2002' },
    ],
    languages: { ka: ['ქართული', 'რუსული', 'ინგლისური'], en: ['Georgian', 'Russian', 'English'] },
  },
  {
    id: 11,
    gender: 'female',
    name: { ka: 'ნათია სურმავა', en: 'Natia Surmava' },
    specialty: 'pediatrician',
    yearsExperience: 10,
    rating: 4.6,
    reviewCount: 33,
    priceGel: 75,
    clinic: { ka: '„ბავშვთა ჯანდაცვა“, ძველი ქალაქი', en: 'Pediatric Care, Old Town' },
    district: 'old',
    videoConsult: true,
    insurance: ['alpha', 'unison', 'ardi'],
    about: {
      ka: 'პედიატრი, რომელიც აქცენტს აკეთებს ბავშვთა კვებასა და იმუნიზაციაზე.',
      en: 'Pediatrician with a focus on child nutrition and immunisation.',
    },
    education: [
      { ka: 'თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, 2014', en: 'Tbilisi State Medical University, 2014' },
    ],
    languages: { ka: ['ქართული', 'ინგლისური'], en: ['Georgian', 'English'] },
  },
  {
    id: 12,
    gender: 'male',
    name: { ka: 'ბესო თავბერიძე', en: 'Beso Tavberidze' },
    specialty: 'dentist',
    yearsExperience: 16,
    rating: 4.7,
    reviewCount: 45,
    priceGel: 150,
    clinic: { ka: '„დენტალ-პლუსი“, საბურთალო', en: 'Dental Plus, Saburtalo' },
    district: 'saburtalo',
    videoConsult: false,
    insurance: ['imedi', 'bdo', 'gp'],
    about: {
      ka: 'სტომატოლოგი 16 წლის გამოცდილებით. იმპლანტაციისა და ქირურგიული სტომატოლოგიის ექსპერტი.',
      en: 'Dentist with 16 years of experience. Expert in implants and surgical dentistry.',
    },
    education: [
      { ka: 'თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, 2008', en: 'Tbilisi State Medical University, 2008' },
    ],
    languages: { ka: ['ქართული', 'ინგლისური', 'რუსული'], en: ['Georgian', 'English', 'Russian'] },
  },
];

export const doctors: Doctor[] = doctorBlueprints.map((b, i) => ({
  ...b,
  photo: doctorPhotos[i],
  reviews: makeReviews(b.id + 2, 3 + (b.id % 3)),
  availability: makeAvailability(b.id),
}));

export function getDoctorById(id: number): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}

export function displayName(doc: Doctor, lang: Lang): string {
  return lang === 'ka' ? doc.name.ka : `Dr. ${doc.name.en}`;
}

export function doctorName(doc: Doctor, lang: Lang): string {
  return displayName(doc, lang);
}

export function specialtyLabel(key: SpecialtyKey, lang: Lang): string {
  const labels: Record<SpecialtyKey, { ka: string; en: string }> = {
    therapist: { ka: 'თერაპევტი', en: 'Therapist' },
    cardiologist: { ka: 'კარდიოლოგი', en: 'Cardiologist' },
    dermatologist: { ka: 'დერმატოლოგი', en: 'Dermatologist' },
    ent: { ka: 'ოტორინოლარინგოლოგი', en: 'ENT Specialist' },
    pediatrician: { ka: 'პედიატრი', en: 'Pediatrician' },
    dentist: { ka: 'სტომატოლოგი', en: 'Dentist' },
  };
  return labels[key][lang];
}

export function districtLabel(key: DistrictKey, lang: Lang): string {
  const labels: Record<DistrictKey, { ka: string; en: string }> = {
    vera: { ka: 'ვერა', en: 'Vera' },
    vakhe: { ka: 'ვაკე', en: 'Vake' },
    saburtalo: { ka: 'საბურთალო', en: 'Saburtalo' },
    didube: { ka: 'დიდუბე', en: 'Didube' },
    nadzaladevi: { ka: 'ნაძალადევი', en: 'Nadzaladevi' },
    isani: { ka: 'ისანი', en: 'Isani' },
    chugureti: { ka: 'ჩუღურეთი', en: 'Chugureti' },
    old: { ka: 'ძველი ქალაქი', en: 'Old Town' },
  };
  return labels[key][lang];
}

export function insuranceLabel(key: InsuranceKey, lang: Lang): string {
  const labels: Record<InsuranceKey, { ka: string; en: string }> = {
    imedi: { ka: 'იმედი L', en: 'Imedi L' },
    bdo: { ka: 'BDO', en: 'BDO' },
    alpha: { ka: 'ალფა', en: 'Alpha' },
    unison: { ka: 'უნისონი', en: 'Unison' },
    ardi: { ka: 'არდი', en: 'Ardi' },
    gp: { ka: 'ჯი-პი დაზღვევა', en: 'GP Insurance' },
  };
  return labels[key][lang];
}
