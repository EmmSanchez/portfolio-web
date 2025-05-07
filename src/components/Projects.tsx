import React, { useEffect, useState } from "react";
import "../styles.css";
import { Code, Server } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface Project {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  technologies: {
    name: string;
    icon: string;
    icon_alt: string;
  }[];
  link?: string;
  repository?: {
    frontend: string;
    backend?: string;
  };
  image: string;
  image_alt: string;
}

const TAGS = {
  NEXT: {
    name: "Next.js",
    icon: "/icons/nextjs_icon.svg",
    icon_alt: "Next.js Logo",
  },
  TAILWIND: {
    name: "Tailwind CSS",
    icon: "/icons/tailwindcss.svg",
    icon_alt: "Tailwind Logo",
  },
  TYPESCRIPT: {
    name: "TypeScript",
    icon: "/icons/typescript.svg",
    icon_alt: "TypeScript Logo",
  },
  REACT: {
    name: "React",
    icon: "/icons/react.svg",
    icon_alt: "React Logo",
  },
  MONGODB: {
    name: "MongoDB",
    icon: "/icons/mongodb.svg",
    icon_alt: "MongoDB Logo",
  },
  ELECTRON: {
    name: "Electron",
    icon: "/icons/electron.svg",
    icon_alt: "Electron Logo",
  },
  VITE: {
    name: "Vite.js",
    icon: "/icons/vitejs.svg",
    icon_alt: "Vite.js Logo",
  },

  THREEJS: {
    name: "Three.js",
    icon: "/icons/threejs.svg",
    icon_alt: "Three.js Logo",
  },
  FRAMER: {
    name: "Framer Motion",
    icon: "/icons/framer.svg",
    icon_alt: "Framer Motion Logo",
  },
  ZUSTAND: {
    name: "Zustand",
    icon: "/icons/zustand.svg",
    icon_alt: "Zustand Logo",
  },
  EXPRESS: {
    name: "Express.js",
    icon: "/icons/expressjs.svg",
    icon_alt: "Express.js Logo",
  },
  POSTGRESQL: {
    name: "PostgreSQL",
    icon: "/icons/postgresql.svg",
    icon_alt: "PostgreSQL Logo",
  },
  RAILWAY: {
    name: "Railway",
    icon: "/icons/railway.svg",
    icon_alt: "Railway Logo",
  },
  SUPABASE: {
    name: "Supabase",
    icon: "/icons/supabase.svg",
    icon_alt: "Supabase Logo",
  },
  SHADCN: {
    name: "Shadcn/ui",
    icon: "/icons/shadcn.svg",
    icon_alt: "Shadcn Logo",
  },
  HTML: {
    name: "HTML5",
    icon: "/icons/html5.svg",
    icon_alt: "HTML5 Logo",
  },
  CSS: {
    name: "CSS",
    icon: "/icons/css.svg",
    icon_alt: "CSS Logo",
  },
  JAVASCRIPT: {
    name: "JavaScript",
    icon: "/icons/javascript.svg",
    icon_alt: "JavaScript Logo",
  },
};

const PROJECTS = [
  {
    id: 1,
    title: "Plataforma Web de Gestión de Excel",
    shortTitle: "Gestor de Excel",
    description:
      "Aplicación desarrollada para una empresa, diseñada para la administración eficiente de datos a partir de un archivo Excel, con gestión de usuarios y roles. Los datos se presentan en una tabla editable, filtrable y ordenable.",
    shortDescription:
      "Plataforma de gestión de usuarios importando archivos excel.",
    technologies: [TAGS.NEXT, TAGS.TYPESCRIPT, TAGS.TAILWIND, TAGS.MONGODB],
    link: "https://read-excel-page-demo.vercel.app",
    image: "/images/excel_main.jpeg",
    mockup: "/images/excel_mockup.jpeg",
    image_alt: "Imagen de la aplicación DataSheet Manager",
    status: "completado",
  },
  {
    id: 2,
    title: "Solana Stack Game",
    shortTitle: "Stack Game",
    description:
      "SkyStacks es un juego web 3D interactivo en Solana donde apilas bloques para ganar recompensas. Construido con React, Three.js, Zustand y Framer Motion.",
    shortDescription: "Juego 3D de apilar bloques con conexión a Solana.",
    technologies: [
      TAGS.VITE,
      TAGS.REACT,
      TAGS.THREEJS,
      TAGS.FRAMER,
      TAGS.TAILWIND,
      TAGS.ZUSTAND,
      TAGS.EXPRESS,
      TAGS.POSTGRESQL,
      TAGS.RAILWAY,
    ],
    link: "https://www.skystacksgame.com/",
    repository: {
      frontend: "https://github.com/EmmSanchez/solana_stack_game",
      backend: "https://github.com/EmmSanchez/solana_stack_game_api",
    },
    image: "/images/stack_game_main.jpeg",
    mockup: "/images/stack_game_mockup.jpeg",
    image_alt: "Imagen de la aplicación SkyStacks",
    status: "completado",
  },
  {
    id: 3,
    title: "Chat Bot Asistente",
    shortTitle: "Chat Bot",
    description:
      "Chatbot con IA desarrollado en Next.js y TypeScript. Usa la API de OpenAI, componentes de Shadcn y la autenticación con Privy.",
    shortDescription:
      "Asistente conversacional con IA, autenticación y persistencia de datos. Interfaz moderna y experiencia fluida.",
    technologies: [
      TAGS.NEXT,
      TAGS.TYPESCRIPT,
      TAGS.SHADCN,
      TAGS.FRAMER,
      TAGS.TAILWIND,
      TAGS.ZUSTAND,
      TAGS.POSTGRESQL,
      TAGS.RAILWAY,
    ],
    link: "https://chatbot-eight-blond.vercel.app/",
    repository: {
      frontend: "https://github.com/EmmSanchez/chatbot",
    },
    image: "/images/lumen_ai_main.jpeg",
    mockup: "/images/lumen_ai_mockup.jpeg",
    image_alt: "Imagen de Asistente Virtual Lumen AI",
    status: "completado",
  },
  {
    id: 4,
    title: "Quiz de Programación",
    shortTitle: "Quiz App",
    description:
      "Quode es una app interactiva para responder preguntas de programación para poner a prueba tu lógica y sintaxis.",
    shortDescription: "Responde preguntas técnicas según lenguaje y nivel.",
    technologies: [
      TAGS.VITE,
      TAGS.REACT,
      TAGS.TAILWIND,
      TAGS.EXPRESS,
      TAGS.POSTGRESQL,
      TAGS.RAILWAY,
      TAGS.SUPABASE,
    ],
    link: "https://quiz-app-web-plum.vercel.app/",
    repository: {
      frontend: "https://github.com/EmmSanchez/quiz-app-web",
      backend: "https://github.com/EmmSanchez/quiz_api",
    },
    image: "/images/quizzapp_main.jpeg",
    mockup: "/images/quizzapp_mockup.jpeg",
    image_alt: "Vista previa del sitio web de Quode",
    status: "completado",
  },
  {
    id: 5,
    title: "Maquinaria Bolsan",
    shortTitle: "Landing Bolsan",
    description:
      "Landing page responsive para empresa de maquinaria industrial. HTML, CSS y JS puro. Página informativa con clientes reales.",
    shortDescription:
      "Primera web profesional realizada. Página responsive con clientes reales para empresa de maquinaria de empaque.",
    technologies: [TAGS.HTML, TAGS.CSS, TAGS.JAVASCRIPT],
    link: "https://bolsan.com.mx/index.html",
    image: "/images/bolsan_main.jpeg",
    mockup: "/images/bolsan_mockup.jpeg",
    image_alt: "Vista previa del sitio web Bolsan",
    status: "completado",
  },
];

export function Projects() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [isFading, setIsFading] = useState(false);

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

  return (
    <div className="lg:py-10">
      <h2 className="w-fit text-5xl font-bold my-8 sm:my-10">Proyectos</h2>

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
                ease: [0.32, 0.72, 0.39, 0.98], // Aceleración rápida + desaceleración suave
                delay: 0.1,
              }}
              className={`absolute top-0 flex flex-col justify-end items-start z-10 w-full h-full px-8 py-10`}
            >
              <h3 className="text-[16px] min-[500px]:text-lg md:text-2xl sm:whitespace-nowrap font-extrabold mb-2">
                {selectedProject?.title}
              </h3>

              <p className="text-[12px] min-[500px]:text-sm md:text-base max-w-sm md:max-w-xl mb-2 text-pretty max-[350px]:hidden">
                {selectedProject.description}
              </p>

              <ul className="flex gap-1 mb-2">
                {selectedProject.technologies.map((tech, index) => {
                  return (
                    <li
                      key={index}
                      className={`flex justify-between items-center p-2 gap-2 rounded-full`}
                    >
                      <img
                        src={tech.icon}
                        alt={tech.icon_alt}
                        className="size-4 md:size-6"
                      />
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
                        <span className="max-sm:hidden">Repositorio de</span>{" "}
                        GitHub
                      </a>
                    </>
                  ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* List of projects */}
        <div className="grid gap-6 px-4 pb-4 relative z-10 projects-grid">
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
              <h3 className="max-[400px]:text-[10px] text-xs sm:text-lg font-bold mb-2 whitespace-nowrap">
                {project.shortTitle}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
