import pool from "@/lib/db";

export default async function TesDbPage() {
  const { rows } = await pool.query("SELECT * FROM buku ORDER BY id");
  return <p>Jumlah buku di database: {rows.length}</p>;
}