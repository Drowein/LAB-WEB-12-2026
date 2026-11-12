import Link from "next/link";
import pool from "@/lib/db";
import BukuCard from "@/components/BukuCard";
import { DAFTAR_KATEGORI } from "@/lib/helpers";

export const dynamic = "force-dynamic";

export default async function KatalogPage({ searchParams }) {
  const { kategori } = await searchParams;
  const aktif = DAFTAR_KATEGORI.includes(kategori) ? kategori : "Semua";

  const { rows: bukuTampil } =
    aktif === "Semua"
      ? await pool.query("SELECT * FROM buku ORDER BY id")
      : await pool.query(
          "SELECT * FROM buku WHERE kategori = $1 ORDER BY id",
          [aktif]
        );

  return (
    <section>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Katalog Buku</h1>
          <p className="text-slate-400 mt-1">
            Temukan koleksi buku Pustaka Senja berdasarkan kategori.
          </p>
        </div>
        <Link
          href="/katalog/tambah"
          className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium px-4 py-2 rounded-lg transition"
        >
          + Tambah Buku
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {["Semua", ...DAFTAR_KATEGORI].map((k) => (
          <Link
            key={k}
            href={k === "Semua" ? "/katalog" : `/katalog?kategori=${encodeURIComponent(k)}`}
            className={
              aktif === k
                ? "px-4 py-2 rounded-lg text-sm font-medium bg-amber-500 text-slate-900"
                : "px-4 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            }
          >
            {k}
          </Link>
        ))}
      </div>

      {bukuTampil.length === 0 ? (
        <p className="text-slate-400">Belum ada buku pada kategori ini.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bukuTampil.map((buku) => (
            <BukuCard
              key={buku.id}
              id={buku.id}
              judul={buku.judul}
              penulis={buku.penulis}
              kategori={buku.kategori}
              tahun={buku.tahun}
              tersedia={buku.tersedia}
            />
          ))}
        </div>
      )}
    </section>
  );
}