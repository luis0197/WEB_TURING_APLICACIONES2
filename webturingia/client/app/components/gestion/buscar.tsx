import { useState } from 'react';
import React from 'react';
import Alerts from '../../alerts';
import { useSession } from "next-auth/react";
export default function DatosUsuario() {
  const [usuarioID, setUsuarioID] = useState('');
  const [nombreResponsable, setNombreResponsable] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición
  const [isSearched, setIsSearched] = useState(false); // Estado para controlar si se ha buscado

  const handleSearch = async () => {
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/${usuarioID}`, {
        method: "GET",
        headers: {
          "x-token": `${session?.user?.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
        
      }
      const data = await response.json();
      console.log(data);
      handleClickSuccess()
      // Actualizar los estados con los datos obtenidos
      setNombreResponsable(data.body.nombreResponsable);
      setInstitucion(data.body.institucion);
      setUsername(data.body.username);
      setPassword(data.body.password);
      setRol(data.body.rol);
      setIsSearched(true); // Marcar como buscado
    } catch (error) {
      handleClickError()
      console.error('Error al buscar usuario:', error);
      setError('Usuario no encontrado');
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Habilitar modo de edición
  };
  const { data: session } = useSession();
  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario/${usuarioID}`, {
        method: 'PUT', // Usar el método PUT para actualizar en el backend
        headers: {
          "x-token": `${session?.user?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreResponsable,
          institucion,
          username,
          password,
          rol,
        }),
      });

      if (!response.ok) {
       
        throw new Error('Error al guardar cambios');
      }

      // Indicar al usuario que se guardaron los cambios exitosamente
      alert('Cambios guardados correctamente');
      setIsEditing(false); // Salir del modo de edición
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('Error al guardar cambios. Inténtalo de nuevo más tarde.');
    }
  };
  const handleClickSuccess = () => {
    Alerts.success('¡Operación completada con éxito!');
  };
  const handleClickError = () => {
    Alerts.error('Ha ocurrido un error, usuario no encontrado.');
  };
  const handleClickEdit = () => {
    Alerts.editarS('Usuario editado.');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="usuarioID" className="block text-sm font-medium text-gray-700">
          Usuario ID
        </label>
        <input
          type="text"
          id="usuarioID"
          name="usuarioID"
          value={usuarioID}
          onChange={(e) => setUsuarioID(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <button
        onClick={()=>{handleSearch()}}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Buscar
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Tabla para mostrar los datos */}
      <table className="mt-4 border-collapse w-full">
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Nombre Responsable:</td>
            <td className="border border-gray-300 px-4 py-2">
              {isEditing ? (
                <input
                  type="text"
                  value={nombreResponsable}
                  onChange={(e) => setNombreResponsable(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                nombreResponsable
              )}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Institución:</td>
            <td className="border border-gray-300 px-4 py-2">
              {isEditing ? (
                <input
                  type="text"
                  value={institucion}
                  onChange={(e) => setInstitucion(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                institucion
              )}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Username:</td>
            <td className="border border-gray-300 px-4 py-2">
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                username
              )}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Password:</td>
            <td className="border border-gray-300 px-4 py-2">
              {isEditing ? (
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                '********'
              )}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Rol:</td>
            <td className="border border-gray-300 px-4 py-2">
              {isEditing ? (
                <select
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccione un rol</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="PARTICIPANTE">PARTICIPANTE</option>
                </select>
              ) : (
                rol
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Botones de edición y guardar cambios */}
      <div className="mt-4 flex justify-end">
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded-md mr-2 focus:outline-none"
          >
            Editar
          </button>
        )}
        {isEditing && (
          <button
            onClick={()=>{handleSave (),handleClickEdit()}}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md mr-2 focus:outline-none"
          >
            Guardar
          </button>
        )}
      </div>
    </div>
  );
}
