import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Grafico from './grafico';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../img/1x/Asset 1.png'
import { signIn, useSession } from "next-auth/react";
import dayjs from 'dayjs';
import Alerts from '@/app/alerts';

const Registrar: React.FC = () => {
  const { data: session, status } = useSession();
  console.log({ session, status })

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [confidence, setConfidence] = useState<number>(0.5);
  const [saveDirectory, setSaveDirectory] = useState<string>(''); // Nuevo estado para la ruta de directorio
  const [model, setModel] = useState<string>(''); // Nuevo estado para el modelo seleccionado
  const [directoryPath, setDirectoryPath] = useState<string>('');
  const [csvData, setCsvData] = useState<{ [key: string]: any }[]>([]);
  const [showMembrete, setShowMembrete] = useState(false);
  const fechaFormateada = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');

  const contentRef = useRef<HTMLDivElement>(null); // Referencia para el contenido del componente
  console.log("procesada",processedImage)
  useEffect(() => {
    if (showModal) {
      getCsvData();
    }
  }, [showModal]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


    const handleSubmit = async () => {
      console.log('al back',{confidence,
        model,
        csvData,
        processedImage});
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/csvData`, {
        method: "POST",
        body: JSON.stringify({
          confidence,
          model,
          csvData,
          processedImage,
        }),
        headers: {
          "x-token": `${session?.user?.token}`,
          "Content-Type": "application/json",
        },
      });
      const responseAPI = await res.json();
      console.log("envio al backend", responseAPI)
    };

  //subir imagen a repositorio
  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('confidence', confidence.toString());
    formData.append('directoryPath', saveDirectory); // Añadir la ruta de directorio al formulario
    formData.append('model', model); // Añadir el modelo seleccionado al formulario
    //console.log('Modelo seleccionado:', model);
    try {
      const response = await fetch(`http://localhost:5000/process`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir el archivo');
      }

      const result = await response.json();
      /*console.log('Archivo subido exitosamente:', result);*/
      setProcessedImage(`http://localhost:5000/processed-image?t=${new Date().getTime()}`);
      setShowModal(true);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      // Handle errors
    }
  };

  const closeModal = async () => {
    setShowModal(false);
    setSelectedFile(null);
    setImagePreview(null);
    setProcessedImage(null);
  };

  const getCsvData = async () => {
    try {
      const response = await fetch('http://localhost:5000/csv-data');
      const data = await response.json();
      setCsvData(data);
      console.log("csv", data);
    } catch (error) {
      console.error('Error al obtener los datos del CSV:', error);
    }
  };

  // Seleccionar modelo
  const handleFileChangeq = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setModel(file.name);
      console.log(file.name);
    }
  };

  // Selección de carpeta
  const handleFileChangeC = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSaveDirectory(file.name);
      console.log(file.name);
    }
  };

  const generatePdf = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (contentRef.current) {
      document.querySelectorAll('.no-print').forEach(el => el.classList.add('hidden'));
      const canvas = await html2canvas(contentRef.current, { useCORS: true });
      const imgData = canvas.toDataURL('../../img/logo.svg');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Agregar la imagen capturada al PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      document.querySelectorAll('.no-print').forEach(el => el.classList.remove('hidden'));
      // Guardar el PDF
      pdf.save('document.pdf');

    }
  };


  const handleClickSuccess = () => {
    Alerts.success('Consulta almacenada.');
  };


  return (
    <div className="flex flex-col items-center h-screen w-full max-w-screen-sm mx-auto p-4">
  <div className="mb-4 w-full">
    <label
      htmlFor="file-upload"
      className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
    >
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png, .bmp, .tiff"
      />
      {imagePreview ? (
        <Image
          src={imagePreview}
          alt="Preview"
          className="object-contain h-64 w-full"
          layout="intrinsic"
          width={500} // Puedes ajustar el ancho según sea necesario
          height={256} // Puedes ajustar la altura según sea necesario
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <svg
            className="w-12 h-12 mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-5 4h-2a1 1 0 110-2h2a1 1 0 110 2zm-6-4h12m-6-4h.01"
            />
          </svg>
          <span className="text-gray-500">Seleccione una imagen para cargar</span>
        </div>
      )}
    </label>
  </div>

  <div className="w-full p-4">
    {/* Campo para seleccionar la ruta de directorio */}
    <div className="mb-4 flex flex-col sm:flex-row items-center">
      <label htmlFor="directory-path" className="text-lg font-medium w-full sm:w-48 mb-2 sm:mb-0">
        Ruta de Directorio:
      </label>
      <input
        type="text"
        id="directory-path"
        value={saveDirectory}
        onChange={(e) => setSaveDirectory(e.target.value)}
        className="flex-grow px-2 py-1 border border-gray-300 rounded"
        placeholder="Ingrese la ruta del directorio"
      />
    </div>

    {/* Campo para seleccionar el modelo */}
    <div className="flex flex-col sm:flex-row items-center">
      <label htmlFor="model" className="text-lg font-medium w-full sm:w-48 mb-2 sm:mb-0">
        Seleccione el Modelo:
      </label>
      <input
        type="file"
        id="model"
        onChange={handleFileChangeq}
        accept=".pt"
        className="flex-grow px-2 py-1 border border-gray-300 rounded"
        required
      />
    </div>
  </div>

  {selectedFile && (
    <div className="flex flex-col items-center sm:flex-row w-full mt-4">
      <div className="flex flex-col items-center sm:w-3/5">
        <label htmlFor="confidence" className="mb-2 text-lg font-medium">
          Umbral de Confianza ({confidence})
        </label>
        <input
          type="range"
          id="confidence"
          min="0.1"
          max="1"
          step="0.1"
          value={confidence}
          onChange={(e) => setConfidence(parseFloat(e.target.value))}
          className="w-full sm:w-64"
        />
      </div>
      <button
        onClick={() => { handleFileUpload() }}
        className="mt-4 sm:mt-0 sm:ml-5 px-6 py-3 font-semibold text-white bg-[#533273] rounded hover:bg-[#D1C0D9]"
      >
        Procesar Imagen
      </button>
    </div>
  )}

  {showModal && (
    <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4" >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-full max-h-full overflow-auto relative">
        <button
          onClick={()=>{closeModal(), handleSubmit(),handleClickSuccess();}}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Laboratorio A.M. Turing</h2>
        <div className="flex flex-col sm:flex-row justify-center items-start mb-4">
          <div className="relative w-full sm:w-1/3 h-20 mb-4 sm:mb-0 sm:mr-10">
            <Image
              src={logo}
              alt="Membrete Image"
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center mb-2">
              <h1 className="uppercase font-semibold">Analista:</h1>
              <h1 className="uppercase pl-2">{session?.user?.nombreResponsable}</h1>
            </div>
            <div className="flex items-center">
              <h1 className="uppercase font-semibold">Fecha:</h1>
              <h1 className="text-lg font-medium pl-2">{fechaFormateada}</h1>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mb-4">
          <h2 className="text-2xl font-semibold">Informe de Análisis</h2>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Datos del CSV</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {csvData && csvData.length > 0 && Object.keys(csvData[0]).sort((a, b) => {
                  if (a === 'Fecha & Hora') return -1; // 'Fecha & Hora' primero
                  if (b === 'Fecha & Hora') return 1; // 'Fecha & Hora' primero
                  return 0; // El resto en el orden en que están
                }).map((key) => (
                  <th key={key} className="border-b-2 p-2">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData && csvData.map((row, index) => (
                <tr key={index}>
                  {Object.keys(row).sort((a, b) => {
                    if (a === 'Fecha & Hora') return -1; // 'Fecha & Hora' primero
                    if (b === 'Fecha & Hora') return 1; // 'Fecha & Hora' primero
                    return 0; // El resto en el orden en que están
                  }).map((key, idx) => (
                    <td key={idx} className="border-b p-2">{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row">
          <div className="w-full sm:w-5/12 pr-2 mb-4 sm:mb-0">
            <h2 className="text-2xl font-semibold mb-4">Imagen Procesada</h2>
            {processedImage && (
              <div className="relative w-full h-60">
                <Image
                  src={processedImage}
                  alt="Processed Image"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
          <div className="w-full sm:w-7/12">
            <h2 className="text-2xl font-semibold pb-8">% Confianza</h2>
            <Grafico />
          </div>
        </div>

        <button
          onClick={() => {
            generatePdf();
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Generar PDF
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default Registrar;
