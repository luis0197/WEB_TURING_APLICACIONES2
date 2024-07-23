'use client'
import lazo from "../../img/lazo.svg"
import mapa from "../../img/Mapa.svg"
import log from "../../img/Asset 1.png"
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alerts from "../../alerts";

export default function Formlogin() {


  const [errors, setErrors] = useState<string[]>([]);
  const [username, setUsuaio] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleClickwelcome = () => {
    Alerts.welcome('');
  };
  const handleClickerrorlogin = () => {
    Alerts.errorlogin('');
  };

  const handlerSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    console.log(responseNextAuth);
    
    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      handleClickerrorlogin();
      return;
    }
    handleClickwelcome()
    router.push("/carga");
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image src={mapa} layout="fill" className="object-cover pointer-events-none" alt="Flowbite mapa" />
      <Link href="/">
        <button className="absolute top-4 left-4 bg-white p-2 rounded-md z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </Link>
      <div className="flex justify-center items-center z-8 h-screen">
        <div className=" ">
          <Image src={lazo} className="pt-24 " alt="Flowbite lazo " />
        </div>
        <div className="h-full">
          <div className="absolute md:absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 z-10  border border-gray-300 bg-white rounded-lg p-8 " >
            <form className="max-w-sm mx-auto p-62 " onSubmit={handlerSignIn}>
              <div className="mb-5">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#804593] order border-gray-300">USUARIO</label>
                <input value={username} onChange={(event) => setUsuaio(event.target.value)} type="username" id="username" className="bg-white border-b-2 border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-[#804593] dark:placeholder-gray-400 dark:text-[#804593] dark:focus:ring-blue-500 dark:focus:border-[#804593]" required />
              </div>
              <div className="mb-5">
                <label htmlFor="password" className=" pt-0 block mb-2 text-sm font-medium text-gray-900 dark:text-[#804593]">CONTRASEÑA</label>
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" id="password" className="bg-white border-b-2 border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-[#804593] dark:placeholder-gray-400 dark:text-[#804593] dark:focus:ring-blue-500 dark:focus:border-[#804593]" required />
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-[#804593] rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-[#804593] dark:text-[#804593]">Recordar</label>
              </div>
              <button type="submit" className="text-white bg-[#804593] hover:bg-[#803c97] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#804593] dark:hover:bg-[#ac8eb6] dark:focus:ring-gray">Ingresar</button>
            </form>
            {errors.length > 0 && (
              <div className="alert alert-danger mt-2">
                <ul className="mb-0">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* <button type="submit" className="text-white bg-[#804593] hover:bg-[#803c97] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#804593] dark:hover:bg-[#ac8eb6] dark:focus:ring-gray"onClick={() => }>Ingresar</button>    */}
          </div>
          <div className="h-full ">
            <Image src={log} className=" w-full  -z-9 h-full object-cover opacity-100" alt=" Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
