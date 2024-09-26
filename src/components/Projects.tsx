import React, { useEffect, useState } from "react"
import { projects } from "../cv.json" 
import '../styles.css'

interface newProject {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  link: string;
  repository: string;
  image: string;
  image_alt: string;
  date: string;
  tags: string[];
  status: string;
}

export function Projects() {
  const [selectedId, setSelectedId] = useState<number>(1)
  const [selectedProject, setSelectedProject] = useState<newProject>()
  
  const handleSelectProject = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    e.preventDefault()
    const newId = id
    setSelectedId(newId)
  } 

  useEffect(() => {
    const getProjectInfoById = (id: number) => {
      const newProject = projects.filter(project => project.id === id)
      console.log(newProject);
      
      setSelectedProject(newProject[0])
    }
    
    getProjectInfoById(selectedId)
  }, [selectedId])
  
  
  return (
    <>
      <div className="py-10">
        <h2 className="w-fit text-5xl font-bold my-10">Proyectos</h2>

        <div
          className="w-full rounded-2xl shadow-[0px_-20px_30px_-22px_rgba(0,0,0,0.3)] shadow-zinc-500/20 bg-gradient-to-b from-zinc-900 via-zinc-900 to-transparent"
        >
          {/* Selected Project */}
          <div className="w-full h-[420px] rounded-t-2xl -mb-4 overflow-hidden">
            <img src={selectedProject?.image} alt={selectedProject?.image_alt} className="relative z-0 size-full rounded-t-xl transition custom-mask "/>
            <div className="relative">
              <h3 className="text-5xl text-white z-10 bg-orange-200">{selectedProject?.title}</h3>
            </div>
          </div>

          {/* List of projects */}
          <div className="grid grid-cols-auto-fit gap-6 px-4 pb-4 relative z-10">
            {
              projects.map((project, index) => {
                return (
                  <div key={index} className="flex flex-col gap-2">
                      <img src={project.image} alt={project.image_alt} className="size-full rounded-md transition ease-out duration-500 hover:cursor-pointer hover:-translate-y-2" onClick={(e) => handleSelectProject(e, project.id)}/>
                    <h3 className="text-lg font-bold mb-2 ml-3">{project.shortTitle}</h3>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}