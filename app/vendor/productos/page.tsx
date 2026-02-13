import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ProductoTable } from '@/modules/productos/dashboard/ProductoTable';
import { getMyShop } from '@/modules/shops/shop.repository';
import { getProductsDashboard } from '@/modules/productos/productos.repository';
import { OwnerProduct } from '@/modules/productos/products.schemas';
import { ProductoCreateSheet } from '@/modules/productos/dashboard/ProductoCreateSheet';

export default async function ProductosPage() {

  const shop = await getMyShop();
  if (!shop) notFound()

  // Cargar productos (RLS ya filtra por tienda)
  const productos: OwnerProduct[] = await getProductsDashboard(shop.id);
  
  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona el catálogo de tu tienda
          </p>
        </div>

        <ProductoCreateSheet>
          <Button>Nuevo producto</Button>
        </ProductoCreateSheet>

      </div>

      {/* Listado */}
      <section className="space-y-2">
        <ProductoTable productos={productos} />
      </section>
    </div>
  );
}
