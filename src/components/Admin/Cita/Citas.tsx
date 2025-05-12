import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AddCitaModal from "./AddCitaModal";
import { useQuery } from "@tanstack/react-query";
import { getCitas } from "@/api/CitaAPI";
import ClipLoader from "react-spinners/ClipLoader";
import CitasList from "./CitasList";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { getCitasSearch } from "@/api/CitaAPI";
import type { CitaList } from "@/types/index";
import CitaDetailsModal from "./CitaDetailsModal";
import Heading from "../Heading";
import DeleteCitaModal from "./DeleteCitaModal";
export default function Citas() {

    // Search 
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCitaResults, setSearchCitaResults] = useState<CitaList | null>();


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {

        if (searchTerm.trim()) {

            console.log("Buscando citas por:", searchTerm);
            citasMutation.mutate(searchTerm.trim());
        } else {
            // Si no hay término de búsqueda, puedes mostrar un mensaje o realizar otra acción
            console.log("Por favor, ingresa un término de búsqueda.");
        }

    };

    //Mutation for get citas
    const citasMutation = useMutation({
        mutationFn: getCitasSearch,
        onError: (error) => {
            toast.error(error.message || 'Error al cargar las citas.');
        },
        onSuccess: (data) => {
            setSearchCitaResults(data);
        },
    })

    const navigate = useNavigate();
    const location = useLocation();

    const { data: citasData, isLoading, isError } = useQuery({
        queryKey: ["citas"],
        queryFn: () => getCitas(),
        retry: 1,
    });

    // Show list of citas
    const showcitasList = searchCitaResults ? searchCitaResults : citasData;

    if (isLoading) return <div className="text-center"><ClipLoader color="#10b981" size={40} /></div>;
    if (isError) return <div className="text-red-500 text-center">Error al cargar las citas.</div>;


    return (

        <>
            <div className="flex justify-between items-center mb-8">
                <Heading>Lista de Citas</Heading>
                <button
                    onClick={() => navigate(location.pathname + `?newCita=true`)}
                    className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-150"
                >
                    <FaPlus className="mr-2" /> Nueva Cita
                </button>
            </div>

            {/* Search */}

            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Buscar citas por paciente/descripcion/tratamiento..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-3 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-700 transition duration-200 cursor-pointer"
                    onClick={() => handleSearch()}
                >
                    <FaSearch />
                </button>
            </div>

            <div>
                <CitasList citas={showcitasList} />
            </div>
            <AddCitaModal />
            <CitaDetailsModal />
            <DeleteCitaModal />
        </>

    );
}

