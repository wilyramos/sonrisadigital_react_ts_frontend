import { FaPlus, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { getUsers } from "@/api/AuthAPI"; 
import { useState, useEffect } from "react";
import AddPacienteModal from "./AddPacienteModal";
import PacientesList from "./PacientesList";
import Heading from "../Heading";
import { toast } from "react-toastify";
import Pagination from "@/components/ui/Pagination";

export default function Pacientes() {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState("");

    const queryparams = new URLSearchParams(location.search);
    const pageParam = queryparams.get("page") || "1";
    const page = parseInt(pageParam, 10);
    const query = queryparams.get("query") || "";
    const limit = 10; 
    // TODO: implementar la paginacion dinamica 

    // React Query
    const { data: pacientesData, isLoading, isError } = useQuery({
        queryKey: ["pacientes", page, limit, query],
        queryFn: () => getUsers(page, limit, query),
        retry: 1,
    });

    // Mantener el input sincronizado con la URL
    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`?page=1&query=${encodeURIComponent(searchTerm.trim())}`);
        } else {
            toast.warn("Por favor, ingresa un término de búsqueda.");
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#36d7b7" loading size={50} />
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500 text-center mt-4">Error al cargar pacientes.</div>;
    }

    if (!pacientesData) {
        return <div className="text-gray-500 text-center mt-4">No hay pacientes disponibles.</div>;
    }

    const pacientesListShow = pacientesData?.users || [];
    const totalPages = Math.ceil(pacientesData.total / limit);

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-8">
                    <Heading>Lista de Pacientes</Heading>
                    <button
                        type="button"
                        className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-700 transition duration-200 transform hover:scale-105 cursor-pointer"
                        onClick={() => navigate(location.pathname + `?newPaciente=true`)}
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-3 bg-lime-500 text-white rounded-full shadow-md hover:bg-lime-600 transition duration-200 cursor-pointer"
                        onClick={handleSearch}
                    >
                        <FaSearch />
                    </button>
                </div>

                <PacientesList pacientes={pacientesListShow} />

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => {
                        navigate(`?page=${newPage}&query=${encodeURIComponent(searchTerm)}`);
                    }}
                />
            </div>

            <AddPacienteModal />
        </>
    );
}
