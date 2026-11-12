function Skills() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Database",
    "GitHub",
    "Fotografi"
  ]

  return (
    <section id="skills" className="bg-slate-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-white mb-3">
          My Skills
        </h2>

        <div className="w-16 h-1 bg-cyan-400 mb-10"></div>

        <p className="text-slate-400 mb-8">
          Beberapa bidang yang sedang saya pelajari dan kembangkan.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center hover:border-cyan-400 transition"
            >
              <h3 className="text-white font-semibold">
                {skill}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Skills