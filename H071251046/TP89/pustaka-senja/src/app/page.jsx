import Link from "next/link";
import Hero from "@/components/Hero";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { rows } = await pool.query(`
    SELECT
      COUNT(*)::int                             AS total,
      COUNT(*) FILTER (WHERE tersedia)::int     AS tersedia,
      COUNT(*) FILTER (WHERE NOT tersedia)::int AS dipinjam
    FROM buku
  `);
  const { total, tersedia, dipinjam } = rows[0];

  const statistik = [
    { label: "Total Koleksi Buku", nilai: total },
    { label: "Buku Tersedia", nilai: tersedia },
    { label: "Buku Dipinjam", nilai: dipinjam },
  ];

  return (
    <div className="space-y-8">
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca dan perpustakaan komunitas di dekat kampus, tempat nyaman untuk membaca, berdiskusi, dan menemukan buku baru."
        lokasi="Dekat Kampus, Makassar"
        jamBuka="Setiap hari, 10.00 – 20.00 WITA"
      />

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statistik.map((item) => (
          <div
            key={item.label}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center"
          >
            <p className="text-4xl font-bold text-amber-400">{item.nilai}</p>
            <p className="text-slate-400 text-sm mt-1">{item.label}</p>
          </div>
        ))}
      </section>

      <div className="flex justify-center gap-4">
        <Link
          href="/katalog"
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium px-5 py-2.5 rounded-lg transition"
        >
          Lihat Katalog Buku
        </Link>
        <Link
          href="/usulan"
          className="border border-slate-700 hover:bg-slate-800 text-slate-200 font-medium px-5 py-2.5 rounded-lg transition"
        >
          Usulkan Buku
        </Link>
      </div>
    </div>
  );
}