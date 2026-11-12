function Navbar({ kategoriAktif, onKategoriChange }) {
  const daftarKategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

  return (
    <nav className="bg-amber-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold">
            ☕ Kedai Kopi Senja
          </h1>
          <p className="text-sm text-amber-200">
            Pesan kopi favoritmu di sini
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {daftarKategori.map((kategori) => (
            <button
              key={kategori}
              onClick={() => onKategoriChange(kategori)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                kategoriAktif === kategori
                  ? "bg-amber-100 text-amber-950"
                  : "bg-amber-900 text-white hover:bg-amber-800"
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
