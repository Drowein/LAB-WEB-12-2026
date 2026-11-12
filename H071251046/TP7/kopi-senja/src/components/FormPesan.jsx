
import { useState } from "react";

function FormPesan({
  keranjang,
  totalItem,
  totalHarga,
  onPesanBerhasil,
}) {
  const [nama, setNama] = useState("");
  const [nomorMeja, setNomorMeja] = useState("");
  const [pesananSukses, setPesananSukses] = useState(null);
  const [pesanError, setPesanError] = useState("");

  const formatRupiah = (angka) =>
    "Rp " + angka.toLocaleString("id-ID");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nama.trim() === "" || nomorMeja.trim() === "") {
      setPesanError("Nama dan nomor meja wajib diisi.");
      return;
    }

    if (keranjang.length === 0) {
      setPesanError("Silakan pilih menu terlebih dahulu.");
      return;
    }

    setPesananSukses({
      nama: nama.trim(),
      nomorMeja: nomorMeja.trim(),
      totalItem,
      totalHarga,
    });

    onPesanBerhasil();

    setNama("");
    setNomorMeja("");
    setPesanError("");
  };

  if (pesananSukses) {
    return (
      <section className="mt-8 bg-white rounded-2xl shadow-md p-8 text-center border border-green-100">

        <div className="text-5xl mb-4">🎉</div>

        <h2 className="text-2xl font-bold text-green-700">
          Pesanan Berhasil!
        </h2>

        <p className="text-gray-600 mt-3">
          Terima kasih, {pesananSukses.nama}!
        </p>

        <div className="mt-5 bg-amber-50 rounded-xl p-5 text-left">
          <p>Nomor Meja: {pesananSukses.nomorMeja}</p>
          <p className="mt-2">
            Total Item: {pesananSukses.totalItem}
          </p>
          <p className="mt-2 font-bold text-amber-900">
            Total Pembayaran: {formatRupiah(pesananSukses.totalHarga)}
          </p>
        </div>

        <button
          onClick={() => setPesananSukses(null)}
          className="mt-6 bg-amber-900 text-white px-6 py-3 rounded-lg hover:bg-amber-800"
        >
          Pesan Lagi
        </button>

      </section>
    );
  }

  return (
    <section className="mt-8 bg-white rounded-2xl shadow-md p-6 border border-amber-100">

      <h2 className="text-2xl font-bold text-amber-950 mb-2">
        Form Pemesanan
      </h2>

      <p className="text-gray-500 mb-6">
        Lengkapi data diri untuk menyelesaikan pesanan.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Nama Pelanggan
          </label>

          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan nama kamu"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-700"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Nomor Meja
          </label>

          <input
            type="text"
            value={nomorMeja}
            onChange={(e) => setNomorMeja(e.target.value)}
            placeholder="Masukkan nomor meja"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-700"
          />
        </div>

        {pesanError && (
          <p className="text-red-600 text-sm font-medium">
            {pesanError}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-amber-900 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 transition"
        >
          Konfirmasi Pesanan
        </button>

      </form>

    </section>
  );
}

export default FormPesan;
