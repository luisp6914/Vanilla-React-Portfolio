import { Icon } from "@iconify-icon/react";
import { useEffect, useRef } from "react";

type Skill = {
    skill: string;
    icon: string;
    proficiency: string; //Beginner Familiar Proficient Advanced
    level: 1 | 2 | 3 | 4;
}

interface Props {
    title: string;
    skills: Skill[];
    className: string;
    reverse?: boolean;
}

const SkillCategory = ({title, skills, className, reverse = false} : Props) => {
    const categoryRef = useRef<HTMLDivElement>(null);
    const animationClass = reverse ? "animate-slideFromRight" : "animate-slideFromLeft";

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if(entry.isIntersecting){
                categoryRef.current?.classList.add(animationClass);
            }
        }, { threshold: 0.3 });

        if(categoryRef.current){
            observer.observe(categoryRef.current);
        }

        return () => observer.disconnect();

    }, []);
    


    return(
        <div ref={categoryRef} className={`flex flex-col gap-5 ${className}`}>
            <h3 className="text-3xl font-bold bg-linear-to-r from-[#7AA6F7] to-violet-500 bg-clip-text text-transparent">{title}</h3>
            <div className={`flex gap-8 overflow-scroll overflow-y-hidden scrollbar-hide ${reverse ? "flex-row-reverse" : ""}`}>
                {skills.map((card) => (
                    <div key={"card-" + card.icon + title} className={`flex flex-col gap-5 border rounded-2xl border-transparent bg-[#F2F2F2] p-5 md:w-75 shrink-0 ${reverse ? "last:ml-8" : "last:mr-8"}`}>
                        <div className="flex gap-5 items-center h-full">
                            <Icon icon={card.icon} width="48" height="48"></Icon>
                            <h4 className="ml-auto font-bold text-[#7AA6F7]">{card.skill}</h4>
                        </div>

                        <div className="flex gap-5 items-center text-center">
                            <div className="flex gap-1">
                                {Array.from({length : 4}, (_, i) => (
                                    <div key={"dots-" + card.icon + i} className={`h-3 w-3 border rounded-full ${i < card.level ? 'bg-[#7AA6F7]' : 'bg-white'}`}></div>
                                ))}
                            </div>
                            <p className="text-gray-400 ml-auto"> {card.proficiency} </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SkillCategory;