import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AddCitaModal from "./AddCitaModal";
import Calendar from "./Calendar";
import CitaDetailsModal from "./CitaDetailsModal";
import Heading from "../Heading";


export default function CitasCalendar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            {/* Contenedor principal con padding mejorado y sombra sutil */}
            <div className="">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <Heading>Calendario de Citas</Heading>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/citas"
                            className="text-sm font-medium text-gray-500 hover:text-teal-600 transition-colors bg-teal-600/10 hover:bg-teal-600/20 px-4 py-2 rounded-lg shadow-md"
                        >
                            Ver todas las citas
                        </Link>

                        <button
                            onClick={() => navigate(location.pathname + `?newCita=true`)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-semibold shadow-md hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
                        >
                            <FaPlus className="text-base" />
                            Nueva Cita
                        </button>
                    </div>
                </div>

                <Calendar />
            </div>

            {/* Modales (no se modifican aquí, asumiendo que tienen su propio diseño) */}
            <AddCitaModal />
            <CitaDetailsModal />
        </>
    );
}