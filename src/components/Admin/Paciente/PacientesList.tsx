import type { UserList } from "@/types/index";
import { Link } from "react-router-dom";
import { FiPhone, FiMail } from "react-icons/fi";

type PacientesListProps = {
    pacientes?: UserList;
};

export default function PacientesList({ pacientes }: PacientesListProps) {
    if (!pacientes || pacientes.length === 0) {
        return (
            <p className="text-gray-500 text-center py-6">
                No hay pacientes disponibles.
            </p>
        );
    }

    return (
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-600 text-gray-50 text-xs ">
                    <tr>
                        <th className="px-4 py-2 text-left">
                            Nombre
                        </th>
                        <th className="px-4 py-2 text-left">
                            <FiMail className="" size={14} />

                        </th>
                        <th className="px-4 py-2 text-left">
                            <FiPhone className="" size={14} />
                        </th>
                        <th className="px-4 py-2 text-left">
                            DNI
                        </th>
                        <th className="px-4 py-2 text-left">
                            Detalles
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {pacientes.map((paciente) => (
                        <tr
                            key={paciente.id}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                                {paciente.name}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    {paciente.email}
                                </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                                {paciente.phone ? (
                                    <div className="flex items-center gap-1">
                                        {paciente.phone}
                                    </div>
                                ) : (
                                    <span className="text-gray-400 italic">No disponible</span>
                                )}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                                {paciente.dni || "Sin DNI"}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                                <Link
                                    to={`/pacientes/${paciente.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Ver
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
