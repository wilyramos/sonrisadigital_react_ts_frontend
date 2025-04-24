import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AddCitaModal from "./AddCitaModal";
import { useQuery } from "@tanstack/react-query";
import { getCitas } from "@/api/CitaAPI";
import ClipLoader from "react-spinners/ClipLoader";
import Calendar from "./Calendar";


export default function CitasCalendar() {
    const navigate = useNavigate();
    const location = useLocation();

    const { data: citasData, isLoading, isError } = useQuery({
        queryKey: ["citas"],
        queryFn: () => getCitas(),
        retry: 1,
    });

    
    if (isLoading) return <div className="text-center"><ClipLoader color="#10b981" size={40} /></div>;
    if (isError) return <div className="text-red-500 text-center">Error al cargar las citas.</div>;


    return (


        <>

            <div className="p-8 space-y-8">
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
                <Calendar />
                <div className="flex justify-center items-center mt-4">
                    <div className="text-gray-500 text-sm">Citas disponibles: {citasData?.length}</div>
                </div>
            </div>
            <AddCitaModal />
        </>
    );
}

