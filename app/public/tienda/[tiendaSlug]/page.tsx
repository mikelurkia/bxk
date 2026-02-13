import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getProductsPublic } from '@/modules/productos/productos.repository';
import { getShopPublicBySlug } from '@/modules/shops/shop.repository';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ tiendaSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { tiendaSlug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: tienda } = await supabase
    .from('tiendas')
    .select('nombre, descripcion')
    .eq('slug', tiendaSlug)
    .maybeSingle();

  if (!tienda) return {};

  return {
    title: `${tienda.nombre} | Comercio local`,
    description: tienda.descripcion ?? undefined,
    openGraph: {
      title: tienda.nombre,
      description: tienda.descripcion ?? undefined,
    },
  };
}

export default async function TiendaPage({ params }: Props) {

  // Obtener el slug de la tienda desde los parámetros
  const { tiendaSlug } = await params;

  // Obtener datos de la tienda por slug
  const tienda = await getShopPublicBySlug(tiendaSlug);
  if (!tienda) notFound();

  // Obtener productos públicos de la tienda
  const productos = await getProductsPublic(tienda.id);

  // Renderizar la página de la tienda con sus productos
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {tienda.nombre}
      </h1>

      {tienda.descripcion && (
        <p className="text-muted-foreground">
          {tienda.descripcion}
        </p>
      )}

      <h1 className="mb-6 text-2xl font-bold">
        Productos
      </h1>

      {productos?.length === 0 && (
        <p className="text-muted-foreground">
          La tienda todavía no ha registrado ningún producto.
        </p>
      )}

      <div className="space-y-4">
        {productos?.map((producto) => (
          <a
            key={producto.id}
            href={`/tienda/${tiendaSlug}/producto/${producto.slug}`}
            className="block rounded border p-3"
          >
            <h3 className="font-medium">{producto.name}</h3>
            {producto.description && (
              <p className="text-sm text-muted-foreground">
                {producto.description}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
