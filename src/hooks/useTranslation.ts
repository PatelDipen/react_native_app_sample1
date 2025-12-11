import { useState, useCallback } from 'react';
import { t, setLanguage as setLang, getCurrentLanguage } from '@/utils/i18n';
import { translations } from '@/locales';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<typeof translations.en>;

export const useTranslation = () => {
  const [language, setCurrentLanguage] = useState(getCurrentLanguage());

  const translate = useCallback((key: TranslationKey, params?: Record<string, string | number>) => {
    return t(key, params);
  }, []);

  const setLanguage = useCallback((lang: keyof typeof translations) => {
    setLang(lang);
    setCurrentLanguage(lang);
  }, []);

  return {
    t: translate,
    language,
    setLanguage,
  };
};
