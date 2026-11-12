
import { useState } from "react";
import Navbar from "./components/Navbar";
import MenuList from "./components/MenuList";
import RingkasanPesanan from "./components/RingkasanPesanan";
import FormPesan from "./components/FormPesan";
import Footer from "./components/Footer";

const menuList = [
  {
    id: 1,
    nama: "Kopi Susu",
    kategori: "Kopi",
    harga: 18000,
    tersedia: true,
    deskripsi: "Espresso dengan susu segar dan gula aren.",
  },
  {
    id: 2,
    nama: "Americano",
    kategori: "Kopi",
    harga: 15000,
    tersedia: true,
    deskripsi: "Espresso dengan air panas, rasa kuat dan bersih.",
  },
  {
    id: 3,
    nama: "Cappuccino",
    kategori: "Kopi",
    harga: 22000,
    tersedia: true,
    deskripsi: "Espresso, susu panas, dan busa susu tebal.",
  },
  {
    id: 4,
    nama: "Matcha Latte",
    kategori: "Non-Kopi",
    harga: 24000,
    tersedia: true,
    deskripsi: "Teh hijau matcha dengan susu.",
  },
  {
    id: 5,
    nama: "Teh Tarik",
    kategori: "Non-Kopi",
    harga: 14000,
    tersedia: false,
    deskripsi: "Teh susu yang ditarik hingga berbusa.",
  },
  {
    id: 6,
    nama: "Cokelat Panas",
    kategori: "Non-Kopi",
    harga: 20000,
    tersedia: true,
    deskripsi: "Cokelat pekat dengan susu hangat.",
  },
  {
    id: 7,
    nama: "Roti Bakar",
    kategori: "Makanan",
    harga: 16000,
    tersedia: true,
    deskripsi: "Roti tebal dengan selai cokelat dan keju.",
  },
  {
    id: 8,
    nama: "Pisang Goreng",
    kategori: "Makanan",
    harga: 12000,
    tersedia: false,
    deskripsi: "Pisang goreng renyah dengan taburan keju.",
  },
  {
    id: 9,
    nama: "Nasi Goreng",
    kategori: "Makanan",
    harga: 25000,
    tersedia: true,
    deskripsi: "Nasi goreng kampung dengan telur mata sapi.",
  },
];

function App() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [keranjang, setKeranjang] = useState([]);

  const tambahPesanan = (menu) => {
    setKeranjang((prevKeranjang) => {
      const menuSudahAda = prevKeranjang.find(
        (item) => item.id === menu.id
      );

      if (menuSudahAda) {
        return prevKeranjang.map((item) =>
          item.id === menu.id
            ? { ...item, jumlah: item.jumlah + 1 }
            : item
        );
      }

      return [...prevKeranjang, { ...menu, jumlah: 1 }];
    });
  };

  const ubahJumlah = (id, perubahan) => {
    setKeranjang((prevKeranjang) =>
      prevKeranjang
        .map((item) =>
          item.id === id
            ? { ...item, jumlah: item.jumlah + perubahan }
            : item
        )
        .filter((item) => item.jumlah > 0)
    );
  };

  const hapusPesanan = (id) => {
    setKeranjang((prevKeranjang) =>
      prevKeranjang.filter((item) => item.id !== id)
    );
  };

  const totalItem = keranjang.reduce(
    (total, item) => total + item.jumlah,
    0
  );

  const totalHarga = keranjang.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  const selesaikanPesanan = () => {setKeranjang([]);};

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar
        kategoriAktif={kategoriAktif}
        onKategoriChange={setKategoriAktif}
      />

      <main className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold text-amber-950">
          Menu Kedai Kopi Senja
      </h1>

      <p className="mt-2 text-gray-600">
          Pilih menu favoritmu dan nikmati suasana Kedai Kopi Senja.
      </p>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-amber-100 p-5">

        <div className="flex flex-col sm:flex-row justify-between gap-4">

          <div>
            <p className="text-sm text-gray-500">
              Total Item Dipesan
            </p>

            <p className="text-2xl font-bold text-amber-950">
              {totalItem} item
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total Pembayaran
            </p>

            <p className="text-2xl font-bold text-amber-800">
              Rp {totalHarga.toLocaleString("id-ID")}
            </p>
          </div>

        </div>

      </div>

      <MenuList
        menuList={menuList}
        kategoriAktif={kategoriAktif}
        onTambahPesanan={tambahPesanan}
      />

      <RingkasanPesanan
        keranjang={keranjang}
        totalItem={totalItem}
        totalHarga={totalHarga}
        onUbahJumlah={ubahJumlah}
        onHapusPesanan={hapusPesanan}
      />

      <FormPesan
        keranjang={keranjang}
        totalItem={totalItem}
        totalHarga={totalHarga}
        onPesanBerhasil={selesaikanPesanan}
      />


      </main>
      <Footer />
    </div>
  );
}

export default App;
