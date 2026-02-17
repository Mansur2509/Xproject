import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useI18nStore, type Language } from '@shared/lib/i18n';
import './LanguageSelector.css';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
];

export const LanguageSelector = () => {
  const { language, setLanguage } = useI18nStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="language-selector">
      <button className="language-button" onClick={() => setIsOpen(!isOpen)}>
        <Globe size={18} />
        <span className="language-flag">{currentLanguage.flag}</span>
        <span className="language-label">{currentLanguage.label}</span>
      </button>
      {isOpen && (
        <>
          <div className="language-overlay" onClick={() => setIsOpen(false)} />
          <div className="language-dropdown">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`language-option ${language === lang.code ? 'active' : ''}`}
                onClick={() => handleSelect(lang.code)}
              >
                <span className="language-flag">{lang.flag}</span>
                <span>{lang.label}</span>
                {language === lang.code && <Check size={16} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
