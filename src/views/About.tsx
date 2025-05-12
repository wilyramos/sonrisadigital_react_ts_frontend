import { FaRegSmileBeam, FaHandsHelping, FaMedal } from "react-icons/fa";

export default function About() {
    const values = [
        {
            icon: <FaRegSmileBeam className="text-teal-500 text-5xl mb-4" />,
            title: "Compromiso",
            desc: "Atención personalizada y resultados excepcionales.",
        },
        {
            icon: <FaHandsHelping className="text-teal-500 text-5xl mb-4" />,
            title: "Confianza",
            desc: "Relaciones basadas en confianza y empatía.",
        },
        {
            icon: <FaMedal className="text-teal-500 text-5xl mb-4" />,
            title: "Excelencia",
            desc: "Tecnología y técnicas avanzadas para tu bienestar.",
        },
    ];

    return (
        <section className="space-y-8">
            {/* ¿Quiénes somos? */}
            <div className="container mx-auto px-4 grid gap-12 md:grid-cols-2 items-center">
                <div className="space-y-6">
                    <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">
                        ¿Quiénes somos?
                    </h2>
                    <p className="text-gray-600 text-lg">
                        En <span className="text-teal-500 font-semibold">Sonrisa Digital</span>, transformamos vidas a través de sonrisas saludables con un equipo dedicado a tu bienestar.
                    </p>
                </div>

                <img
                    src="/logo.svg"
                    alt="About Us"
                    className="w-64 h-64 mx-auto md:mx-0 object-contain transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Valores */}
            <div className="container mx-auto px-4 grid gap-6 md:grid-cols-3">
                {values.map((item, i) => (
                    <div key={i} className="bg-white rounded-xl shadow p-6 text-center">
                        <div className="flex justify-between">
                            {item.icon}
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Staff Médico */}
            <div className="container mx-auto px-4 grid gap-10 md:grid-cols-2 items-center bg-gradient-to-r from-teal-500 to-blue-500 rounded-bl-3xl rounded-tr-4xl p-10 text-white shadow-lg">
                <img
                    src="/medico.jpg"
                    alt="Dr. Juan Pérez"
                    className="w-64 h-64 rounded-full object-cover mx-auto md:mx-0 shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-105"
                />
                <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-3xl font-bold">Dr. Juan Pérez</h3>
                    <p className="text-white text-lg leading-relaxed">
                        Especialista en odontología estética con más de 10 años de experiencia, el Dr. Pérez lidera nuestro equipo con pasión, dedicación y un enfoque humano, asegurando la mejor atención para cada paciente.
                    </p>
                    <p className="text-white font-medium opacity-80">Director Clínico - Sonrisa Digital</p>
                </div>
            </div>
        </section>
    );
}
