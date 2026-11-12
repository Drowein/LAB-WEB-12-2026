
import { useState } from "react";

function MenuCard({ menu, onTambahPesanan }) {
  const [detailTerbuka, setDetailTerbuka] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-amber-100">

      <div className="flex justify-between items-start gap-3">
        <div>
          <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            {menu.kategori}
          </span>

          <h3 className="text-xl font-bold text-amber-950 mt-3">
            {menu.nama}
          </h3>

          <p className="text-lg font-semibold text-amber-800 mt-2">
            Rp {menu.harga.toLocaleString("id-ID")}
          </p>
        </div>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            menu.tersedia
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {menu.tersedia ? "Tersedia" : "Habis"}
        </span>
      </div>

      <button
        onClick={() => setDetailTerbuka(!detailTerbuka)}
        className="mt-5 text-amber-800 font-semibold hover:text-amber-950"
      >
        {detailTerbuka ? "Tutup Detail ▲" : "Lihat Detail ▼"}
      </button>

      {detailTerbuka && (
        <div className="mt-3 p-3 bg-amber-50 rounded-lg">
          <p className="text-sm text-gray-700">
            {menu.deskripsi}
          </p>
        </div>
      )}

      <button
        onClick={() => onTambahPesanan(menu)}
        disabled={!menu.tersedia}
        className={`w-full mt-5 py-3 rounded-lg font-semibold ${
            menu.tersedia
            ? "bg-amber-900 text-white hover:bg-amber-800"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
        >
        {menu.tersedia ? "Tambah Pesanan" : "Menu Habis"}
      </button>

    </div>
  );
}

export default MenuCard;
