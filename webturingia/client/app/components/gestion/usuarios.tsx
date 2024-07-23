'use client'
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

interface Usuario {
  usuarioID: number;
  nombreResponsable: string;
  institucion: string | null;
  username: string;
  rol: string;
}

interface SessionData {
  status: boolean;
  body: Usuario[];
}

export default function UserProfile() {
  const { data: session } = useSession();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario`, {
          method: "GET",
          headers: {
            "x-token": `${session?.user?.token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener los datos de sesión del usuario');
        }
        const data: SessionData = await response.json();
        //console.log('Datos del backend:', data);
        setSessionData(data);
      } catch (error) {
        console.error('Error al obtener datos de sesión:', error);
        setError('Error al obtener los datos de sesión del usuario');
      }
    };

    fetchSessionData();
  }, [session?.user?.token]);

  const handleDelete = async (usuarioID: number) => {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/${usuarioID}`, {
        method: 'DELETE',
        headers: {
          "x-token": `${session?.user?.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      // Actualizar la lista de usuarios después de eliminar
      setSessionData((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          body: prevState.body.filter((user) => user.usuarioID !== usuarioID),
        };
      });

      alert('Usuario eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setError('Error al eliminar el usuario');
      alert('Error al eliminar el usuario. Inténtalo de nuevo más tarde.');
    }
  };

  if (!sessionData) {
    return <p>Cargando datos de sesión...</p>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900">Usuarios</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="max-h-96 overflow-y-auto mt-4 divide-y divide-gray-200">
        {sessionData.body.map((user) => (
          <div key={user.usuarioID} className="py-2 flex justify-between items-center">
            <div>
              <p><span className="font-semibold">Nombre Responsable:</span> {user.nombreResponsable}</p>
              <p><span className="font-semibold">Institución:</span> {user.institucion || 'No especificada'}</p>
              <p><span className="font-semibold">Username:</span> {user.username}</p>
              <p><span className="font-semibold">Rol:</span> {user.rol}</p>
            </div>
            <button
              onClick={() => handleDelete(user.usuarioID)}
              disabled={user.username === 'daniel@gmail.com'}
              className={`ml-4 ${user.username === 'daniel@gmail.com' ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white py-1 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50`}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
