"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";
import { Pelanggan } from '@/app/lib/definitions';

const PelangganSchema = z.object({
  nama_pelanggan: z.string().min(1, "Nama pelanggan harus diisi"),
  nohp_pelanggan: z
    .string()
    .min(10, "Nomor HP minimal 10 digit")
    .regex(/^\d+$/, "Nomor HP harus berupa angka"),
});

const EditPelangganSchema = z.object({
    nama_pelanggan: z.string().min(1, 'Nama pelanggan harus diisi'),
    nohp_pelanggan: z.string().min(10, 'Nomor HP minimal 10 karakter'),
  });

export async function createPelanggan(data: FormData) {
  const validation = PelangganSchema.safeParse({
    nama_pelanggan: data.get("nama_pelanggan"),
    nohp_pelanggan: data.get("nohp_pelanggan"),
  });

  if (!validation.success) {
    return {
      success: false,
      message: "Validation Error: Please check your input.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { nama_pelanggan, nohp_pelanggan } = validation.data;

  try {
    await sql`
      INSERT INTO pelanggans (nama_pelanggan, nohp_pelanggan)
      VALUES (${nama_pelanggan}, ${nohp_pelanggan})
    `;

    return {
      success: true,
      message: "Pelanggan created successfully.",
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      message: "Database Error: Failed to create pelanggan.",
    };
  }
}


export async function fetchPelangganById(id: string): Promise<Pelanggan | null> {
  try {
    const result = await sql<Pelanggan>`
      SELECT id, nama_pelanggan, nohp_pelanggan
      FROM pelanggans
      WHERE id = ${id}
    `;

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error fetching pelanggan by ID:', error);
    return null;
  }
}

export async function editPelanggan(id: string, data: { nama_pelanggan: string; nohp_pelanggan: string }) {
  const validation = EditPelangganSchema.safeParse(data);

  if (!validation.success) {
    throw new Error('Validation Error');
  }

  const { nama_pelanggan, nohp_pelanggan } = validation.data;

  try {
    await sql`
      UPDATE pelanggans
      SET nama_pelanggan = ${nama_pelanggan}, nohp_pelanggan = ${nohp_pelanggan}
      WHERE id = ${id}
    `;
    console.log('pelanggan updated successfully');
  } catch (error) {
    console.error('Error updating pelanggan:', error);
    throw new Error('Failed to update pelanggan');
  }
}

export async function deletePelanggan(id: string) {
    try {
      await sql`
        DELETE FROM pelanggans
        WHERE id = ${id}
      `;
    } catch (error) {
      console.error('Error deleting pelanggan:', error);
      throw new Error('Failed to delete pelanggan');
    }
  }

