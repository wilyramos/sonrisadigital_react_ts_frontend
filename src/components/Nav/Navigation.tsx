import { useState } from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import { FaUser, FaWhatsapp } from 'react-icons/fa';
import { Transition } from '@headlessui/react'; // Import Transition for animations

export default function Navigation({ isPrivate }: { isPrivate?: boolean }) {
    const [isNosotrosOpen, setIsNosotrosOpen] = useState(false);
    const [isServiciosOpen, setIsServiciosOpen] = useState(false);

    return (
        <nav className='bg-white py-6'> {/* Added shadow for better separation */}
            <div className='container mx-auto px-4 flex justify-between items-center'>
                {/* Logo */}
                <div className="w-36 flex items-center justify-start">
                    <Link to="/" className="focus:outline-none">
                        <Logo />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-4 items-center">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsNosotrosOpen(true)}
                        onMouseLeave={() => setIsNosotrosOpen(false)}
                    >
                        <Link to="/nosotros" className="text-gray-700 hover:text-teal-600 focus:outline-none">
                            Nosotros
                        </Link>
                        <Transition
                            show={isNosotrosOpen}
                            enter="transition-opacity duration-150"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute left-0 mt-2 py-2 w-48 bg-white shadow-md rounded-md z-10">
                                <Link to="/nosotros/historia" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none">
                                    Historia
                                </Link>
                                <Link to="/nosotros/equipo" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none">
                                    Nuestro Equipo
                                </Link>
                                <Link to="/nosotros/vision-mision" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none">
                                    Visión y Misión
                                </Link>
                                {/* Add more sub-links here */}
                            </div>
                        </Transition>
                    </div>
                    <div
                        className="relative"
                        onMouseEnter={() => setIsServiciosOpen(true)}
                        onMouseLeave={() => setIsServiciosOpen(false)}
                    >
                        <Link to="/servicios" className="text-gray-700 hover:text-teal-600 focus:outline-none">
                            Servicios
                        </Link>
                        <Transition
                            show={isServiciosOpen}
                            enter="transition-opacity duration-150"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute left-0 mt-2 py-2 w-48 bg-white shadow-md rounded-md z-10">
                                <Link to="/servicios/servicio1" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none">
                                    Servicio 1
                                </Link>
                                <Link to="/servicios/servicio2" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none">
                                    Servicio 2
                                </Link>
                                <Link to="/servicios/servicio3" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none">
                                    Servicio 3
                                </Link>
                                {/* Add more sub-links here */}
                            </div>
                        </Transition>
                    </div>
                    {isPrivate && (
                        <Link to="/dashboard" className="text-gray-700 hover:text-teal-600 focus:outline-none">
                            Dashboard {/* Added a link for the private area */}
                        </Link>
                    )}
                </div>

                {/* Desktop Icons */}
                <div className="hidden md:flex space-x-4 items-center">
                    <Link to="/login" className="text-gray-700 hover:text-teal-600 focus:outline-none">
                        <FaUser className="h-6 w-6" />
                    </Link>
                    <button
                        className="flex items-center text-white hover:text-lime-300 focus:outline-none cursor-pointer bg-lime-500 rounded-full px-4 py-2"
                        onClick={() => window.open('https://api.whatsapp.com/send?phone=51907103353&text=Hola%20quiero%20agendar%20una%20cita', '_blank')}
                        aria-label="WhatsApp"
                    >
                        <FaWhatsapp className="h-6 w-6 mr-1" />
                        Whatsapp
                    </button>
                </div>
            </div>
        </nav>
    );
}