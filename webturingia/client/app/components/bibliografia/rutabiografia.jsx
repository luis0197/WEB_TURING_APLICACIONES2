import Biografia from './biografia.jsx';
import morales from '../../img/investigadores/ing-morales.png';
import isa from '../../img/investigadores/isa.png';
import tierra from '../../img/investigadores/tierra.png';
import escudero from '../../img/investigadores/escudero.png';
import vinueza from '../../img/investigadores/vinueza.png';
import ayala from '../../img/investigadores/ayala.png';

export default function Rutabiografia() {
  return (
    <div className="flex flex-col items-center pt-8 text-center">
      <div className="flex flex-wrap items-center justify-center w-full gap-x-4 pb-[100px] md:pb-[100px] z-10">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 opacity-100">
          <Biografia
            nombre="Ing. Morales Gordon José Luis"
            imagen={morales}
            className="opacity-100 text-justify"
            descripcion="Ingeniero Morales Gordon José Luis, Magíster en Sistemas de Control y Automatización Industrial e Ingeniero en Electrónica y Computación por la Escuela Superior Politécnica de Chimborazo (ESPOCH), se desempeña actualmente como Docente Investigador y Coordinador de la Carrera de Electrónica y Automatización en la Facultad de Informática y Electrónica de la ESPOCH. Además, ha ocupado el cargo de Coordinador del Grupo de Investigación GITEA. Su línea de investigación se especializa en la automatización industrial, con un enfoque en el control de sistemas no lineales, el desarrollo de tecnologías para la inclusión de personas con discapacidad, y el aprovechamiento de energías renovables. Ha liderado y colaborado en proyectos de alta relevancia técnica. La experiencia y especialización del Ingeniero Morales en estos campos lo posicionan como un referente en la integración de tecnologías avanzadas para la solución de problemas complejos y la mejora de la calidad de vida, especialmente en el ámbito de la ingeniería aplicada."
          />    
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <Biografia
            nombre="Ing. Ramiro Fernando Isa Jara"
            imagen={isa}
            className="opacity-100 text-justify"
            descripcion="Ramiro Fernando Isa Jara, es profesor investigador en la Escuela Superior Politécnica de Chimborazo de Riobamba - Ecuador e investigador en la Universidad Tecnológica Nacional de Buenos Aires - Argentina. Actualmente, dirige el Laboratorio de Inteligencia Artificial “A.M. Turing” perteneciente al Grupo de Investigación GITEA de la Facultad de Informática y Electrónica - FIE ESPOCH. Recibió su PhD en Ingeniería orientación Electrónica por la Universidad Nacional de Mar del Plata - Argentina en 2019 y su Posdoctorado en Desarrollo Tecnológico y Social de Proyectos Complejos por la Universidad Tecnológica Nacional - Argentina en 2024. En ambos casos con beca de investigación CONICET - Argentina. Es autor/coautor de varios artículos revisados por pares, publicaciones en congresos y revistas de renombre (IEEE, Elsevier, Springer). Su área de investigación se enfoca en la Inteligencia Artificial, Procesamiento de imágenes y datos, Optimización, sistemas embebidos y realidad virtual. Es miembro de la sociedad IEEE- Engineering in Medicine and Biology y la IEEE - Computational Intelligence."
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <Biografia
            nombre="Ing. Tierra Llanga Alan Marcelo"
            imagen={tierra}
            className="opacity-100 text-justify"
            descripcion="Alan Marcelo Tierra Llanga es Ingeniero en Electrónica en Control y Redes Industriales, con una Maestría en Ingeniería Matemática y Computación de la Universidad UNIR de España. Actualmente, es investigador en CEDIA, donde trabaja en el proyecto Modelamiento de procesos biológicos mediante el procesamiento de imágenes médicas y de microscopía utilizando inteligencia artificial para la detección temprana y análisis de tratamientos de cáncer de mama. Cuenta con una sólida experiencia en bioingeniería, habiendo contribuido a proyectos de desarrollo de prótesis para extremidades superiores, utilizando tecnologías como sensores mioeléctricos y cerebrales. También tiene habilidades destacadas en el uso de redes neuronales, Python, impresoras 3D y manufactura aditiva, lo que le ha permitido crear y prototipar soluciones innovadoras. Su trayectoria está marcada por la implementación de tecnologías emergentes para mejorar la calidad de vida y abordar desafíos complejos en la ingeniería."
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <Biografia
            nombre="Ing. Escudero Villa Pedro Fernando"
            imagen={escudero}
            className="opacity-100 text-justify"
            descripcion="Pedro Fernando Escudero Villa es docente investigador a tiempo completo en la Facultad de Ingeniería de la Universidad Nacional de Chimborazo. Posee títulos de Ingeniero en Electrónica y Computación, Máster en Ingeniería Biomédica y Doctor en Ingeniería Electrónica y de Telecomunicaciones. Su investigación se enfoca en áreas de alta relevancia tecnológica, tales como el desarrollo de biosensores y microdispositivos, el procesamiento de imágenes biomédicas y el análisis de datos. Escudero Villa es conocido por su curiosidad y pasión por la docencia e investigación, dedicándose con entusiasmo a la formación de futuros investigadores. Su enfoque está orientado a la resolución de problemas locales mediante el trabajo interdisciplinario en ciencias e ingeniería, tales como: optoelectrónica, seguridad acústica, desarrollo de sensores nanomecánicos, microfluidos, aplicaciones de IoT, valora los esfuerzos colaborativos para abordar desafíos complejos en este campo, demostrando un compromiso constante con la innovación y el avance científico."
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <Biografia
            nombre="Ing. Vinueza Naranjo Paola Gabriela"
            imagen={vinueza}
            className="opacity-100 text-justify"
            descripcion="Paola Gabriela Vinueza Naranjo, actualmente labora como docente investigador en la Universidad Nacional de Chimborazo (Facultad de Ingeniería - Escuela de Tecnologías de la Información y Comunicación). Líder del grupo de REMCI (Red Ecuatoriana de Mujeres Científicas)- Nodo Chimborazo. Formación: Ingeniera en Sistemas y Computación, Master en Diseño, Gestión y Dirección de Proyectos. Recibió su Ph.D. en Telecomunicaciones en la Universidad de Roma” La Sapienza”, Roma, Italia, (marzo 2015 - febrero 2018). Certificación CCNA-Cisco Networking Academy. Es autora/coautora de varios artículos revisados por pares, publicaciones (índice h = 14, citas = 1400+) en congresos y revistas de renombre (IEEE, Elsevier, Springer). Ha sido participe de 3 proyectos internacionales relacionados con Fog-Cloud Computing. Actualmente trabaja en 8 proyectos nacionales. Intereses de investigación incluyen Fog/Cloud Computing, IoT, Networking, Data Centers Energy Efficiente, WSN, AI and Industry 4.0. Es miembro de IEEE Computer Society."
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <Biografia
            nombre="Ing. Ayala Chauvin Manuel Ignacio"
            imagen={ayala}
            className="opacity-100 text-justify"
            descripcion="Manuel Ignacio Ayala Chauvin es Doctor en Sostenibilidad por la Universidad Politécnica de Cataluña, España. Obtuvo su título de Ingeniero Electromecánico y una Maestría en Ingeniería Mecánica y Equipos Industriales en la misma institución. Actualmente, es investigador en la Universidad Tecnológica Indoamérica en Ambato, Ecuador. Su línea de investigación se centra en la Optimización del Flujo de Energía, el Desarrollo de Sistemas de Generación y Gestión de Energía, y el Análisis de Big Data."
          />
        </div>
      </div>
    </div>
  );
}
