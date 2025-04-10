import { useState } from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaTooth, FaUserMd, FaSignOutAlt } from 'react-icons/fa';
import { Transition } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminNavigation() {
    const [pacientesOpen, setPacientesOpen] = useState(false);
    const [citasOpen, setCitasOpen] = useState(false);
    const [doctoresOpen, setDoctoresOpen] = useState(false);

    const queryClient = useQueryClient();
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN_SONRISADIGITAL')
        queryClient.invalidateQueries({ queryKey: ['user'] })
    }


    return (
        <nav className=' text-gray-700 py-4'>
            <div className='container mx-auto px-4 flex justify-between items-center'>
                <Link to="/" className="w-36 flex items-center justify-start focus:outline-none">
                <Logo />
                </Link>
                <div className="hidden md:flex space-x-4 items-center">
                    <div className="relative" onMouseEnter={() => setPacientesOpen(true)} onMouseLeave={() => setPacientesOpen(false)}>
                        <Link to="/admin/pacientes" className="hover:text-blue-200 focus:outline-none flex items-center"><FaUsers className="mr-1" /> Pacientes</Link>
                        <Transition show={pacientesOpen} enter="transition-opacity duration-150" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <div className="absolute left-0 mt-2 py-2 w-48 bg-white text-gray-700 shadow-md rounded-md z-10">
                                <Link to="/admin/pacientes/listar" className="block px-4 py-2 hover:bg-gray-100 focus:outline-none">Listar</Link>
                                <Link to="/admin/pacientes/crear" className="block px-4 py-2 hover:bg-gray-100 focus:outline-none">Crear</Link>
                            </div>
                        </Transition>
                    </div>
                    <div className="relative" onMouseEnter={() => setCitasOpen(true)} onMouseLeave={() => setCitasOpen(false)}>
                        <Link to="/admin/citas" className="hover:text-blue-200 focus:outline-none flex items-center"><FaCalendarAlt className="mr-1" /> Citas</Link>
                        <Transition show={citasOpen} enter="transition-opacity duration-150" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <div className="absolute left-0 mt-2 py-2 w-48 bg-white text-gray-700 shadow-md rounded-md z-10">
                                <Link to="/admin/citas/listar" className="block px-4 py-2 hover:bg-gray-100 focus:outline-none">Listar</Link>
                                <Link to="/admin/citas/crear" className="block px-4 py-2 hover:bg-gray-100 focus:outline-none">Crear</Link>
                            </div>
                        </Transition>
                    </div>
                    <div className="relative" onMouseEnter={() => setDoctoresOpen(true)} onMouseLeave={() => setDoctoresOpen(false)}>
                        <Link to="/admin/doctores" className="hover:text-blue-200 focus:outline-none flex items-center"><FaUserMd className="mr-1" /> Doctores</Link>
                        <Transition show={doctoresOpen} enter="transition-opacity duration-150" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <div className="absolute left-0 mt-2 py-2 w-48 bg-white text-gray-700 shadow-md rounded-md z-10">
                                <Link to="/admin/doctores/listar" className="block px-4 py-2 hover:bg-gray-100 focus:outline-none">Listar</Link>
                                <Link to="/admin/doctores/crear" className="block px-4 py-2 hover:bg-gray-100 focus:outline-none">Crear</Link>
                            </div>
                        </Transition>
                    </div>
                    <Link to="/admin/servicios" className="hover:text-blue-200 focus:outline-none flex items-center"><FaTooth className="mr-1" /> Servicios</Link>
                    <Link to="/admin/configuracion" className="hover:text-blue-200 focus:outline-none">Configuración</Link>
                    <button onClick={logout} className="hidden md:flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red">
                        <FaSignOutAlt className="mr-1" /> Salir
                    </button>
                </div>
            </div>
        </nav>
    );
}