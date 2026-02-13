import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export function ProductoDatosCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos del producto</CardTitle>
        <CardDescription>
          Información general visible en el escaparate
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}
