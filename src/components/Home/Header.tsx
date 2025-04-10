import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FaTooth } from "react-icons/fa"; // Import a tooth icon
import { FaSmile } from "react-icons/fa"; // Import a smile icon

export default function Header() {
    return (
        <div className="py-16 lg:py-24">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="text-center md:text-left">
                    <div className="mb-6 flex items-center justify-center md:justify-start">
                        <FaTooth className="text-teal-500 text-xl mr-2" />
                        <p className="text-sm text-gray-600 uppercase tracking-wider font-semibold">
                            Sonrisa Digital
                        </p>
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8 leading-tight">
                        Tu <span className="text-teal-500">sonrisa</span>, <br />
                        nuestra <span className="text-blue-500">historia</span>.
                    </h2>
                    <p className="text-lg text-gray-700 mb-10">
                        Transformamos sonrisas, construyendo confianza y bienestar dental.
                    </p>
                    <div className="flex items-center justify-center md:justify-start space-x-4">
                        <Link
                            to="/servicios"
                            className="bg-teal-500 text-white px-8 py-3 rounded-full shadow hover:bg-teal-600 transition duration-300 ease-in-out font-semibold"
                        >
                            <FaSmile className="mr-2 inline-block" /> Ver Servicios
                        </Link>
                        <Button
                            as="a"
                            href="https://api.whatsapp.com/send?phone=573053785885&text=Hola,%20quiero%20agendar%20una%20cita.%20Gracias!"
                            target="_blank"
                            className="bg-green-500 text-white px-8 py-3 rounded-full shadow hover:bg-green-600 transition duration-300 ease-in-out font-semibold flex items-center"
                        >
                            Agendar Cita
                            <FaWhatsapp className="ml-2" />
                        </Button>
                    </div>
                    <p className="mt-8 text-sm text-gray-600 italic">
                        *Expertos en Implantología y Carillas Dentales.
                    </p>
                </div>

                {/* Image */}
                <div className="relative flex items-center justify-center">
                    <img
                        src="logo.svg"
                        alt="Transforming smiles"
                        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full shadow-xl transition-transform duration-500 hover:scale-105"
                        style={{ filter: "drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.15))" }}
                    />
                </div>
            </div>
        </div>
    );
}