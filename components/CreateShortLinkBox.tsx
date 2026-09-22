"use client"
import { useState } from "react";
import {API_BASE, ENDPOINTS, request} from "../api/client"
import test from "node:test";

export default function CreateShortLinkBox(){
   const [shortening, setShortening]= useState(false);
   const [customCode, setCustomCode]=useState("");
   const [url, setUrl]= useState("")
   const [error, setError]= useState("");

   const handleSubmit= async()=>{
      if(!customCode.trim() && !url.trim()) return;
      setShortening(true);
      
      try{
         const formData= new FormData();
         formData.append("text", customCode); 

         const ShortenRequest=await request(ENDPOINTS.shorten(API_BASE),{
            method: "POST",
            body: JSON.stringify({
               url, customCode
            })
         })
         setUrl("");
         setCustomCode("");
      }
      catch(err:any){
         setError(err.message);
      }finally{
         setShortening(false);
      }
   }
   return (
      <div className="bg-white rounded-2xl p-5 w-full max-w-sm">
         <div>
            <div>
               <p>Create Short Link</p>

               <button>
                  close
               </button>
            </div>
            <input type="text" value={url} onChange={(e)=> setUrl(e.target.value)} className="w-full border border-gray-300 roundedlg px-3 py-2 text-sm mb-3 resize-none" placeholder="Input Url that you want to shorten"/>
            <input type="text" value={customCode} onChange={(e)=> setCustomCode(e.target.value)} className="w-full border border-gray-300 roundedlg px-3 py-2 text-sm mb-3 resize-none" placeholder="input custom url short code "/>
            <button disabled={shortening} onClick={handleSubmit} className="ml-auto w-full bg-purple-600 text-white text-sm py-2 font-medium rounded-lg disabled:opacity-50">
               {shortening? "Creating...": "Create"}
            </button>
         </div>
      </div>
   )
}