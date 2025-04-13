import { useQuery } from "@tanstack/react-query";
import { getAppointmentByDate } from "@/api/CitaAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { FiCalendar, FiClock, FiUser, FiUserCheck } from "react-icons/fi";
import {  getTodayDate, obtenerHora } from "@/utils/formatDate";


export default function CitasFiltering() {
    // const navigate = useNavigate();

    const initialDate = getTodayDate();
    // const [selectedDate, setSelectedDate] = useState(initialDate);
    const [selectedData, setSelectedData] = useState(initialDate);

    const { data: citasData, isLoading, isError } = useQuery({
        queryKey: ["citas", selectedData],
        queryFn: () => getAppointmentByDate(selectedData),
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
        <section className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 mb-10 grid grid-cols-1 md:grid-cols-4 gap-6 w-full mx-auto">
            {/* Filtros */}
            <aside className="md:col-span-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiCalendar className="text-lime-600" />
                    Filtrar Citas
                </h2>                <label htmlFor="dateInput" className="block text-sm font-medium text-gray-600 mb-1">
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
                <h1 className="text-2xl text-gray-500 mb-4">
                    {selectedData ? `Citas del ${selectedData}` : "Selecciona una fecha"}
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

                {/* Renderizado por hora */}

                {citasData && citasData.length > 0 && (
                    <div className="space-y-4 max-h-[800px] overflow-y-auto">
                        {hours.map((hour) => {
                            const citasEnHora = citasData.filter(
                                (cita) => obtenerHora(cita.date) === hour
                            );

                            return (
                                <div key={hour}>
                                    <div className="flex items-center gap-2 font-extrabold text-teal-600 mb-2 border-b border-gray-200 pb-1">
                                        <FiClock className="text-black" />
                                        {hour}
                                    </div>

                                    {citasEnHora.length > 0 ? (
                                        <div className="grid md:grid-cols-2 gap-2">
                                            {citasEnHora.map((cita) => (
                                                <div
                                                    key={cita.id}
                                                    className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
                                                >
                                                    <div className="flex items-center gap-4 mb-2">
                                                        <div className="h-10 w-10 rounded-full bg-lime-100 text-lime-600 flex items-center justify-center text-sm font-bold shadow-inner">
                                                            {cita.id}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-800">{cita.description}</p>
                                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                                <FiClock className="text-lime-500" />
                                                                {new Date(cita.date).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="text-sm text-gray-600 space-y-1">
                                                        <p className="flex items-center gap-2">
                                                            <FiUser className="text-gray-400" />
                                                            <span className="font-medium">Paciente:</span> {cita.patient.name}
                                                            <span className="text-xs text-gray-500 font-bold">({cita.patient.phone})</span>
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <FiUserCheck className="text-gray-400" />
                                                            <span className="font-medium">Médico:</span> {cita.medic.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic hidden">Sin citas en este horario</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}


            </div>
        </section>
    );
}
