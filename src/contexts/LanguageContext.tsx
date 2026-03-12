import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "uz" | "ru";

export const translations = {
  en: {
    nav: {
      home: "Home",
      appointments: "Appointments",
      health: "Health",
      messages: "Messages",
      account: "Account",
    },
    account: {
      title: "Account",
      publicInsurance: "Public insurance",
      privateInsurance: "Private insurance",
      personalInfo: "Personal information",
      insurancePayment: "Insurance & Payment",
      notifications: "Notifications",
      settings: "Settings",
      helpSupport: "Help & Support",
      logout: "Log out",
      edit: "Edit",
      cancel: "Cancel",
      saveChanges: "Save Changes",
      language: "Language",
    },
    search: {
      title: "Find a Doctor",
      placeholder: "Name, specialty, practice...",
      label: "Search doctors",
      results: "results",
      subtitle: "Find practitioners and book online",
      loading: "Loading doctors...",
      noResults: "No doctors found",
      availability: "Availability",
      public: "Public",
      moreFilters: "More Filters",
      allSpecialties: "All Specialties",
    },
    ai: {
      title: "MedLink AI",
      placeholder: "Describe your symptoms...",
      greeting: "Hello! I'm MedLink AI. How can I help you today?",
      fallback: "Thank you for sharing. I've logged your symptoms. Would you like me to help find a specialist?",
    },
  },
  uz: {
    nav: {
      home: "Bosh sahifa",
      appointments: "Uchrashuvlar",
      health: "Salomatlik",
      messages: "Xabarlar",
      account: "Profil",
    },
    account: {
      title: "Profil",
      publicInsurance: "Davlat sug'urtasi",
      privateInsurance: "Xususiy sug'urta",
      personalInfo: "Shaxsiy ma'lumotlar",
      insurancePayment: "Sug'urta & To'lov",
      notifications: "Bildirishnomalar",
      settings: "Sozlamalar",
      helpSupport: "Yordam & Qo'llab-quvvatlash",
      logout: "Chiqish",
      edit: "Tahrirlash",
      cancel: "Bekor qilish",
      saveChanges: "Saqlash",
      language: "Til",
    },
    search: {
      title: "Shifokor topish",
      placeholder: "Ism, mutaxassislik...",
      label: "Shifokor qidirish",
      results: "natija",
      subtitle: "Mutaxassislarni toping va onlayn yozing",
      loading: "Shifokorlar yuklanmoqda...",
      noResults: "Shifokor topilmadi",
      availability: "Mavjudlik",
      public: "Davlat",
      moreFilters: "Ko'proq filtrlar",
      allSpecialties: "Barcha mutaxassisliklar",
    },
    ai: {
      title: "MedLink AI",
      placeholder: "Belgilaringizni tasvirlab bering...",
      greeting: "Salom! Men MedLink AI. Bugun qanday yordam bera olaman?",
      fallback: "Ma'lumot uchun rahmat. Belgilaringiz qayd etildi. Mutaxassis topishga yordam beraymi?",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      appointments: "Приёмы",
      health: "Здоровье",
      messages: "Сообщения",
      account: "Профиль",
    },
    account: {
      title: "Профиль",
      publicInsurance: "Государственная страховка",
      privateInsurance: "Частная страховка",
      personalInfo: "Личные данные",
      insurancePayment: "Страховка & Оплата",
      notifications: "Уведомления",
      settings: "Настройки",
      helpSupport: "Помощь & Поддержка",
      logout: "Выйти",
      edit: "Изменить",
      cancel: "Отмена",
      saveChanges: "Сохранить",
      language: "Язык",
    },
    search: {
      title: "Найти врача",
      placeholder: "Имя, специальность...",
      label: "Поиск врачей",
      results: "результатов",
      subtitle: "Найдите врача и запишитесь онлайн",
      loading: "Загрузка врачей...",
      noResults: "Врачи не найдены",
      availability: "Доступность",
      public: "Гос. страховка",
      moreFilters: "Ещё фильтры",
      allSpecialties: "Все специальности",
    },
    ai: {
      title: "MedLink AI",
      placeholder: "Опишите ваши симптомы...",
      greeting: "Здравствуйте! Я MedLink AI. Чем могу помочь сегодня?",
      fallback: "Спасибо, что поделились. Симптомы записаны. Помочь найти специалиста?",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem("medlink-lang") as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("medlink-lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
