import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AddCitaModal from "./AddCitaModal";
import { useQuery } from "@tanstack/react-query";
import { getCitas } from "@/api/CitaAPI";
import ClipLoader from "react-spinners/ClipLoader";
import CitasList from "./CitasList";


export default function Citas() {
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
        <div className="p-1">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl font-semibold text-lime-500">Gestión de Citas</h1>
                    <button
                        onClick={() => navigate(location.pathname + `?newCita=true`)}
                        className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-150"
                    >
                        <FaPlus className="mr-2" /> Nueva Cita
                    </button>
                </div>

                {citasData && citasData.length === 0 && (
                    <div className="text-center text-gray-500">No hay citas disponibles.</div>
                )}
                {citasData && citasData.length > 0 && (

                    <CitasList 
                        citas={citasData}
                    />
                )}

               
                {citasData && citasData.length > 0 && (
                    <div className="text-center text-gray-500">Total de citas: {citasData.length}</div>
                )}
            </div>
            <AddCitaModal />
        </div>
    );
}

