"use client";
import grupo from "../../img/investigadores/grupo.png";
import turing from "../../img/turing.png";
import ingenieros from "../../img/investigadores/Recurso 25.png";
import mapa from "../../img/Mapa.svg";
import investigadores from "../../img/investigadores/investigadores.png";
import Image from 'next/image';
//import Script from "next/script";
import React, { useEffect, useState } from 'react';
//import Pie from '../footer/footer'
import { Carousel as Carousel2 } from "flowbite-react";

export default function Carousel() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  return (
    <> <div className="h-[700px] md:h-[600px]">
      <Carousel2 slide={true} className="h-[650px] md:h-[600px]">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Image src={turing} className="max-w-full md:max-w-[380px] h-auto" alt="Turing" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
          <Image src={investigadores} className="max-w-full md:pl-20 md:max-w-[700px] h-auto" alt="Investigadores" />
          <div className="text-center md:text-left md:ml-4 mt-4 md:mt-0 md:pr-20 w-full md:w-3/6">
            <p className="text-lg text-center md:text-left text-white font-semibold">
              Colaboramos con expertos de diversas disciplinas para maximizar el impacto de nuestra investigación en IA.
            </p>
            <div className="mt-4 flex justify-center md:justify-end content-end">
              <Image src={turing} className="max-w-[150px]" alt="Turing" />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
          <Image src={grupo} className="max-w-full md:pl-20 md:max-w-[900px] h-auto" alt="Grupo" />
          <div className="text-center md:text-left md:ml-4 mt-4 md:mt-0 md:pr-20 w-full md:w-3/6">
            <p className="text-lg text-center md:text-left text-white font-semibold">
              Laboratorio A. M. Turing se compromete con la construcción de un futuro donde la inteligencia artificial sea una herramienta poderosa para el bienestar de la sociedad.
            </p>
            <div className="mt-4 flex justify-center md:justify-end content-end">
              <Image src={turing} className="max-w-[150px]" alt="Turing" />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center  min-h-screen">
          <Image src={ingenieros} className="max-w-full md:pl-20 md:max-w-[700px] h-auto" alt="Ingenieros" />
          <div className="text-center md:text-left md:ml-4 mt-4 md:mt-0 md:pr-20 w-full md:w-3/6">
            <p className="text-lg text-center md:text-left text-white font-semibold">
              Solo podemos ver un poco del futuro, pero lo suficiente para darnos cuenta de que hay mucho por hacer.
            </p>
            <h3 className="text-lg text-center md:text-left text-white mt-2">Alan Turing</h3>
            <div className="mt-4 flex justify-center md:justify-end content-end">
              <Image src={turing} className="max-w-[150px] " alt="Turing" />
            </div>
          </div>
        </div>
      </Carousel2>
    </div>
      <div className="flex justify-center flex-col pb-16 h-screen v-screen relative text-center mt-0">
        <Image src={mapa} layout="fill" className="object-cover z-0 pt-10" alt="Flowbite mapa" />
        <div className="text-black w-auto relative z-10">
          <p className="px-[15px] font-semibold text-lg">
            Laboratorio A. M. Turing de GITEA - ESPOCH: Un centro de excelencia en investigación e
            innovación en inteligencia artificial
          </p>
          <p className="p-[15px] w-auto text-justify pt-32 md:px-40">
            El Laboratorio A. M. Turing, perteneciente al Grupo de Investigación en Tecnologías de la Información
            y la Electrónica Aplicada (GITEA) de la Escuela Superior Politécnica de Chimborazo (ESPOCH), se ha
            consolidado como un centro de referencia en la investigación y desarrollo de soluciones innovadoras
            en el campo de la inteligencia artificial (IA). Nuestro equipo multidisciplinario, compuesto por investigadores
            altamente cualificados y experimentados, está firmemente comprometido con la aplicación
            de la IA en problemas del mundo real, con el objetivo de generar un impacto positivo en la sociedad y
            contribuir a la mejora de la calidad de vida en las personas.
          </p>
        </div>
      </div>


    </>
  )
}