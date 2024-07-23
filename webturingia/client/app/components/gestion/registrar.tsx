"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Alerts from '../../alerts';
import React from 'react';

interface RegistrarProps {
  closeModal: () => void;
}

export default function Registrar({ closeModal }: RegistrarProps) {


  const [cedula, setCedula] = useState("");
  const [nombreResponsable, setNombreResponsable] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    if (password !== repeatPassword) {
      setErrors(["Las contraseñas no coinciden"]);
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/`, {
      method: "POST",
      body: JSON.stringify({
        cedula,
        nombreResponsable,
        institucion,
        username,
        password,
        rol,
      }),
      headers: {
        "x-token": `${session?.user?.token}`,
        "Content-Type": "application/json",
      },
    });

    const responseAPI = await res.json();
    console.log(responseAPI)
    handleClickregistrar()
    if (!res.ok) {
      setErrors([responseAPI.message]);
      return;
    }

    // Redirecciona después de registrar exitosamente
    closeModal();
    //router.push("/dashboard");
  };
  const handleClickregistrar = () => {
    Alerts.registrarSuc('Usuario registrado.');
  };
  const handleClickerror = () => {
    Alerts.error('Error al registrar.');
  };
  return (
    <>
      <form className="max-w-md mx-auto justify-self-center" onSubmit={handleSubmit}>
        <div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="username"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              E-mail
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Contraseña
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="repeatPassword"
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "

              onChange={(event) => setRepeatPassword(event.target.value)}
              required
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirmar contraseña
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="nombreResponsable"
                id="floating_nombre_responsable"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={nombreResponsable}
                onChange={(event) => setNombreResponsable(event.target.value)}
                required
              />
              <label
                htmlFor="floating_nombre_responsable"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="institucion"
                id="floating_institucion"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={institucion}
                onChange={(event) => setInstitucion(event.target.value)}
                required
              />
              <label
                htmlFor="floating_institucion"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Institución
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 justify-items-center">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="cedula"
                id="floating_usuario_id"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={cedula}
                onChange={(event) => setCedula(event.target.value)}
                required
              />
              <label
                htmlFor="floating_usuario_id"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Cédula
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <select
                name="rol"
                id="floating_rol"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={rol}
                onChange={(event) => setRol(event.target.value)}
                required
              >
                <option value="" disabled hidden className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Selecciona el rol</option>
                <option value="ADMIN">ADMIN</option>
                <option value="PARTICIPANTE">PARTICIPANTE</option>
              </select>
              <label
                htmlFor="floating_rol"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Rol
              </label>
            </div>

          </div>
          {errors.length > 0 && (
            <div className="text-red-600 mb-4">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <div className='flex justify-center'>
            <button
              type="submit"
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Registrar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
