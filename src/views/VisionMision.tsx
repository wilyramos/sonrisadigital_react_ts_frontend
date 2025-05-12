import { FaBullseye, FaEye } from "react-icons/fa";

export default function VisionMision() {
    return (
        <section className="py-10 px-4 bg-white">
            <div className="container mx-auto space-y-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center">
                    Misión y Visión
                </h2>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Misión */}
                    <div className="bg-gray-50 rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <FaBullseye className="text-teal-500 text-4xl" />
                            <h3 className="text-2xl font-bold text-gray-800">Nuestra Misión</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Brindar atención odontológica integral, con un enfoque humano, ético y profesional, utilizando tecnología de vanguardia para mejorar la salud y la calidad de vida de nuestros pacientes.
                        </p>
                    </div>

                    {/* Visión */}
                    <div className="bg-gray-50 rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <FaEye className="text-blue-500 text-4xl" />
                            <h3 className="text-2xl font-bold text-gray-800">Nuestra Visión</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Ser reconocidos como una clínica líder en salud bucal, destacándonos por la excelencia en el servicio, la innovación tecnológica y la satisfacción total de nuestros pacientes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
