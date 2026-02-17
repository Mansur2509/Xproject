import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'ru' | 'en' | 'uz';

const LANGUAGE_KEY = 'app_language';

export interface Translations {
  [key: string]: {
    ru: string;
    en: string;
    uz: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': { ru: 'Главная', en: 'Home', uz: 'Bosh sahifa' },
  'nav.about': { ru: 'О нас', en: 'About', uz: 'Biz haqimizda' },
  'nav.events': { ru: 'Ивенты', en: 'Events', uz: 'Tadbirlar' },
  'nav.team': { ru: 'Команда', en: 'Team', uz: 'Jamoa' },
  'nav.contact': { ru: 'Контакты', en: 'Contact', uz: 'Aloqa' },
  'nav.pricing': { ru: 'Тарифы', en: 'Pricing', uz: 'Narxlar' },
  'nav.roadmap': { ru: 'Роадмапа', en: 'Roadmap', uz: "Yo'nalish xaritasi" },
  'nav.qr': { ru: 'QR генератор', en: 'QR generator', uz: 'QR generator' },
  'nav.login': { ru: 'Войти', en: 'Login', uz: 'Kirish' },
  'nav.register': { ru: 'Регистрация', en: 'Register', uz: "Ro'yxatdan o'tish" },
  'nav.dashboard': { ru: 'Дашборд', en: 'Dashboard', uz: 'Boshqaruv paneli' },
  'nav.logout': { ru: 'Выйти', en: 'Logout', uz: 'Chiqish' },

  // Dashboard
  'dashboard.welcome': { ru: 'Добро пожаловать', en: 'Welcome', uz: 'Xush kelibsiz' },
  'dashboard.lessons': { ru: 'Уроки', en: 'Lessons', uz: 'Darslar' },
  'dashboard.roadmap': { ru: 'Роадмапа', en: 'Roadmap', uz: "Yo'nalish xaritasi" },
  'dashboard.stats': { ru: 'Статистика', en: 'Statistics', uz: 'Statistika' },
  'dashboard.profile': { ru: 'Профиль', en: 'Profile', uz: 'Profil' },
  'dashboard.settings': { ru: 'Настройки', en: 'Settings', uz: 'Sozlamalar' },

  // Common
  'common.loading': { ru: 'Загрузка...', en: 'Loading...', uz: 'Yuklanmoqda...' },
  'common.save': { ru: 'Сохранить', en: 'Save', uz: 'Saqlash' },
  'common.cancel': { ru: 'Отмена', en: 'Cancel', uz: 'Bekor qilish' },
  'common.delete': { ru: 'Удалить', en: 'Delete', uz: "O'chirish" },
  'common.edit': { ru: 'Редактировать', en: 'Edit', uz: 'Tahrirlash' },
  'common.close': { ru: 'Закрыть', en: 'Close', uz: 'Yopish' },
  'common.next': { ru: 'Далее', en: 'Next', uz: 'Keyingi' },
  'common.back': { ru: 'Назад', en: 'Back', uz: 'Orqaga' },
  'common.complete': { ru: 'Завершить', en: 'Complete', uz: 'Yakunlash' },

  // Hero
  'hero.badge': {
    ru: 'Admisstion triper — комьюнити и практика для поступления',
    en: 'Admisstion triper — community and practice for admissions',
    uz: 'Admisstion triper — qabul uchun komyunitiy va amaliyot',
  },
  'hero.title': {
    ru: 'Учись. Выступай. Создавай.',
    en: 'Learn. Speak. Create.',
    uz: "O'qiyver. Nutq so'zla. Yarat.",
  },
  'hero.lead': {
    ru: 'Мы проводим крупные дебатные турниры, MUN и образовательные тренинги. А еще — менторим по IELTS, SAT и поступлению.',
    en: 'We run debate tournaments, MUN conferences and educational trainings — plus mentoring for IELTS, SAT and admissions.',
    uz: 'Biz debat turnirlari, MUN konferensiyalari va taʼlim treninglarini tashkil qilamiz, shuningdek IELTS, SAT va qabul bo‘yicha mentorlik qilamiz.',
  },
  'hero.cta.primary': {
    ru: 'Присоединиться',
    en: 'Join now',
    uz: "Qo'shilish",
  },
  'hero.cta.secondary': {
    ru: 'Наши ивенты',
    en: 'Our events',
    uz: 'Tadbirlarimiz',
  },
};

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      language: (localStorage.getItem(LANGUAGE_KEY) as Language) || 'ru',
      setLanguage: (lang) => {
        set({ language: lang });
        localStorage.setItem(LANGUAGE_KEY, lang);
        document.documentElement.setAttribute('lang', lang);
      },
    }),
    {
      name: LANGUAGE_KEY,
    }
  )
);

export const t = (key: string, lang?: Language): string => {
  const currentLang = lang || useI18nStore.getState().language;
  const translation = translations[key];
  if (!translation) return key;
  return translation[currentLang] || translation.ru;
};

// Инициализация языка при загрузке
if (typeof window !== 'undefined') {
  const savedLang = (localStorage.getItem(LANGUAGE_KEY) as Language) || 'ru';
  document.documentElement.setAttribute('lang', savedLang);
}
