import { getPublicShops } from '@/modules/shops/shop.repository';
import { PublicShop } from '@/modules/shops/shop.schemas';

export default async function HomePage() {

  const shops: PublicShop[] = await getPublicShops();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        El catálogo de tiendas de Oñati
      </h1>

      {shops?.map((shop) => (
        <a
          key={shop.id}
          href={`/tienda/${shop.slug}`}
          className="block rounded border p-4 hover:bg-muted"
        >
          <h2 className="font-semibold">{shop.name}</h2>
          {shop.description && (
            <p className="text-sm text-muted-foreground">
              {shop.description}
            </p>
          )}
        </a>
      ))}
    </div>
  );
}
