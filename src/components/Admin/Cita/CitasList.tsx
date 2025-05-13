import { FaCalendarAlt, FaEye, FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { formatDateOnly, formatTimeOnly } from "@/utils/formatDate";
import type { CitaList } from "@/types/index";
import { useNavigate } from "react-router-dom";

type CitasListProps = {
    citas?: CitaList;
};

export default function CitasList({ citas }: CitasListProps) {
    const navigate = useNavigate();

    if (!citas || citas.length === 0) {
        return <p className="text-gray-500 text-center py-6">No hay citas programadas.</p>;
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full text-sm text-gray-700 hidden md:table">
                <thead className="bg-gray-200 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3 text-left font-medium">Paciente</th>
                        <th className="px-4 py-3 text-left font-medium">Contacto</th>
                        <th className="px-4 py-3 text-left font-medium">Fecha</th>
                        <th className="px-4 py-3 text-left font-medium">Estado</th>
                        <th className="px-4 py-3 text-left font-medium">Tratamiento</th>
                        <th className="px-4 py-3 text-left font-medium">Odontólogo</th>
                        <th className="px-4 py-3 text-center font-medium">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {citas.map((cita) => (
                        <tr key={cita.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full">
                                        <FaCalendarAlt size={12} />
                                    </div>
                                    <span>{cita.patient.name}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                <div>{cita.patient.email}</div>
                                <div className="text-xs">{cita.patient.phone}</div>
                            </td>
                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                {formatDateOnly(cita.date)}<br />
                                <span className="text-xs">{formatTimeOnly(cita.date)}</span>
                            </td>
                            <td className="px-4 py-3 capitalize text-gray-600 whitespace-nowrap">{cita.status}</td>
                            <td className="px-4 py-3 text-gray-500">{cita.description}</td>
                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">Dr. {cita.medic.name}</td>
                            <td className="px-4 py-3 text-center">
                                <div className="flex justify-center gap-3">
                                    <button
                                        title="Ver"
                                        onClick={() => navigate(`/citas?viewCita=${cita.id}`)}
                                        className="text-teal-600 hover:text-teal-800 transition"
                                    >
                                        <FaEye size={14} />
                                    </button>
                                    <button
                                        title="Editar"
                                        className="text-blue-500 hover:text-blue-700 transition"
                                    >
                                        <FaEdit size={14} />
                                    </button>
                                    <button
                                        title="Eliminar"
                                        onClick={() => navigate(location.pathname + `?deleteCita=${cita.id}`)}
                                        className="text-red-500 hover:text-red-700 transition"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Vista responsive (mobile) */}
            <div className="md:hidden">
                {citas.map((cita) => (
                    <div key={cita.id} className="border-b p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-6 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full">
                                <FaCalendarAlt size={12} />
                            </div>
                            <span className="font-medium">{cita.patient.name}</span>
                        </div>
                        <div className="text-gray-500 text-sm">
                            <div>{formatDateOnly(cita.date)} - {formatTimeOnly(cita.date)}</div>
                            <div className="capitalize">{cita.status}</div>
                        </div>
                        <div className="mt-2 flex justify-end gap-3">
                            <button
                                title="Ver"
                                onClick={() => navigate(`/citas?viewCita=${cita.id}`)}
                                className="text-teal-600 hover:text-teal-800 transition"
                            >
                                <FaEye size={14} />
                            </button>
                            <button title="Editar" className="text-blue-500 hover:text-blue-700 transition">
                                <FaEdit size={14} />
                            </button>
                            <button
                                title="Eliminar"
                                onClick={() => navigate(location.pathname + `?deleteCita=${cita.id}`)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                <FaTrash size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
