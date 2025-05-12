
const equipo = [
    {
        nombre: "Dr. Juan Pérez",
        cargo: "Director Clínico",
        especialidad: "Odontología Estética",
        imagen: "/medic1.jpg",
    },
    {
        nombre: "Dra. María López",
        cargo: "Odontóloga General",
        especialidad: "Rehabilitación Oral",
        imagen: "/medico.jpg",
    },
    {
        nombre: "Dr. Carlos Gómez",
        cargo: "Especialista en Ortodoncia",
        especialidad: "Ortodoncia y Ortopedia Maxilar",
        imagen: "/medic3.jpg",
    },
];

export default function NuestroEquipo() {
    return (
        <section className="py-10 px-4 bg-gray-50">
            <div className="container mx-auto space-y-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center">
                    Nuestro Equipo
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {equipo.map((miembro, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={miembro.imagen}
                                alt={miembro.nombre}
                                className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-teal-500 shadow-md"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">
                                {miembro.nombre}
                            </h3>
                            <p className="text-teal-500 font-medium">{miembro.cargo}</p>
                            <p className="text-gray-600 text-sm">{miembro.especialidad}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
