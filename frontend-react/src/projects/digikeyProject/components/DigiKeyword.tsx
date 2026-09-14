import { Icon } from "@iconify/react";
import { useState } from "react";
import type { Product } from "../types/product";

interface DigiKeywordProps{
    className: string;
}

const DigiKeyword = ({className}: DigiKeywordProps) => {

    const [prompt, setPrompt] = useState<string>("");
    const [products, setProducts] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputField = e.target.value;

        if (/^[A-Za-z\s]*$/.test(inputField)){
            setPrompt(inputField);
        }
        
    }

    const handleClear = () => {
        setProducts(null);
        setPrompt("");
    }

    
    const handleKeywordSearch = async (e: React.SubmitEvent) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await fetch(`https://digikey-backend.onrender.com/keyword?keyword=${prompt}`);

            if(response.status === 404){
                alert(`${prompt} NOT FOUND`);
                return;
            }

            if(!response.ok) throw new Error(`Failed to search ${prompt}\n ${response.status}`);

            const data:Product[] = await response.json();

            setProducts(data);
            //console.log(data)

        } catch (error) {
            alert(error);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    return(
        <div className={`${className}`}>
            <div className="relative w-3/4 md:w-1/2 lg:w-2/5 mx-auto mt-5">
                <form onSubmit={handleKeywordSearch}>
                    <input className="peer shadow-[0_0_20px_#818CF8] outline-hidden rounded-full w-full pl-11 pr-11 py-2" placeholder=" " type="text" id="keyword-search" required value={prompt}  onChange={handleChange}/>
                    <label htmlFor="keyword-search" className=" absolute left-11 top-1/2 -translate-y-1/2 text-gray-400 text-sm peer-[:not(:placeholder-shown)]:hidden">Keyword Search:</label>
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
            ) : products !== null ? (
                <div className="gap-5 flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 content-start mt-10">
                    {products.map((product) => (
                        <div key={product.ProductUrl} className="bg-gray-200 rounded-lg min-h-105 w-full flex flex-col border border-slate-300 shadow-sm hover:shadow-md hover:border-slate-400 transition-all duration-200">
                            <div className="bg-white rounded-t-lg h-45 w-full flex justify-center items-center">
                                <img className="max-h-full max-w-full object-contain" src={product?.PhotoUrl || "/public/imageFallBack.png"} alt={product.Description.ProductDescription} loading="lazy" onError={(e) => {e.currentTarget.src = "/placeholder-image.png";}}/>
                            </div>

                            <div className=" p-5 flex flex-col flex-1">
                                <p className="font-semibold line-clamp-2">{product?.Description?.ProductDescription || "No description available"}</p>
                                <p className="mt-3 text-gray-600">Manufacturer: {product?.Manufacturer?.Name || "Unknown manufacturer"}</p>
                                <p className="mt-2 text-xl font-bold">${product?.UnitPrice ?? "N/A"}</p>
                                <p className="mt-2 text-gray-600">Available Units: {product?.QuantityAvailable ?? "N/A"}</p>

                                {expandedProduct === product.ProductUrl && (
                                    <div className="mt-4 pt-4 border-t border-gray-400">
                                        <p className="text-sm text-gray-600">
                                            {product.Description.DetailedDescription}
                                        </p>
                                    </div>
                                )}
                            </div>


                            <div className="p-5 pt-0 mt-auto flex gap-3">
                                <button className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer" onClick={() => setExpandedProduct(expandedProduct === product.ProductUrl ? null : product.ProductUrl)}>
                                    {expandedProduct === product.ProductUrl ? "Hide Details" : "Details"}
                                </button>

                                <a className="flex-1 text-center bg-slate-700 text-white py-2 rounded-md hover:bg-slate-800 transition-colors" href={product.ProductUrl} target="_blank" rel="noopener noreferrer" >
                                    View Product
                                </a>
                            </div>

                        </div>
                    ))}
                </div>
            ) : ""}
        </div>
    );
}

export default DigiKeyword