import { translations, defaultLanguage, TranslationKeys } from '@/locales';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<TranslationKeys>;

let currentLanguage = defaultLanguage;

export const setLanguage = (language: keyof typeof translations) => {
  currentLanguage = language;
};

export const getCurrentLanguage = () => currentLanguage;

// Get nested value from object using dot notation
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
};

// Simple string interpolation
const interpolate = (
  str: string,
  params?: Record<string, string | number>,
): string => {
  if (!params) return str;

  return Object.keys(params).reduce((result, key) => {
    return result.replace(new RegExp(`{{${key}}}`, 'g'), String(params[key]));
  }, str);
};

export const t = (
  key: TranslationKey,
  params?: Record<string, string | number>,
): string => {
  const translation =
    translations[currentLanguage as keyof typeof translations];
  const value = getNestedValue(translation, key);
  return interpolate(value, params);
};

// Alias for translate
export const translate = t;
