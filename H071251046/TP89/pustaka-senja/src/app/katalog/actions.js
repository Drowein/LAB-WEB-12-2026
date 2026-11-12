"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { DAFTAR_KATEGORI, parseId } from "@/lib/helpers";

function bacaForm(formData) {
  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const sinopsis = String(formData.get("sinopsis") ?? "").trim();
  const tahun = Number(formData.get("tahun"));
  const tersedia = formData.get("tersedia") === "true";

  const tahunMaks = new Date().getFullYear() + 1;
  const valid =
    judul !== "" &&
    penulis !== "" &&
    sinopsis !== "" &&
    DAFTAR_KATEGORI.includes(kategori) &&
    Number.isInteger(tahun) &&
    tahun >= 1000 &&
    tahun <= tahunMaks;

  return { valid, judul, penulis, kategori, tahun, tersedia, sinopsis };
}

export async function tambahBuku(formData) {
  const d = bacaForm(formData);
  if (!d.valid) return;

  await pool.query(
    `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [d.judul, d.penulis, d.kategori, d.tahun, d.tersedia, d.sinopsis]
  );

  revalidatePath("/katalog");
  revalidatePath("/");
  redirect("/katalog");
}

export async function ubahBuku(formData) {
  const id = parseId(formData.get("id"));
  const d = bacaForm(formData);
  if (id === null || !d.valid) return;

  await pool.query(
    `UPDATE buku
     SET judul = $1, penulis = $2, kategori = $3,
         tahun = $4, tersedia = $5, sinopsis = $6
     WHERE id = $7`,
    [d.judul, d.penulis, d.kategori, d.tahun, d.tersedia, d.sinopsis, id]
  );

  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  revalidatePath("/");
  redirect(`/katalog/${id}`);
}

export async function hapusBuku(formData) {
  const id = parseId(formData.get("id"));
  if (id === null) return;

  await pool.query("DELETE FROM buku WHERE id = $1", [id]);

  revalidatePath("/katalog");
  revalidatePath("/");
}