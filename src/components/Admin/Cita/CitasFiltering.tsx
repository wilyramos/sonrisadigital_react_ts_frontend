import { useQuery } from "@tanstack/react-query";
import { getAppointmentsByDate } from "@/api/CitaAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { FiCalendar, FiClock, FiUser, FiUserCheck } from "react-icons/fi";
import { getTodayDate, obtenerHora } from "@/utils/formatDate";
import { Link } from "react-router-dom";
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { FaClock, FaEye, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import CitaDetailsModal from "./CitaDetailsModal";
import { statusTranslations } from "@/locales/es";
import { formatTimeOnly } from "@/utils/formatDate";


interface statusColors {
    [key: string]: string;
}

export default function CitasFiltering() {

    const statusColors: statusColors = {
        "pending": "bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg shadow-sm px-2 font-bold",
        "confirmed": "bg-green-50 text-green-700 border border-green-200 rounded-lg shadow-sm px-2 font-bold",
        "completed": "bg-blue-50 text-blue-700 border border-blue-200 rounded-lg shadow-sm px-2 font-bold",
        "cancelled": "bg-red-50 text-red-700 border border-red-200 rounded-lg shadow-sm px-2 font-bold",
    };

    const navigate = useNavigate();

    const initialDate = getTodayDate();
    // const [selectedDate, setSelectedDate] = useState(initialDate);
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
                                                        className=" grid grid-cols-4 gap-2 border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
                                                    >
                                                        <div className="col-span-3 flex items-center mb-2">
                                                            <Link to={`/citas/${cita.id}`}>
                                                                <div>
                                                                    <p className="inline items-center justify-center gap-2 text-gray-800 px-2 text-sm hover:text-lime-600">
                                                                        {cita.description && cita.description.length > 50
                                                                            ? `${cita.description.slice(0, 50)}...`
                                                                            : cita.description}
                                                                    </p>

                                                                </div>
                                                            </Link>
                                                        </div>

                                                        <div className="inline-flex items-center space-x-2 bg-gray-100 p-1 rounded-full shadow-sm">
                                                            <FaClock className="text-gray-500" />
                                                            <span className="text-xs font-medium text-gray-700">
                                                                {formatTimeOnly(cita.date)}
                                                            </span>
                                                        </div>

                                                        <div className="col-span-3 text-xs">
                                                            <p className="flex items-center gap-2">
                                                                <FiUser className="text-gray-400" />
                                                                <span className="font-medium">Paciente:</span> {cita.patient.name}
                                                                <span className="text-xs text-gray-500 font-bold">({cita.patient.phone})</span>
                                                            </p>
                                                            <p className="flex items-center gap-2">
                                                                <FiUserCheck className="text-gray-400" />
                                                                <span className="font-medium">Médico:</span> {cita.medic.name}
                                                            </p>
                                                            <p className="flex items-center gap-2">
                                                                <FiUserCheck className="text-gray-400" />
                                                                <span className="font-medium">Estado:</span>
                                                                <span className={statusColors[cita.status]}>{statusTranslations[cita.status]}</span>

                                                            </p>
                                                        </div>

                                                        


                                                        <div className="grid place-items-end">
                                                            <Menu as="div" className="relative flex-none">
                                                                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                                                    <span className="sr-only">opciones</span>
                                                                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                                                </Menu.Button>

                                                                <Transition as={Fragment}
                                                                    enter="transition ease-out duration-100"
                                                                    enterFrom="transform opacity-0 scale-95"
                                                                    enterTo="transform opacity-100 scale-100"
                                                                    leave="transition ease-in duration-75"
                                                                    leaveFrom="transform opacity-100 scale-100"
                                                                    leaveTo="transform opacity-0 scale-95"
                                                                >
                                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">


                                                                        <Menu.Item>
                                                                            <button
                                                                                onClick={() => navigate(`/dashboard?viewCita=${cita.id}`)}
                                                                                className='flex items-center gap-2 px-3 py-1 text-sm leading-6 text-gray-900'>
                                                                                <FaEye /> Ver detalles
                                                                            </button>
                                                                        </Menu.Item>

                                                                        {/* <Menu.Item>
                                                                        <Link to={`/}`}
                                                                            className='flex items-center gap-2 px-3 py-1 text-sm leading-6 text-gray-900'>
                                                                            <FaEdit /> Editar
                                                                        </Link>
                                                                    </Menu.Item> */}

                                                                        <Menu.Item>
                                                                            <Link to={`/}`}
                                                                                className='flex items-center gap-2 px-3 py-1 text-sm leading-6 text-gray-900'>
                                                                                <FaTrashAlt /> Eliminar
                                                                            </Link>
                                                                        </Menu.Item>
                                                                    </Menu.Items>
                                                                </Transition>
                                                            </Menu>
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

            <CitaDetailsModal />

        </>
    );
}
