import Formlogin from "@/app/components/login/login"
import { auth } from "@/lib/auth"
import { getSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default async function Lgin() {
  const session = await auth()
  console.log("--------------------funciono login cliente",{session})
  if(session && session.user) redirect("/carga")
  return (
    <>
      <Formlogin />
    </>
  )
}
