"use server"

import { revalidatePath } from "next/cache";
import puppeteer from "puppeteer"

export default async function scrapeOlxProducts(url: string) {
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
      const description=$("div.rui-oN78c").children().text(); 
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