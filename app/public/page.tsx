import { getPublicShops } from '@/modules/shops/shop.repository';
import { TiendaPublico } from '@/modules/shops/shop.types';

export default async function HomePage() {

  const tiendas: TiendaPublico[] = await getPublicShops();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        El catálogo de tiendas de Oñati
      </h1>

      {tiendas?.map((tienda) => (
        <a
          key={tienda.id}
          href={`/tienda/${tienda.slug}`}
          className="block rounded border p-4 hover:bg-muted"
        >
          <h2 className="font-semibold">{tienda.nombre}</h2>
          {tienda.descripcion && (
            <p className="text-sm text-muted-foreground">
              {tienda.descripcion}
            </p>
          )}
        </a>
      ))}
    </div>
  );
}
