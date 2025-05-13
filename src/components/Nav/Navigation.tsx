import { useState } from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import { FaUser, FaWhatsapp } from 'react-icons/fa';
import { Menu } from 'lucide-react';
import { Transition } from '@headlessui/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation({ isPrivate }: { isPrivate?: boolean }) {
    const [isNosotrosOpen, setIsNosotrosOpen] = useState(false);

    return (
        <nav className="bg-white py-4 sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="w-36">
                    <Logo />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6 items-center text-sm font-medium text-gray-700">

                    <div
                        className="relative"
                        onMouseEnter={() => setIsNosotrosOpen(true)}
                        onMouseLeave={() => setIsNosotrosOpen(false)}
                    >
                        <span className="cursor-pointer hover:text-teal-600 transition">Nosotros</span>
                        <Transition
                            show={isNosotrosOpen}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-2"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-2"
                        >
                            <div className="absolute left-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-20">
                                <Link to="/nosotros/historia" className="block px-4 py-2 hover:bg-gray-100">Historia</Link>
                                <Link to="/nosotros/equipo" className="block px-4 py-2 hover:bg-gray-100">Nuestro Equipo</Link>
                                <Link to="/nosotros/vision-mision" className="block px-4 py-2 hover:bg-gray-100">Visión y Misión</Link>
                            </div>
                        </Transition>
                    </div>

                    <Link to="/servicios" className="hover:text-teal-600 transition">Servicios</Link>

                    {isPrivate && (
                        <Link to="/dashboard" className="hover:text-teal-600 transition">Dashboard</Link>
                    )}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/login" className="text-gray-700 hover:text-teal-600 transition">
                        <FaUser className="w-5 h-5" />
                    </Link>
                    <button
                        className="bg-lime-500 hover:bg-lime-600 text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-md transition"
                        onClick={() =>
                            window.open(
                                'https://api.whatsapp.com/send?phone=51907103353&text=Hola%20quiero%20agendar%20una%20cita',
                                '_blank'
                            )
                        }
                    >
                        <FaWhatsapp className="w-4 h-4" />
                        WhatsApp
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none">
                            <Menu className="w-6 h-6 text-gray-700" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
                            <DropdownMenuItem>
                                <Link to="/nosotros" className="w-full text-gray-700 hover:text-teal-600">Nosotros</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to="/servicios" className="w-full text-gray-700 hover:text-teal-600">Servicios</Link>
                            </DropdownMenuItem>
                            {isPrivate && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link to="/dashboard" className="w-full text-gray-700 hover:text-teal-600">Dashboard</Link>
                                    </DropdownMenuItem>
                                </>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to="/login" className="w-full text-gray-700 hover:text-teal-600">Iniciar Sesión</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <button
                                    className="flex items-center gap-2 text-lime-600 hover:text-lime-700"
                                    onClick={() =>
                                        window.open(
                                            'https://api.whatsapp.com/send?phone=51907103353&text=Hola%20quiero%20agendar%20una%20cita',
                                            '_blank'
                                        )
                                    }
                                >
                                    <FaWhatsapp className="w-4 h-4" />
                                    WhatsApp
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}
