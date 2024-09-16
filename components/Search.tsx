'use client'
import {scrapeOlxProducts, exportData} from "@/actions/scrape-products";
import useStore from "@/hooks/olx-products";
import { useState } from "react";
export default function SearchBar() {
    const [serachPromt, setSerachPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const products=useStore((state : any) => state.products)
    const addProduct=useStore((state: any) => state.addProduct)
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true)
        try {
        const product= await scrapeOlxProducts(serachPromt);
        console.log(product);
        addProduct(product);
        setSerachPrompt("");
        }
        catch (error) {
        console.log(error);
        }
        setIsLoading(false);
    }
    const exportProduct = async() =>{
     try{
       await exportData(products);
       alert("exported.")
     } catch(error){
        console.log(error)
     }
    }
    return (
        <div className="flex-col lg:flex-row w-full item-left items-center flex gap-2 pt-10">
            <input
                type="text"
                placeholder="Search for an OLX product to scrape"
                className="w-full p-2 border-4 focus:outline-none border-neutral-200 rounded-lg text-gray-500"
                value={serachPromt}
                onChange={(e) => setSerachPrompt(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                disabled={serachPromt === "" || isLoading}
                className={`${serachPromt !== "" && !isLoading ? "cursor-pointer" : ""}
                h-10 text-white disabled:bg-gray-400 w-[150px] bg-slate-800 rounded-md`}
            >
                {isLoading ? "Scraping..." : "Scraper"}
            </button>
            <button
                onClick={exportProduct}
                disabled={!products.length || isLoading}
                className={`${products?.length || isLoading ? "cursor-pointer" : ""}
                h-10 text-white disabled:bg-gray-400 w-[150px] bg-slate-800 rounded-md`}>
                Export
            </button>
        </div>
    ); 
}
