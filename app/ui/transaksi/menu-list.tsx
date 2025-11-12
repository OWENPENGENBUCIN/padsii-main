"use client";

import React from "react";
import { MenuTable } from "@/app/lib/definitions";

type MenuListProps = {
  menu: MenuTable[];
  selectedMenus: any[];
  setSelectedMenus: React.Dispatch<React.SetStateAction<any[]>>;
};

// Fungsi yang *aman* mengonversi apa pun ke angka lalu format Rp  (Rp 6.000)
const formatRupiahSafe = (raw: any) => {
  // debug: lihat nilai mentah di console
  // (akan terlihat di DevTools tiap kali komponen dirender)
  // console.log('formatRupiahSafe raw:', raw, 'type:', typeof raw);

  // Ambil hanya digit, minus, dan titik desimal jika ada — namun
  // kita akan hapus simbol lain lalu paksa jadi integer (tanpa desimal).
  const cleaned = String(raw ?? "")
    .replace(/[^\d\-,.]/g, "") // hapus semua kecuali digit, koma, titik, minus
    // ganti koma dengan titik bila ada (contoh "1.000,50" -> "1000.50")
    .replace(/,/g, ".");

  // Ambil angka (float) lalu bulatkan ke integer (no cents)
  const asNumber = Math.round(Number(cleaned) || 0);

  // Format ke lokal id-ID tanpa desimal
  const formatted = asNumber.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `Rp ${formatted}`;
};

export default function MenuList({
  menu,
  selectedMenus,
  setSelectedMenus,
}: MenuListProps) {
  const addMenu = (menuItem: MenuTable) => {
    setSelectedMenus((prev) => {
      const existing = prev.find((item) => item.id === menuItem.id);
      return existing
        ? prev.map((item) =>
            item.id === menuItem.id ? { ...item, jumlah: item.jumlah + 1 } : item
          )
        : [...prev, { ...menuItem, jumlah: 1 }];
    });
  };

  const removeMenu = (menuItem: MenuTable) => {
    setSelectedMenus((prev) => {
      const existing = prev.find((item) => item.id === menuItem.id);
      return existing?.jumlah > 1
        ? prev.map((item) =>
            item.id === menuItem.id ? { ...item, jumlah: item.jumlah - 1 } : item
          )
        : prev.filter((item) => item.id !== menuItem.id);
    });
  };

  // Debug helper: tampilkan array menu dan tipenya sekali
  // Jika kamu mau lihat console satu kali saat mount, uncomment useEffect import dan block:
  // React.useEffect(() => { console.log('MenuList props menu sample:', menu.slice(0,5)); }, [menu]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Pilih Menu</label>
      <div className="border border-gray-300 rounded-lg shadow-sm">
        {menu.map((item, index) => (
          <div key={item.id}>
            <div
              className={`flex items-center justify-between px-4 py-3 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              <div className="text-sm font-medium text-gray-700">
                {item.nama_menu}{" "}
                <span className="text-gray-600">
                  - {formatRupiahSafe(item.harga_menu)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full bg-red-500 text-white px-2 py-1 text-sm hover:bg-red-600"
                  aria-label="Kurangi Menu"
                  onClick={() => removeMenu(item)}
                >
                  -
                </button>
                <span className="font-semibold text-gray-800">
                  {selectedMenus.find((m) => m.id === item.id)?.jumlah || 0}
                </span>
                <button
                  type="button"
                  className="rounded-full bg-green-500 text-white px-2 py-1 text-sm hover:bg-green-600"
                  aria-label="Tambah Menu"
                  onClick={() => addMenu(item)}
                >
                  +
                </button>
              </div>
            </div>
            <hr className="border-t border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
