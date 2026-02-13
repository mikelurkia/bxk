import { notFound } from 'next/navigation';

import { getShopPublicBySlug } from '@/modules/shops/shop.repository';
import { getProductPublicBySlug } from '@/modules/productos/productos.repository';
import { PublicShop } from '@/modules/shops/shop.schemas';
import { PublicProduct } from '@/modules/productos/products.schemas';

/**
 * 🔹 Tipos que vienen del server
 */
type AtributosDefinidos = Record<
  string,
  {
    tipo: 'select' | 'text';
    valores?: string[];
  }
>;

type ProductoPublico = {
  id: string;
  nombre: string;
  descripcion: string | null;
};

type Props = {
  params: Promise<{
    tiendaSlug: string;
    productoSlug: string;
  }>;
};

export default async function ProductoPublicoPage({params}: Props) {
  
  const { tiendaSlug, productoSlug } = await params;

  const shop: PublicShop | null = await getShopPublicBySlug(tiendaSlug);
  if (!shop) notFound();
  
  const product: PublicProduct | null = await getProductPublicBySlug( shop.id, productoSlug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-xl space-y-6">
      {/* 🔹 Info básica */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          {product.name}
        </h1>

        {product.description && (
          <p className="text-muted-foreground">
            {product.description}
          </p>
        )}
      </header>

      <p>Ficha de producto. TODO</p>

    </div>
  );
}