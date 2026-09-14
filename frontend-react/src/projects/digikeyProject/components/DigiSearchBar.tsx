import { Icon } from "@iconify/react";
import { useState } from "react";


const DigiSearchBar = () => {
    const [prompt, setPrompt] = useState<string>("")

    return(
        <div className="relative w-3/4 md:w-1/2 lg:w-2/5 mx-auto mt-5">
            <input className="peer shadow-[0_0_20px_#818CF8] outline-hidden rounded-full w-full pl-11 pr-11 py-2" placeholder=" " type="text" id="category-search" required value={prompt}  onChange={(e) => setPrompt(e.target.value)}/>
            <label htmlFor="category-search" className=" absolute left-11 top-1/2 -translate-y-1/2 text-gray-400 text-sm peer-[:not(:placeholder-shown)]:hidden"> Enter Category ID:</label>
            
            <button className=" absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer">
                <Icon icon="bitcoin-icons:search-filled" height={32} width={32}></Icon>
            </button>

            {prompt !== "" && (
                <button className=" absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setPrompt("")}>
                    <Icon icon="bitcoin-icons:cross-filled"></Icon>
                </button>
            )}
        </div>
    );
}

export default DigiSearchBar;