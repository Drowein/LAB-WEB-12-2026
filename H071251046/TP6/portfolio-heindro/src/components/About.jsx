function About() {
  const dataDiri = [
    { id: 1, label: "Nama", value: "Heindro Paksi Hidayat" },
    { id: 2, label: "Program Studi", value: "Sistem Informasi" },
    { id: 3, label: "Universitas", value: "Universitas Hasanuddin" },
    { id: 4, label: "Hobi", value: "Berenang" },
    { id: 5, label: "Minat", value: "Teknologi, Pemrograman, dan Fotografi" }
  ]

  return (
    <section id="about" className="bg-slate-900 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-white mb-3">
          About Me
        </h2>

        <div className="w-16 h-1 bg-cyan-400 mb-8"></div>

        <p className="text-slate-400 leading-relaxed max-w-3xl mb-10">
          Saya adalah mahasiswa Sistem Informasi Universitas
          Hasanuddin yang masih berada dalam tahap awal
          mempelajari dunia teknologi. Saya tertarik untuk
          memahami bagaimana teknologi dan pemrograman dapat
          digunakan untuk membuat sesuatu yang bermanfaat.

          Di luar perkuliahan, saya memiliki hobi berenang
          yang mulai saya kembangkan menjadi sebuah prestasi
          sejak SMA hingga sekarang.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {dataDiri.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 p-5 rounded-xl border border-slate-700"
            >
              <p className="text-cyan-400 text-sm mb-2">
                {item.label}
              </p>

              <p className="text-white font-medium">
                {item.value}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default About