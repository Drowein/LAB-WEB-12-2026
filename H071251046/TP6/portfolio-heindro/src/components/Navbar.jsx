function Navbar() {
  const menu = [
    "Home",
    "About",
    "Skills",
    "Gallery"
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <h1 className="text-xl font-bold text-cyan-400">
          Hein.
        </h1>

        <ul className="flex gap-5 text-sm text-slate-300">
          {menu.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  console.log(item)
                  document.getElementById(item.toLowerCase())?.scrollIntoView({
                    behavior: "smooth"
                  })
                }}
                className="hover:text-cyan-400 transition"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar