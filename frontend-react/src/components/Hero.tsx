import { useEffect, useState } from "react";
import hero from "../assets/bg1.jpg"



const Hero = () => {
    const [revealText, setRevealText] = useState<string>("")
    const [imageLoaded, setImageLoaded] = useState<Boolean>(false);


    useEffect(() =>{
        setRevealText("animate-revealText")
    },[]);

    return(
        <section className="relative h-screen overflow-hidden" id="hero">
            <img className="absolute inset-0 w-full h-full object-cover" src={hero} alt="hero background" onLoad={() => setImageLoaded(true)}/>
            <div className={`relative z-10 flex flex-col items-center justify-center h-full pt-[25%] ${imageLoaded && revealText}`}>
                <h1 className="font-bold text-[clamp(2rem,4.5dvw,6.5rem)]">Hi, I'm Luis</h1>
                <p className="text-[clamp(1rem,2dvw,2rem)] text-[#7AA6F7]">A Software Engineer from Los Angeles</p>
            </div>
        </section>
    );
}

export default Hero