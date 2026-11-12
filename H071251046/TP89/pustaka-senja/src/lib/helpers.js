export const DAFTAR_KATEGORI = ["Teknologi", "Fiksi", "Pengetahuan"];

// Mengembalikan angka id yang valid, atau null jika tidak valid.
// Regex memastikan hanya digit; batas atas = nilai maksimum INTEGER PostgreSQL.
export function parseId(nilai) {
  const s = String(nilai ?? "");
  if (!/^\d+$/.test(s)) return null;
  const n = Number(s);
  return n > 0 && n <= 2147483647 ? n : null;
}