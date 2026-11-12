import Link from "next/link";
import pool from "@/lib/db";
import { parseId } from "@/lib/helpers";

export const dynamic = "force-dynamic";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const idAngka = parseId(id);

  let buku = null;
  if (idAngka !== null) {
    const { rows } = await pool.query("SELECT * FROM buku WHERE id = $1", [idAngka]);
    buku = rows[0] ?? null;
  }

  if (!buku) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-red-400 mb-4">
          Buku dengan ID &quot;{id}&quot; tidak ditemukan!
        </h1>
        <Link href="/katalog" className="text-amber-400 hover:underline">
          &larr; Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full font-medium">
          {buku.kategori}
        </span>
        <span
          className={
            buku.tersedia
              ? "text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400"
              : "text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-400"
          }
        >
          {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
      </div>

      <h1 className="text-3xl font-bold">{buku.judul}</h1>
      <p className="text-slate-400 mt-1">
        oleh {buku.penulis} • Terbit {buku.tahun}
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Sinopsis</h2>
      <p className="text-slate-300 leading-relaxed mb-6">{buku.sinopsis}</p>

      <div className="flex gap-3">
        <Link
          href="/katalog"
          className="inline-block bg-slate-800 hover:bg-slate-700 text-sm px-4 py-2 rounded-lg transition"
        >
          &larr; Kembali ke Katalog
        </Link>
        <Link
          href={`/katalog/${buku.id}/edit`}
          className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          Edit
        </Link>
      </div>
    </article>
  );
}