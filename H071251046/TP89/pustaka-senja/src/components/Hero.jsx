function Hero({ nama, slogan, lokasi, jamBuka }) {
  return (
    <section className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 px-6 shadow-lg">
      <span className="inline-block bg-amber-500/10 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
        Ruang Baca Komunitas
      </span>
      <h1 className="text-4xl font-bold mb-3">
        Selamat Datang di <span className="text-amber-400">{nama}</span>
      </h1>
      <p className="text-slate-400 max-w-xl mx-auto mb-6">{slogan}</p>
      <div className="text-sm text-slate-300 space-y-1">
        <p>📍 {lokasi}</p>
        <p>🕒 {jamBuka}</p>
      </div>
    </section>
  );
}

export default Hero;