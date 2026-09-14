import { useEffect, useState } from "react";
import type { Category } from "../types/category";
import { Icon } from "@iconify/react";

interface DigiCategoriesProps{
    className: string;
}

const DigiCategories = ({className} : DigiCategoriesProps) => {

    const [categories, setCategories] = useState<Category[] | null>(null);
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://digikey-backend.onrender.com/categories");

                if(!response.ok) throw new Error(`HTTP error: ${response.status}`);

                const data: Category[] = await response.json();

                setCategories(data);
                setActiveCategoryId(data[0]?.CategoryId ?? null);
                
                //console.log(data);
            } catch (error) {
                alert(error);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
        
    }, []);

    const activeCategory = categories?.find(
        category => category.CategoryId === activeCategoryId
    )

    return(
        <div className={`flex flex-col min-w-0 ${className}`}>
            <div className="flex w-full h-20 shrink-0 items-center gap-3 min-w-0">
                <div className="flex gap-5 flex-1 min-w-0 overflow-x-scroll scrollbar-hide">
                    {categories?.map((category) => (
                        <button key={category.CategoryId} className={`${activeCategoryId === category.CategoryId ? "bg-linear-to-l from-indigo-600 to-violet-600" : "bg-linear-to-r from-gray-300 to-slate-400 text-slate-600"} ${activeCategoryId !== category.CategoryId ? "hover:from-indigo-600 hover:to-violet-600 hover:text-white cursor-pointer" : ""} px-5 py-2 rounded-full w-55 shrink-0 truncate ${activeCategoryId === category.CategoryId && "text-white" }`} onClick={() => setActiveCategoryId(category.CategoryId)}> {category.Name} </button>
                    ))}
                </div>
            </div>
            <div className="gap-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 content-start">
                {isLoading ? 
                <div className="col-span-full flex justify-center">
                    <Icon icon="svg-spinners:bars-fade" height={60} width={60}></Icon>
                </div> : 
                (activeCategory?.Children.map((category) => (
                    <div key={category.CategoryId} className="bg-gray-200 p-5 rounded-lg h-55 w-full flex justify-center items-center border border-gray-300/70 shadow-sm hover:shadow-md hover:border-gray-400/50 transition-all duration-200">
                        
                        <div className="text-left w-full">
                            <h1 className="text-2xl font-bold mb-5">{category.Name}</h1>
                            <p className="text-gray-600"><b>Product Count:</b> {category.ProductCount}</p>
                            <p className="text-gray-600"><b>Category ID:</b> {category.CategoryId}</p>
                            <p className="text-gray-600"><b>Parent ID:</b> {category.ParentId}</p>
                        </div>
                    </div>
                )))}
            </div>
        </div>
    );
}

export default DigiCategories;