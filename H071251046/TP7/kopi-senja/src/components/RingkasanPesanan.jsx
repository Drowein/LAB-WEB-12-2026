
function RingkasanPesanan({
  keranjang,
  totalItem,
  totalHarga,
  onUbahJumlah,
  onHapusPesanan,
}) {
  const formatRupiah = (angka) =>
    "Rp " + angka.toLocaleString("id-ID");

  return (
    <section className="mt-10 bg-white rounded-2xl shadow-md p-6 border border-amber-100">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-950">
          Ringkasan Pesanan
        </h2>

        <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm font-semibold">
          {totalItem} item
        </span>
      </div>

      {keranjang.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Keranjang masih kosong. Silakan pilih menu terlebih dahulu.
        </p>
      ) : (
        <div className="space-y-4">

          {keranjang.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b pb-4"
            >
              <div>
                <h3 className="font-bold text-amber-950">
                  {item.nama}
                </h3>

                <p className="text-sm text-gray-500">
                  {formatRupiah(item.harga)} x {item.jumlah}
                </p>

                <p className="font-semibold text-amber-800 mt-1">
                  {formatRupiah(item.harga * item.jumlah)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onUbahJumlah(item.id, -1)}
                  className="w-9 h-9 bg-amber-100 text-amber-950 rounded-lg font-bold"
                >
                  -
                </button>

                <span className="font-bold">
                  {item.jumlah}
                </span>

                <button
                  onClick={() => onUbahJumlah(item.id, 1)}
                  className="w-9 h-9 bg-amber-900 text-white rounded-lg font-bold"
                >
                  +
                </button>

                <button
                  onClick={() => onHapusPesanan(item.id)}
                  className="text-red-600 text-sm font-semibold ml-2"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

        </div>
      )}

      <div className="border-t mt-6 pt-5 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">
            Total Pembayaran
          </p>

          <p className="text-2xl font-bold text-amber-950">
            {formatRupiah(totalHarga)}
          </p>
        </div>
      </div>

    </section>
  );
}

export default RingkasanPesanan;
