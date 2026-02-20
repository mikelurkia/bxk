import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { createServerClient } from "@supabase/ssr";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 1️⃣ Procesar i18n primero
  const response = intlMiddleware(request);

  // Si next-intl ya redirigió, devolverla
  if (response.headers.get("location")) {
    return response;
  }

  // 2️⃣ Detectar subdominio
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  const isVendorRoute = pathname.includes("/vendor");
  const isAdminRoute  = pathname.includes("/admin");

  // Rutas públicas
  const publicRoutes = ["/login", "/forgot-password", "/reset-password"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.includes(route)
  );

  if (isPublicRoute) {
    return response;
  }

  // 3️⃣ Proteger subdominios
  if (isAdminRoute || isVendorRoute) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set({ name, value, ...options });
            });
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const locale = pathname.split("/")[1];
      return NextResponse.redirect(
        new URL(`/${locale}/login`, request.url)
      );
    }

    if (isAdminRoute) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        const locale = pathname.split("/")[1];
        return NextResponse.redirect(
          new URL(`/${locale}`, request.url)
        );
      }
    }
  }

  return response;
}

export const config = {
  matcher: ["/(es|eu)/:path*", "/((?!api|_next|.*\\..*).*)"],
};