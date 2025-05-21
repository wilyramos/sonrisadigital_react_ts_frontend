import { FaEye, FaEdit } from "react-icons/fa";
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
        return (
            <p className="text-gray-400 text-center py-6 text-sm">
                No hay citas programadas.
            </p>
        );
    }

    return (
        <div className="overflow-x-auto border rounded-xl border-gray-100">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="text-gray-50 uppercase text-xs bg-gray-800">
                    <tr>
                        <th className="p-2 text-left">Paciente</th>
                        <th className="p-2 text-left">Contacto</th>
                        <th className="p-2 text-left">Fecha</th>
                        <th className="p-2 text-left">Estado</th>
                        <th className="p-2 text-left">Tratamiento</th>
                        <th className="p-2 text-left">Odontólogo</th>
                        <th className="p-2 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {citas.map((cita) => (
                        <tr key={cita.id} className="hover:bg-gray-50">
                            <td className="px-2">{cita.patient.name}</td>
                            <td className="px-2 text-gray-500">
                                <div>{cita.patient.email}</div>
                                <div className="text-xs">{cita.patient.phone}</div>
                            </td>
                            <td className="px-2 text-gray-500">
                                {formatDateOnly(cita.date)}<br />
                                <span className="text-xs">{formatTimeOnly(cita.date)}</span>
                            </td>
                            <td className="p-2 capitalize text-gray-600 whitespace-nowrap">
                                {cita.status}
                            </td>
                            <td className="p-2 text-gray-500">{cita.description}</td>
                            <td className="px-2 text-gray-500">
                                Dr. {cita.medic.name}
                            </td>
                            <td className="px-4 py-2 text-center">
                                <div className="flex justify-center gap-2">
                                    <button
                                        title="Ver"
                                        onClick={() => navigate(`/citas?viewCita=${cita.id}`)}
                                        className="text-teal-600 hover:text-teal-800"
                                    >
                                        <FaEye size={14} />
                                    </button>
                                    <button
                                        title="Editar"
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit size={14} />
                                    </button>
                                    <button
                                        title="Eliminar"
                                        onClick={() => navigate(location.pathname + `?deleteCita=${cita.id}`)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
