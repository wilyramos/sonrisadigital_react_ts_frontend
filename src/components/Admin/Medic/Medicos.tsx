import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddMedicModal from "./AddMedicModal";
import { useQuery } from "@tanstack/react-query";
import { getMedics, searchMedics } from "@/api/MedicAPI";
import MedicsList from "./MedicsList";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import { useState } from "react"; // Importa useState
import { useMutation } from "@tanstack/react-query";
import type { MedicListArrayResponse } from "@/types/index";
import Heading from "../Heading";

export default function Medicos() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchMedicResults, setSearchMedicResults] = useState<MedicListArrayResponse | null>()
    const { data: allMedics, isLoading, isError } = useQuery({
        queryKey: ['medicos'],
        queryFn: () => getMedics(),
        retry: 1,
    });

    // mutation para obtener los médicos buscados
    const medicMutation = useMutation({
        mutationFn: searchMedics,
        onError: (error) => {
            // console.log(error);
            toast.error(error.message || 'Error al buscar el médico.');
        },
        onSuccess: (data) => {
            setSearchMedicResults(data);
        },
    });


    const handleSearch = () => {
        if (searchTerm.trim()) {
            medicMutation.mutate(searchTerm.trim());
        } else {
            toast.warn("Por favor, ingresa un término de búsqueda.");
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setSearchMedicResults(null);
        }
        
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    if (isLoading) return (
        <div className="flex items-center justify-center h-full">
            <ClipLoader />
        </div>
    );

    // Lista de medicos a mostrar
    const medicListShow = searchMedicResults ? searchMedicResults : allMedics

    if (isError) return <div className="text-center">Error al cargar los médicos</div>;

    return (
        <>
            <div className="">
                <div className="flex justify-between items-center mb-8">
                    <Heading>Lista de Médicos</Heading>
                    <button
                        type="button"
                        className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-700 transition duration-200 transform hover:scale-105 cursor-pointer"
                        onClick={() => navigate(location.pathname + `?newMedic=true`)}
                    >
                        <FaPlus className="mr-2" />
                        Nuevo médico
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Buscar médicos..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                        value={searchTerm} // Asocia el valor del input al estado
                        onChange={handleInputChange} // Maneja los cambios en el input
                        onKeyDown={handleKeyDown} // Maneja la presión de teclas
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-3 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-700 transition duration-200 cursor-pointer"
                        onClick={() => handleSearch()}
                    >
                        <FaSearch />
                    </button>
                </div>

                <MedicsList medics={medicListShow} />
            </div>
            <AddMedicModal />
        </>
    );
}