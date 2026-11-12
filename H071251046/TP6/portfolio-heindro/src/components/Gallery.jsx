import foto1 from "../assets/gallery/foto1.jpg"
import foto2 from "../assets/gallery/foto2.jpg"
import foto3 from "../assets/gallery/foto3.jpg"
import foto4 from "../assets/gallery/foto4.jpg"

function Gallery() {
  const galeriFoto = [
    {
        id: 1,
        src: foto1,
        judul: "Campus Life"
    },
    {
        id: 2,
        src: foto2,
        judul: "High School Achievement"
    },
    {
        id: 3,
        src: foto3,
        judul: "Swimming Achievement"
    },
    {
        id: 4,
        src: foto4,
        judul: "Competition Moment"
    }
]

  return (
    <section id="gallery" className="bg-slate-900 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-white mb-3">
          My Gallery
        </h2>

        <div className="w-16 h-1 bg-cyan-400 mb-10"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {galeriFoto.map((foto) => (
            <figure
              key={foto.id}
              className="group overflow-hidden rounded-xl bg-slate-800"
            >
              <img
                src={foto.src}
                alt={foto.judul}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
              />

              <figcaption className="p-4 text-white text-center">
                {foto.judul}
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Gallery