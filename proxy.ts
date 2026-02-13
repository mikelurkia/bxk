import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(req: NextRequest) {

  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
  
  const hostname = req.headers.get("host") || "";
  const url = req.nextUrl.clone();
  const isSellerSubdomain = hostname.startsWith("app.");

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
  

  if (isSellerSubdomain) {

    // Si no hay sesión → redirigir a login del seller
    if (!user || url.pathname.startsWith("/login")) {
      url.pathname = "/login"
      return NextResponse.rewrite(process.env.NEXT_PUBLIC_URL + url.pathname)
    }

    // Reescribir a carpeta (seller)
    url.pathname = `/vendor${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // PORTAL PÚBLICO
  url.pathname = `/public${url.pathname}`
  return NextResponse.rewrite(url)

}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}