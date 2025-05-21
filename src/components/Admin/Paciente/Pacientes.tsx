import { FaPlus, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";

import { getUsers } from "@/api/AuthAPI";
import AddPacienteModal from "./AddPacienteModal";
import PacientesList from "./PacientesList";
import Heading from "../Heading";
import Pagination from "@/components/ui/Pagination";

export default function Pacientes() {
    const navigate = useNavigate();
    const { search, pathname } = useLocation();

    const queryParams = new URLSearchParams(search);
    const page = parseInt(queryParams.get("page") || "1", 10);
    const query = queryParams.get("query") || "";

    const [searchTerm, setSearchTerm] = useState(query);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["pacientes", page, 10, query],
        queryFn: () => getUsers(page, 10, query),
        retry: 1,
    });

    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    const handleSearch = () => {
        if (!searchTerm.trim()) return navigate(`?page=1`);
        navigate(`?page=1&query=${encodeURIComponent(searchTerm.trim())}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <>
            <div className="min-h-screen px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <Heading>Lista de Pacientes</Heading>
                    <button
                        onClick={() => navigate(`${pathname}?newPaciente=true`)}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                    >
                        <FaPlus size={16} />
                        Agregar
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar pacientes..."
                        className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-lime-500 text-white p-2 rounded-full hover:bg-lime-600 transition"
                    >
                        <FaSearch />
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <ClipLoader color="#36d7b7" size={50} />
                    </div>
                ) : isError ? (
                    <p className="text-center text-red-500 mt-6">Error al cargar pacientes.</p>
                ) : !data || data.users.length === 0 ? (
                    <p className="text-center text-gray-500 mt-6">No hay pacientes disponibles.</p>
                ) : (
                    <>
                        <PacientesList pacientes={data.users} />
                        <Pagination
                            currentPage={page}
                            totalPages={data.totalPages}
                            onPageChange={(newPage) =>
                                navigate(`?page=${newPage}&query=${encodeURIComponent(searchTerm)}`)
                            }
                        />
                    </>
                )}
            </div>
            <AddPacienteModal />
        </>
    );
}
