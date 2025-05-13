import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaFacebookF, FaInstagram, FaTooth } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-20">
            <div className="grid gap-10 md:grid-cols-4">

                {/* Marca */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-white text-2xl font-bold">
                        <FaTooth className="text-teal-500" />
                        <span>Sonrisa Digital</span>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Tu clínica dental en Cañete con tecnología avanzada y atención personalizada.
                        <span> Encuentranos en San Vicente de Cañete</span>
                    </p>
                </div>

                {/* Contacto */}
                <div className="space-y-3">
                    <h4 className="text-white text-lg font-semibold">Contacto</h4>
                    <a
                        href="https://www.google.com/maps/place/San+Vicente+de+Cañete,+Lima/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm gap-2 hover:text-blue-500 transition"
                    >
                        <FaMapMarkerAlt className="text-blue-500" /> Av. 2 de mayo 123, San Vicente de Cañete
                    </a>
                    <p className="flex items-center text-sm gap-2">
                        <FaPhoneAlt className="text-teal-500" /> (01) 6523265 / 988444654
                    </p>
                    <p className="flex items-center text-sm gap-2">
                        <FaClock className="text-green-500" /> Lun-Vie: 9:00-13h / 16-20h | Sáb: 9:00-14h
                    </p>
                </div>

                {/* Tratamientos */}
                <div>
                    <h4 className="text-white text-lg font-semibold mb-3">Tratamientos</h4>
                    <ul className="text-sm space-y-2">
                        <li>Implantes Dentales</li>
                        <li>Blanqueamiento</li>
                        <li>Limpieza Profesional</li>
                        <li>Ortodoncia Invisible</li>
                        <li>Endodoncia</li>
                        <li>Odontología Estética</li>
                    </ul>
                </div>

                {/* Redes Sociales */}
                <div>
                    <h4 className="text-white text-lg font-semibold mb-3">Síguenos</h4>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/SonrisaDigital" aria-label="Facebook" className="hover:text-blue-500 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebookF size={22} />
                        </a>
                        <a href="https://www.instagram.com/SonrisaDigital" aria-label="Instagram" className="hover:text-green-500 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram size={22} />
                        </a>
                    </div>
                </div>

            </div>

            {/* Footer inferior */}
            <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Sonrisa Digital. Todos los derechos reservados.
            </div>
        </footer>
    );
}
