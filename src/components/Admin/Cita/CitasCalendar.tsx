import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AddCitaModal from "./AddCitaModal";
import Calendar from "./Calendar";
import CitaDetailsModal from "./CitaDetailsModal";


export default function CitasCalendar() {
    const navigate = useNavigate();
    const location = useLocation();



    return (
        <>
            <div className="p-2 space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">Calendario de Citas</h1>
                    <Link to="/citas" className="text-gray-500 hover:text-gray-700 transition duration-150">
                        <span className="text-sm">Ver listado de citas</span>
                    </Link>
                    <button
                        onClick={() => navigate(location.pathname + `?newCita=true`)}
                        className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-150"
                    >
                        <FaPlus className="mr-2" /> Nueva Cita
                    </button>
                </div>
                <Calendar 
                    
                />
                
            </div>
            <AddCitaModal />
            <CitaDetailsModal />
        </>
    );
}

