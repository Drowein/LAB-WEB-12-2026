const dataPraktikan = [
    { nama: "Budi", nilaiTugas: [80, 85, 90] },
    { nama: "Siti", nilaiTugas: [60, 50, 65] },
    { nama: "Andi", nilaiTugas: [90, 95, 95] },
    { nama: "Dewi", nilaiTugas: [70, 80, 75] },
    { nama: "Eko", nilaiTugas: [45, 40, 35] }
];

const namaAsisten = prompt("Masukkan nama Asisten Lab:");

// const namaAsistenBenar = ["endro", "fakhira", "yanto", "fikar"];

if (namaAsisten.match(/[0-9]/)) {
    document.write(`
        <div class="min-h-screen flex items-center justify-center bg-slate-100 p-6">
            
            <div class="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
                
                <div class="text-5xl mb-4">
                    ❌
                </div>

                <h1 class="text-2xl font-bold text-red-600">
                    Akses Ditolak
                </h1>

                <p class="text-slate-600 mt-3">
                    Nama Asisten Lab tidak sesuai.
                </p>

                <p class="text-sm text-slate-400 mt-4">
                    Silakan masukkan nama Asisten Lab yang benar.
                </p>

            </div>

        </div>
    `);
} else {

    function hitungRataRata(nilai) {
        let total = 0;

        for (let i = 0; i < nilai.length; i++) {
            total += nilai[i];
        }

        return total / nilai.length;
    }

    function tentukanStatus(rataRata) {
        if (rataRata >= 75) {
            return "Lulus";
        } else {
            return "Tidak Lulus";
        }
    }

    const hasilPraktikan = dataPraktikan.map(function(praktikan) {

        const rataRata = hitungRataRata(praktikan.nilaiTugas);

        const status = tentukanStatus(rataRata);

        return {
            nama: praktikan.nama,
            nilaiTugas: praktikan.nilaiTugas,
            rataRata: rataRata,
            status: status
        };
    });

    console.log("Data Hasil Evaluasi Praktikum:");
    console.log(hasilPraktikan);

    document.write(`

        <div class="min-h-screen bg-slate-50">

            <header class="border-b border-slate-200 bg-white">

                <div class="max-w-6xl mx-auto px-6 py-7">

                    <div class="flex items-center justify-between">

                        <div>

                            <p class="text-xs font-semibold tracking-widest text-blue-600 uppercase">
                                Praktikum Pemrograman Web
                            </p>

                            <h1 class="text-2xl font-bold text-slate-800 mt-2">
                                Sistem Evaluasi Praktikum
                            </h1>

                            <p class="text-sm text-slate-500 mt-1">
                                Laporan nilai dan status praktikan
                            </p>

                        </div>


                        <div class="hidden md:block text-right">

                            <p class="text-sm font-medium text-slate-700">
                                Asisten Lab
                            </p>

                            <p class="text-sm text-slate-500 mt-1">
                                ${namaAsisten}
                            </p>

                        </div>

                    </div>

                </div>

            </header>

            <main class="max-w-6xl mx-auto px-6 py-8">

                <div class="bg-blue-50 border-l-4 border-blue-500 px-5 py-4 mb-8">

                    <p class="text-sm font-semibold text-blue-800">
                        Laporan Evaluasi
                    </p>

                    <p class="text-sm text-blue-700 mt-1">
                        Hasil perhitungan nilai berdasarkan tiga tugas
                        setiap praktikan.
                    </p>

                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

                    <div class="bg-white border border-slate-200 p-5">

                        <p class="text-sm text-slate-500">
                            Jumlah Praktikan
                        </p>

                        <p class="text-2xl font-bold text-slate-800 mt-2">
                            ${hasilPraktikan.length}
                        </p>

                    </div>

                    <div class="bg-white border border-slate-200 p-5">

                        <p class="text-sm text-slate-500">
                            Batas Kelulusan
                        </p>

                        <p class="text-2xl font-bold text-slate-800 mt-2">
                            75
                        </p>

                    </div>

                    <div class="bg-white border border-slate-200 p-5">

                        <p class="text-sm text-slate-500">
                            Status Sistem
                        </p>

                        <p class="text-2xl font-bold text-green-600 mt-2">
                            Aktif
                        </p>

                    </div>

                </div>

                <div class="flex items-end justify-between mb-4">

                    <div>

                        <h2 class="text-xl font-bold text-slate-800">
                            Daftar Praktikan
                        </h2>

                        <p class="text-sm text-slate-500 mt-1">
                            Rekapitulasi hasil evaluasi praktikum
                        </p>

                    </div>

                </div>

                <div class="bg-white border border-slate-200 overflow-x-auto">

                    <table class="w-full text-left">

                        <thead class="bg-slate-100 border-b border-slate-200">

                            <tr>

                                <th class="px-5 py-4 text-sm font-semibold text-slate-600">
                                    No
                                </th>

                                <th class="px-5 py-4 text-sm font-semibold text-slate-600">
                                    Nama
                                </th>

                                <th class="px-5 py-4 text-sm font-semibold text-slate-600">
                                    Nilai Tugas
                                </th>

                                <th class="px-5 py-4 text-sm font-semibold text-slate-600">
                                    Rata-rata
                                </th>

                                <th class="px-5 py-4 text-sm font-semibold text-slate-600">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            ${hasilPraktikan.map(function(praktikan, index) {

                                let warnaStatus;

                                if (praktikan.status === "Lulus") {

                                    warnaStatus =
                                        "text-green-700 bg-green-50";

                                } else {

                                    warnaStatus =
                                        "text-red-700 bg-red-50";

                                }


                                return `

                                    <tr class="border-b border-slate-100 hover:bg-slate-50">

                                        <td class="px-5 py-5 text-sm text-slate-500">
                                            ${index + 1}
                                        </td>


                                        <td class="px-5 py-5">

                                            <p class="font-semibold text-slate-800">
                                                ${praktikan.nama}
                                            </p>

                                        </td>


                                        <td class="px-5 py-5">

                                            <div class="flex gap-2">

                                                ${praktikan.nilaiTugas.map(function(nilai) {

                                                    return `

                                                        <span class="px-3 py-1 bg-slate-100 text-slate-700 text-sm">
                                                            ${nilai}
                                                        </span>

                                                    `;

                                                }).join("")}

                                            </div>

                                        </td>

                                        <td class="px-5 py-5">

                                            <span class="font-bold text-slate-800">
                                                ${praktikan.rataRata.toFixed(2)}
                                            </span>

                                        </td>

                                        <td class="px-5 py-5">

                                            <span class="inline-block px-3 py-1 text-xs font-semibold ${warnaStatus}">
                                                ${praktikan.status}
                                            </span>

                                        </td>

                                    </tr>

                                `;

                            }).join("")}

                        </tbody>

                    </table>

                </div>

                <div class="mt-6 text-sm text-slate-500">

                    <p>
                        <span class="font-semibold text-slate-700">
                            Keterangan:
                        </span>

                        Praktikan dinyatakan lulus apabila nilai
                        rata-rata minimal 75.
                    </p>

                </div>

                <footer class="mt-12 pt-5 border-t border-slate-200">

                    <p class="text-xs text-slate-400 text-center">
                        Sistem Evaluasi Praktikum Interaktif
                    </p>

                </footer>

            </main>

        </div>

    `);
}