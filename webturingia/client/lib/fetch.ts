import { getSession } from "next-auth/react"

// fetchAPI("/users").then((resp)=>resp.json()) 
// Backend recive Authorization = JWT final

// fetch("https://locahol:3001/")
// cookies recibe el JWTCliente -> jwtFinal
// PAra uqe funcione debe desencriptar el JWTCliente para poder ver jwtFinal

export async function fetchAPI(path: string, options: any) {
    // Get JWT token from local storage
    const session: any = await getSession()
    const headers: any = {}

    headers["Content-Type"] = "application/json"

    if (session) {
        headers.Authorization = `Bearer ${session?.jwt}` //ESte es el JWT del BAckend el FINAL
    }

    const mergedOptions = {
        ...options?.options,
        headers,
      }
      
    return fetch("https://localhost:3001/api" + path, mergedOptions)
}