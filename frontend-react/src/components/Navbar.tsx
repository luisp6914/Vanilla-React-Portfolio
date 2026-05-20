import { Link } from "react-router-dom";
import type { Navigation } from "../types/navigation";
import {Icon} from "@iconify/react"
import { useState } from "react";

interface Props {
    navigator : Navigation[];
}

const Navbar = ({navigator} : Props) => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const handleAnchorClick = (e : React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        const target = document.querySelector(href);

        target?.scrollIntoView({behavior: "smooth"});
        setIsOpen(false);
    }

    return(
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#F5F5F6]/75 backdrop-blur-sm">
            {/* navbar row */}
            <div className="flex gap-5 items-center p-3">
                <Icon icon="mdi:alphabet-l-circle-outline" width="48" height="48" />

                <button 
                    type="button" 
                    className="md:hidden ml-auto relative w-10 h-10" 
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    <Icon 
                        className={`absolute inset-0 transition duration-600 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`}
                        icon="quill:hamburger" width="40" height="40" 
                    />
                    <Icon 
                        className={`absolute inset-0 transition duration-600 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}
                        icon="material-symbols:close-rounded" width="40" height="40" 
                    />
                </button>

                <ul className="hidden gap-5 ml-auto md:flex">
                    {navigator.map((path, index) => (
                        <li key={index}>
                            {path.type === "anchor" ?
                                <a href={path.href} onClick={(e) => {handleAnchorClick(e, path.href)}}>{path.label}</a> :
                                <Link to={path.to}>{path.label}</Link>
                            }
                        </li>
                    ))}
                </ul>
            </div>

            {/* mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-600 ease-in-out ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="flex flex-col gap-5 p-3 items-end">
                    {navigator.map((path, index) => (
                        <li key={index}>
                            {path.type === "anchor" ?
                                <a href={path.href} onClick={(e) => {handleAnchorClick(e, path.href)}}>{path.label}</a> :
                                <Link to={path.to}>{path.label}</Link>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar