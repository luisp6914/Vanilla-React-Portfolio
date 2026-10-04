import Navbar from "../components/Navbar";
import type { Navigation } from "../types/navigation";
import Footer from "../components/Footer"
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { useEffect } from "react";

const Home = () => {
    const nav : Navigation[] = [
        {type: "anchor", href: "#hero", label: "Home"},
        {type: "anchor", href: "#about", label: "About"},
        {type: "anchor", href: "#skills", label: "Skills"},
        {type: "anchor", href: "#projects", label: "Projects"},
        {type: "anchor", href: "#contact", label: "Contact"},
    ];

    useEffect(() => {
        fetch(`${import.meta.env.VITE_VACCINE_BASE_URL}`).catch(() => {
            // Ignore errors: this request only exists to wake the vaxTrack backend
        });
        fetch("https://digikey-backend.onrender.com/categories").catch(() => {
            // Ignore errors: this request only exists to wake the Digikey backend
        });
    }, [])

    return(
        <div className="flex flex-col gap-20">
            <Navbar navigator={nav} ></Navbar>
            <Hero></Hero>
            <About></About>
            <Skills></Skills>
            <Projects></Projects>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    )
}

export default Home;