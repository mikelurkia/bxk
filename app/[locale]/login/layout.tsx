import "@/app/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="mx-auto p-4 flex-1 flex-grow gap-6 w-full max-w-5xl">
      {children}
    </main>
  );
}
