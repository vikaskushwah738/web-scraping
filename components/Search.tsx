'use client'
import { useState } from "react";
export default function SearchBar() {
    const [serachPrommt, setSerachPrommt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const products=[];
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsLoading(true)
        try {
        
        }
        catch (error) {
        console.log(error);
        }
        setIsLoading(false);
    }
    return (
        <div className="flex-col lg:flex-row w-full item-left items-center flex gap-2 pt-10">
            <input
                type="text"
                placeholder="Search for an OLX product to scrape"
                className="w-full p-2 border-4 focus:outline-none border-neutral-200 rounded-lg text-gray-500"
                value={serachPrommt}
                onChange={(e) => setSerachPrommt(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                disabled={serachPrommt === "" || isLoading}
                className={`${serachPrommt !== "" && !isLoading ? "cursor-pointer" : ""}
                h-10 text-white disabled:bg-gray-400 w-[150px] bg-slate-800 rounded-md`}
            >
                {isLoading ? "Scraping" : "Scraper"}
            </button>
            <button
                onClick={()=> {}}
                disabled={!products.length || isLoading}
                className={` ${products?.length || isLoading ? "cursor-pointer" : ""}
                h-10 text-white disabled:bg-gray-400 w-[150px] bg-slate-800 rounded-md`}>
                Export
            </button>
        </div>
    ); 
}
