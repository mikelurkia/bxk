import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ProductTable } from '@/modules/products/dashboard/ProductTable';
import { getMyShop } from '@/modules/shops/shop.repository';
import { getProductsDashboard } from '@/modules/products/products.repository';
import { Product } from '@/modules/products/products.schemas';
import { ProductCreateSheet } from '@/modules/products/dashboard/ProductCreateSheet';

export default async function ProductosPage() {

  const shop = await getMyShop();
  if (!shop) notFound()

  // Cargar productos (RLS ya filtra por tienda)
  const products: Product[] = await getProductsDashboard(shop.id);
  
  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona el catálogo de tu tienda
          </p>
        </div>

        <ProductCreateSheet>
          <Button>Nuevo producto</Button>
        </ProductCreateSheet>

      </div>

      {/* Listado */}
      <section className="space-y-2">
        <ProductTable products={products} />
      </section>
    </div>
  );
}
