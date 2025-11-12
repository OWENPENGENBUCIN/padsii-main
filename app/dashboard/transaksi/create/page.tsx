import Form from '@/app/ui/transaksi/create-form';
import Breadcrumbs from '@/app/ui/transaksi/breadcrumbs';
import { fetchMenus } from '@/app/lib/menu/menu';
import { fetchpelanggans } from '@/app/lib/pelanggans/pelanggan';
 
export default async function Page() {
  const menus = await fetchMenus();
  const pelanggans = await fetchpelanggans();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Transaksi', href: '/dashboard/transaksi' },
          {
            label: 'Create Transaksi',
            href: '/dashboard/transaksi/create',
            active: true,
          },
        ]}
      />
      <Form menu={menus} pelanggan={pelanggans} />
    </main>
  );
}