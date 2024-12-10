import React from 'react';
import { fetchMemberById } from '@/app/lib/member/cruds-member'; 
import Breadcrumbs from '@/app/ui/member/breadcrumbs';
import EditMemberForm from '@/app/ui/member/edit-form';



interface PageProps {
  params: Promise<{ id: string }>;
}


export default async function Page({ params }: PageProps) {
  const { id } = await params;  // Menunggu resolve dari Promise
  const member = await fetchMemberById(id);  // Mengambil data diskon berdasarkan id

  if (!member) {
    return <div>Member not found</div>; 
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Member', href: '/dashboard/member' },
          {
            label: 'Edit Member',
            href: `/dashboard/member/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditMemberForm member={member} />
    </main>
  );
}
