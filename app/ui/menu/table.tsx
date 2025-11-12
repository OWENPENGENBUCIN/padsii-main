import { DeleteMenuButton, UpdateMenuButton } from '@/app/ui/menu/buttons';
import { fetchFilteredMenu } from '@/app/lib/menu/menu';

export default async function MenuTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  try {
    const menus = await fetchFilteredMenu(query, currentPage);

    // ✅ Fungsi untuk format harga jadi Rp. 10.000
    const formatRupiah = (value: number) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      })
        .format(value)
        .replace('IDR', 'Rp')
        .trim();
    };

    return (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            
            {/* TAMPILAN MOBILE */}
            <div className="md:hidden">
              {menus?.map((menu) => (
                <div
                  key={menu.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">{menu.nama_menu}</p>
                      <p className="text-gray-700">
                        Harga: {formatRupiah(menu.harga_menu)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TAMPILAN DESKTOP */}
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-3 py-5 font-medium">Nama Menu</th>
                  <th scope="col" className="px-3 py-5 font-medium">Harga</th>
                  <th scope="col" className="px-3 py-5 font-medium"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {menus?.map((menu) => (
                  <tr
                    key={menu.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none
                    [&:first-child>td:first-child]:rounded-tl-lg
                    [&:first-child>td:last-child]:rounded-tr-lg
                    [&:last-child>td:first-child]:rounded-bl-lg
                    [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap px-3 py-3">
                      <p>{menu.nama_menu}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatRupiah(menu.harga_menu)}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateMenuButton id={menu.id} />
                        <DeleteMenuButton id={menu.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return <div>Error fetching menu data</div>;
  }
}
