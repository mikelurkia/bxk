import { redirect } from 'next/navigation';
import { getMyShop } from '@/modules/shops/shop.repository';
import { Button } from '@/components/ui/button';
import { Store } from 'lucide-react';
import { shopSchema } from '@/modules/shops/shop.schemas';

export default async function DashboardPage() {
  
  const tienda = await getMyShop();
  
  const formatedValues = shopSchema.safeParse(tienda);
  if (!formatedValues.success) {
    console.error('Error formateando la tienda en dashboard:', formatedValues.error);
    return (
      <div className="space-y-6">Error</div>)
  }
  
  if (!tienda) {
    redirect('/login');
  }

  return (

    <div className="space-y-6">

      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Gestión de <strong>{tienda.name}</strong>
          </p>
        </div>
        <a href="/tienda"><Button>Editar</Button></a>
      </header>

      <section className="rounded border p-4">
        <h2 className="font-semibold flex items-center"><Store className="mr-2 h-4 w-4" />Tu tienda</h2>
        
        {tienda.description && (
          <p className="text-sm text-muted-foreground">
            {tienda.description}
          </p>
        )}

        {tienda.address && (
          <div>
            <label className="text-sm text-muted-foreground font-medium">Dirección</label>
            <p className="text-sm text-muted-foreground">
              {tienda.address}
            </p>
          </div>
        )}

        {tienda.phone && (
          <div>
            <label className="text-sm text-muted-foreground font-medium">Teléfono</label>
            <p className="text-sm text-muted-foreground">
              {tienda.phone}
            </p>
          </div>

        )}

        {tienda.whatsapp && (
          <div>
            <label className="text-sm text-muted-foreground font-medium">Whatsapp</label>
            <p className="text-sm text-muted-foreground">
              {tienda.whatsapp}
            </p>
          </div>
        )}

        {tienda.instagram && (
          <div>
            <label className="text-sm text-muted-foreground font-medium">Instagram</label>
            <p className="text-sm text-muted-foreground">
              {tienda.instagram}
            </p>
          </div>
        )}

      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <a
          href="/productos"
          className="rounded border p-4 hover:bg-muted"
        >
          <h3 className="font-medium">Productos</h3>
          <p className="text-sm text-muted-foreground">
            Gestiona tu catálogo
          </p>
        </a>

        <a
          href="/tienda"
          className="rounded border p-4 hover:bg-muted"
        >
          <h3 className="font-medium">Tienda</h3>
          <p className="text-sm text-muted-foreground">
            Información general
          </p>
        </a>

      </section>

      <section>

        <a key={tienda.id} href={process.env.NEXT_PUBLIC_URL + `/tienda/${tienda.slug}`} className="text-sm underline" >
          Ver escaparate público
        </a>
      </section>
    </div>
  );
}
