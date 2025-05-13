import { FaRegSmileBeam, FaHandsHelping, FaMedal } from "react-icons/fa";

export default function About() {
    const values = [
        {
            icon: <FaRegSmileBeam className="text-teal-500 text-4xl md:text-5xl mb-2 md:mb-4" />,
            title: "Compromiso",
            desc: "Atención personalizada y resultados excepcionales.",
        },
        {
            icon: <FaHandsHelping className="text-teal-500 text-4xl md:text-5xl mb-2 md:mb-4" />,
            title: "Confianza",
            desc: "Relaciones basadas en confianza y empatía.",
        },
        {
            icon: <FaMedal className="text-teal-500 text-4xl md:text-5xl mb-2 md:mb-4" />,
            title: "Excelencia",
            desc: "Tecnología y técnicas avanzadas para tu bienestar.",
        },
    ];

    return (
        <section className="space-y-8 py-10">
            {/* ¿Quiénes somos? */}
            <div className="container mx-auto px-4 grid gap-8 md:gap-12 md:grid-cols-2 items-center">
                <div className="space-y-4 md:space-y-6">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 leading-snug md:leading-tight">
                        ¿Quiénes somos?
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg">
                        En <span className="text-teal-500 font-semibold">Sonrisa Digital</span>, transformamos vidas a través de sonrisas saludables con un equipo dedicado a tu bienestar.
                    </p>
                </div>

                <img
                    src="/2.webp"
                    alt="About Us"
                    className="w-full h-64 md:h-80 rounded-lg object-cover shadow-lg transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Valores */}
            <div className="container mx-auto px-4 grid gap-4 md:gap-6 md:grid-cols-3">
                {values.map((item, i) => (
                    <div key={i} className="">
                        <div className="flex items-center justify-center gap-2 md:flex-col md:gap-0 md:justify-between">
                            {item.icon}
                            <h3 className="text-base md:text-lg font-semibold">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Staff Médico */}
            <div className="container mx-auto px-4 grid gap-8 md:gap-10 md:grid-cols-2 items-center bg-gradient-to-r from-teal-500 to-blue-500 rounded-bl-3xl rounded-tr-4xl p-6 md:p-10 text-white shadow-lg">
                <img
                    src="/medico.webp"
                    alt="Dr. Juan Pérez"
                    className="w-40 h-40 md:w-64 md:h-64 rounded-full object-cover mx-auto md:mx-0 shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-105"
                />
                <div className="space-y-3 md:space-y-4 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold">Dr. Juan Pérez</h3>
                    <p className="text-white text-base md:text-lg leading-relaxed">
                        Especialista en odontología estética con más de 10 años de experiencia, el Dr. Pérez lidera nuestro equipo con pasión, dedicación y un enfoque humano, asegurando la mejor atención para cada paciente.
                    </p>
                    <p className="text-white text-sm md:text-base font-medium opacity-80">Director Clínico - Sonrisa Digital</p>
                </div>
            </div>
        </section>
    );
}
