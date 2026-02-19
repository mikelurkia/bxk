import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider"
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
    <html lang={locale} suppressHydrationWarning >
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider  attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header/>
            <main className="mx-auto p-4 flex-1 flex-grow gap-6 w-full max-w-5xl">
              {children}
            </main>
            <Footer/>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
