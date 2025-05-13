import { useQuery } from "@tanstack/react-query";
import { getAppointmentsByDate } from "@/api/CitaAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { getTodayDate, obtenerHora } from "@/utils/formatDate";
import CitaDetailsModal from "./CitaDetailsModal";
import CitaCard from "./CitaCard";

interface StatusColors {
  [key: string]: string;
}

export default function CitasFiltering() {
  const statusColors: StatusColors = {
    pending: "bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg shadow-sm px-2 font-bold",
    confirmed: "bg-green-50 text-green-700 border border-green-200 rounded-lg shadow-sm px-2 font-bold",
    completed: "bg-blue-50 text-blue-700 border border-blue-200 rounded-lg shadow-sm px-2 font-bold",
    cancelled: "bg-red-50 text-red-700 border border-red-200 rounded-lg shadow-sm px-2 font-bold",
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
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  return (
    <>
      <section className="flex flex-col md:flex-row gap-6">
        {/* Filtro de fecha */}
        <aside className="md:w-1/4 bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FiCalendar className="text-lime-600" />
            Filtrar Citas
          </h2>
          <label htmlFor="dateInput" className="text-sm text-gray-600 mb-1 block">
            Selecciona una fecha:
          </label>
          <input
            type="date"
            id="dateInput"
            className="w-full text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            value={selectedData}
            onChange={handleDateChange}
          />
        </aside>

        {/* Listado de citas */}
        <div className="md:w-3/4 space-y-4">
          <h1 className="text-lg font-bold text-gray-800 border-b pb-2">
            {selectedData ? `Citas para el ${selectedData}` : "Selecciona una fecha"}
          </h1>

          {isLoading && (
            <div className="flex justify-center py-6">
              <ClipLoader color="#10b981" size={40} />
            </div>
          )}

          {isError && (
            <div className="text-center text-red-500 font-medium py-4">
              Error al cargar las citas.
            </div>
          )}

          {citasData && citasData.length === 0 && (
            <div className="text-center text-gray-500 font-medium py-4">
              No hay citas disponibles para esta fecha.
            </div>
          )}

          {citasData && citasData.length > 0 && (
            <div className="space-y-4">
              {hours.map((hour) => {
                const citasEnHora = citasData.filter(
                  (cita) => obtenerHora(cita.date) === hour
                );

                return (
                  <div key={hour}>
                    <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <FiClock className="text-gray-500" />
                      <span>{hour}</span>
                    </div>

                    {citasEnHora.length > 0 ? (
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                        {citasEnHora.map((cita) => (
                          <CitaCard key={cita.id} cita={cita} statusColors={statusColors} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">Sin citas en este horario.</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CitaDetailsModal />
    </>
  );
}
