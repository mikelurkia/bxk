import { createServerClient } from '@supabase/ssr';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
 
const isProd = process.env.NODE_ENV === 'production';

const intlMiddleware = createMiddleware(
  {...routing,
    localeCookie: {
      name: 'NEXT_LOCALE',
      path: '/',
      domain: isProd ? '.vercel.bxk.com' : undefined, // 🔥 clave
      sameSite: 'lax'
    }
  });

export async function proxy(request: NextRequest) {

  const response = intlMiddleware(request);
  
  // 2. Si ya hay redirección, devolverla
  if (response.headers.get("location")) {
    return response;
  }

  // 3. Proteger rutas según subdominio y autenticación
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;
  const isAdminSubdomain = hostname.startsWith("admin.");
  const isVendorSubdomain = hostname.startsWith("app.");

  console.log("Hostname:", hostname);
  console.log("Pathname:", pathname);
  console.log("Is Admin Subdomain:", isAdminSubdomain);
  console.log("Is Vendor Subdomain:", isVendorSubdomain);

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

  // Rutas públicas
  const isPublicRoute = pathname.match(/\/(es|eu)\/?(login)?$/);

  // Si no hay usuario y está en ruta protegida
  if ((isVendorSubdomain || isAdminSubdomain) && !user) {
    const locale = pathname.split("/")[1];
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // Validar rol para admin
  if (isAdminSubdomain && user) {

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();

    if (profile?.role !== "admin") {
      const locale = pathname.split("/")[1];
      return NextResponse.redirect(
        new URL(`/${locale}`, request.url)
      );
    }
  }

  return response;
}

export const config = {
   matcher: [
    '/',
    '/(es|eu)/:path*',
    '/((?!api|_next|.*\\..*).*)'
  ]
}