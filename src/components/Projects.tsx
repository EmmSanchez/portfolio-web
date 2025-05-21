import React, { useEffect, useState } from "react";
import "../styles.css";
import {
  Code,
  FolderOpen,
  LayoutGridIcon,
  LucideLayoutList,
  Server,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "../cv.json";
import { TAGS } from "../icons/tags/tags";

interface Project {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  link?: string;
  repository?: {
    frontend: string;
    backend?: string;
  };
  image: string;
  mockup: string;
  image_alt: string;
  status: string;
}

const PROJECTS: Project[] = projects;

export function Projects() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [viewMode, setViewMode] = useState<"list" | "showcase">("showcase");

  const handleSelectProject = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    if (id === selectedId) return;

    setSelectedId(id);
  };

  useEffect(() => {
    const getProjectInfoById = (id: number) => {
      const newProject = PROJECTS.filter((project) => project.id === id);
      setSelectedProject(newProject[0]);
    };

    getProjectInfoById(selectedId);
  }, [selectedId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && viewMode !== "list") {
        setViewMode("list");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [viewMode]);

  return (
    <section id="projects" className="pt-1 mt-10 sm:mt-28 w-full max-lg:px-4">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-4 max-sm:gap-2">
          <FolderOpen className="size-8 max-sm:size-6" />
          <h2 className="w-fit text-4xl max-sm:text-2xl font-bold my-8 sm:my-10">
            Proyectos
          </h2>
        </div>

        <div className="relative flex z-10 items-center rounded-md border-solid border-[1px] border-zinc-700 max-md:hidden">
          <button
            onClick={() => {
              setViewMode("list");
            }}
            className={`py-2 px-3 transition-all ease-out hover:bg-zinc-700 ${viewMode === "list" ? "bg-zinc-700" : "bg-transparent"}`}
          >
            <LucideLayoutList />
          </button>
          <button
            onClick={() => {
              setViewMode("showcase");
            }}
            className={`py-2 px-3 transition-all ease-out hover:bg-zinc-700 ${viewMode === "showcase" ? "bg-zinc-700" : "bg-transparent"}`}
          >
            <LayoutGridIcon />
          </button>
        </div>
      </div>

      {viewMode === "list" && (
        <div className="flex flex-col gap-2">
          {PROJECTS.map((project, index) => {
            return (
              <article key={index} className="w-full rounded-2xl">
                <div className="relative w-full h-[280px] md:h-[400px] rounded-2xl overflow-hidden border-solid border-2 border-zinc-900">
                  <img
                    key={project?.id}
                    src={project?.image}
                    alt={project?.image_alt}
                    className={`relative z-0 size-full object-cover rounded-t-xl ${project.id === 4 || project.id === 5 ? "opacity-60 custom-mask" : ""}`}
                  />

                  <div className="absolute top-0 size-full rounded-t-xl shadow-inset"></div>

                  <div
                    key={`details-${project?.id}`}
                    className={`absolute top-0 flex flex-col justify-end items-start w-full h-full max-[400px]:px-2 px-8 pt-10 pb-4`}
                  >
                    <h3 className="text-base min-[500px]:text-lg md:text-2xl sm:whitespace-nowrap font-extrabold mb-2">
                      {project?.title}
                    </h3>

                    <p className="text-xs min-[500px]:text-sm md:text-base max-w-sm md:max-w-xl mb-2 text-pretty max-[350px]:hidden">
                      {project.description}
                    </p>

                    <ul className="flex gap-1 mb-2">
                      {project.technologies.map((tagKey, index) => {
                        const tech = TAGS[tagKey as keyof typeof TAGS];
                        return (
                          <li
                            key={index}
                            className={`flex justify-between items-center p-[2px] sm:p-2`}
                          >
                            <img
                              src={tech.icon}
                              alt={tech.icon_alt}
                              className="size-4 sm:size-5 md:size-6"
                            />
                          </li>
                        );
                      })}
                    </ul>

                    <div className="flex flex-row flex-wrap gap-4 max-md:gap-2 mb-4">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-center items-center gap-2 bg-zinc-950 sm:h-10 px-2 py-2 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-md transition border border-transparent hover:border-zinc-400"
                        >
                          <img
                            src="/icons/external-link.svg"
                            alt="External Link Icon"
                            className="size-4 md:size-6"
                          />
                          <span
                            className={`${!project.repository?.backend ? "" : "max-sm:hidden "}`}
                          >
                            Visitar
                          </span>
                        </a>
                      )}
                      {project.repository &&
                        (project.repository.frontend &&
                        project.repository.backend ? (
                          <>
                            <a
                              href={project.repository.frontend}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex justify-center items-center gap-2 bg-white text-black sm:h-10 px-2 md:px-4 py-2 md:py-2 text-xs md:text-sm font-medium rounded-md"
                            >
                              <Code className="size-4 max-sm:hidden" />
                              <span className="max-sm:hidden">
                                Repositorio{" "}
                              </span>
                              Frontend
                            </a>

                            <a
                              href={project.repository.backend}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex justify-center items-center gap-2 bg-white/20 backdrop-blur text-white sm:h-10 px-2 md:px-4 py-2 md:py-2 text-xs md:text-sm font-medium rounded-md"
                            >
                              <Server className="size-4 max-sm:hidden" />
                              <span className="max-sm:hidden">
                                Repositorio{" "}
                              </span>
                              Backend
                            </a>
                          </>
                        ) : (
                          <>
                            <a
                              href={project.repository.frontend}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex justify-center items-center gap-2 bg-white text-black sm:h-10 px-2 md:px-4 py-2 md:py-2 text-xs md:text-sm font-medium rounded-md"
                            >
                              <img
                                src="/icons/brand-github.svg"
                                alt="Github Brand Icon"
                                className="max-sm:hidden"
                              />
                              <span className="max-sm:hidden">
                                Repositorio de
                              </span>{" "}
                              GitHub
                            </a>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {viewMode === "showcase" && (
        <>
          <div className="w-full rounded-2xl shadow-[0px_-20px_30px_-22px_rgba(0,0,0,0.3)] shadow-zinc-500/20">
            {/* Selected Project */}
            <div className="relative w-full h-[460px] rounded-t-2xl -mb-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedProject?.id}
                  src={selectedProject?.image}
                  alt={selectedProject?.image_alt}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`relative z-0 size-full object-cover rounded-t-xl custom-mask`}
                />
              </AnimatePresence>

              <div className="absolute top-0 size-full rounded-t-xl shadow-inset"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`details-${selectedProject?.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.32, 0.72, 0.39, 0.98],
                    delay: 0.1,
                  }}
                  className={`absolute top-0 flex flex-col justify-end items-start w-full h-full px-8 py-10`}
                >
                  <h3 className="text-[16px] min-[500px]:text-lg md:text-2xl sm:whitespace-nowrap font-extrabold mb-2">
                    {selectedProject?.title}
                  </h3>

                  <p className="text-[12px] min-[500px]:text-sm md:text-base max-w-sm md:max-w-xl mb-2 text-pretty max-[350px]:hidden">
                    {selectedProject.description}
                  </p>

                  <ul className="flex gap-1 mb-2">
                    {selectedProject.technologies.map((tagKey, index) => {
                      const tech = TAGS[tagKey as keyof typeof TAGS];
                      return (
                        <li
                          key={index}
                          className="relative group flex justify-between items-center p-2 gap-2 rounded-full"
                        >
                          <img
                            src={tech.icon}
                            alt={tech.icon_alt}
                            className="size-4 md:size-6"
                          />
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 rounded-md bg-zinc-900 text-white text-sm font-medium px-2 py-1 border-solid border-[1px] border-zinc-700 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                            {tech.name}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="flex flex-row flex-wrap gap-4 mb-4">
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center gap-2 bg-zinc-950 h-10 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium rounded-md transition border border-transparent hover:border-zinc-400"
                      >
                        <img
                          src="/icons/external-link.svg"
                          alt="External Link Icon"
                          className="size-4 md:size-6"
                        />
                        <span>Visitar</span>
                      </a>
                    )}
                    {selectedProject.repository &&
                      (selectedProject.repository.frontend &&
                      selectedProject.repository.backend ? (
                        <>
                          <a
                            href={selectedProject.repository.frontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-center items-center gap-2 bg-white text-black h-10 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium rounded-md"
                          >
                            <Code className="size-4" />
                            <span className="max-sm:hidden">Repositorio </span>
                            Frontend
                          </a>

                          <a
                            href={selectedProject.repository.backend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-center items-center gap-2 bg-white/20 backdrop-blur text-white h-10 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium rounded-md"
                          >
                            <Server className="size-4" />
                            <span className="max-sm:hidden">Repositorio </span>
                            Backend
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            href={selectedProject.repository.frontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-center items-center gap-2 bg-white text-black h-10 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium rounded-md"
                          >
                            <img
                              src="/icons/brand-github.svg"
                              alt="Github Brand Icon"
                            />
                            <span className="max-sm:hidden">
                              Repositorio de
                            </span>{" "}
                            GitHub
                          </a>
                        </>
                      ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Showcase of projects */}
            <div className="grid gap-6 px-4 pb-4 relative projects-grid">
              {PROJECTS.map((project, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="h-44">
                    <img
                      src={project.mockup}
                      alt={project.image_alt}
                      className="w-full h-full object-cover rounded-md transition ease-out duration-500 hover:cursor-pointer hover:-translate-y-2"
                      onClick={(e) => handleSelectProject(e, project.id)}
                    />
                  </div>
                  <h3 className="max-[400px]:text-[10px] text-xs sm:text-lg font-bold mb-2 whitespace-nowrap text-center">
                    {project.shortTitle}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
