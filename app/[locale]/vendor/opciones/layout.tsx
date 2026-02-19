import { SidebarOpciones } from "@/components/vendor/opciones/sidebarOpciones";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Opciones</h1>
        <p className="text-muted-foreground">
          Actualiza las preferencias de tu cuenta y gestiona las integraciones.
        </p>
      </div>
      <div className="flex flex-1">
        <SidebarOpciones/>
        <div className="flex-1 flex-grow p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
