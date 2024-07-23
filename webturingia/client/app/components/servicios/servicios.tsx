import LazoCorto from "../../img/LazoCorto.svg";
import Image from "next/image";
import servicios from "../../img/servicios.svg";
import mapa from "../../img/Mapa.svg";

export default function Servicios() {
  return (
    <div className="relative pb-10">
      <div className="grid justify-items-center pb-20 pt-10 bg-white">
        <div className="w-full md:w-11/12">
          <h1 className="flex justify-center items-center border w-full md:w-64 h-8 bg-[#0D0F1F] text-white rounded-lg">
            SERVICIOS
          </h1>
          <p className="text-black pt-10 px-4 md:pl-24 md:pr-24 text-justify">
            Uno de nuestros proyectos más emblemáticos es el de &quot;Modelamiento de procesos biológicos mediante el procesamiento de imágenes médicas y de microscopía utilizando inteligencia artificial para la detección temprana y análisis de tratamientos de cáncer de mama&quot;. Este proyecto tiene como objetivo desarrollar un sistema de IA capaz de:
          </p>
          <div className="flex flex-col md:flex-row items-center md:px-32 pt-6">
            <div className="w-full md:w-1/2 md:pr-8 md:items-center flex justify-center z-10">
              <Image src={LazoCorto} alt="Flowbite Logo" width={180} height={180} className="mx-auto" />
            </div>
            <p className="text-black px-4 md:w-1/2 text-justify">
              • Analizar imágenes de mamografías y microscopias con un alto grado de precisión. <br />
              • Detectar de forma temprana el cáncer de mama, incluso en sus etapas más tempranas.<br />
              • Predecir la probabilidad de que un tumor sea canceroso.<br />
              • Ayuda al médico tratante a dar un diagnóstico para establecer el tratamiento más adecuado para cada paciente.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-items-center px-4 md:px-20 pt-6 md:pt-0">
            <div className="md:w-1/2">
              <p className="text-black text-justify justify-center">
                <h2 className="text-[#533273]"><strong>UN COMPROMISO CON LA INVESTIGACIÓN Y LA INNOVACIÓN </strong> <br /><br /></h2>

                Este proyecto tiene el potencial de revolucionar la forma en que se diagnostica y trata el cáncer de mama. Al permitir una detección temprana por medio de carga de imágenes y poder ayudar al médico a establecer un tratamiento más preciso, podemos mejorar significativamente las tasas de supervivencia de las pacientes
              </p>
              <p className="text-black text-justify justify-center pt-10">
                <h2 className="text-[#533273]"><strong>UN IMPACTO REAL EN LA LUCHA CONTRA EL CÁNCER DE MAMA</strong>  <br /><br /></h2>
                El Laboratorio A. M. Turing está comprometido a seguir desarrollando soluciones innovadoras en el campo de la IA para la salud. Creemos que la IA tiene el potencial de transformar la medicina y mejorar la vida de millones de personas. Invitamos a la comunidad científica y médica a unirse a nosotros en este esfuerzo.
              </p>
            </div>

            <div className="w-full md:w-1/2 md:pr-8 md:items-center flex justify-center mx-auto z-10">
              <Image src={servicios} alt="Flowbite Logo" width={400} height={500} className="" />
            </div>

          </div>
        </div>
      </div>
      <Image src={mapa} layout="fill" className="object-cover z-0" alt="Flowbite mapa" />
    </div>
  );
}
