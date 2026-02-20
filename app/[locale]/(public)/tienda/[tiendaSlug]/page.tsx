import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getProductsPublic } from '@/modules/products/products.repository';
import { PublicProduct } from '@/modules/products/products.schemas';
import { getShopPublicBySlug } from '@/modules/shops/shop.repository';
import { PublicShop } from '@/modules/shops/shop.schemas';
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
  const shop: PublicShop | null = await getShopPublicBySlug(tiendaSlug);
  if (!shop) notFound();

  // Obtener productos públicos de la tienda
  const products: PublicProduct[] = await getProductsPublic(shop.id);

  // Renderizar la página de la tienda con sus productos
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {shop.name}
      </h1>

      {shop.description && (
        <p className="text-muted-foreground">
          {shop.description}
        </p>
      )}

      <h1 className="mb-6 text-2xl font-bold">
        Productos
      </h1>

      {products?.length === 0 && (
        <p className="text-muted-foreground">
          La tienda todavía no ha registrado ningún producto.
        </p>
      )}

      <div className="space-y-4">
        {products?.map((product) => (
          <a key={product.id} href={`/tienda/${tiendaSlug}/producto/${product.slug}`} className="block rounded border p-3">
            <h3 className="font-medium">{product.name}</h3>
            {product.description && (
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
