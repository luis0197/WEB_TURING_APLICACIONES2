import Image from "next/image";
import Navvar from "./components/navar/navvar";
import fondo from "./img/fondo_1.svg";
import Lgin from "./login/page";
import Carousel from "./components/body/carousel";
import Pie from "./components/footer/footer";
export default function Home() {

  return (
    <div className="h-[810px] md:h-[680px] relative ">
      <Image src={fondo} layout="fill" className="object-cover" alt="Flowbite mapa" />
      <div className="absolute top-0 left-0 w-full h-full ">
        <Navvar />
      </div>
      <div className=" w-full flex flex-col justify-end">
        <Pie />
      </div>
    </div>
  );
} 
