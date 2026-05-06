import { Icon } from "@iconify-icon/react";

const Footer = () => {
    return (
        <footer className="text-center pb-5 pt-5 ">
            <div className="border-b border-opacity-0 ml-10 mr-10  flex justify-center gap-5">
                <a href="https://www.linkedin.com/in/luis-perez-5941b91a5/" target="_blank">
                    <Icon className="linkedin-icon" icon="formkit:linkedin" width="40" height="40" />
                </a>

                <a href="https://github.com/luisp6914" target="_blank">
                    <Icon className="github-icon" icon="foundation:social-github" width="40" height="40" />
                </a>
            </div>
            <p className="pt-5 text-[18px]">By Luis Perez</p>
        </footer>
    );
}

export default Footer;