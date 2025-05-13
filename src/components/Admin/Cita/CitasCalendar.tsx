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
            <div className="pt-4 pb-6 px-4 sm:px-6 lg:px-8 space-y-6">
                {/* Encabezado y acciones */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <Heading>Calendario de Citas</Heading>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                        <Link
                            to="/citas"
                            className="text-sm font-medium text-gray-600 hover:text-teal-600 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition"
                        >
                            Ver todas las citas
                        </Link>

                        <button
                            onClick={() => navigate(location.pathname + `?newCita=true`)}
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 transition focus:outline-none focus:ring-2 focus:ring-teal-300"
                        >
                            <FaPlus className="text-base" />
                            Nueva Cita
                        </button>
                    </div>
                </div>

                {/* Calendario */}
                <div className="">
                    <Calendar />
                </div>
            </div>

            {/* Modales */}
            <AddCitaModal />
            <CitaDetailsModal />
        </>
    );
}
