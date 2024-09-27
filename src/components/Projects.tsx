import React, { useEffect, useState } from "react"
import '../styles.css'

interface Project {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  technologies: {
    name: string;
    class: string;
    icon: string;
    icon_alt: string;
  }[];
  link: string;
  repository: string;
  image: string;
  image_alt: string;
}

const TAGS = {
  NEXT: {
    name: "Next.js",
    class: "bg-black text-white",
    icon: "/icons/nextjs_icon.svg",
    icon_alt: "Next.js Logo"
  },
  TAILWIND: {
    name: "Tailwind CSS",
    class: "bg-[#003159] text-white",
    icon: "/icons/tailwindcss.svg",
    icon_alt: "Tailwind Logo"
  },
  TYPESCRIPT: {
    name: "TypeScript",
    class: "bg-white text-[#3178c6]",
    icon: "/icons/typescript.svg",
    icon_alt: "TypeScript Logo"
  }
}

const PROJECTS = [
  {
    "id": 1,
    "title": "Plataforma Web de Gestión de Excel",
    "shortTitle": "Gestor de Excel",
    "description": "Aplicación desarrollada para una empresa, diseñada para la administración eficiente de datos en Excel, con gestión de usuarios y roles. Los datos se presentan en una tabla editable, filtrable y ordenable.",
    "shortDescription": "Plataforma de gestión de usuarios importando archivos excel.",
    "technologies": [
      TAGS.NEXT,
      TAGS.TYPESCRIPT,
      TAGS.TAILWIND,
    ],
    "link": "https://enlace-del-proyecto.com",
    "repository": "https://github.com/usuario/proyecto-policias",
    "image": "/images/datasheet_manager_3x.webp",
    "mockup": "/images/datasheet_manager_3x.webp",
    "image_alt": "Imagen de la aplicación DataSheet Manager",
    "status": "completado"
  }
]

export function Projects() {
  const [selectedId, setSelectedId] = useState<number>(1)
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0])
  const [isFading, setIsFading] = useState(false)

  const handleSelectProject = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    e.preventDefault()
    if (id === selectedId) return

    setIsFading(true) 

    setTimeout(() => {
      setSelectedId(id) 
      setIsFading(false)

    }, 150) 
  }

  useEffect(() => {
    const getProjectInfoById = (id: number) => {
      const newProject = PROJECTS.filter(project => project.id === id)
      setSelectedProject(newProject[0])
    }
    
    getProjectInfoById(selectedId)
  }, [selectedId])

  return (
    <div className="py-10">
      <h2 className="w-fit text-5xl font-bold my-10">Proyectos</h2>

      <div className="w-full rounded-2xl shadow-[0px_-20px_30px_-22px_rgba(0,0,0,0.3)] shadow-zinc-500/20 bg-gradient-to-b from-zinc-900 via-zinc-900 via-30% to-transparent">
        {/* Selected Project */}
        <div className="relative w-full h-[420px] rounded-t-2xl -mb-4 overflow-hidden">
          <img
            src={selectedProject?.image}
            alt={selectedProject?.image_alt}
            className={`relative z-0 opacity-50 size-full object-cover rounded-t-xl transition-opacity duration-500 ease-in-out custom-mask ${isFading ? 'opacity-20' : 'opacity-100'}`}
          />
          
          <div className="absolute top-0 size-full rounded-t-xl shadow-inset"></div>

          <div className="absolute top-0 flex flex-col justify-end items-start z-10 w-full h-full px-8 py-10">
            <h3 className="text-2xl whitespace-nowrap font-extrabold mb-2">{selectedProject?.title}</h3>
            <p className="text-base max-w-2xl mb-4">{selectedProject.description}</p>
            <ul className="flex gap-4 mb-6">
              {selectedProject.technologies.map((tech, index) => {
                return (
                  <li key={index} className={`${tech.class} flex h-7 justify-between items-center px-3 gap-2 rounded-full`}>
                    <img src={tech.icon} alt={tech.icon_alt} className="size-5"/>
                    <p className="text-xs font-semibold">{tech.name}</p>
                  </li>
                )
              })}
            </ul>
            <div className="flex flex-row flex-wrap gap-4">
              <button className="flex justify-center items-center gap-2 bg-zinc-950 h-10 px-4 py-2 text-sm font-medium rounded-md">
                <img src="/icons/external-link.svg" alt="External Link Icon" />
                <a href="https://read-excel-page.vercel.app/">Ver Demo</a>
              </button>
              <button className="flex justify-center items-center gap-2 bg-white text-black h-10 px-4 py-2 text-sm font-medium rounded-md">
                <img src="/icons/brand-github.svg" alt="Github Brand Icon" />
                <a href="https://github.com/EmmSanchez/read-excel-page">Repositorio de GitHub</a>
              </button>
            </div>
          </div>
        </div>

        {/* List of projects */}
        <div className="grid gap-6 px-4 pb-4 relative z-10 projects-grid">
          {
            PROJECTS.map((project, index) => (
              <div key={index} className="flex flex-col gap-2">
                <img
                  src={project.image}
                  alt={project.image_alt}
                  className="size-full rounded-md transition ease-out duration-500 hover:cursor-pointer hover:-translate-y-2"
                  onClick={(e) => handleSelectProject(e, project.id)}
                />
                <h3 className="text-lg font-bold mb-2 ml-3">{project.shortTitle}</h3>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
