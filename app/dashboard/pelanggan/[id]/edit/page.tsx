import React from 'react';
import { fetchPelangganById } from '@/app/lib/pelanggans/cruds-pelanggan'; 
import Breadcrumbs from '@/app/ui/pelanggan/breadcrumbs';
import EditPelangganForm from '@/app/ui/pelanggan/edit-form';



interface PageProps {
  params: Promise<{ id: string }>;
}


export default async function Page({ params }: PageProps) {
  const { id } = await params;  // Menunggu resolve dari Promise
  const pelanggan = await fetchPelangganById(id);  // Mengambil data diskon berdasarkan id

  if (!pelanggan) {
    return <div>Pelanggan not found</div>; 
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'pelanggan', href: '/dashboard/pelanggan' },
          {
            label: 'Edit pelanggan ',
            href: `/dashboard/pelanggan/${id}/edit`,
            active: true
          },
        ]}
      />
      <EditPelangganForm pelanggan={pelanggan} />
    </main>
  );
}
