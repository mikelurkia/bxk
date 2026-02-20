import { createServerClient } from '@supabase/ssr';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
 
const isProd = process.env.NODE_ENV === 'production';

const intlMiddleware = createMiddleware(
  {...routing,
    localeCookie: {
      name: 'NEXT_LOCALE_TMP',
      path: '/',
      domain: isProd ? '.vercel.bxk.com' : undefined, // 🔥 clave
      sameSite: 'lax'
    },
    pathnames: {
      
      '/': '/',
      'login':'login',
      '/vendor': {
        eu: '/saltzailea',
      },
      'vendor/opciones': {
        eu: 'saltzailea/ezarpenak'
      },
      'vendor/opciones/tienda': {
        eu: 'saltzailea/ezarpenak/denda'
      },
      'vendor/productos': {
        eu: 'saltzailea/produktuak'
      },
      'public': {
        eu: 'publikoa'
      },
      'public/tienda/[tiendaSlug]': {
        eu: 'publikoa/denda/[tiendaSlug]'
      },
      'public/tienda/[tiendaSlug]/producto/[productoSlug]': {
        eu: 'publikoa/denda/[tiendaSlug]/produktua/[productoSlug]'
      }
    }
  });

export async function proxy(request: NextRequest) {

  const response = intlMiddleware(request);
  
  // Si next-intl ya ha decidido redirigir (ej: "/" → "/es") devolvemos esa respuesta inmediatamente
  if (response.headers.get('location')) {
    return response;
  }

  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl.clone();
  const isSellerSubdomain = hostname.startsWith("app.");
  const isRouteProtected  = hostname.startsWith("app.");
  const pathname = url.pathname;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        get(name) { return request.cookies.get(name)?.value },
        set(name, value, options) {
          // Update the request cookies so subsequent checks see them
          request.cookies.set({ name, value, ...options });
          // Update the response cookies so the browser gets them
          let res = NextResponse.next({ request: request });
          res.cookies.set({ name, value, ...options, domain: '.localhost' });
        },
        remove(name, options) {
          request.cookies.set({ name, value: '', ...options });
          let res = NextResponse.next({ request: request });
          res.cookies.set({ name, value: '', ...options, domain: '.localhost' });
        },
      },
    }
  )
  
  // This refreshes the token if needed
  const { data: { user } } = await supabase.auth.getUser(); 
  // Extrae la parte de la ruta sin el locale 
  const pathWithoutLocale = pathname.slice(3); // Elimina /{locale}

  if ((isRouteProtected && !user) || url.pathname.startsWith("/login")) {
    return NextResponse.rewrite(
      new URL(process.env.NEXT_PUBLIC_URL + `/${routing.defaultLocale}/login`, request.url),
      {headers: response.headers}
    );
  }

  // Si es subdominio de seller → reescribir a carpeta (seller)
  if (isSellerSubdomain) {
    return NextResponse.rewrite(
      new URL(process.env.NEXT_PUBLIC_URL + `/${routing.defaultLocale}/vendor${pathWithoutLocale}`, request.url),
      {headers: response.headers}
    );
  }
  else {

    return NextResponse.rewrite(
      new URL(`/${routing.defaultLocale}/public${pathWithoutLocale}`, request.url),
      {headers: response.headers}
    );

  }

}

/*

export async function proxy(req: NextRequest) {

// Step 1: Use the incoming request (example)
  const defaultLocale = req.headers.get('NEXT_LOCALE') || 'eu';
 
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware({
    locales: ['es', 'eu'],
    defaultLocale: defaultLocale as any
  });
  
  let res = handleI18nRouting(req);
 
  // Step 3: Alter the response (example)
  res.headers.set('NEXT_LOCALE', defaultLocale);
  
  const hostname = req.headers.get("host") || "";
  const url = req.nextUrl.clone();
  const isSellerSubdomain = hostname.startsWith("app.");
  const pathname = url.pathname;

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
  
  console.log("Locale:", defaultLocale);

  // This refreshes the token if needed
  const { data: { user } } = await supabase.auth.getUser(); 
  
  // Extrae la parte de la ruta sin el locale
  // Ej: /es/tienda/foo → /tienda/foo
  const pathWithoutLocale = pathname.slice(3); // Elimina /{locale}

  if (isSellerSubdomain) {

    // Si no hay sesión → redirigir a login del seller
    if (!user || url.pathname.startsWith("/login")) {
      url.pathname = `/${defaultLocale}/login`
      return NextResponse.rewrite(process.env.NEXT_PUBLIC_URL + url.pathname)
    }

    // Reescribir a carpeta (seller)
    url.pathname = `/${defaultLocale}/vendor${pathWithoutLocale}`
    return NextResponse.rewrite(url)
  }

  // PORTAL PÚBLICO
  url.pathname = `/${defaultLocale}/public${pathWithoutLocale}`;
  return NextResponse.rewrite(url)

}*/

export const config = {
   matcher: [
    '/',
    '/(es|eu)/:path*',
    '/((?!api|_next|.*\\..*).*)'
  ]
}