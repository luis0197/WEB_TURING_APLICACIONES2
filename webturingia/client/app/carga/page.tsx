import { auth } from "@/lib/auth";
import Cargav from "./carga";

export default async function Carga() {
  const session: any = await auth();
  if (!session) return <h1>ingresado</h1>;
  return (
    
    <Cargav />
  );
}