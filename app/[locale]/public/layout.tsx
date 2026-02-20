import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Header/>
      <main className="mx-auto p-4 flex-1 flex-grow gap-6 w-full max-w-5xl">
        {children}
      </main>
      <Footer/>
    </>
  );
}
