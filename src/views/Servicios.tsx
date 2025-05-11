import { FaTooth } from "react-icons/fa";
import { TbDental, TbDentalBroken, TbDentalOff } from "react-icons/tb";
import { PiToothBold } from "react-icons/pi";

const dataServicios = [
    {
        id: 1,
        icon: <FaTooth className="text-4xl text-teal-500" />,
        nombre: "Ortodoncia",
        descripcion:
            "Cuidado dental completo para toda la familia, incluyendo exámenes, limpiezas y empastes.",
        precio: 100,
    },
    {
        id: 2,
        icon: <TbDentalBroken className="text-4xl text-teal-500" />,
        nombre: "Endodoncia",
        descripcion:
            "Mejora la apariencia de tu sonrisa con blanqueamiento, carillas y otros tratamientos estéticos.",
        precio: 250,
    },
    {
        id: 3,
        icon: <TbDentalOff className="text-4xl text-teal-500" />,
        nombre: "Blanqueamiento Dental",
        descripcion:
            "Tratamientos para aliviar el dolor dental, infecciones y otros problemas de salud bucal.",
        precio: 150,
    },
    {
        id: 4,
        icon: <TbDental className="text-4xl text-teal-500" />,
        nombre: "Odontopediatría",
        descripcion:
            "Atención especializada para los más pequeños, en un ambiente amigable y seguro.",
        precio: 150,
    },
    {
        id: 5,
        icon: <PiToothBold className="text-4xl text-teal-500" />,
        nombre: "Coronas Dentales",
        descripcion:
            "Soluciones duraderas y estéticas para restaurar dientes dañados o debilitados.",
        precio: 150,
    },
];

export default function Servicios() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-600 mb-10">
                    ¿Qué <span className="text-green-500">tratamiento dental</span> necesitas?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dataServicios.map((servicio) => (
                        <div
                            key={servicio.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center group hover:bg-teal-500 hover:text-white"
                        >
                            <div className="mb-4 bg-teal-50 p-4 rounded-full transition group-hover:bg-white">
                                {servicio.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{servicio.nombre}</h3>
                            <p className="text-sm text-gray-600 group-hover:text-white mb-4">
                                {servicio.descripcion}
                            </p>
                            <button className="mt-auto bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-blue-500 transition duration-300">
                                Reservar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
