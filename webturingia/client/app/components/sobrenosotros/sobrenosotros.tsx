import mapa from "../../img/Mapa.svg";
import Image from 'next/image';
import Rutabiografia from '../bibliografia/rutabiografia'

export default function sobrenosotros() {
  return (
    <div className="relative">
      <div className="grid justify-items-center items-start pb-10 bg-white pt-4">
        <div className="w-full md:w-11/12 ">
          <h1 className="flex justify-center items-center border w-full md:w-64 h-8 bg-[#0D0F1F] text-white rounded-lg mt-8 md:mt-0">
            SOBRE NOSOTROS
          </h1>
          <div className="pt-10 grid justify-items-center px-4 md:px-32">
            <p className="text-[#0D0F1F] p-8 w-full md:w-7/12 text-justify border bg-[#7d797f48] rounded-lg">
              <center>MISIÓN<br /></center>
              Ser un centro de excelencia en investigación e innovación en inteligencia artificial, impulsando la aplicación de soluciones tecnológicas disruptivas que generen un impacto positivo en la sociedad y contribuyan a la mejora de la calidad de vida de las personas.
            </p>
          </div>
          <div className="pt-10 grid justify-items-center px-4 md:px-32">
            <p className="text-[#0D0F1F] p-8 w-full md:w-7/12 text-justify border bg-[#7d797f48] rounded-lg">
              <center>EQUIPO DE TRABAJO<br /></center>
              En el laboratorio A. M. Turing se encuentra un equipo de personas, unidos por una visión compartida: aprovechar el poder de la inteligencia artificial (IA) para dar solución a problemas reales de nuestra sociedad y mejorar la calidad de vida de las personas. Con un espíritu innovador y un profundo compromiso social, este equipo multidisciplinario se embarca en proyectos de investigación que exploran las fronteras de la IA y su aplicación en diversos campos, incluyendo la salud, la educación, el medio ambiente y la industria.
            </p>
          </div>
        </div>
      </div>
      <div className="grid justify-items-center items-start  bg-white ">
        <div className="w-full md:w-11/12 ">
          <h1 className="flex justify-center items-center border w-full md:w-64 h-8 bg-[#0D0F1F] text-white rounded-lg mt-8 md:mt-0">
           MIEMBROS
          </h1>
          <div>
          <Rutabiografia />
          </div>
          
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <Image src={mapa} layout="fill" className="object-cover" alt="Flowbite mapa" />
      </div>
    </div>
  );
}
