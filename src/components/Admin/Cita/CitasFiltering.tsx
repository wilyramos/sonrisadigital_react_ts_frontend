import { useQuery } from "@tanstack/react-query";
import { getAppointmentsByDate } from "@/api/CitaAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { getTodayDate, obtenerHora } from "@/utils/formatDate";
import CitaDetailsModal from "./CitaDetailsModal";
import CitaCard from "./CitaCard"; // Importa el nuevo componente

interface StatusColors {
    [key: string]: string;
}

export default function CitasFiltering() {
    const statusColors: StatusColors = {
        "pending": "bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg shadow-sm px-2 font-bold",
        "confirmed": "bg-green-50 text-green-700 border border-green-200 rounded-lg shadow-sm px-2 font-bold",
        "completed": "bg-blue-50 text-blue-700 border border-blue-200 rounded-lg shadow-sm px-2 font-bold",
        "cancelled": "bg-red-50 text-red-700 border border-red-200 rounded-lg shadow-sm px-2 font-bold",
    };

    const initialDate = getTodayDate();
    const [selectedData, setSelectedData] = useState(initialDate);

    const { data: citasData, isLoading, isError } = useQuery({
        queryKey: ["citas", selectedData],
        queryFn: () => getAppointmentsByDate(selectedData),
        enabled: !!selectedData,
    });

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedData(e.target.value);
    };

    const hours = Array.from({ length: 13 }, (_, i) => {
        const hour = i + 8;
        return `${hour.toString().padStart(2, '0')}:00`;
    });

    return (
        <>
            <div className=""> 
                <section className="w-full container grid grid-cols-1 md:grid-cols-4 gap-2shadow-xl rounded-xl border border-gray-200 gap-2">
                    {/* Filtros */}
                    <aside className="md:col-span-1 border-r-2 border-gray-300 p-2">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FiCalendar className="text-lime-600" />
                            Filtrar Citas
                        </h2>
                        <label htmlFor="dateInput" className="block text-sm font-medium text-gray-600 mb-1">
                            Selecciona una fecha:
                        </label>
                        <input
                            type="date"
                            id="dateInput"
                            className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
                            onChange={handleDateChange}
                        />
                    </aside>

                    <div className="md:col-span-3">
                        <h1 className="text-xl font-bold text-gray-800 mb-4 text-end pt-2 border-b-2 border-gray-300">
                            {selectedData ? `Citas para el ${selectedData}` : "Selecciona una fecha"}
                        </h1>

                        {isLoading && (
                            <div className="flex justify-center py-6">
                                <ClipLoader color="#10b981" size={40} />
                            </div>
                        )}

                        {isError && (
                            <div className="text-red-500 text-center font-medium py-4">
                                Error al cargar las citas.
                            </div>
                        )}

                        {citasData && citasData.length === 0 && (
                            <div className="text-center text-gray-500 font-medium py-4">
                                No hay citas disponibles para esta fecha.
                            </div>
                        )}

                        {citasData && citasData.length > 0 && (
                            <div className="">
                                {hours.map((hour) => {
                                    const citasEnHora = citasData.filter(
                                        (cita) => obtenerHora(cita.date) === hour
                                    );

                                    return (
                                        <div key={hour}>
                                            <div className="flex gap-2 font-bold text-gray-700 border-b border-gray-100 pb-1 items-center text-center">
                                                <FiClock className="text-gray-500" />
                                                <span>{hour}</span>
                                            </div>

                                            {citasEnHora.length > 0 ? (
                                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2"> {/* Modificamos las columnas */}
                                                    {citasEnHora.map((cita) => (
                                                        <CitaCard key={cita.id} cita={cita} statusColors={statusColors} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-400 italic text-xs">Sin citas en este horario.</p> 
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <CitaDetailsModal />
        </>
    );
}