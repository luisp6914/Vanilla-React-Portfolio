import { Icon } from "@iconify/react";
import { Link, Links } from "react-router-dom";

type Projects = {
    type: "anchor" | "link";
    icon: string;
    name: string;
    caption: string;
    buildStack: string[];
    path: string;
}

const Projects = () => {
    const projects : Projects[] = [
        {
            type: "link",
            icon: "simple-icons:digikeyelectronics",
            name: "DigiKey API", 
            caption: "A React app for searching electronic components by category or keyword via the DigiKey API, with secure token-based authentication.", 
            buildStack: ["skill-icons:react-light", "skill-icons:typescript", "flowbite:api-key-outline", "ix:json-document-filled"], 
            path: "/digikey-api"
        },
        {
            type: "link",
            icon: "majesticons:covid", 
            name: "VaxTrack Hub", 
            caption: "A hospital vaccination management system for tracking patients and vaccines, built with a React frontend and a Spring Boot REST API backend.", 
            buildStack: ["skill-icons:react-light", "skill-icons:typescript", "devicon:java-wordmark", "logos:spring-icon", "logos:docker-icon", "arcticons:api-tester", "ix:json-document-filled"], 
            path: "/vax-track"
        },
        {
            type: "link",
            icon: "fa-solid:shopping-cart", 
            name: "PC Part Picker", 
            caption: "An interface for selecting and pricing PC components, powered by a Spring Boot REST API that handles part selection, removal, and cost calculation.", 
            buildStack: ["skill-icons:react-light", "skill-icons:typescript", "devicon:java-wordmark", "logos:spring-icon", "logos:docker-icon", "arcticons:api-tester", "ix:json-document-filled"], 
            path: "/pc-part-picker"
        },
        {
            type: "anchor",
            icon: "icon-park-outline:merge-cells", 
            name: "Image Merger", 
            caption: "A vanilla JavaScript app that lets users select two images and merge them into one using DOM manipulation.", 
            buildStack: ["logos:html-5", "vscode-icons:file-type-css", "logos:javascript"], 
            path: "https://luisp6914.github.io/Merge-Images/"
        },
    ]

    return(
        <section className="mt-[25dvh] scroll-mt-20" id="projects">
            <h3 className="text-[clamp(2rem,3dvw,3rem)] text-center font-bold">Projects</h3>
            <div className="flex flex-col w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-10 xl:px-0">
                {projects.map((project, index) => (
                    <div key={project.name} className="flex gap-8 border-gray-300 border-b last:border-b-0 py-6 items-start">
                        <span className="w-8 shrink-0 pt-1 text-gray-400 text-sm">{String(index + 1).padStart(2, '0')}</span>

                        <div  className="flex flex-col gap-5 flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold ">{project.name}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{project.caption}</p>
                            <div className="flex flex-wrap gap-5 min-w-0">
                                {project.buildStack.map((stackIcon) => (
                                    <Icon key={project.name + "-" + stackIcon} icon={stackIcon} width={32} height={32}></Icon>
                                ))}
                            </div>
                        </div>

                        <div className="shrink-0">
                            {project.type === "link" ? (
                                    <Link to={project.path} className="text-blue-300 hover:text-blue-600 transition duration-200">
                                        <Icon icon="tabler:arrow-up-right" width="30" height="30" />
                                    </Link>
                                ) : (
                                    <a href={project.path} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-600 transition duration-200">
                                        <Icon icon="tabler:arrow-up-right" width="30" height="30" />
                                    </a>
                                )
                            }
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );

}

export default Projects;