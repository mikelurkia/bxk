import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, Locale } from './config';

// Namespaces disponibles
const namespaces = ['common', 'auth'/*, 'products', 'shops', 'home'*/] as const;

export default getRequestConfig(async ({ locale }) => {
  let resolvedLocale: string =
    locale && locales.includes(locale as Locale) ? locale : defaultLocale;

  // ✅ Cargar dinámicamente todos los namespaces
  const messages: Record<string, any> = {};

  for (const namespace of namespaces) {
    try {
      const imported = await import(
        `./locales/${resolvedLocale}/${namespace}.json`
      );
      messages[namespace === 'common' ? 'default' : namespace] = imported.default;
    } catch (error) {
      console.warn(`No se pudo cargar ${namespace} para ${resolvedLocale}`);
    }
  }

  return {
    messages,
    locale: resolvedLocale,
  };
});