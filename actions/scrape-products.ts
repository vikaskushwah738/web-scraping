"use server"

import { revalidatePath } from "next/cache";
import puppeteer from "puppeteer";
import fs from "fs";
export async function scrapeOlxProducts(url: string) {
    try { 
      const browser= await puppeteer.launch({headless: false});
      const page= await browser.newPage();
      const navigationPromise =page.waitForNavigation({
        waitUntil: "networkidle0",
        timeout: 120000,
      })  
      await page.goto(url, { waitUntil: "networkidle0", timeout: 120000});
      await page.addScriptTag({ url: "https://code.jquery.com/jquery-3.6.0.min.js" });
  

      await navigationPromise;

      const isJQueryLoaded = await page.evaluate(() => !!window?.jQuery)
      if(!isJQueryLoaded){
       throw new Error("jQuery not loaded") 
      }

      const data = await page.evaluate(() => {
      const title=$("h1._1hJph").text().trim();
      const price=$("span.T8y-z").text().trim();
      //const description=$("div.rui-oN78c").find("#itemDescriptionContent").text();
      const description =$("div[data-aut-id='itemDescriptionContent']").text().trim() || '';
 
      const features: string[]=[];
      return {title, price,  description, features}
      })
      await browser.close();
      revalidatePath("/");
      return {...data, url}
    } catch (error){
      console.log(error);
      return null;
    }
}

export async function exportData(data: any) {
  try{
   const jsonContent=JSON.stringify(data, null, 4);
   fs.writeFile("data.json", jsonContent, "utf-8", (err) =>{
    if(err){
      console.error("Somethink went wrong try again");
      console.error(err)
    }
    console.log("JSON file successfully created")
   })
  } catch(error){
    console.log(error)
  }
}