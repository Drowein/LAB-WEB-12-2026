"use strict";

// Alamat API sesuai dengan instruksi tugas praktikum.
const API_ANGGOTA = "https://jsonplaceholder.typicode.com/users";
const API_TUGAS = "https://jsonplaceholder.typicode.com/todos?userId=";

// Mengambil elemen HTML yang akan dimanipulasi melalui DOM.
const membersList = document.getElementById("membersList");
const memberStatus = document.getElementById("memberStatus");
const memberCount = document.getElementById("memberCount");
const taskHeading = document.getElementById("taskHeading");
const taskSubheading = document.getElementById("taskSubheading");
const taskTotalBadge = document.getElementById("taskTotalBadge");
const taskStatus = document.getElementById("taskStatus");
const taskList = document.getElementById("taskList");
const progressCard = document.getElementById("progressCard");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const searchInput = document.getElementById("searchInput");
const noMatch = document.getElementById("noMatch");
const emptyTaskState = document.getElementById("emptyTaskState");
const addTaskForm = document.getElementById("addTaskForm");
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const formMessage = document.getElementById("formMessage");
const notification = document.getElementById("notification");

// Menyimpan data yang sedang digunakan pada halaman.
let selectedMember = null;
let currentTasks = [];
let memberButtons = [];
let taskRequestNumber = 0;
let notificationTimer = null;

// Menampilkan atau menyembunyikan pesan status pada bagian tugas.
function tampilkanStatusTugas(pesan, jenis) {
  taskStatus.textContent = pesan;
  taskStatus.classList.remove("hidden", "bg-slate-50", "text-slate-600", "bg-rose-50", "text-rose-700");

  if (jenis === "error") {
    taskStatus.classList.add("bg-rose-50", "text-rose-700");
  } else {
    taskStatus.classList.add("bg-slate-50", "text-slate-600");
  }
}

function sembunyikanStatusTugas() {
  taskStatus.classList.add("hidden");
  taskStatus.textContent = "";
}

// Mengaktifkan input pencarian dan form setelah anggota dipilih.
function aturKontrolTugas(aktif) {
  searchInput.disabled = !aktif;
  taskInput.disabled = !aktif;
  addTaskButton.disabled = !aktif;
}

// Memperbarui jumlah tugas selesai dan lebar progress bar.
function perbaruiProgres() {
  const totalTugas = currentTasks.length;
  const tugasSelesai = currentTasks.filter((tugas) => tugas.completed).length;
  const persentase = totalTugas === 0 ? 0 : (tugasSelesai / totalTugas) * 100;

  progressText.textContent = `${tugasSelesai} dari ${totalTugas} tugas selesai`;
  taskTotalBadge.textContent = `${totalTugas} tugas`;
  progressBar.style.width = `${persentase}%`;
}

// Menampilkan pesan ketika daftar kosong atau pencarian tidak menemukan hasil.
function perbaruiKeadaanDaftar() {
  const jumlahElemen = taskList.querySelectorAll(".task-item").length;
  let jumlahTerlihat = 0;

  taskList.querySelectorAll(".task-item").forEach((elemen) => {
    if (!elemen.classList.contains("hidden")) {
      jumlahTerlihat += 1;
    }
  });

  if (currentTasks.length === 0) {
    emptyTaskState.classList.remove("hidden");
    noMatch.classList.add("hidden");
  } else {
    emptyTaskState.classList.add("hidden");
    if (jumlahElemen > 0 && jumlahTerlihat === 0) {
      noMatch.classList.remove("hidden");
    } else {
      noMatch.classList.add("hidden");
    }
  }
}

// Menyaring tugas berdasarkan kata kunci tanpa membedakan huruf besar/kecil.
function cariTugas() {
  const kataKunci = searchInput.value.toLowerCase();
  const semuaItemTugas = taskList.querySelectorAll(".task-item");

  semuaItemTugas.forEach((item) => {
    const judul = item.querySelector(".task-title").textContent.toLowerCase();

    if (judul.includes(kataKunci)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });

  perbaruiKeadaanDaftar();
}

// Membuat satu elemen tugas beserta tombol aksi menggunakan DOM API.
function buatElemenTugas(tugas) {
  const item = document.createElement("li");
  item.classList.add(
    "task-item",
    "flex",
    "flex-col",
    "gap-3",
    "rounded-xl",
    "border",
    "border-slate-200",
    "bg-white",
    "p-4",
    "transition",
    "sm:flex-row",
    "sm:items-center",
    "sm:justify-between"
  );

  const bagianJudul = document.createElement("div");
  bagianJudul.classList.add("flex", "min-w-0", "items-start", "gap-3");

  const indikator = document.createElement("span");
  indikator.classList.add("mt-1", "flex", "h-5", "w-5", "shrink-0", "items-center", "justify-center", "rounded-full", "bg-slate-100", "text-xs", "font-bold", "text-slate-500");

  const judul = document.createElement("p");
  judul.classList.add("task-title", "text-sm", "font-medium", "leading-6", "text-slate-700");
  judul.textContent = tugas.title;

  if (tugas.completed) {
    judul.classList.add("line-through", "text-gray-400");
    indikator.classList.remove("bg-slate-100", "text-slate-500");
    indikator.classList.add("bg-emerald-100", "text-emerald-700");
    indikator.textContent = "✓";
  } else {
    indikator.textContent = "•";
  }

  bagianJudul.appendChild(indikator);
  bagianJudul.appendChild(judul);

  const bagianTombol = document.createElement("div");
  bagianTombol.classList.add("flex", "shrink-0", "gap-2");

  // Tombol tandai selesai hanya dibuat jika tugas belum selesai.
  if (!tugas.completed) {
    const tombolSelesai = document.createElement("button");
    tombolSelesai.type = "button";
    tombolSelesai.textContent = "Tandai selesai";
    tombolSelesai.classList.add("rounded-lg", "bg-emerald-50", "px-3", "py-2", "text-xs", "font-semibold", "text-emerald-700", "transition", "hover:bg-emerald-100");

    tombolSelesai.addEventListener("click", () => {
      tugas.completed = true;
      judul.classList.add("line-through", "text-gray-400");
      indikator.textContent = "✓";
      indikator.classList.remove("bg-slate-100", "text-slate-500");
      indikator.classList.add("bg-emerald-100", "text-emerald-700");
      tombolSelesai.remove();
      perbaruiProgres();
    });

    bagianTombol.appendChild(tombolSelesai);
  }

  const tombolHapus = document.createElement("button");
  tombolHapus.type = "button";
  tombolHapus.textContent = "Hapus";
  tombolHapus.classList.add("rounded-lg", "bg-rose-50", "px-3", "py-2", "text-xs", "font-semibold", "text-rose-700", "transition", "hover:bg-rose-100");

  tombolHapus.addEventListener("click", () => {
    currentTasks = currentTasks.filter((itemTugas) => itemTugas !== tugas);
    item.remove();
    perbaruiProgres();
    perbaruiKeadaanDaftar();
  });

  bagianTombol.appendChild(tombolHapus);
  item.appendChild(bagianJudul);
  item.appendChild(bagianTombol);

  return item;
}

// Menampilkan seluruh tugas yang diterima dari server.
function tampilkanDaftarTugas() {
  taskList.innerHTML = "";

  currentTasks.forEach((tugas) => {
    const elemenTugas = buatElemenTugas(tugas);
    taskList.appendChild(elemenTugas);
  });

  cariTugas();
  perbaruiProgres();
}

// Mengambil tugas berdasarkan ID anggota yang dipilih.
async function ambilTugasAnggota(anggota) {
  const nomorPermintaan = ++taskRequestNumber;
  selectedMember = anggota;
  currentTasks = [];

  taskHeading.textContent = `Tugas ${anggota.name}`;
  taskSubheading.textContent = "Memuat daftar pekerjaan anggota ini.";
  progressCard.classList.remove("hidden");
  taskTotalBadge.classList.remove("hidden");
  taskList.innerHTML = "";
  noMatch.classList.add("hidden");
  emptyTaskState.classList.add("hidden");
  formMessage.classList.add("hidden");
  notification.classList.add("hidden");
  searchInput.value = "";
  aturKontrolTugas(true);
  perbaruiProgres();
  tampilkanStatusTugas("Memuat tugas...", "loading");

  try {
    const respons = await fetch(`${API_TUGAS}${anggota.id}`);

    if (!respons.ok) {
      throw new Error(`Server mengembalikan status ${respons.status}`);
    }

    const dataTugas = await respons.json();

    // Abaikan respons lama jika pengguna sudah memilih anggota lain.
    if (nomorPermintaan !== taskRequestNumber) {
      return;
    }

    if (!Array.isArray(dataTugas)) {
      throw new Error("Format data tugas tidak sesuai.");
    }

    currentTasks = dataTugas;
    tampilkanDaftarTugas();
    sembunyikanStatusTugas();
    taskSubheading.textContent = "Kelola dan pantau pekerjaan anggota yang dipilih.";
  } catch (error) {
    if (nomorPermintaan !== taskRequestNumber) {
      return;
    }

    tampilkanStatusTugas(`Gagal memuat tugas: ${error.message}`, "error");
    taskSubheading.textContent = "Terjadi masalah saat mengambil data.";
    perbaruiProgres();
    perbaruiKeadaanDaftar();
  }
}

// Memuat seluruh anggota dari server ketika halaman pertama kali dibuka.
async function ambilAnggota() {
  memberStatus.textContent = "Memuat anggota....";

  try {
    const respons = await fetch(API_ANGGOTA);

    if (!respons.ok) {
      throw new Error(`Server mengembalikan status ${respons.status}`);
    }

    const dataAnggota = await respons.json();

    if (!Array.isArray(dataAnggota)) {
      throw new Error("Format data anggota tidak sesuai.");
    }

    membersList.innerHTML = "";
    memberButtons = [];
    memberCount.textContent = `${dataAnggota.length} anggota`;

    dataAnggota.forEach((anggota) => {
      const tombolAnggota = document.createElement("button");
      tombolAnggota.type = "button";
      tombolAnggota.textContent = anggota.name;
      tombolAnggota.classList.add("w-full", "rounded-xl", "border", "border-transparent", "bg-white", "px-3", "py-3", "text-left", "text-sm", "font-medium", "text-slate-600", "transition", "hover:border-indigo-100", "hover:bg-indigo-50", "hover:text-indigo-700");

      tombolAnggota.addEventListener("click", () => {
        memberButtons.forEach((tombol) => {
          tombol.classList.remove("border-indigo-200", "bg-indigo-50", "text-indigo-700");
          tombol.classList.add("border-transparent", "bg-white", "text-slate-600");
        });

        tombolAnggota.classList.remove("border-transparent", "bg-white", "text-slate-600");
        tombolAnggota.classList.add("border-indigo-200", "bg-indigo-50", "text-indigo-700");
        ambilTugasAnggota(anggota);
      });

      memberButtons.push(tombolAnggota);
      membersList.appendChild(tombolAnggota);
    });

    memberStatus.textContent = `${dataAnggota.length} anggota berhasil dimuat.`;
  } catch (error) {
    memberStatus.textContent = `Gagal memuat anggota: ${error.message}`;
    memberStatus.classList.remove("bg-slate-50", "text-slate-500");
    memberStatus.classList.add("bg-rose-50", "text-rose-700");
  }
}

// Simulasi penyimpanan tugas baru menggunakan Promise dan setTimeout.
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const judulKecil = judul.toLowerCase();
      const sudahAda = currentTasks.some((tugas) => tugas.title.toLowerCase() === judulKecil);

      if (sudahAda) {
        reject(new Error("Tugas dengan judul tersebut sudah ada."));
      } else {
        resolve({
          title: judul,
          completed: false
        });
      }
    }, 1000);
  });
}

// Menangani pencarian setiap kali isi kotak pencarian berubah.
searchInput.addEventListener("input", () => {
  cariTugas();
});

// Menangani penambahan tugas baru dari form.
addTaskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  formMessage.classList.add("hidden");
  notification.classList.add("hidden");

  if (!selectedMember) {
    formMessage.textContent = "Pilih anggota terlebih dahulu.";
    formMessage.classList.remove("hidden");
    return;
  }

  const judul = taskInput.value.trim();

  if (judul.length === 0) {
    formMessage.textContent = "Judul tugas tidak boleh kosong.";
    formMessage.classList.remove("hidden");
    return;
  }

  if (judul.length < 5) {
    formMessage.textContent = "Judul tugas minimal 5 karakter.";
    formMessage.classList.remove("hidden");
    return;
  }

  // Cegah pergantian anggota selama proses simpan agar data tidak tertukar.
  memberButtons.forEach((tombol) => {
    tombol.disabled = true;
  });
  addTaskButton.disabled = true;
  addTaskButton.textContent = "Menyimpan...";

  try {
    const tugasBaru = await simpanTugas(judul);
    currentTasks.push(tugasBaru);

    const elemenBaru = buatElemenTugas(tugasBaru);
    taskList.appendChild(elemenBaru);

    taskInput.value = "";
    perbaruiProgres();
    cariTugas();

    notification.textContent = "Tugas berhasil ditambahkan.";
    notification.classList.remove("hidden");

    if (notificationTimer !== null) {
      clearTimeout(notificationTimer);
    }

    notificationTimer = setTimeout(() => {
      notification.textContent = "";
      notification.classList.add("hidden");
      notificationTimer = null;
    }, 3000);
  } catch (error) {
    formMessage.textContent = error.message;
    formMessage.classList.remove("hidden");
  } finally {
    addTaskButton.textContent = "Simpan";
    addTaskButton.disabled = false;
    memberButtons.forEach((tombol) => {
      tombol.disabled = false;
    });
  }
});

// Jalankan pengambilan data anggota saat halaman selesai diproses.
ambilAnggota();
