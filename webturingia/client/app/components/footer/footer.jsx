export default function Pie() {
  return (
    <footer className="fixed z-10 bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a  className="hover:underline">CEDIA-ESPOCH-UNACH-UTI</a>. Todos los derechos reservados.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">Acerca de</a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">Politicas de privacidad</a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">Licencias</a>
        </li>
        <li>
          <a href="#" className="hover:underline">Contactos</a>
        </li>
      </ul>
    </footer>
  )
}