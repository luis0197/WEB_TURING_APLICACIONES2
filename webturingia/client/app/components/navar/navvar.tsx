"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import espoch from '../../img/espoch.png';
import Link from 'next/link';
import Carousel from "../body/carousel";
import Servicios from '../servicios/servicios';
import Sobrenosotros from '../sobrenosotros/sobrenosotros';
import Pie from '../footer/footer';

export default function Navbar() {
  const [carouselActive, setCarouselActive] = useState(true);
  const [serviciosActive, setServiciosActive] = useState(false);
  const [sobrenosotrosActive, setSobrenosotrosActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleCarousel = () => {
    if (!carouselActive) {
      setCarouselActive(true);
      setServiciosActive(false);
      setSobrenosotrosActive(false);
    }
    setMenuOpen(false); // Close the menu after selection
  };

  const toggleServicios = () => {
    if (!serviciosActive) {
      setCarouselActive(false);
      setServiciosActive(true);
      setSobrenosotrosActive(false);
    }
    setMenuOpen(false); // Close the menu after selection
  };

  const toggleSobrenosotros = () => {
    if (!sobrenosotrosActive) {
      setCarouselActive(false);
      setServiciosActive(false);
      setSobrenosotrosActive(true);
    }
    setMenuOpen(false); // Close the menu after selection
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div>
          <nav className="border-gray-200 w-full z-20 top-0 start-0 p-2">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
              <a href="" className="flex items-center space-x-4 rtl:space-x-reverse pl-1">
                <Image src={espoch} className="w-[200px]" alt="Flowbite Logo" />
              </a>
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse pl-[1px]">
                <Link href="/login">
                  <button type="button" className="text-white dark:hover:text-black bg-[#533273] hover:bg-[#1D5F8B] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-[#1D5F8B] dark:hover:bg-white dark:focus:ring-[#1D5F8B]">
                    INICIAR SESIÓN
                  </button>
                </Link>
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-[#1D5F8B] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-[#1D5F8B] dark:focus:ring-gray-600"
                  aria-controls="navbar-sticky"
                  aria-expanded={menuOpen ? "true" : "false"}
                  onClick={toggleMenu}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                  </svg>
                </button>
              </div>
              <div className={`${menuOpen ? 'absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-30' : 'hidden'} md:h-8 justify-end md:flex md:w-auto md:order-1`} id="navbar-sticky">
                <ul className="items-center flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-white md:dark:bg-white dark:border-gray-700">
                  <li className="px-1">
                    <a href="#" className="text-center w-28 block py-2 px-3 md:p-0 md:hover:bg-[#1D5F8B] md:hover:text-[#D1C0D9] text-black md:text-[#D1C0D9] dark:text-[#0D0F1F] dark:hover:bg-[#1D5F8B]" onClick={toggleCarousel}>
                      INICIO
                    </a>
                  </li>
                  <li className="px-1">
                    <a href="#" className="text-center w-44 block py-2 px-3 md:p-0 md:hover:bg-[#1D5F8B] md:hover:text-[#D1C0D9] text-black md:text-[#D1C0D9] dark:text-[#0D0F1F] dark:hover:bg-[#1D5F8B]" onClick={toggleSobrenosotros}>
                      SOBRE NOSOTROS
                    </a>
                  </li>
                  <li className="px-1">
                    <a href="#" className="text-center w-28 block py-2 px-3 md:p-0 md:hover:bg-[#1D5F8B] md:hover:text-[#D1C0D9] text-black md:text-[#D1C0D9] dark:text-[#0D0F1F] dark:hover:bg-[#1D5F8B]" onClick={toggleServicios}>
                      SERVICIOS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <main className="w-auto h-auto flex-grow">
          {carouselActive && <Carousel />}
          {serviciosActive && <Servicios />}
          {sobrenosotrosActive && <Sobrenosotros />}
        </main>
        <footer className="mt-auto">
          <Pie />
        </footer>
      </div>
    </>
  );
}
