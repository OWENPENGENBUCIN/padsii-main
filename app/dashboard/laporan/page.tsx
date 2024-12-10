import React from 'react';
import LaporanClient from '@/app/ui/laporan/Laporan';
import { fetchLaporanByMonth } from '@/app/lib/laporan';

type LaporanPageProps = {
  searchParams?: Promise<{ month?: string }>;
};

export default async function LaporanPage({
  searchParams,
}: LaporanPageProps) {
  // Menunggu promise yang dihasilkan oleh searchParams
  const resolvedSearchParams = await searchParams;

  const selectedMonth = resolvedSearchParams?.month
    ? parseInt(resolvedSearchParams.month, 10)
    : new Date().getMonth() + 1;

  // Ambil data laporan berdasarkan bulan yang dipilih
  const reportData = await fetchLaporanByMonth(selectedMonth);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Laporan Transaksi</h1>
      <LaporanClient initialMonth={selectedMonth} initialReportData={reportData} />
    </div>
  );
}
