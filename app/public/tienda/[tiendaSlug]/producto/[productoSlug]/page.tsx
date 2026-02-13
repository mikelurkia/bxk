import { notFound } from 'next/navigation';

import { TiendaPublico } from '@/modules/shops/shop.types';
import { getTiendaPublicoBySlug } from '@/modules/shops/shop.repository';
import { getProductoPublicoBySlug } from '@/modules/productos/productos.repository';

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

  const tienda: TiendaPublico | null = await getTiendaPublicoBySlug(tiendaSlug);
  if (!tienda) notFound();
  
  const producto: ProductoPublico | null = await getProductoPublicoBySlug( tienda.id, productoSlug);

  if (!producto) {
    notFound();
  }

  return (
    <div className="max-w-xl space-y-6">
      {/* 🔹 Info básica */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          {producto.nombre}
        </h1>

        {producto.descripcion && (
          <p className="text-muted-foreground">
            {producto.descripcion}
          </p>
        )}
      </header>

      <p>Ficha de producto. TODO</p>

    </div>
  );
}