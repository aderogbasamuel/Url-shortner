export const API_BASE=
    import.meta.env.VITE_API_BASE_URL||
    "https://bit.devdrogba.me/api";

export const ENDPOINTS={
    register: (base)=> `${base}/auth/signup`,
    shorten: (base)=> `${base}/shorten`,
}


export async function request(url, options={}){
    const res= await fetch(url,{
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        ...options
    });

    let data=null;
    try{
        data= await res.json();
    }
    catch(_){}
    if (!res.ok){
        throw new Error(data?.message|| `Request failed (${res.status})`)
    }
    return data;
}