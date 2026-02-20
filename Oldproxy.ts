import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import createMiddleware from 'next-intl/middleware';

// Extrae el locale de la ruta (ej: /es/tienda/foo → 'es')
function getLocaleFromPath(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  if (locales.includes(segments[0] as any)) {
    return segments[0];
  }
  return null;
}

// Detecta idioma preferido del navegador
function detectLocaleFromHeader(req: NextRequest): string {
  const acceptLang = req.headers.get('accept-language') || '';
  
  // Prioridad: EU > ES > Default
  if (acceptLang.toLowerCase().includes('eu')) return 'eu';
  if (acceptLang.toLowerCase().includes('es')) return 'es';
  
  return defaultLocale;
}

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // /es/public, /eu/public, /public (auto-detecta)
})

export async function proxy(req: NextRequest) {

  


  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const handleI18nRouting = createMiddleware({
    locales: ['es', 'eu'],
    defaultLocale
  });

  const response = handleI18nRouting(req);
  
  const hostname = req.headers.get("host") || "";
  const url = req.nextUrl.clone();
  const isSellerSubdomain = hostname.startsWith("app.");
  const pathname = url.pathname;

  let locale = getLocaleFromPath(pathname);

  console.log('Pathname detectado:', pathname);
  console.log('Locale detectado en la ruta:', locale);
  


  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        get(name) { return req.cookies.get(name)?.value },
        set(name, value, options) {
          // Update the request cookies so subsequent checks see them
          req.cookies.set({ name, value, ...options });
          // Update the response cookies so the browser gets them
          res = NextResponse.next({ request: req });
          res.cookies.set({ name, value, ...options, domain: '.localhost' });
        },
        remove(name, options) {
          req.cookies.set({ name, value: '', ...options });
          res = NextResponse.next({ request: req });
          res.cookies.set({ name, value: '', ...options, domain: '.localhost' });
        },
      },
    }
  )
  
  // This refreshes the token if needed
  const { data: { user } } = await supabase.auth.getUser(); 
  
  // Extrae la parte de la ruta sin el locale
  // Ej: /es/tienda/foo → /tienda/foo
  const pathWithoutLocale = pathname.slice(3); // Elimina /{locale}

  if (isSellerSubdomain) {

    // Si no hay sesión → redirigir a login del seller
    if (!user || url.pathname.startsWith("/login")) {
      url.pathname = `/${locale}/login`
      return NextResponse.rewrite(process.env.NEXT_PUBLIC_URL + url.pathname)
    }

    // Reescribir a carpeta (seller)
    url.pathname = `/${locale}/vendor${pathWithoutLocale}`
    return NextResponse.rewrite(url)
  }

  // PORTAL PÚBLICO
  url.pathname = `/${locale}/public${pathWithoutLocale}`;
  return NextResponse.rewrite(url)

}

export const config = {
   matcher: ['/((?!_next|_vercel|favicon.ico|.well-known|api/.*|.*\\..*|robots\\.txt|sitemap\\.xml).*)', "/(es|eu)/:path*",],
}