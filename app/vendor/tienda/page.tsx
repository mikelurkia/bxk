import { redirect } from 'next/navigation';
import { ShopUpdateForm } from '@/modules/shops/dashboard/ShopUpdateForm';
import { getMyShop } from '@/modules/shops/shop.repository';

export default async function DashboardPage() {

  const tienda = await getMyShop();

  if (!tienda) {
    redirect('/login');
  }
  
  return (

    <div className="space-y-6">
      <header>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">
            Tu tienda
          </h1>
          <p className="text-muted-foreground">
            Editar datos maestros de tu tienda
          </p>
        </div>
      </header>

      <ShopUpdateForm shop={tienda} />

    </div>
  );
}
