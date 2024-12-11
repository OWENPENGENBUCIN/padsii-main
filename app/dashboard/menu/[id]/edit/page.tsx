import React from 'react';

import Breadcrumbs from '@/app/ui/menu/breadcrumbs';
import EditMenuForm from '@/app/ui/menu/edit-form';
import { fetchMenuById } from '@/app/lib/menu/cruds-menu';



interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;  
  const menu = await fetchMenuById(id);  

  if (!menu) {
    return <div>Member not found</div>; 
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Menu', href: '/dashboard/menu' },
          {
            label: 'Edit Menu',
            href: `/dashboard/menu/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditMenuForm menu={menu} />
    </main>
  );
}

