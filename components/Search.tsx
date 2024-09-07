'use client'
import { useState } from "react";
export default function SearchBar() {
    const [serachPrommt, setSerachPrommt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (e: any) => {
        try {
        
        }
        catch {
        
        }
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
                className={`${serachPrommt !== "" && !isLoading ? "cursor-pointer" : ""}
                h-10 text-white w-[150px] bg-slate-800 rounded-md`}
                type="submit"
            >
                {isLoading ? "Scraping" : "Scraper"}
            </button>
        </div>
    );
}
