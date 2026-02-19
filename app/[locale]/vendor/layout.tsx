import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/vendor/header";
import { VendorSidebar } from "@/components/vendor/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { locales } from "@/i18n/config";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BXK",
  description: "Baxauk dendan?",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
  
export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;
    
  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang="es" suppressHydrationWarning >
      <body className="min-h-screen bg-background text-foreground flex">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider  attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SidebarProvider>
              <VendorSidebar/>
              <main className="flex-1">
                <Header/>
                <div className="mx-auto p-4 flex-1 flex-grow gap-6 w-full">
                  {children}
                </div>
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
