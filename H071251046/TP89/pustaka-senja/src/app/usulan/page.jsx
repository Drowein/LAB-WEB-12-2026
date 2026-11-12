"use client";

import { useState } from "react";

const daftarKategori = ["Teknologi", "Fiksi", "Pengetahuan"];

export default function UsulanPage() {
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [alasan, setAlasan] = useState("");
  const [peringatan, setPeringatan] = useState("");
  const [berhasil, setBerhasil] = useState(false);
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      nama.trim() === "" ||
      judul.trim() === "" ||
      kategori.trim() === "" ||
      alasan.trim() === ""
    ) {
      setPeringatan("Semua kolom wajib diisi sebelum mengirim usulan.");
      setBerhasil(false);
      return;
    }

    const usulanBaru = {
      id: Date.now(),
      nama: nama.trim(),
      judul: judul.trim(),
      kategori,
      alasan: alasan.trim(),
    };

    setDaftarUsulan([usulanBaru, ...daftarUsulan]);
    setPeringatan("");
    setBerhasil(true);
    setNama("");
    setJudul("");
    setKategori("");
    setAlasan("");
  }

  const inputClass =
    "w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500";

  return (
    <section className="max-w-lg mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Usulan Buku</h1>
        <p className="text-slate-400 text-sm mb-6">
          Ingin buku tertentu hadir di Pustaka Senja? Usulkan di sini.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Nama Pengusul</label>
            <input
              type="text"
              placeholder="Masukkan nama Anda"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Judul Buku yang Diusulkan
            </label>
            <input
              type="text"
              placeholder="Contoh: Sapiens"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Kategori</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className={inputClass}
            >
              <option value="">-- Pilih kategori --</option>
              {daftarKategori.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Alasan Usulan</label>
            <textarea
              rows={4}
              placeholder="Mengapa buku ini perlu ada?"
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium py-2.5 rounded-lg transition"
          >
            Kirim Usulan
          </button>
        </form>

        {peringatan && (
          <p className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg text-center">
            {peringatan}
          </p>
        )}

        {berhasil && (
          <p className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-lg text-center">
            Terima kasih, usulan Anda berhasil dikirim!
          </p>
        )}
      </div>

      {daftarUsulan.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Usulan Terkirim (Sesi Ini)</h2>
          <ul className="space-y-3">
            {daftarUsulan.map((usulan) => (
              <li
                key={usulan.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4"
              >
                <p className="font-semibold">{usulan.judul}</p>
                <p className="text-xs text-amber-400">{usulan.kategori}</p>
                <p className="text-sm text-slate-400 mt-1">
                  Diusulkan oleh {usulan.nama}: {usulan.alasan}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}