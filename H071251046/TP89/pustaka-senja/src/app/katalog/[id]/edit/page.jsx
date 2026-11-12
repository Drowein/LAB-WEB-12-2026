import Link from "next/link";
import pool from "@/lib/db";
import FormBuku from "@/components/FormBuku";
import { parseId } from "@/lib/helpers";
import { ubahBuku } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditBukuPage({ params }) {
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
    <section className="max-w-lg mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Buku #{buku.id}</h1>
      <FormBuku action={ubahBuku} buku={buku} labelTombol="Simpan Perubahan" />
    </section>
  );
}