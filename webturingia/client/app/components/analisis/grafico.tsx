import React, { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const SimpleBarCharts = () => {
  const [csvData, setCsvData] = useState<{ name: string, confianza: number }[]>([]);

  const getCsvData = async () => {
    try {
      const response = await fetch('http://localhost:5000/csv-data2');
      const data = await response.json();
      console.log(response)
      // Transformar los datos del CSV al formato esperado
      const fields = ['Conductor', 'Peatón', 'Bicicleta', 'Carro', 'Furgoneta', 'Camión', 'Triciclo', 'Bus', 'Moto'];
      const formattedData = fields.map(field => {
        return {
          name: field,
          confianza: parseFloat(data[0][field]) // Tomar el valor del primer registro
        };
      });

      setCsvData(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error('Error al obtener los datos del CSV:', error);
    }
  };

  useEffect(() => {
    getCsvData();
  }, []);

  return (
    <>
      <ResponsiveContainer width="100%" aspect={2} >
        <BarChart
          data={csvData}
          width={550}
          height={300}
          margin={{
            top: 5,
            right: 15,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="name" angle={-18} textAnchor="end" interval={0}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="confianza" fill="#6b48ff"/>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default SimpleBarCharts;
