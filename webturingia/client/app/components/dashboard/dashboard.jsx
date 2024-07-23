import { useState, useEffect } from 'react';

const StdDevChart = () => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/calculate-std-dev');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const imageBytes = await response.arrayBuffer();
        const imageBase64 = Buffer.from(imageBytes).toString('base64');
        const imageSrc = `data:image/png;base64,${imageBase64}`;

        setImageSrc(imageSrc);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchData();
  }, []);

  const [imageTiempo, setImageTiempo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/detections-over-time');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const imageBytes = await response.arrayBuffer();
        const imageBase64 = Buffer.from(imageBytes).toString('base64');
        const imageTiempo = `data:image/png;base64,${imageBase64}`;

        setImageTiempo(imageTiempo);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div className="flex overflow-x-auto space-x-4">
      <div className="flex-none">
        <h2 className="text-center">Desviaciones Estándar por Categoría</h2>
        {imageSrc && <img src={imageSrc} alt="Desviaciones Estándar por Categoría" className="max-w-full h-auto" />}
      </div>
      <div className="flex-none">
        <h2 className="text-center">Número de detecciones a lo largo del tiempo por categoría de vehículos</h2>
        {imageTiempo && <img src={imageTiempo} alt="Número de detecciones a lo largo del tiempo por categoría de vehículos" className="max-w-full h-[600px]" />}
      </div>
    </div>
  );
};

export default StdDevChart;
