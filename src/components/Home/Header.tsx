import { motion } from "framer-motion";
import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaTooth, FaSmile } from "react-icons/fa";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function Header() {
    return (
        <>
        <div>
            <p>Horario: <span className="text-blue-500">Lunes a Viernes, 9am - 6pm</span></p>
        </div>
        
        <div className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4">
                {/* Text Content */}
                <motion.div
                    className="text-center md:text-left"
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.15 }}
                >
                    <motion.div
                        className="mb-6 flex items-center justify-center md:justify-start"
                        variants={fadeInUp}
                    >
                        <FaTooth className="text-teal-500 text-xl mr-2" />
                        <p className="text-sm text-gray-600 uppercase tracking-wider font-semibold">
                            Sonrisa Digital
                        </p>
                    </motion.div>

                    <motion.h2
                        className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8 leading-tight"
                        variants={fadeInUp}
                    >
                        Tu <span className="text-teal-500">sonrisa</span>, <br />
                        nuestra <span className="text-blue-500">historia</span>.
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-700 mb-10"
                        variants={fadeInUp}
                    >
                        Transformamos sonrisas, construyendo confianza y bienestar dental.
                    </motion.p>

                    <motion.div
                        className="flex items-center justify-center md:justify-start space-x-4"
                        variants={fadeInUp}
                    >
                        <Link
                            to="/servicios"
                            className="bg-teal-500 text-white px-8 py-3 rounded-full shadow hover:bg-teal-600 transition duration-300 ease-in-out font-semibold flex items-center"
                        >
                            <FaSmile className="mr-2" /> Ver Servicios
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
                    </motion.div>

                    <motion.p
                        className="mt-8 text-sm text-gray-600 italic"
                        variants={fadeInUp}
                    >
                        *Expertos en Implantología y Carillas Dentales.
                    </motion.p>
                </motion.div>

                {/* Image */}
                <motion.div
                    className="relative flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                >
                    <img
                        src="logo.svg"
                        alt="Transforming smiles"
                        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full shadow-xl hover:scale-105 transition-transform duration-500"
                        style={{
                            filter: "drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.15))",
                        }}
                    />
                </motion.div>
            </div>
        </div>

        </>
    );
}
