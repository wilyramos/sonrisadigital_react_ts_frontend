import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { getUsersWithPagination } from "@/api/AuthAPI"; // Asegúrate de que la ruta sea correcta
import { useState } from "react";
import AddPacienteModal from "./AddPacienteModal";
import PacientesList from "./PacientesList";

export default function PacientesURL() {
    const navigate = useNavigate();
    const location = useLocation();

    //TODO: implementar el search de pacientes
    const [searchTerm, setSearchTerm] = useState("");
    // const [page, setPage] = useState(1);
    const [limit,] = useState(10);

    const queryparams = new URLSearchParams(location.search);
    const pageParam = queryparams.get("page") || "1";
    const page = parseInt(pageParam, 10);

    const { data: pacientesData, isLoading, isError } = useQuery({
        queryKey: ["pacientes", pageParam, limit],
        queryFn: () => getUsersWithPagination(page, limit),
        retry: 1,
    });

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#36d7b7" loading={isLoading} size={50} />
            </div>
        );

    if (isError)
        return <div className="text-red-500 text-center mt-4">Error al cargar pacientes.</div>;

    if (pacientesData)
        return (
            <>
                <div className="">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">
                                Gestión de Pacientes
                            </h1>
                            <button
                                type="button"
                                className="flex items-center px-3 py-2 bg-teal-500 text-white rounded-md shadow-sm hover:bg-teal-600 transition duration-150 cursor-pointer text-sm"
                                onClick={() => {
                                    navigate(location.pathname + `?newPaciente=true`);
                                }}
                            >
                                <FaPlus className="mr-2" size={16} />
                                Agregar Paciente
                            </button>
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Buscar por nombre o email..."
                                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <PacientesList
                            pacientes={pacientesData.users}
                        />

                        <div className="flex justify-between items-center mt-4">
                            <button
                                className="px-3 py-1 text-gray-700 rounded-md hover:bg-gray-200 transition duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onClick={() => {
                                    navigate(location.pathname + `?page=${page - 1}`);
                                }}
                                disabled={page === 1}
                            >
                                Anterior
                            </button>
                            <span className="text-gray-600 text-sm">
                                Página {page} de {Math.ceil(pacientesData.total / limit)}
                            </span>
                            <button
                                className="px-3 py-1 text-gray-700 rounded-md hover:bg-gray-200 transition duration-150 cursor-pointer focus:outline-none focus:ring-indigo-500"
                                onClick={() => {
                                    navigate(location.pathname + `?page=${page + 1}`);
                                }}
                                disabled={page === Math.ceil(pacientesData.total / limit) || pacientesData.total === 0}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
                <AddPacienteModal />
            </>
        );
}