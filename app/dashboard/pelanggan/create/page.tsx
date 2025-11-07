import React from 'react';
import PelangganCreateForm from '@/app/ui/pelanggan/create-form';
import Breadcrumbs from '@/app/ui/pelanggan/breadcrumbs';
import { PelangganTable } from '@/app/lib/definitions';

export default function pelangganCreatePage() {
  const pelanggans: PelangganTable[] = [];

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Pelanggan', href: '/dashboard/pelanggan' },
          {
            label: 'Create Pelanggan',
            href: '/dashboard/pelanggan/create',
            active: true,
          },
        ]}
      />
      <PelangganCreateForm  />
    </main>
  );
}
