
export default function Historia() {
    return (
        <section className="bg-white py-10 px-4">
            <div className="container mx-auto grid gap-8 md:grid-cols-2 items-center">
                {/* Imagen decorativa */}
                <div className="relative w-full h-64 md:h-96">
                    <img
                        src="/5 (2).webp"
                        alt="Nuestra Historia"
                        className="w-full h-full object-cover rounded-3xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-600/50 to-transparent rounded-3xl" />
                </div>

                {/* Texto de la historia */}
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                        Nuestra Historia
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        En <span className="text-teal-500 font-semibold">Clínica Dental Sonrisa Digital</span> nacimos con la misión de transformar la salud bucal en una experiencia cercana, humana y tecnológica.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Desde nuestros inicios, hemos combinado la pasión por el bienestar de nuestros pacientes con las técnicas más avanzadas en odontología estética y funcional, brindando atención personalizada y resultados excepcionales.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Nuestro compromiso es seguir creciendo contigo, ofreciendo siempre una sonrisa saludable y llena de confianza.
                    </p>
                </div>
            </div>
        </section>
    );
}
