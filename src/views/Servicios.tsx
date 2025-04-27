// importe icons clinica dental de react-icons/fa
import { FaTooth } from "react-icons/fa";
import { TbDental, TbDentalBroken, TbDentalOff   } from "react-icons/tb";
import { PiToothBold } from "react-icons/pi";


const dataServicios = [
    {
        id: 1,
        icon: <FaTooth className="text-4xl text-teal-500" />,
        nombre: "Ortodoncia",
        descripcion: "Cuidado dental completo para toda la familia, incluyendo exámenes, limpiezas y empastes.",
        precio: 100
    },
    {
        id: 2,
        icon: <TbDentalBroken  className="text-4xl text-teal-500" />,

        nombre: "Endodoncia",
        descripcion: "Mejora la apariencia de tu sonrisa con blanqueamiento, carillas y otros tratamientos estéticos.",
        precio: 250
    },
    {
        id: 3,
        icon: <TbDentalOff className="text-4xl text-teal-500" />,
        nombre: "Blanqueamiento Dental",
        descripcion: "Tratamientos para aliviar el dolor dental, infecciones y otros problemas de salud bucal.",
        precio: 150
    },
    {
        id: 4,
        icon: <TbDental className="text-4xl text-teal-500" />,
        nombre: "Odontopediatría",
        descripcion: "Tratamientos para aliviar el dolor dental, infecciones y otros problemas de salud bucal.",
        precio: 150
    },
    {
        id: 5,
        icon: <PiToothBold className="text-4xl text-teal-500" />,
        nombre: "Coronas Dentales",
        descripcion: "Tratamientos para aliviar el dolor dental, infecciones y otros problemas de salud bucal.",
        precio: 150
    },
];


export default function Servicios() {
    return (
        <section className="py-10">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-teal-500 mb-16">
                    Nuestros Servicios Dentales
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {dataServicios.map((servicio) => (
                        <div
                            key={servicio.id}
                            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 hover:border-teal-300"
                        >
                            <div className="bg-teal-50 flex items-center justify-start p-2">
                                {servicio.icon}
                            </div>

                            <div className="px-6 flex justify-between flex-grow">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-600 mb-3">
                                        {servicio.nombre}
                                    </h3>
                                    <p className="text-gray-400 text-base leading-relaxed mb-6">
                                        {servicio.descripcion}
                                    </p>
                                </div>

                                <div className="text-gray-500 font-bold text-lg">
                                    ${servicio.precio} USD
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
}