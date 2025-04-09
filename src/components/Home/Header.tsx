import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FaSmileBeam } from "react-icons/fa"; // Import some dental icons


export default function Header() {
    return (
        <div className="bg-white py-16 lg:py-24 align-center ">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="text-center md:text-left">
                    <div className="mb-4">
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Sonrisa Digital</p>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                        Tu sonrisa <br />
                        nuestra historia.
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Transformamos sonrisas, construimos confianza.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 justify-center md:justify-start">
                        <Link to="/servicios" className="bg-teal-500 text-white px-6 py-3 rounded-full shadow hover:bg-teal-600 transition duration-200 flex items-center justify-center">
                            Ver Servicios
                        </Link>
                        <Button
                            as="a"
                            href="https://api.whatsapp.com/send?phone=573053785885&text=Hola,%20quiero%20agendar%20una%20cita.%20Gracias!"
                            target="_blank"
                            className="text-lime-500 px-6 py-3 rounded-full shadow transition border-2 border-green-600 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center"
                        >
                            Agendar Cita por Whatsapp
                        </Button>
                    </div>
                    <p className="mt-6 text-sm text-gray-500">*Expertos en Implantología e Carillas Dentales.</p>
                </div>

                <div className="relative overflow-hidden rounded-md h-full">
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
                    <img
                        src="logo.svg"
                        alt="Transforming smiles"
                        className="absolute inset-0 w-full h-full object-cover "
                    />

                    <div className="absolute right-20 left-4 flex space-x-4 z-20">

                        <div className="rounded-full bg-white p-8 shadow-xl">
                            <FaSmileBeam className="text-gray-600 text-xl" />
                        </div>
                        {/* Add more icons wrapped in circular divs */}
                    </div>
                </div>
            </div>
        </div>
    );
}