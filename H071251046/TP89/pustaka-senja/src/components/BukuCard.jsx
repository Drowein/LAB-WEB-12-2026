"use client";

import { useState } from "react";
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";

function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-amber-400 font-medium">{kategori}</span>
          <span
            className={
              tersedia
                ? "text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400"
                : "text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-400"
            }
          >
            {tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>
        <h3 className="text-lg font-semibold">{judul}</h3>
        <p className="text-slate-400 text-sm mt-1">{penulis}</p>
        <p className="text-slate-500 text-xs mt-1">Terbit {tahun}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setFavorit(!favorit)}
            className={
              favorit
                ? "text-sm px-3 py-1.5 rounded-lg bg-amber-500 text-slate-900 transition"
                : "text-sm px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            }
          >
            {favorit ? "★ Favorit" : "☆ Simpan"}
          </button>
          <Link href={`/katalog/${id}`} className="text-sm text-amber-400 hover:underline">
            Lihat Detail
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Link href={`/katalog/${id}/edit`} className="text-sky-400 hover:underline">
            Edit
          </Link>
          <TombolHapus id={id} />
        </div>
      </div>
    </article>
  );
}

export default BukuCard;