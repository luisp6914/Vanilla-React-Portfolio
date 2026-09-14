import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import type { Navigation } from "../../../types/navigation";
import { Icon } from "@iconify/react";
import DigiCategories from "./DigiCategories";
import Footer from "../../../components/Footer";
import DigiCategoryById from "./DigiCategoryById";
import DigiKeyword from "./DigiKeyword";

const DigiContent = () => {
    const nav : Navigation[] = [{type: "link", to: "/", label: "Home"}];

    const [activeTab, setActiveTab] = useState<"categories" | "idSearch" | "keyword">("categories");

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return(
        <>
            <Navbar navigator={nav}></Navbar>
            <main className="digiContainer flex flex-col md:flex-row mt-20 mx-10 min-h-[calc(100dvh-13rem)]">
                <aside className="menu flex md:flex-col gap-5 md:w-65 shrink-0 p-5 text-white font-bold">
                    <button className={`flex justify-center items-center  p-5 rounded-sm w-55 h-16 ${activeTab === "categories" ? "bg-linear-to-r from-indigo-600 to-violet-600" : "text-blue-400 cursor-pointer"} transition-colors duration-300 ease-in-out`} onClick={() => setActiveTab("categories")}>
                        <span className="hidden md:inline">All Categories</span>
                        <span className="md:hidden">
                            <Icon className="tabIcon" icon="fluent-mdl2:product-variant" height={32}/>
                        </span>
                    </button>

                    <button className={`flex justify-center items-center  p-5 rounded-sm w-55 h-16 ${activeTab === "idSearch" ? "bg-linear-to-r from-indigo-600 to-violet-600" : "text-blue-400 cursor-pointer"} transition-colors duration-300 ease-in-out `} onClick={() => setActiveTab("idSearch")}>
                        <span className="hidden md:inline">Search Category By ID</span>
                        <span className="md:hidden">
                            <Icon className="tabIcon" icon="fluent:box-search-16-regular" height={32}/>
                        </span>
                    </button>

                    <button className={`flex justify-center items-center  p-5 rounded-sm w-55 h-16 ${activeTab === "keyword" ? "bg-linear-to-r from-indigo-600 to-violet-600" : "text-blue-400 cursor-pointer"} transition-colors duration-300 ease-in-out`} onClick={() => setActiveTab("keyword")}>
                        <span className="hidden md:inline">Keyword Search</span>
                        <span className="md:hidden">
                            <Icon className="tabIcon" icon="lineicons:search-text" height={32}/>
                        </span>
                    </button>
                </aside>
                <section className="results flex-1 min-w-0">
                    <DigiCategories className={activeTab === "categories" ? "block" : "hidden"}></DigiCategories>

                    
                    <DigiCategoryById className={activeTab === "idSearch" ? "block" : "hidden"}/>
                    

                    <DigiKeyword className={activeTab === "keyword" ? "block" : "hidden"}></DigiKeyword>
                    
                </section>
            </main>

            <Footer></Footer>
            
        </>
    );
}

export default DigiContent;

