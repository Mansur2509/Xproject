import { useEffect, type ReactNode } from 'react';
import { useI18nStore } from '@shared/lib/i18n';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { language, setLanguage } = useI18nStore();

  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  return <>{children}</>;
};
