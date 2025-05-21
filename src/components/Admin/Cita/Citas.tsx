import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { FaPlus, FaSearch } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { getCitasWithPagination } from "@/api/CitaAPI";

import Heading from "../Heading";
import CitasList from "./CitasList";
import AddCitaModal from "./AddCitaModal";
import CitaDetailsModal from "./CitaDetailsModal";
import DeleteCitaModal from "./DeleteCitaModal";
import Pagination from "@/components/ui/Pagination";

export default function Citas() {
    const navigate = useNavigate();
    const { search, pathname } = useLocation();

    const queryParams = new URLSearchParams(search);
    const page = parseInt(queryParams.get("page") || "1", 10);
    const query = queryParams.get("query") || "";

    const [searchTerm, setSearchTerm] = useState(query);

    const { data: citasData, isLoading, isError } = useQuery({
        queryKey: ["citas", page, 10, query],
        queryFn: () => getCitasWithPagination(page, 10, query),
        retry: 1,
    });

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            navigate(`?page=1`);
        }
        navigate(`?page=1&query=${encodeURIComponent(searchTerm.trim())}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") handleSearch();
    };



    if (isLoading)
        return <div className="text-center"><ClipLoader color="#10b981" size={40} /></div>;

    if (isError)
        return <div className="text-red-500 text-center">Error al cargar las citas.</div>;

    if (!citasData)
        return <p className="text-gray-500 text-center py-6">No hay citas programadas.</p>;

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <Heading>Lista de Citas</Heading>
                <button
                    onClick={() => navigate(`${pathname}?newCita=true`)}
                    className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-sm hover:bg-teal-600 transition"
                >
                    <FaPlus className="mr-2" /> Nueva Cita
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Buscar citas por paciente/descripcion/tratamiento..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-3 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-700"
                    onClick={handleSearch}
                >
                    <FaSearch />
                </button>
            </div>

            {/* Citas List */}
            <CitasList citas={citasData.appointments} />

            {/* Paginación */}
            <Pagination
                currentPage={page}
                totalPages={citasData.totalPages}
                onPageChange={(newPage) =>
                    navigate(`?page=${newPage}&query=${encodeURIComponent(searchTerm)}`)
                }
            />

            {/* Modals */}
            <AddCitaModal />
            <CitaDetailsModal />
            <DeleteCitaModal />
        </>
    );
}