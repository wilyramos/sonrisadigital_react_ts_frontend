import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { getUsersWithPagination, searchUsers } from "@/api/AuthAPI"; // Asegúrate de que la ruta sea correcta
import { useState } from "react";
import AddPacienteModal from "./AddPacienteModal";
import PacientesList from "./PacientesList";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { UserListResponse } from "@/types/index"; // Asegúrate de que la ruta sea correcta

import { FaSearch } from "react-icons/fa";
import Heading from "../Heading";

export default function Pacientes() {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchPacienteResults, setSearchPacienteResults] = useState<UserListResponse | null>(null);

    // const [page, setPage] = useState(1);         
    const [limit,] = useState(5);

    const queryparams = new URLSearchParams(location.search);
    const pageParam = queryparams.get("page") || "1";
    const page = parseInt(pageParam, 10);

    const { data: pacientesData, isLoading, isError } = useQuery({
        queryKey: ["pacientes", pageParam, limit],
        queryFn: () => getUsersWithPagination(page, limit),
        retry: 1,
    });

    // mutation para obtener los pacientes por busqueda
    const searchMutation = useMutation({
        mutationFn: searchUsers,
        onError: (error) => {
            // console.log(error);
            toast.error(error.message || 'Error al buscar el paciente.');
        },
        onSuccess: (data) => {
            setSearchPacienteResults(data);
        },
    });


    const handleSearch = () => {
        if (searchTerm.trim()) {
        } else {
            toast.warn("Por favor, ingresa un término de búsqueda.");
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setSearchPacienteResults(null);
        } else {
            searchMutation.mutate(event.target.value.trim());
        }

    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchMutation.mutate(searchTerm.trim());
        }
    };

    // Lista de pacientes a mostrar
    const pacientesListShow = searchPacienteResults ? searchPacienteResults : pacientesData?.users;

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
                    <div className="flex justify-between items-center mb-8">
                        <Heading>Lista de Pacientes</Heading>
                        <button
                            type="button"
                            className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-700 transition duration-200 transform hover:scale-105 cursor-pointer"
                            onClick={() => {
                                navigate(location.pathname + `?newPaciente=true`);
                            }}
                        >
                            <FaPlus className="mr-2" size={16} />
                            Agregar Paciente
                        </button>
                    </div>

                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Buscar pacientes..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-3 bg-lime-500 text-white rounded-full shadow-md hover:bg-lime-600 transition duration-200 cursor-pointer"
                            onClick={() => handleSearch()}
                        >
                            <FaSearch />
                        </button>
                    </div>

                    <PacientesList
                        pacientes={pacientesListShow}
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
                <AddPacienteModal />
                
            </>
        );
}