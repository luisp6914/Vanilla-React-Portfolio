import { Icon } from "@iconify/react";
import { useState } from "react";
import type { Category } from "../types/category";

interface DigiCategoryByIdProps{
    className: string;
}

const DigiCategoryById = ({className}: DigiCategoryByIdProps) => {
    const [prompt, setPrompt] = useState<string>("");
    const [category, setCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputField = e.target.value;

        if(inputField === ""){
            setPrompt("");
            return;
        }
        else if(/[^0-9]/.test(inputField)){
            return;
        } else if(Number(inputField) <= 0){
            return;
        }

        setPrompt(inputField);
    }

    const handleClear = () => {
        setCategory(null);
        setPrompt("");
    }

    const handleSearchById = async (e: React.SubmitEvent) => {
        e.preventDefault();
        
        setIsLoading(true);

        const categoryId = Number(prompt);

        try {
            const response = await fetch(`https://digikey-backend.onrender.com/categories/${categoryId}`);

            if(response.status === 404){
                alert(`Category: ${categoryId} NOT FOUND`);
                return;
            }

            if(!response.ok){
                throw new Error(`Failed to get Category: ${categoryId}\nError: ${response.status}`);
            } 

            const data: Category = await response.json();

            setCategory(data);
            console.log(data);

        } catch (error) {
            console.error(error);
        } finally{
            setIsLoading(false);
        }

    }
    
    return(
        <div className={`${className}`}>
            <div className="relative w-3/4 md:w-1/2 lg:w-2/5 mx-auto mt-5">
                <form onSubmit={handleSearchById}>
                    <input className="peer shadow-[0_0_20px_#818CF8] outline-hidden rounded-full w-full pl-11 pr-11 py-2" placeholder=" " type="text" inputMode="numeric" id="category-search" required value={prompt}  onChange={handleChange}/>
                    <label htmlFor="category-search" className=" absolute left-11 top-1/2 -translate-y-1/2 text-gray-400 text-sm peer-[:not(:placeholder-shown)]:hidden"> Enter Category ID #:</label>
                    <button type="submit" className=" absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer">
                        <Icon icon="bitcoin-icons:search-filled" height={32} width={32}></Icon>
                    </button>
                    {prompt !== "" && (
                        <button type="button" className=" absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleClear}>
                            <Icon icon="bitcoin-icons:cross-filled"></Icon>
                        </button>
                    )}
                </form>
            </div>
                
            {isLoading ? (
                <div className="flex flex-1 justify-center items-center min-h-[50dvh]">
                    <Icon icon="svg-spinners:bars-fade" height={60} width={60}></Icon>
                </div>
            ) : category !== null ? (
                <>

                    <h1 className=" font-bold text-4xl text-center mb-5 mt-5">{category.Name}</h1>
                    <div className="gap-5 flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 content-start">
                        {category.Children.map((childCategory) => (
                            <div key={childCategory.CategoryId} className="bg-gray-200 p-5 rounded-lg h-55 w-full flex justify-center items-center border border-gray-300/70 shadow-sm hover:shadow-md hover:border-gray-400/50 transition-all duration-200">
                                <div className="text-left w-full">
                                    <h1 className="text-2xl font-bold mb-5">{childCategory.Name}</h1>
                                    <p className="text-gray-600"><b>Product Count:</b> {childCategory.ProductCount}</p>
                                    <p className="text-gray-600"><b>Category ID:</b> {childCategory.CategoryId}</p>
                                    <p className="text-gray-600"><b>Parent ID:</b> {childCategory.ParentId}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : ""}
        </div>
    );
}

export default DigiCategoryById;