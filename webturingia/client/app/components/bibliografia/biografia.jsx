import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Biografia(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [modalOpen]);

  return (
    <div className='mr-[10px] ml-[10px] flex flex-col items-center justify-items-center cursor-pointer' onClick={openModal}>
      <Image
        className='h-full w-auto'
        src={props.imagen}
        alt={`Foto de ${props.nombre}`}
        width={500}
        height={500}
        style={{ objectFit: 'cover' }}
      />
      <div className='text-center mt-2'>
        <p className=''>
          <strong>{props.nombre}</strong> 
        </p>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex pt-10 justify-center bg-gray-800 bg-opacity-75 z-40 overflow-y-auto">
          <div className="relative bg-white p-4 max-w-4xl w-full max-h-[80%] rounded-lg flex flex-col md:flex-row items-center justify-center" ref={modalRef}>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-50"
              onClick={()=>{closeModal()}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full md:w-1/2 flex justify-center max-h-[100%] p-2">
              <Image
                src={props.imagen}
                alt={`Foto de ${props.nombre}`}
                width={350}
                height={400}
                className="object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4 flex flex-col items-center p-2 overflow-y-auto max-h-[70vh]">
              <p className="text-justify">{props.descripcion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
