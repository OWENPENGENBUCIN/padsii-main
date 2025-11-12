import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const client = await db.connect();

  try {
    const formData = await req.formData();

    const pelanggan_nama = formData.get("pelanggan_nama") as string;
    const tanggal_transaksi = formData.get("tanggal_transaksi") as string;
    const total_harga = parseFloat(formData.get("total_harga") as string);
    const pembayaran = parseFloat(formData.get("pembayaran") as string);
    const kembalian = parseFloat(formData.get("kembalian") as string);
    const pelanggan_id = formData.get("pelanggan_id") as string;

    // Data menu dikirim terpisah dari formData
    const menusRaw = formData.get("menus") as string | null;
    const selectedMenus = menusRaw ? JSON.parse(menusRaw) : [];

    await client.sql`BEGIN`;

    // 1️⃣ Insert transaksi baru
    const { rows } = await client.sql`
      INSERT INTO transaksis (pelanggan_nama, tanggal_transaksi, total_harga, pembayaran, kembalian)
      VALUES (${pelanggan_nama}, ${tanggal_transaksi}, ${total_harga}, ${pembayaran}, ${kembalian})
      RETURNING id;
    `;

    const transaksiId = rows[0].id;

    // 2️⃣ Simpan item menu yang dibeli
    for (const menu of selectedMenus) {
      await client.sql`
        INSERT INTO transaksi_menus (transaksi_id, menu_id, jumlah)
        VALUES (${transaksiId}, ${menu.id}, ${menu.jumlah});
      `;
    }

    // 3️⃣ Tambah jumlah transaksi pelanggan
    await client.sql`
      UPDATE pelanggans
      SET jumlah_transaksi = COALESCE(jumlah_transaksi, 0) + 1
      WHERE id = ${pelanggan_id};
    `;

    await client.sql`COMMIT`;

    return NextResponse.json({
      success: true,
      message: "Transaksi berhasil disimpan dan jumlah transaksi pelanggan diperbarui.",
    });

  } catch (error: any) {
    await client.sql`ROLLBACK`;
    console.error("Error saat menyimpan transaksi:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Gagal menyimpan transaksi.",
    }, { status: 500 });
  } finally {
    client.release();
  }
}
