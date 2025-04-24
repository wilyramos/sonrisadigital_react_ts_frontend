import type { User } from "@/types/index";
import { FiPhone, FiMail } from "react-icons/fi";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

type PacienteCardProps = {
    paciente: User;
};

export default function PacienteCard({ paciente }: PacienteCardProps) {
    return (
        <Link
            to={`/pacientes/${paciente.id}`}
            className="block"
            title={`Ver detalles de ${paciente.name}`}
        >
        <li className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 hover:bg-gray-50 ">

            {/* Avatar */}
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold text-lg shadow-sm">
                {paciente.name.charAt(0).toUpperCase()}
            </div>

            {/* Info del paciente */}
            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-800 truncate flex items-center gap-1 ">
                    <HiUser className="text-indigo-400" />
                    {paciente.name}
                </h3>
                <div className="mt-1 text-sm text-gray-500 space-y-0.5">
                    <p className="flex items-center gap-2 truncate">
                        <FiMail className="text-gray-400" />
                        {paciente.email}
                    </p>
                    {paciente.phone && (
                        <p className="flex items-center gap-2 truncate">
                            <FiPhone className="text-gray-400" />
                            {paciente.phone}
                        </p>
                    )}
                </div>
            </div>            
        </li>
        </Link>
    );
}
