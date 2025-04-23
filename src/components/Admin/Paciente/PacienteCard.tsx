import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import type { User } from "@/types/index";

type PacienteCardProps = {
    paciente: User;
    onEdit?: (paciente: User) => void;
    onDelete?: (id: number) => void;
};

export default function PacienteCard({ paciente, onEdit, onDelete }: PacienteCardProps) {
    return (
        <li className="bg-white rounded-md shadow-sm p-3 flex items-center gap-x-4">
            <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center text-sm font-medium">
                    {paciente.name.charAt(0).toUpperCase()}
                </div>
            </div>

            <div className="flex-1">
                <p className="text-sm font-medium">{paciente.name}</p>
                <p className="text-sm text-gray-500">{paciente.email}</p>
                {paciente.phone && <p className="text-sm text-gray-500">{paciente.phone}</p>}
            </div>

            <div className="ml-auto flex gap-x-2">
                {onEdit && (
                    <button
                        onClick={() => onEdit(paciente)}
                        className="text-sm text-blue-500 hover:text-blue-700"
                    >
                        <FaEdit className="inline-block mr-1" size={14} />
                    </button>
                )}
                {onDelete && (
                    <button
                        onClick={() => onDelete(paciente.id)}
                        className="text-sm text-red-500 hover:text-red-700"
                    >
                        <FaTrash className="inline-block mr-1" size={14} />
                    </button>
                )}
            </div>
        </li>
    );
}