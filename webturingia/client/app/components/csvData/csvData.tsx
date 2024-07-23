import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Image from 'next/image';

interface DataItem {
  id: number;
  confidence: string;
  model: string;
  processedImage: string | null;
  conductor: number;
  peaton: number;
  bicicleta: number;
  carro: number;
  furgoneta: number;
  camion: number;
  triciclo: number;
  bus: number;
  moto: number;
}

export default function Dashboard() {
  const [data, setData] = useState<DataItem[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedMinConfidence, setSelectedMinConfidence] = useState<number>(0.1);
  const [selectedMaxConfidence, setSelectedMaxConfidence] = useState<number>(1);
  const { data: session, status } = useSession();

  // Function to fetch data
  const fetchData = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/csvData`, {
        method: 'GET',
        headers: {
          "x-token": token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('CSV Data:', result); // Verificar los datos en la consola
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  useEffect(() => {
    async function getData() {
      if (session?.user?.token) {
        const result = await fetchData(session.user.token);
        setData(result.body || []);
      }
    }

    if (status === "authenticated") {
      getData();
    }
  }, [session, status]);

  if (status === "loading") {
    return <p className="text-center text-lg">Loading...</p>;
  }

  // Filter data based on selected model and confidence range
  const filteredData = data.filter(item => {
    const matchesModel = !selectedModel || selectedModel === 'All Models' || item.model === selectedModel;
    const confidenceValue = parseFloat(item.confidence);
    const matchesConfidence = confidenceValue >= selectedMinConfidence && confidenceValue <= selectedMaxConfidence;
    return matchesModel && matchesConfidence;
  });

  // Get unique models for selection
  const models = ['All Models', ...new Set(data.map(item => item.model))];

  return (
    <div className="p-6 bg-gray-100">
      <div className="mb-6">
        {/* Model Selection */}
        <label htmlFor="model-select" className="block text-lg font-semibold mb-2">Select Model:</label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="p-2 border rounded-md"
        >
          {models.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>

        {/* Minimum Confidence Selection */}
        <label htmlFor="min-confidence-select" className="block text-lg font-semibold mt-4 mb-2">
          Minimum Confidence: {selectedMinConfidence.toFixed(1)}
        </label>
        <input
          type="range"
          id="min-confidence-select"
          value={selectedMinConfidence}
          onChange={(e) => {
            const minConf = parseFloat(e.target.value);
            setSelectedMinConfidence(minConf);
            if (minConf > selectedMaxConfidence) {
              setSelectedMaxConfidence(minConf);
            }
          }}
          className="w-full"
          min="0.1"
          max="1"
          step="0.1"
        />

        {/* Maximum Confidence Selection */}
        <label htmlFor="max-confidence-select" className="block text-lg font-semibold mt-4 mb-2">
          Maximum Confidence: {selectedMaxConfidence.toFixed(1)}
        </label>
        <input
          type="range"
          id="max-confidence-select"
          value={selectedMaxConfidence}
          onChange={(e) => setSelectedMaxConfidence(parseFloat(e.target.value))}
          className="w-full"
          min={selectedMinConfidence}
          max="1"
          step="0.1"
        />
      </div>

      {filteredData.length === 0 ? (
        <p className="text-center text-lg">No data available</p>
      ) : (
        <div className="overflow-x-auto overflow-y-auto h-[300px]">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-semibold">
                <th className="p-4 border-b">ID</th>
                <th className="p-4 border-b">Model</th>
                <th className="p-4 border-b">Confidence</th>
                <th className="p-4 border-b">Processed Image</th>
                <th className="p-4 border-b">Conductor</th>
                <th className="p-4 border-b">Peatón</th>
                <th className="p-4 border-b">Bicicleta</th>
                <th className="p-4 border-b">Carro</th>
                <th className="p-4 border-b">Furgoneta</th>
                <th className="p-4 border-b">Camión</th>
                <th className="p-4 border-b">Triciclo</th>
                <th className="p-4 border-b">Bus</th>
                <th className="p-4 border-b">Moto</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id} className="text-sm">
                  <td className="p-4 border-b">{item.id}</td>
                  <td className="p-4 border-b">{item.model}</td>
                  <td className="p-4 border-b">{item.confidence}</td>
                  <td className="p-4 border-b">
                    {item.processedImage ? (
                      <Image
                        src={item.processedImage}
                        alt="Processed"
                        width={100}
                        height={100}
                        className="rounded-md shadow-sm"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="p-4 border-b">{item.conductor}</td>
                  <td className="p-4 border-b">{item.peaton}</td>
                  <td className="p-4 border-b">{item.bicicleta}</td>
                  <td className="p-4 border-b">{item.carro}</td>
                  <td className="p-4 border-b">{item.furgoneta}</td>
                  <td className="p-4 border-b">{item.camion}</td>
                  <td className="p-4 border-b">{item.triciclo}</td>
                  <td className="p-4 border-b">{item.bus}</td>
                  <td className="p-4 border-b">{item.moto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}