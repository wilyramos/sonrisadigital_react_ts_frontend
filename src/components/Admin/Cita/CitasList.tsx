import React, { useState, useMemo, useCallback } from 'react';
import type { CitaList } from "@/types/index";
import { formatDateOnly, formatTimeOnly } from '@/utils/formatDate';
import {
    FaFilter,
    FaTimes,
    FaCalendarAlt,
    FaClock,
    FaFileAlt,
    FaUserMd,
    FaCircle,
    FaUserFriends
} from 'react-icons/fa';

type CitasListProps = {
    citas: CitaList;
};

interface FilterOptions {
    status: string;
    medicName: string;
    patientName: string;
    dateOrder: 'asc' | 'desc' | '';
}

export default function CitasList({ citas }: CitasListProps) {
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        status: '',
        medicName: '',
        patientName: '',
        dateOrder: '',
    });

    const filteredCitas = useMemo(() => {
        return citas
            .filter(cita => {
                const statusMatch = !filterOptions.status || cita.status === filterOptions.status;
                const medicNameMatch = !filterOptions.medicName || cita.medic.name.toLowerCase().includes(filterOptions.medicName.toLowerCase());
                const patientNameMatch = !filterOptions.patientName || cita.patient.name.toLowerCase().includes(filterOptions.patientName.toLowerCase());
                return statusMatch && medicNameMatch && patientNameMatch;
            })
            .sort((a, b) => {
                if (filterOptions.dateOrder === 'asc') {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                } else if (filterOptions.dateOrder === 'desc') {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                }
                return 0;
            });
    }, [filterOptions, citas]);

    const handleFilterChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = event.target;
            setFilterOptions(prevOptions => ({
                ...prevOptions,
                [name]: value,
            }));
        },
        [setFilterOptions]
    );

    const handleClearFilters = useCallback(() => {
        setFilterOptions({
            status: '',
            medicName: '',
            patientName: '',
            dateOrder: '',
        });
    }, [setFilterOptions]);

    return (
        <div className="p-4 rounded-md shadow-md bg-white">
            <div className="mb-6 p-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                    <FaFilter className="mr-2 text-gray-500" /> Filtrar Citas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="status" className="block text-gray-700 text-sm font-medium mb-2">
                            Estado:
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={filterOptions.status}
                            onChange={handleFilterChange}
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
                        >
                            <option value="">Todos</option>
                            <option value="pending" className="text-yellow-500">Pendiente</option>
                            <option value="confirmed" className="text-green-500">Confirmada</option>
                            <option value="cancelled" className="text-red-500">Cancelada</option>
                            <option value="completed" className="text-blue-500">Completada</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="medicName" className="block text-gray-700 text-sm font-medium mb-2">
                            Médico:
                        </label>
                        <input
                            type="text"
                            id="medicName"
                            name="medicName"
                            value={filterOptions.medicName}
                            onChange={handleFilterChange}
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
                            placeholder="Buscar médico"
                        />
                    </div>
                    <div>
                        <label htmlFor="patientName" className="block text-gray-700 text-sm font-medium mb-2">
                            Paciente:
                        </label>
                        <input
                            type="text"
                            id="patientName"
                            name="patientName"
                            value={filterOptions.patientName}
                            onChange={handleFilterChange}
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
                            placeholder="Buscar paciente"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="dateOrder" className="block text-gray-700 text-sm font-medium mr-2">
                            Ordenar por Fecha:
                        </label>
                        <select
                            id="dateOrder"
                            name="dateOrder"
                            value={filterOptions.dateOrder}
                            onChange={handleFilterChange}
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md p-1"
                        >
                            <option value="">Sin ordenar</option>
                            <option value="asc">
                                Más antigua primero
                            </option>
                            <option value="desc" className="text-gray-700">
                                Más reciente primero
                            </option>
                        </select>
                        {Object.values(filterOptions).some(value => value !== '') && (
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="ml-3 py-2 px-3 text-sm font-medium rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                <FaTimes className="mr-1 inline-block" /> Limpiar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Lista de Citas</h3>
            {filteredCitas.length === 0 ? (
                <p className="text-gray-600">No se encontraron citas con los filtros aplicados.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal border-collapse rounded-md shadow-sm">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm font-medium border-b border-gray-200">
                                <th className="px-4 py-3 text-left">ID</th>
                                <th className="px-4 py-3 text-left"><FaCalendarAlt className="inline-block mr-1" /> Fecha</th>
                                <th className="px-4 py-3 text-left"><FaClock className="inline-block mr-1" /> Hora</th>
                                <th className="px-4 py-3 text-left"><FaFileAlt className="inline-block mr-1" /> Descripción</th>
                                <th className="px-4 py-3 text-left"><FaCircle className="inline-block mr-1" /> Estado</th>
                                <th className="px-4 py-3 text-left"><FaUserMd className="inline-block mr-1" /> Médico</th>
                                <th className="px-4 py-3 text-left"><FaUserFriends className="inline-block mr-1" /> Paciente</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {filteredCitas.map(cita => (
                                <tr key={cita.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-3">{cita.id}</td>
                                    <td className="px-4 py-3">{formatDateOnly(cita.date)}</td>
                                    <td className="px-4 py-3">{formatTimeOnly(cita.date)}</td>
                                    <td className="px-4 py-3">{cita.description}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                            cita.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            cita.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                            cita.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                            cita.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                            <FaCircle className="mr-1" size={10} />
                                            {cita.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{cita.medic.name}</td>
                                    <td className="px-4 py-3">{cita.patient.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}