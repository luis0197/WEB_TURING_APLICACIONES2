"use client"
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import logo from '../img/logo.svg';
import espoch from '../img/espoch.svg';
import Link from 'next/link';
import Pie from '../components/footer/footer'
import mapa from "../img/Mapa.svg"
import biologicas from "../img/biologicas.svg"
import subir from "../img/upload.svg"
import search from "../img/search.svg"
import { signOut } from "next-auth/react";
import Analisis from '../components/analisis/modelo'
import { signIn, useSession } from "next-auth/react";

export default function Carga() {
  const { data: session, status } = useSession();
  console.log({ session, status })
  // Estados y funciones para cargar/subir imágenes
  const [loadingImagenes, setLoadingImagenes] = useState(false);
  const [errorImagenes, setErrorImagenes] = useState<string | null>(null);
  const [filesImagenes, setFilesImagenes] = useState<File[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [buttonDisabledImagenes, setButtonDisabledImagenes] = useState(true);
  const [showModalanalisis, setShowModalanalisis] = useState<boolean>(false);

  //anaisis de imagenes
  const openAnalisisModal = () => {
    setShowModalanalisis(true);
  };
  const closeanalisisModal = () => {
    setShowModalanalisis(false);
  };

  const guardarImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorImagenes(null);
    const fileList = e.target.files;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    let allFilesValid = true;

    const validatedFiles = Array.from(fileList || []).filter(file => {
      if (!allowedTypes.includes(file.type)) {
        setErrorImagenes('Uno o más archivos seleccionados no son imágenes válidas.');
        allFilesValid = false;
        setTimeout(() => {
          setErrorImagenes(null);
        }, 2000);
        return false;
      }
      return true;
    });

    if (allFilesValid) {
      setFilesImagenes(validatedFiles);
      setShowModal(true); // Mostrar el modal al seleccionar archivos válidos
    }
  };
  useEffect(() => {
    // Habilitar el botón solo si hay archivos válidos seleccionados
    setButtonDisabledImagenes(filesImagenes.length === 0);
  }, [filesImagenes]); // Dependencia añadida

  const subirImagenes = () => {
    setErrorImagenes(null);
    setLoadingImagenes(true);
    const promises: Promise<void>[] = [];

    filesImagenes.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const promise = new Promise<void>((resolve, reject) => {
        reader.onload = () => {
          const rawLog = reader.result?.toString().split(',')[1];
          const dataSend = {
            dataReq: { data: rawLog, name: file.name, type: file.type },
            fname: "uploadFilesToGoogleDrive"
          };
          fetch('https://script.google.com/macros/s/AKfycbxFP3ZBwTHL8ySaIp4LvEkzWF8UcmNIEEw-GKD6EDgToOmH4h3-Io3AQlJ0PUKIx-JG/exec',
            { method: "POST", body: JSON.stringify(dataSend) })
            .then(res => {
              if (!res.ok) {
                throw new Error('Error al subir el archivo');
              }
              return res.json();
            })
            .then(() => {
              resolve();
            })
            .catch(e => {
              setTimeout(() => {
                setErrorImagenes('Error al subir uno o más archivos.');
              }, 2000);

              reject();
            });
        };
      });
      promises.push(promise);
    });

    Promise.all(promises)
      .then(() => {
        setLoadingImagenes(false);
        setFilesImagenes([]);
        setShowModal(false); // Cerrar el modal después de subir los archivos
        setUploadSuccess(true); // Mostrar mensaje de éxito
        setTimeout(() => {
          setUploadSuccess(false); // Ocultar mensaje de éxito después de 2 segundos
        }, 2000);
      })
  };


  // Estados y funciones para cargar/subir archivos
  const [loadingArchivos, setLoadingArchivos] = useState(false);
  const [errorArchivos, setErrorArchivos] = useState<string | null>(null);
  const [filesArchivos, setFilesArchivos] = useState<File[]>([]);
  const [buttonDisabledArchivos, setButtonDisabledArchivos] = useState(true);

  const guardarArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorArchivos(null);
    const fileList = e.target.files;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    let allFilesValid = true;

    const validatedFiles = Array.from(fileList || []).filter(file => {
      if (!allowedTypes.includes(file.type)) {
        setErrorArchivos('Uno o más archivos seleccionados no son imágenes válidas.');
        allFilesValid = false;
        setTimeout(() => {
          setErrorArchivos(null);
        }, 2000);
        return false;
      }
      return true;
    });

    if (allFilesValid) {
      setFilesArchivos(validatedFiles);
      // Habilita el botón solo si hay archivos válidos seleccionados
      setButtonDisabledArchivos(false);
    } else {
      // Deshabilita el botón si hay errores o archivos no válidos seleccionados
      setButtonDisabledArchivos(true);
    }
  }

  const subirArchivos = () => {
    setErrorArchivos(null);
    setLoadingArchivos(true);
    const promises: Promise<void>[] = [];

    filesArchivos.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const promise = new Promise<void>((resolve, reject) => {
        reader.onload = () => {
          const rawLog = reader.result?.toString().split(',')[1];
          const dataSend = {
            dataReq: { data: rawLog, name: file.name, type: file.type },
            fname: "uploadFilesToGoogleDrive"
          };
          fetch('https://script.google.com/macros/s/AKfycbz4oN28gAMEmY7gADdAd4yUHCP4UNEyOkrPzvoETiGdn6qevttX2Ftmjr0iP3lJdgmK/exec',
            { method: "POST", body: JSON.stringify(dataSend) })
            .then(res => {
              if (!res.ok) {
                throw new Error('Error al subir el archivo');
              }
              return res.json();
            })
            .then(() => {
              resolve();
            })
            .catch(e => {
              setTimeout(() => {
                setErrorArchivos('Error al subir uno o más archivos.');
              }, 2000);
              reject();
            });
        };
      });
      promises.push(promise);
    });

    Promise.all(promises)
      .then(() => {
        setLoadingArchivos(false);
        setUploadSuccess(true); // Mostrar mensaje de éxito
        setTimeout(() => {
          setUploadSuccess(false); // Ocultar mensaje de éxito después de 2 segundos
        }, 2000);
      })
      .catch(() => {
        setLoadingArchivos(false);
      });
    setFilesArchivos([]);

  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (session) {
    return (
      <div className=''>
        <Image src={mapa} layout="fill" className="object-cover -z-10" alt="Flowbite mapa" />
        <div className='h-28'>
          <nav className="border-gray-200 w-full  top-0 start-0">
            <Link href="/carga">
              <button className="absolute top-4 left-4 bg-white p-2 rounded-md z-10 hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </Link>
            <div className="max-w-screen-xl flex flex-wrap items-center mx-auto justify-between">

              <a href="" className="ml-10 flex items-center space-x-4 rtl:space-x-reverse w-1/3 ">
                <Image src={espoch} className="h-16 sm:h-20" alt="Flowbite Logo" />
                <Image src={logo} className="h-16 sm:h-20" alt="Flowbite Logo" />
              </a>

              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse pl-8 md:pl-16 ">

                <button onClick={() => {
                  signOut({ callbackUrl: '/login' })
                }} type="button" className="text-white bg-[#533273] hover:bg-[#533273] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-[#533273] dark:hover:bg-[#D1C0D9] dark:focus:ring-[#533273]">Cerrar Sesión</button>


              </div>
              <div className=" md:h-8  justify-end hidden md:flex md:w-auto w-8/12 md:order-1" id="navbar-sticky">
                <ul className="items-center flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-[#D1C0D9] md:dark:bg-[#D1C0D9] dark:border-gray-700">
                  <li className="flex items-center justify-center w-[600px] py-2 px-3 mx-2 my-2  md:p-0    text-white rounded md:bg-transparent md:text-[#D1C0D9] md:dark:text-[#533273] ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                      <circle cx="12" cy="10" r="3" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <h1 className="uppercase">{session.user?.nombreResponsable}</h1>
                  </li>
                </ul>

              </div>
            </div>
          </nav>
        </div>
        <div className="w-11/12 mx-auto bg-[#533273] rounded-lg">
          <label className="block w-full text-center text-white font-bold border-[#533273] py-2">
            IMÁGENES BIOLÓGICAS
          </label>
        </div>
        <div className='md:flex justify-center md:justify-items-center px-14 content-center  '>
          <div className="items-center justify-center w-full sm:w-1/2">
            <Image src={biologicas} className="justify-center " alt="Flowbite lazo " />
          </div>
          <div className='w-full sm:w-1/2 grid content-center place-content-center items-center pt-10'>
            <div className='grid max-w-max '>
              {/* boton imagenes*/}
              <div className='py-6 md:py-8 flex items-center relative'>
                <Image src={subir} className="h-16 w-16 sm:h-20 sm:w-20 mr-3 md:mr-4" alt="Flowbite lazo" />
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    id="customFile"
                    onChange={guardarImagenes}
                    multiple
                    className="w-56 sm:w-72 opacity-0 absolute z-10 hidden"
                    title="Cargar imágenes"
                  />
                  {filesImagenes.length === 0 ? (
                    <label htmlFor="customFile" className="w-56 sm:w-72 text-white bg-[#D1C0D9] hover:bg-[#533273] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 md:px-4 py-2 text-center dark:bg-[#D1C0D9] dark:hover:bg-[#533273] dark:focus:ring-[#533273] flex flex-col justify-center items-center cursor-pointer">
                      CARGAR IMÁGENES
                    </label>
                  ) : (
                    <button
                      type="button"
                      onClick={subirImagenes}
                      className="w-56 sm:w-72 text-white bg-[#D1C0D9] hover:bg-[#533273] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 md:px-4 py-2  dark:bg-[#D1C0D9] dark:hover:bg-[#533273] dark:focus:ring-[#533273] flex flex-col justify-center items-center text-center"
                    >
                      SUBIR IMÁGENES
                    </button>
                  )}
                </div>

                {uploadSuccess && (
                  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-green-500 text-white text-lg p-4 rounded-lg">
                      Imágenes subidas correctamente
                    </div>
                  </div>
                )}
                {/* Ventana modal para previsualización de archivos */}
                {showModal && (
                  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg relative h-[700px] ">
                      <h2 className="text-lg font-bold mb-2">Previsualización de archivos</h2>
                      <div className="flex flex-col w-full h-[570px] overflow-auto ">
                        {filesImagenes.map((file, index) => (
                          <div key={index} className="mb-2 ">
                            <Image src={URL.createObjectURL(file)} alt={file.name} className="max-w-full h-auto" width={500} height={500} />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-4">
                        <button onClick={() => {
                          setShowModal(false);
                          setFilesImagenes([]); // Limpiar la lista de objetos seleccionados
                        }} className="text-sm text-white bg-[#533273] hover:bg-[#422161] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg py-2 px-4">
                          Cerrar
                        </button>
                        <button onClick={subirImagenes} className="text-sm text-white bg-[#533273] hover:bg-[#422161] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg py-2 px-4">
                          Subir imágenes
                        </button>
                      </div>

                      {loadingImagenes && (
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                          <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#D1C0D9] dark:border-[#D1C0D9]">
                            <div className="px-4 py-2 text-lg font-medium leading-none text-[#533273] rounded-full animate-pulse dark:text-[#533273]">
                              loading...
                            </div>
                          </div>
                        </div>
                      )}
                      {errorImagenes && (
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-red-500 bg-opacity-75 z-50">
                          <div className="text-white text-lg">{errorImagenes}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* boton analisis*/}
              <div className='py-6 md:py-8 flex items-center'>
                <Image src={search} className="h-16 w-16 sm:h-20 sm:w-20 mr-3 md:mr-4" alt="Flowbite lazo" />
                <button type="button" onClick={openAnalisisModal} className="w-56 sm:w-72 text-white bg-[#D1C0D9] hover:bg-[#533273] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 md:px-4 py-2 text-center dark:bg-[#D1C0D9] dark:hover:bg-[#533273] dark:focus:ring-[#533273]">
                  ANÁLISIS DE IMAGEN
                </button>
              </div>
              {showModalanalisis && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                  <div className="bg-white p-4 rounded-lg relative max-w-full sm:max-w-md lg:max-w-lg w-full h-[700px] max-h-screen ">
                    <h2 className="text-lg font-bold mb-4 text-center">ANALIZAR EXAMENES</h2>
                    <Analisis />
                    <button
                      onClick={closeanalisisModal}
                      className="absolute top-2 right-2 px-3 py-1 bg-[#533273] text-white rounded-lg hover:bg-[#D1C0D9] focus:ring-2 focus:ring-[#533273] focus:outline-none"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
              {/* boton archivos*/}

              <div className='py-6 md:py-8 flex items-center'>
                <Image src={subir} className="h-16 w-16 sm:h-20 sm:w-20 mr-3 md:mr-4" alt="Flowbite lazo" />
                <div className="relative ">
                  <input
                    type="file"
                    accept="image/*"
                    id="customFile1"
                    onChange={guardarArchivos}
                    multiple
                    className="w-56 sm:w-72 opacity-0 absolute z-10 hidden"
                    title="Cargar archivos"
                  />
                  {filesArchivos.length === 0 ? (
                    <label htmlFor="customFile1" className="w-56 sm:w-72 text-white bg-[#D1C0D9] hover:bg-[#533273] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 md:px-4 py-2 text-center dark:bg-[#D1C0D9] dark:hover:bg-[#533273] dark:focus:ring-[#533273] flex flex-col justify-center items-center cursor-pointer">
                      CARGAR ARCHIVOS
                    </label>
                  ) : (
                    <button
                      type="button"
                      onClick={subirArchivos}
                      className="w-56 sm:w-72 text-white bg-[#D1C0D9] hover:bg-[#533273] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 md:px-4 py-2  dark:bg-[#D1C0D9] dark:hover:bg-[#533273] dark:focus:ring-[#533273] flex flex-col justify-center items-center text-center"
                    >
                      SUBIR ARCHIVOS
                    </button>
                  )}
                </div>

                {uploadSuccess && (
                  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-green-500 text-white text-lg p-4 rounded-lg">
                      Archivos subidos correctamente
                    </div>
                  </div>
                )}

                {loadingArchivos && (
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-[#D1C0D9] dark:border-[#D1C0D9]">
                      <div className="px-4 py-2 text-lg font-medium leading-none text-[#533273] rounded-full animate-pulse dark:text-[#533273]">
                        loading...
                      </div>
                    </div>
                  </div>
                )}
                {errorArchivos && (
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-red-500 bg-opacity-75 z-50">
                    <div className="text-white text-lg">{errorArchivos}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Pie />
      </div>
    )
  }
}