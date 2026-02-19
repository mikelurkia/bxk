export const locales = ['es', 'eu'] as const;
export const defaultLocale = 'es' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  es: 'Castellano',
  eu: 'Euskara',
};