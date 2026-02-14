import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';

export function ProductoConfiguracionTabs({
  atributos,
  variantes,
}: {
  atributos: React.ReactNode;
  variantes: React.ReactNode;
}) {
  return (
    <Tabs defaultValue="atributos">
      <TabsList>
        <TabsTrigger value="atributos">
          Atributos
        </TabsTrigger>
        <TabsTrigger value="variantes">
          Variantes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="atributos" className="pt-4">
        {atributos}
      </TabsContent>

      <TabsContent value="variantes" className="pt-4 space-y-6">
        {variantes}
      </TabsContent>
    </Tabs>
  );
}
