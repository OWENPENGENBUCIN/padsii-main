import { DeletePelangganButton, UpdatePelangganButton } from '@/app/ui/pelanggan/buttons';
import { fetchFilteredPelanggans } from '@/app/lib/pelanggans/pelanggan';

export default async function PelangganTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  try {
    const pelanggan = await fetchFilteredPelanggans(query, currentPage);

    return (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {pelanggan?.map((pelanggan) => (
                <div
                  key={pelanggan.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div>
                          <p>{pelanggan.nama_pelanggan}</p>
                          <p>{pelanggan.nohp_pelanggan}</p>
                          <p>{pelanggan.referral_count}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Nama Pelanggan
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    No HP
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                   Referal Count
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {pelanggan?.map((pelanggan) => (
                  <tr
                    key={pelanggan.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap px-3 py-3">
                      <div className="flex items-center gap-3">
                        <p>{pelanggan.nama_pelanggan}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <p>{pelanggan.nohp_pelanggan}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <p>{pelanggan.referral_count}</p>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdatePelangganButton id={pelanggan.id} />
                        <DeletePelangganButton id={pelanggan.id} />
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
    console.error('Error fetching pelanggan data:', error);
    return <div>Error fetching pelanggan data</div>;
  }
}
