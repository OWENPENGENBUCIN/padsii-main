import { sql } from "@vercel/postgres";
import { PelangganTable } from "../definitions";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredPelanggans(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const pelanggans = await sql<PelangganTable>`
       SELECT 
        pelanggans.id,
        pelanggans.nama_pelanggan,
        pelanggans.nohp_pelanggan,
        pelanggans.referral_count,
        pelanggans.created_at
      FROM pelanggans
      WHERE
        pelanggans.nama_pelanggan ILIKE ${`%${query}%`} OR
        pelanggans.nohp_pelanggan ILIKE ${`%${query}%`}
      ORDER BY pelanggans.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return pelanggans.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch pelanggans.");
  }
}

export async function fetchpelangganPages(query: string) {
  try {
    const count = await sql`
        SELECT COUNT(DISTINCT pelanggans.nama_pelanggan)
        FROM pelanggans
        WHERE
          pelanggans.nama_pelanggan ILIKE ${`%${query}%`} OR
          pelanggans.nohp_pelanggan ILIKE ${`%${query}%`}
      `;

    return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of pelanggans.");
  }
}

export async function fetchpelanggans() {
  try {
    const pelanggans = await sql<PelangganTable>`
      SELECT 
      pelanggans.id, 
      pelanggans.nama_pelanggan, 
      pelanggans.nohp_pelanggan, 
      pelanggans.referral_count,
      pelanggans.created_at
      FROM pelanggans
      ORDER BY pelanggans.created_at DESC
    `;
    return pelanggans.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch menus.");
  }
}
