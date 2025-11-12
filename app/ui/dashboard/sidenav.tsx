import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
 
export default function SideNav() {
  return (
    <div className="flex flex-col h-screen overflow-y-auto px-3 py-4 md:px-2 bg-gray-50">
      <div className="flex flex-col flex-grow justify-between space-y-2">
        <div className="grow">
          <NavLinks />
        </div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
