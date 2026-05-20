import Navbar from "../components/Navbar";
import type { Navigation } from "../types/navigation";
import Footer from "../components/Footer"
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const Home = () => {
    const test : Navigation[] = [
        {type: "anchor", href: "#hero", label: "Home"},
        {type: "anchor", href: "#about", label: "About"},
        {type: "anchor", href: "#skills", label: "Skills"},
        {type: "anchor", href: "#projects", label: "Projects"},
        {type: "anchor", href: "#contact", label: "Contact"},
    ];

    return(
        <div className="flex flex-col gap-20">
            <Navbar navigator={test} ></Navbar>
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