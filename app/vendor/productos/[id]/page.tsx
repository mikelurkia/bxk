import { notFound } from 'next/navigation';

import { getProductDashboardById } from '@/modules/productos/productos.repository';

import { ProductoDatosCard } from '@/modules/productos/dashboard/ProductoDatosCard';
import { ProductUpdateForm } from '@/modules/productos/dashboard/ProductUpdateForm';

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductoPage({ params, }: Props) {

  const { id } = await params;

  // 1️⃣ cargar producto (RLS ya filtra)
  const product = await getProductDashboardById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">
          {product.name}
        </h1>
        <p className="text-muted-foreground">
          Configura el producto, sus atributos y variantes
        </p>
      </header>

      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <ProductoDatosCard>
          <ProductUpdateForm product={product} />
        </ProductoDatosCard>

        {/* Columna derecha */}
        <div className="lg:col-span-1">
          <p>Columna derecha</p>
        </div>
      </div>
    </div>
  );
}