"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const TransaksiSchema = z.object({
  id: z.string(),
  pelanggan_nama: z.string(),
  tanggal_transaksi: z.string(),
  total_harga: z.number(),
  pembayaran: z.number(),
  kembalian: z.number(),
});

const CreateTransaksi = TransaksiSchema.omit({ id: true });

export async function createTransaksi(
  formData: FormData,
  selectedMenus: { id: string; jumlah: number }[]
) {
  let {pelanggan_nama, tanggal_transaksi, total_harga, pembayaran, kembalian } =
    CreateTransaksi.parse({
      pelanggan_nama: formData.get("pelanggan_nama"),
      tanggal_transaksi: new Date().toISOString().split("T")[0],
      total_harga: Number(formData.get("total_harga")),
      pembayaran: Number(formData.get("pembayaran")),
      kembalian: Number(formData.get("kembalian")),
    });

  console.log("Data Transaksi:", {
    pelanggan_nama,
    tanggal_transaksi,
    total_harga,
    pembayaran,
    kembalian,
  });
  console.log("Data Menu:", selectedMenus);

  if (!selectedMenus || selectedMenus.length === 0) {
    throw new Error("Minimal harus memilih 1 menu.");
  }

  try {
    await sql`BEGIN`;

    const pelangganId = formData.get("pelanggan_id") as string;
    const referralPhone = formData.get("referralPhone") as string | null;

    if (pelangganId) {
      const pelangganResult = await sql`
        SELECT referral_count
        FROM pelanggan
        WHERE id = ${pelangganId};
      `;

      const referralCount = pelangganResult.rows[0]?.referral_count || 0;

      if (referralCount >= 3) {
        total_harga *= 0.7;
        const remainingCount = referralCount - 3;
        await sql`
          UPDATE pelanggan
          SET referral_count = ${remainingCount}
          WHERE id = ${pelangganId};
        `;
      }
    }

    if (referralPhone) {
      const referralResult = await sql`
        SELECT id, referral_count
        FROM pelanggans
        WHERE nohp_pelanggan = ${referralPhone};
      `;

      if (referralResult.rows.length === 0) {
        throw new Error("Kode referral tidak valid. Nomor HP tidak ditemukan.");
      }

      const { id: referredpelangganId, referral_count: referralCount } =
        referralResult.rows[0];

      const newReferralCount = referralCount + 1;
      await sql`
        UPDATE pelanggans
        SET referral_count = ${newReferralCount}
        WHERE id = ${referredpelangganId};
      `;
    }

    const transaksiResult = await sql`
      INSERT INTO transaksis (pelanggan_nama, tanggal_transaksi, total_harga, pembayaran, kembalian)
      VALUES (${pelanggan_nama}, ${tanggal_transaksi}, ${total_harga}, ${pembayaran}, ${kembalian})
      RETURNING id;
    `;

    const transaksiId = transaksiResult.rows[0]?.id;

    if (!transaksiId) {
      throw new Error("Gagal mendapatkan ID transaksi.");
    }

    console.log("Transaksi ID:", transaksiId);

    for (const menu of selectedMenus) {
      if (!menu.id) {
        throw new Error(`Menu ID tidak ditemukan untuk item: ${menu}`);
      }

      console.log("Inserting Menu:", menu);

      await sql`
        INSERT INTO transaksi_menus (transaksi_id, menu_id, jumlah)
        VALUES (${transaksiId}, ${menu.id}, ${menu.jumlah});
      `;
    }

    await sql`COMMIT`;
    console.log("Transaksi berhasil dibuat:", transaksiId);

    return {
      success: true,
      message: "Transaksi berhasil dibuat.",
    };
  } catch (error) {
    await sql`ROLLBACK`;
    console.error("Database Error:", error);
    throw new Error("Gagal membuat transaksi.");
  }
}




export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
