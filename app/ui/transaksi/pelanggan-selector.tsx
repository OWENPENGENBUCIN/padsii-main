import React from "react";
import { PelangganTable } from "@/app/lib/definitions";

type PelangganSelectorProps = {
    pelanggan: PelangganTable[];
    selectedPelanggan: string;
    setSelectedPelanggan: React.Dispatch<React.SetStateAction<string>>;
    setSelectedPelangganName: React.Dispatch<React.SetStateAction<string>>;
};

export default function PelangganSelector({
    pelanggan,
    selectedPelanggan,
    setSelectedPelanggan,
    setSelectedPelangganName,
}: PelangganSelectorProps) {
    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedPelanggan(selectedId);

        const selectedPelangganData = pelanggan.find((item) => item.id === selectedId);
        setSelectedPelangganName(selectedPelangganData?.nama_pelanggan || "");
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Pilih Pelanggan</label>
            <select
                className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
                value={selectedPelanggan}
                onChange={handleSelectionChange}
                name="pelanggan_id"
            >
                <option value="">Pilih Pelanggan</option>
                {pelanggan.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.nama_pelanggan} - {item.nohp_pelanggan}
                    </option>
                ))}
            </select>
        </div>
    );
}
