import Link from "next/link";
import { DAFTAR_KATEGORI } from "@/lib/helpers";

const inputClass =
  "w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500";
const labelClass = "block text-sm text-slate-300 mb-1";

export default function FormBuku({ action, buku, labelTombol }) {
  return (
    <form action={action} className="space-y-4">
      {buku && <input type="hidden" name="id" value={buku.id} />}

      <div>
        <label className={labelClass}>Judul</label>
        <input name="judul" type="text" required defaultValue={buku?.judul} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Penulis</label>
        <input name="penulis" type="text" required defaultValue={buku?.penulis} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Kategori</label>
        <select name="kategori" required defaultValue={buku?.kategori ?? ""} className={inputClass}>
          <option value="">-- Pilih kategori --</option>
          {DAFTAR_KATEGORI.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Tahun Terbit</label>
        <input name="tahun" type="number" min="1000" required defaultValue={buku?.tahun} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Status</label>
        <select name="tersedia" defaultValue={String(buku?.tersedia ?? true)} className={inputClass}>
          <option value="true">Tersedia</option>
          <option value="false">Sedang Dipinjam</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Sinopsis</label>
        <textarea name="sinopsis" rows={5} required defaultValue={buku?.sinopsis} className={inputClass} />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium px-5 py-2.5 rounded-lg transition"
        >
          {labelTombol}
        </button>
        <Link href="/katalog" className="px-5 py-2.5 text-slate-300 hover:underline">
          Batal
        </Link>
      </div>
    </form>
  );
}