'use client'
import Image from 'next/image';
import logo from '../img/logo.svg';
import espoch from '../img/espoch.svg';
import Link from 'next/link';
import Pie from '../components/footer/footer'
import mapa from "../img/Mapa.svg"
import contorno from "../img/contorno.png"
import pantallacarga from "../img/PantallaCarga.svg"
import { signOut } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import Registrar from '../components/gestion/registrar';
import Buscar from '../components/gestion/buscar';
// Importa useDrivePicker desde react-google-drive-picker
import useDrivePicker from 'react-google-drive-picker'
import Reporte from '../components/gestion/reporte';
import { signIn, useSession } from "next-auth/react";
import Usuarios from '../components/gestion/usuarios';
import { ChangeEvent, FormEvent } from "react";
import { Toaster, toast } from 'sonner';
import Dashboard from "../components/dashboard/dashboard.jsx"
import 'react-toastify/dist/ReactToastify.css';
import Alerts from '../alerts';
import Csvdata from '../components/csvData/csvData'
export default function Cargav() {

  const { data: session, status } = useSession();
 // console.log({ session, status })

  //registrar
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openRegistrarModal = () => {
    setShowModal(true);
  };
  const closeRegistrarModal = () => {
    setShowModal(false);
  };
  //buscar
  //const [buscarOpen, setBuscarOpen] = useState(false);
  const openBuscarModal = () => {
    setShowModalbuscar(true);
  };
  const closeBuscarModal = () => {
    setShowModalbuscar(false);
  };

  //usuarios
  // const [usuariosOpen, setUsuariosOpen] = useState(false);
  const openUsuariosModal = () => {
    setShowModalusuarios(true);
  };
  const closeUsuariosModal = () => {
    setShowModalusuarios(false);
  };


  //reporte
  //const [reporteOpen, setReporteOpen] = useState(false);
  const openReporteModal = () => {
    setShowModalreporte(true);
  };
  const closeReporteModal = () => {
    setShowModalreporte(false);
  };

  //modelos

  const openModelosModal = () => {
    setShowModalmodelo(true);
  };
  const closeModelosModal = () => {
    setShowModalmodelo(false);
  };
  //modelos

  const openHistoricoModal = () => {
    setShowModalHistorico(true);
  };
  const closehistoricoModal = () => {
    setShowModalHistorico(false);
  };

  //resultados
  const openResultadosModal = () => {
    setShowModalresultado(true);
  };
  const closeResultadosModal = () => {
    setShowModalresultado(false);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalbuscar, setShowModalbuscar] = useState<boolean>(false);
  const [showModalreporte, setShowModalreporte] = useState<boolean>(false);
  const [showModalusuarios, setShowModalusuarios] = useState<boolean>(false);
  const [showModalmodelo, setShowModalmodelo] = useState<boolean>(false);
  const [showModalresultado, setShowModalresultado] = useState<boolean>(false);
  const [showModalHistorico, setShowModalHistorico] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>();
  // Usa useDrivePicker en un componente de función de React
  const [openPicker, data] = useDrivePicker()

  const handleOpenPicker = () => {
    openPicker({
      clientId: "1008780747420-bas7ke98o6al99mviafqq2ho44n2aej9.apps.googleusercontent.com",
      developerKey: "AIzaSyBS8RcbY_fjaEkCqH8bAyuKg6M87Mpf5AE",
      setParentFolder: "1cPdJsdjrIxaMcuDoU6mPGxD8E9FwJb3p",
      setIncludeFolders: true,
      setSelectFolderEnabled: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === 'picked' && data.docs && data.docs.length > 0) {
          try {
            const downloadLinks = data.docs.map((doc) => {
              const fileId = doc.id;
              return `https://drive.google.com/uc?export=download&id=${fileId}`;
            });

            // Abre todos los enlaces de descarga en nuevas pestañas
            downloadLinks.forEach((downloadLink) => {
              window.open(downloadLink, '_blank');
            });
          } catch (error) {
            console.error('Error al obtener información del archivo:', error);
          }
        } else if (data.action === 'cancel') {
          console.log('El usuario ha cancelado la selección.');
        }
      },
    })
  }

  const handleClickCancel = () => {
    Alerts.cancel('Usuario no registrado.');
  };

  const handleClickSuccess = () => {
    Alerts.success('Modelo subido con exito.');
  };
  const handleClickError = () => {
    Alerts.success('Error al subir modelo.');
  };
  const shouldShowMenu = () => {
    return session?.user?.rol === "ADMIN";
  };
  type AuditoriaData = {
    lng_id_accion: number;
    usuarioID: number;
    dt_fecha: string;
    str_ip_host: string;
    str_nombre_tabla: string;
    str_accion: string;
    txt_descripcion: string;
    txt_valor: string;
    dt_fecha_creacion: string;
    dt_fecha_actualizacion: string;
  };

  // Ejemplo de cómo podrías utilizar este tipo
  const [auditoriaData, setAuditoriaData] = useState<AuditoriaData[]>([]);
  //auditoria
  useEffect(() => {
    if (showModalreporte) {
      fetch('http://localhost:3000/api/auditoria', {
        headers: {
          "x-token": `${session?.user?.token}`,
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.status) {
            // Definir el tipo de los elementos del array
            type AuditoriaItem = {
              lng_id_accion: number;
              usuarioID: number;
              dt_fecha: string;
              str_ip_host: string;
              str_nombre_tabla: string;
              str_accion: string;
              txt_descripcion: string;
              txt_valor: string;
              dt_fecha_creacion: string;
              dt_fecha_actualizacion: string;
            };

            // Ordenar los datos por fecha en orden descendente
            const sortedData = data.body.sort((a: AuditoriaItem, b: AuditoriaItem) => new Date(b.dt_fecha).getTime() - new Date(a.dt_fecha).getTime());
            setAuditoriaData(sortedData);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [showModalreporte, session]);


  const downloadFile = () => {
    window.location.href = "https://drive.google.com/file/d/1Vfdq4-heTqyE-0DgGcvX0mX-mFTfwCw3/view?usp=sharing";
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (session) {
    return (
      <>
        <div
          id="drawer-navigation"
          className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'
            } bg-white dark:bg-gray-800 `}
          tabIndex={-1}
          aria-labelledby="drawer-navigation-label"
        >

          <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
          <button onClick={toggleMenu} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium ">

              <li>
                <button
                  className="w-56 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  onClick={openBuscarModal}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cec9c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65" className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></line></svg>
                  <span className=" ms-3 whitespace-nowrap">Buscar</span>
                </button>
              </li>
              <li>
                <button
                  className="w-56 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  onClick={openRegistrarModal} >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                    </svg>
                  </svg>
                  <span className=" ms-3 whitespace-nowrap">Registrar</span>
                </button>
              </li>
              { /* onClick={openReporteModal}*/}
              <li>
                <button onClick={openHistoricoModal} className="w-56 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <span className=" ms-3 whitespace-nowrap">Historico Consultas</span>
                </button>
              </li>
              <li>
                <button onClick={openReporteModal} className="w-56 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <span className=" ms-3 whitespace-nowrap">Auditoria</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openUsuariosModal}
                  className="w-56 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className=" ms-3 whitespace-nowrap">Usuarios</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openModelosModal}
                  className="w-56 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <span className=" ms-3 whitespace-nowrap">Modelos</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openResultadosModal}
                  className="w-56 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className=" ms-3 whitespace-nowrap">Resultados</span>
                </button>
              </li>
              <li>
                <a href="" onClick={() => {
                  signOut({ callbackUrl: '/' })
                }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Cerrar Sesión</span>
                </a>
              </li>


            </ul>
          </div>
        </div>


        <div className='w-screen'>
          <Image src={mapa} layout="fill" className="object-cover -z-10" alt="Flowbite mapa" />
          <div className=' h-24 w-full '>
            <div className="max-w-screen flex justify-center items-center  ">
              <div className="text-center justify-start ">
                {shouldShowMenu() && (
                  <button
                    className="text-white bg-[#533273] hover:bg-[#D1C0D9] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#533273] dark:hover:bg-[#D1C0D9] focus:outline-none dark:focus:ring-blue-800"
                    type="button"
                    data-drawer-target="drawer-navigation"
                    data-drawer-show="drawer-navigation"
                    aria-controls="drawer-navigation"
                    onClick={toggleMenu} // Aquí se agrega el handler para alternar la visibilidad del menú
                  >
                    <svg className="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                  </button>
                )}
              </div>
              <a href="" className="flex items-center space-x-4 rtl:space-x-reverse w-1/3 pl-8">
                <Image src={espoch} className="h-16 sm:h-16" alt="Flowbite Logo" />
                <Image src={logo} className="h-16 sm:h-20" alt="Flowbite Logo" />
              </a>
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse pl-16           ">
                <button onClick={() => {
                  signOut({ callbackUrl: '/login' })
                }} type="button" className="text-white bg-[#533273] hover:bg-[#533273] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-[#533273] dark:hover:bg-[#D1C0D9] dark:focus:ring-[#533273]">Cerrar Sesión</button>


              </div>
              <div className=" md:h-8  justify-end hidden md:flex md:w-auto w-8/12 md:order-1" id="navbar-sticky">
                <ul className="items-center flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-[#D1C0D9] md:dark:bg-[#D1C0D9] dark:border-gray-700">
                  <li className="flex items-center justify-center w-[600px] py-2 px-3 mx-2 my-2  md:p-0 dark:hover:text-[#533273]  md:hover:text-[#533273] text-[#533273] rounded md:bg-transparent md:text-[#533273]  ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                      <circle cx="12" cy="10" r="3" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <h1 className="uppercase">{session?.user?.nombreResponsable}</h1>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row px-14 pt-10 h-auto md:h-[500px]'>
            <div className="flex items-center justify-center w-full md:w-1/2 mb-4 md:mb-0">
              <Image src={pantallacarga} className="h-full w-full" alt="Flowbite Logo" />
            </div>

            <div className='w-full md:w-1/2 flex content-center place-content-center items-center relative'>
              <div className='relative'>
                <div className="w-72 text-center relative z-10">
                  <label className="text-[#533273] font-bold">
                    TIPO DE IMAGEN
                  </label>
                </div>
                <div className='grid pt-12 relative z-10'>
                  <div className='pt-10 pb-2'>
                    <Link href="/Imedicas">
                      <button type="button" className="w-72 text-[#533273] hover:text-white bg-[#D1C0D9] hover:bg-[#533273] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-[#D1C0D9] dark:hover:bg-[#533273] dark:focus:ring-[#533273]">IMÁGENES MÉDICAS</button>
                    </Link>
                  </div>
                  <div className='py-2'>
                    <Link href="/Ibiologicas">
                      <button type="button" className="w-72  text-[#533273] hover:text-white hover:bg-[#533273] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-[#D1C0D9] dark:hover:bg-[#533273] dark:focus:ring-[#533273]">IMÁGENES BIOLÓGICAS</button>
                    </Link>
                  </div>
                  <div className='py-2'>
                    <button type="button" onClick={() => handleOpenPicker()} className="w-72  text-[#533273] hover:text-white hover:bg-[#533273] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-[#D1C0D9] dark:hover:bg-[#533273] dark:focus:ring-[#533273]">DESCARGAR REPOSITORIO</button>
                  </div>
                  <div className='pt-2'>
                    <button
                      onClick={downloadFile}
                      type="button"
                      className="w-72 text-[#533273] hover:text-white bg-[#D1C0D9] hover:bg-[#533273] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-[#D1C0D9] dark:hover:bg-[#533273] dark:focus:ring-[#533273]">
                      DESCARGAR MANUAL
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 z-0 pl-[415px] pt-[70px] hidden md:block">
                <Image src={contorno} className="right-0" alt="Flowbite mapa" />
              </div>
            </div>
          </div>

          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg relative h-[460px] ">
                <h2 className="text-lg font-bold mb-2 text-center">REGISTRAR USUARIO</h2>
                <Registrar closeModal={() => { closeRegistrarModal() }} />
                <button
                  onClick={() => { closeRegistrarModal(), handleClickCancel() }}
                  className="absolute top-2 right-2 px-3 py-1 bg-[#533273] text-white rounded-lg hover:bg-[#D1C0D9] focus:ring-2 focus:ring-[#533273] focus:outline-none"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
          {showModalbuscar && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg relative h-[550px] w-[460px] ">
                <h2 className="text-lg font-bold mb-2 text-center">BUSCAR USUARIO</h2>
                <Buscar />
                <button
                  onClick={closeBuscarModal}
                  className="absolute top-2 right-2 px-3 py-1 bg-[#533273] text-white rounded-lg hover:bg-[#D1C0D9] focus:ring-2 focus:ring-[#533273] focus:outline-none"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
          {showModalreporte && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg relative max-w-[90vw] max-h-[80vh] w-full h-full md:w-[650px] md:h-[460px]">
                <h2 className="text-lg font-bold mb-2 text-center">AUDITORIA</h2>
                <div className="relative overflow-y-auto max-h-[calc(100%-3rem)]">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">Fecha</th>
                          <th scope="col" className="px-6 py-3">usuarioID</th>
                          <th scope="col" className="px-6 py-3">Tabla</th>
                          <th scope="col" className="px-6 py-3">Acción</th>
                          <th scope="col" className="px-6 py-3">Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auditoriaData.map(item => (
                          <tr key={item.lng_id_accion} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{item.dt_fecha}</td>
                            <td className="px-6 py-4">{item.usuarioID}</td>
                            <td className="px-6 py-4">{item.str_nombre_tabla}</td>
                            <td className="px-6 py-4">{item.str_accion}</td>
                            <td className="px-6 py-4">{item.txt_descripcion}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <button
                  onClick={closeReporteModal}
                  className="absolute top-2 right-2 px-3 py-1 bg-[#533273] text-white rounded-lg hover:bg-[#D1C0D9] focus:ring-2 focus:ring-[#533273] focus:outline-none"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
          {showModalHistorico && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg relative max-w-[90vw] max-h-[90vh] w-full h-full md:w-screen md:h-[750px]">
                <h2 className="text-lg font-bold mb-2 text-center"> Históricos de Consultas</h2>
                <Csvdata/>
                <button
                  onClick={closehistoricoModal}
                  className="absolute top-2 right-2 px-3 py-1 bg-[#533273] text-white rounded-lg hover:bg-[#D1C0D9] focus:ring-2 focus:ring-[#533273] focus:outline-none"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {showModalusuarios && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg relative h-[550px] w-[460px] ">
                <h2 className="text-lg font-bold mb-2 text-center"> USUARIOS</h2>
                <Usuarios />
                <button
                  onClick={closeUsuariosModal}
                  className="absolute top-2 right-2 px-3 py-1 bg-[#533273] text-white rounded-lg hover:bg-[#D1C0D9] focus:ring-2 focus:ring-[#533273] focus:outline-none"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
          {showModalmodelo && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg relative h-[550px] w-[460px] ">
                <h2 className="text-lg font-bold mb-2 text-center"> REGISTRAR MODELOS</h2>
                <form onSubmit={async (e) => {
                  e.preventDefault()
                  if (!file) return
                  const form = new FormData()
                  form.set('file', file)
                  const res = await fetch('/carga/api/upload', {
                    method: 'POST',
                    body: form
                  })
                  const data = await res.json()
                  console.log(data)
                  handleClickSuccess()
                  if (!res.ok) {
                    handleClickError()
                    throw new Error('Error al subir modelo');
                  }

                }}>

                  <input
                    type="file"
                    accept=".pt"
                    className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        setFile(files[0]);
                      }
                    }}
                  />
                  <button onClick={() => { }}
                    className="bg-green-900 text-zinc-100 p-2 rounded block w-full disabled:opacity-50">
                    Subir


                  </button>
                </form>
                <button
                  onClick={() => { closeModelosModal() }}
                  className="absolute top-2 right-2 px-3 py-1 bg-[#533273] text-white rounded-lg hover:bg-[#D1C0D9] focus:ring-2 focus:ring-[#533273] focus:outline-none"
                >

                  Cerrar
                </button>
              </div>
            </div>
          )}
          {showModalresultado && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg relative h-[700px] w-[700px] ">
                <h2 className="text-lg font-bold mb-2 text-center"> Resultados</h2>
                <button
                  onClick={() => { closeResultadosModal() }}
                  className="absolute top-2 right-2 px-3 py-1 bg-[#533273] text-white rounded-lg hover:bg-[#D1C0D9] focus:ring-2 focus:ring-[#533273] focus:outline-none"
                >
                  Cerrar
                </button>
                <Dashboard />
              </div>
            </div>
          )}
          <footer className="mt-auto">
            <Pie />
          </footer>

        </div>
      </>
    );
  }
}
