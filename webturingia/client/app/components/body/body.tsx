import emblema from "../../img/lazo.svg"
import Image from 'next/image';

export default function Cuerpo() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="mb-8 md:mb-0">
        <Image src={emblema} alt="Descripción de la imagen" width={544} height={748} />
      </div>
      <div className="text-center font-MontserratRoman text-#804593">
        <p className="text-base md:text-lg">
          Laboratorio A. M. Turing de GITEA - ESPOCH: Un centro de excelencia en investigación e innovación en inteligencia artificial
        </p>
      </div>
    </div>
  )
}
