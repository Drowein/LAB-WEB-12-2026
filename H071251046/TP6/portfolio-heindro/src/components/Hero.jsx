function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-slate-950 flex items-center pt-24 px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <p className="text-cyan-400 font-medium mb-4">
            HELLO, WELCOME TO MY PORTFOLIO
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Heindro Paksi Hidayat
          </h1>

          <h2 className="text-xl text-cyan-400 mt-4">
            Mahasiswa Sistem Informasi
          </h2>

          <p className="text-slate-400 mt-6 leading-relaxed">
            Mahasiswa Universitas Hasanuddin yang sedang
            memulai perjalanan dalam dunia teknologi,
            pemrograman, dan pengembangan website.
            Selain itu, saya memiliki ketertarikan dalam
            olahraga renang yang telah saya tekuni sejak SMA.
          </p>

        </div>

        <div className="flex justify-center">
          <img
            src="/profile.jpg"
            alt="Foto profil Heindro"
            className="w-64 h-80 md:w-80 md:h-96 object-cover rounded-2xl border-2 border-cyan-500 shadow-xl shadow-cyan-500/10"
          />
        </div>

      </div>
    </section>
  )
}

export default Hero