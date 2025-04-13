import { useState } from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaUserMd, FaSignOutAlt, FaDashcube } from 'react-icons/fa';
import { Transition } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminNavigation() {
    const [pacientesOpen, setPacientesOpen] = useState(false);
    const [citasOpen, setCitasOpen] = useState(false);
    const [doctoresOpen, setDoctoresOpen] = useState(false);

    const queryClient = useQueryClient();
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN_SONRISADIGITAL');
        queryClient.invalidateQueries({ queryKey: ['user'] });
    };

    return (
        <nav className="">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="w-36">
                    <Logo />
                </Link>
                <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-700 items-center">
                    <Link to="/dashboard" className="hover:text-blue-500 transition-colors flex items-center gap-1">
                        <FaDashcube /> Dashboard
                    </Link>

                    {/* Pacientes Dropdown */}
                    <div className="relative" onMouseEnter={() => setPacientesOpen(true)} onMouseLeave={() => setPacientesOpen(false)}>
                        <Link to="/admin/pacientes" className="hover:text-blue-500 transition-colors flex items-center gap-1">
                            <FaUsers /> Pacientes
                        </Link>
                        <Transition
                            show={pacientesOpen}
                            enter="transition ease-out duration-150"
                            enterFrom="opacity-0 translate-y-2"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-2"
                        >
                            <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-20">
                                <Link to="/admin/pacientes" className="block px-4 py-2 hover:bg-gray-100">Listar</Link>
                                <Link to="/admin/pacientes?newPaciente=true" className="block px-4 py-2 hover:bg-gray-100">Crear</Link>
                            </div>
                        </Transition>
                    </div>

                    {/* Citas Dropdown */}
                    <div className="relative" onMouseEnter={() => setCitasOpen(true)} onMouseLeave={() => setCitasOpen(false)}>
                        <Link to="/admin/citas" className="hover:text-blue-500 transition-colors flex items-center gap-1">
                            <FaCalendarAlt /> Citas
                        </Link>
                        <Transition
                            show={citasOpen}
                            enter="transition ease-out duration-150"
                            enterFrom="opacity-0 translate-y-2"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-2"
                        >
                            <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-20">
                                <Link to="/admin/citas" className="block px-4 py-2 hover:bg-gray-100">Listar</Link>
                                <Link to="/admin/citas?newCita=true" className="block px-4 py-2 hover:bg-gray-100">Crear</Link>
                            </div>
                        </Transition>
                    </div>

                    {/* Doctores Dropdown */}
                    <div className="relative" onMouseEnter={() => setDoctoresOpen(true)} onMouseLeave={() => setDoctoresOpen(false)}>
                        <Link to="/admin/medicos" className="hover:text-blue-500 transition-colors flex items-center gap-1">
                            <FaUserMd /> Doctores
                        </Link>
                        <Transition
                            show={doctoresOpen}
                            enter="transition ease-out duration-150"
                            enterFrom="opacity-0 translate-y-2"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-2"
                        >
                            <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-20">
                                <Link to="/admin/medicos" className="block px-4 py-2 hover:bg-gray-100">Listar</Link>
                                <Link to="/admin/medicos?newMedic=true" className="block px-4 py-2 hover:bg-gray-100">Crear</Link>
                            </div>
                        </Transition>
                    </div>

                    {/* Logout */}
                    <Link to="/login" onClick={logout} className="hover:text-red-500 transition-colors flex items-center gap-1">
                        <FaSignOutAlt /> Salir
                    </Link>
                </div>
            </div>
        </nav>
    );
}
