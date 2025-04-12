import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaSortDown, FaSortUp } from "react-icons/fa";
import AddCitaModal from "./AddCitaModal";
import { useQuery } from "@tanstack/react-query";
import { getCitas } from "@/api/CitaAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useMemo } from "react";



interface Cita {
    id: number;
    medicId: number;
    patientId: number;
    date: string;
    description: string;
    status: "pending" | "confirmed" | "cancelled" | string;
    medic: { name: string };
    patient: { name: string };
}

export default function Citas() {
    const navigate = useNavigate();
    const location = useLocation();

    const { data: citasData, isLoading, isError } = useQuery({
        queryKey: ["citas"],
        queryFn: () => getCitas(),
        retry: 1,
    });

    console.log(citasData);

    

    if (isLoading) return <div className="text-center"><ClipLoader color="#10b981" size={40} /></div>;
    if (isError) return <div className="text-red-500 text-center">Error al cargar las citas.</div>;

   
    return (
        <div className="p-6">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-800">Gestión de Citas</h1>
                    <button
                        onClick={() => navigate(location.pathname + `?newCita=true`)}
                        className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-150"
                    >
                        <FaPlus className="mr-2" /> Nueva Cita
                    </button>
                </div>

                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    
                    {citasData.map(cita => (
                        <div key={cita.id} className="p-4 border-b">
                            <h2 className="font-semibold">{cita.description}</h2>
                            <p>{cita.date}</p>
                            <p>{cita.status}</p>
                        </div>
                    ))}
                </div>  

               
            </div>
            <AddCitaModal />
        </div>
    );
}

