import type { User } from "@/types/index";
import { FiPhone, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

type PacienteCardProps = {
    paciente: User;
};

export default function PacienteCard({ paciente }: PacienteCardProps) {
    return (
        <Link
            to={`/pacientes/${paciente.id}`}
            className="block rounded-md border border-gray-200 p-3 transition hover:bg-gray-50 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none cursor-pointer"
            title={`Ver detalles de ${paciente.name}`}
        >
            <li className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                        {paciente.name}
                    </h3>
                    <div className="mt-0.5 text-sm text-gray-500 space-y-0.5">
                        <p className="flex items-center gap-1 truncate">
                            <FiMail className="text-gray-400" size={14} />
                            {paciente.email}
                        </p>
                        {paciente.phone && (
                            <p className="flex items-center gap-1 truncate">
                                <FiPhone className="text-gray-400" size={14} />
                                {paciente.phone}
                            </p>
                        )}
                    </div>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                    {paciente.dni ? `DNI: ${paciente.dni}` : "Sin DNI"}
                </div>
            </li>
        </Link>
    );
}
