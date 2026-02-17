import { redirect } from 'next/navigation';
import { ShopUpdateForm } from '@/modules/shops/dashboard/ShopUpdateForm';
import { getMyShop } from '@/modules/shops/shop.repository';
import { Shop } from '@/modules/shops/shop.schemas';

export default async function DashboardPage() {

  // Obtain vendor shop
  const shop: Shop | null = await getMyShop();
  
  if (!shop) {
    redirect("" + process.env.NEXT_PUBLIC_URL);
  }
  
  return (

    <div className="space-y-6">
      <div className="flex-none">
        <h3 className="text-lg font-medium">Tienda</h3>
        <p className="text-muted-foreground text-sm">Datos de tu tienda.</p>
      </div>
      <ShopUpdateForm shop={shop} />
    </div>
  );
}
