import SkillCategory from "./SkillCategory";

type Skill = {
    skill: string;
    icon: string;
    proficiency: string; //Beginner Familiar Proficient Advanced
    level: 1 | 2 | 3 | 4;
}

const Skills = () => {
    const frontendSkills: Skill[] = [
        {skill: "HTML", icon:"skill-icons:html", proficiency: "Proficient", level: 3},
        {skill: "CSS", icon:"skill-icons:css", proficiency: "Proficient", level: 3},
        {skill: "JavaScript", icon:"skill-icons:javascript", proficiency: "Proficient", level: 3},
        {skill: "React", icon:"skill-icons:react-light", proficiency: "Proficient", level: 3},
        {skill: "TypeScript", icon:"skill-icons:typescript", proficiency: "Familiar", level: 2},
        {skill: "Bootstrap", icon:"skill-icons:bootstrap", proficiency: "Proficient", level: 3},
        {skill: "TailwindCSS", icon:"skill-icons:tailwindcss-light", proficiency: "Beginner", level:1 },
        {skill: "Vite", icon:"skill-icons:vite-light", proficiency: "Familiar", level: 2},
        {skill: "GitHub", icon:"skill-icons:github-light", proficiency: "Proficient", level: 3},
    ];
    
    const backendSkills: Skill[] = [
        {skill: "Java", icon: "skill-icons:java-light", proficiency: "Proficient", level: 3},
        {skill: "Python", icon: "skill-icons:python-light", proficiency: "Familiar", level: 2},
        {skill: "Node.js", icon: "skill-icons:nodejs-light", proficiency: "Familiar", level: 2},
        {skill: "Express.js", icon: "skill-icons:expressjs-light", proficiency: "Familiar", level: 2},
        {skill: "Spring Boot", icon: "skill-icons:spring-light", proficiency: "Familiar", level: 2},
        {skill: "JSON", icon: "vscode-icons:file-type-json2", proficiency: "Advanced", level: 4},
        {skill: "PostgreSQL", icon: "skill-icons:postgresql-light", proficiency: "Familiar", level: 2},
        {skill: "MySQL", icon: "skill-icons:mysql-light", proficiency: "Familiar", level: 2},
        {skill: "MongoDB", icon: "skill-icons:mongodb", proficiency: "Beginner", level: 1},
        {skill: "Hibernate", icon: "skill-icons:hibernate-light", proficiency: "Beginner", level: 1},
        {skill: "Git", icon: "skill-icons:git", proficiency: "Familiar", level: 2},
        {skill: "Postman", icon: "skill-icons:postman", proficiency: "Proficient", level: 3},
    ];

    const devOpsCloud: Skill[] = [
        {skill: "AWS", icon: "skill-icons:aws-light", proficiency: "Familiar", level: 2},
        {skill: "Azure", icon: "skill-icons:azure-light", proficiency: "Familiar", level: 2},
        {skill: "Docker", icon: "skill-icons:docker", proficiency: "Familiar", level: 2},
        {skill: "GitHub Actions", icon: "skill-icons:githubactions-light", proficiency: "Beginner", level: 1},
        {skill: "CI/CD Piplines", icon: "clarity:ci-cd-line", proficiency: "Beginner", level: 1},
    ];
    

    return(
        <section className="mt-[25dvh]">
            <h3 className="text-[clamp(2rem,3dvw,3rem)] text-[#656565] text-center">Skills</h3>
            <div className="flex flex-col gap-20">
                <SkillCategory title={"FRONTEND"} skills={frontendSkills} className="pl-8"></SkillCategory>

                <SkillCategory title={"Backend"} skills={backendSkills} className="pr-8 text-end" reverse></SkillCategory>

                <SkillCategory title={"DevOps & CLOUD"} skills={devOpsCloud} className="pl-8"></SkillCategory>
            </div>
        </section>
    );
}

export default Skills;