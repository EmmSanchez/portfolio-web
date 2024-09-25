import { projects } from "../cv.json" 

export function Projects() {

  return (
    <>
      <div className="py-10">
        <h2 className="w-fit text-5xl font-bold mb-10">Proyectos</h2>

        <div
          className="w-full rounded-xl bg-blue-600 shadow-2xl shadow-zinc-500/15 inset-shadow"
        >
          {/* Selected Project */}
          <div className="w-full h-[420px]"></div>
          {/* List of projects */}
          <div className="grid grid-cols-3 gap-2 px-4 pb-4">
            {
              projects.map(project => {
                return (
                  <article key={project.id} className="flex flex-col w-72 h-28 gap-1 px-4 py-4 rounded-lg bg-blue-900 transition hover:cursor-pointer hover:opacity-90">
                    <h3>{project.shortTitle}</h3>
                  </article>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}