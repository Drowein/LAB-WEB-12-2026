
import MenuCard from "./MenuCard";

function MenuList({
  menuList,
  kategoriAktif,
  onTambahPesanan,
}) {

  const menuDitampilkan =
    kategoriAktif === "Semua"
      ? menuList
      : menuList.filter(
          (menu) => menu.kategori === kategoriAktif
        );

  return (
    <section className="mt-8">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-amber-950">
          Daftar Menu
        </h2>

        <span className="text-sm text-gray-600">
          {menuDitampilkan.length} menu
        </span>
      </div>

      {menuDitampilkan.length === 0 ? (
        <p className="text-gray-500">
          Tidak ada menu dalam kategori ini.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {menuDitampilkan.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              onTambahPesanan={onTambahPesanan}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default MenuList;
