

const About = () => {
    return (
        <article className="flex flex-col mt-[25dvh] p-16 md:flex-row gap-8 justify-center w-full scroll-mt-10" id="about">
            <h2 className="self-start relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-1/2 after:h-0.5 after:bg-[#656565] text-[clamp(2rem,3dvw,3rem)] font-bold">About</h2>
            <div className="max-w-2xl flex flex-col gap-5">
                <h3 className="text-[clamp(2.1rem,3dvw,3rem)] font-bold bg-linear-to-r from-[#7AA6F7] to-violet-500 bg-clip-text text-transparent">Adaptive Engineer Passionate About Full-Stack Development.</h3>
                <p className="text-[1.1rem]">
                    Worked across the full software development lifecycle, building scalable, maintainable systems across backend, frontend, 
                    automation, and QA, with a focus on reliability and business alignment.
                </p>
            </div>
        </article>
    );
}

export default About