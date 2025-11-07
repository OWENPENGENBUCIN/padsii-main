'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pelanggan } from '@/app/lib/definitions';
import { UserCircleIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { editPelanggan } from '@/app/lib/pelanggans/cruds-pelanggan';

type State = {
  message?: string;
  errors?: {
    nama_pelanggan?: string[];
    nohp_pelanggan?: string[];
  };
};

export default function EditPelangganForm({ pelanggan }: { pelanggan: Pelanggan }) {
  const [state, setState] = useState<State>({ message: '', errors: {} });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setState({ message: '', errors: {} });
  
    const formData = new FormData(e.currentTarget);
  
    const data = {
      nama_pelanggan: formData.get('nama_pelanggan') as string,
      nohp_pelanggan: formData.get('nohp_pelanggan') as string,
    };
  
    try {
      await editPelanggan(pelanggan.id, data);
  
      router.push('/dashboard/pelanggan');
    } catch (error: any) {
      console.error('Error updating pelanggan:', error);
      setState({
        message: error.message || 'An unexpected error occurred.',
        errors: error.errors || {},
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="namaPelanggan" className="mb-2 block text-sm font-medium">
            Nama Pelanggan
          </label>
          <div className="relative">
            <input
              id="namaPelanggan"
              name="nama_Pelanggan"
              type="text"
              defaultValue={pelanggan.nama_pelanggan}
              placeholder="Masukkan nama pelanggan"
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.nama_pelanggan && (
            <div className="mt-2 text-sm text-red-500">
              {state.errors.nama_pelanggan.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="nohpPelanggan" className="mb-2 block text-sm font-medium">
            Nomor HP
          </label>
          <div className="relative">
            <input
              id="nohpPelanggan"
              name="nohp_pelanggan"
              type="text"
              defaultValue={pelanggan.nohp_pelanggan}
              placeholder="Masukkan nomor HP"
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.nohp_pelanggan && (
            <div className="mt-2 text-sm text-red-500">
              {state.errors.nohp_pelanggan.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/member"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" aria-disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Edit Member'}
        </Button>
      </div>
    </form>
  );
}
