import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import type { UserList } from "@/types/index";

type PacientesListProps = {
    pacientes: UserList;
};

export default function PacientesList({ pacientes }: PacientesListProps) {
    if (!pacientes || pacientes.length === 0) {
        return <p className="text-gray-500">No hay pacientes disponibles.</p>;
    }

    return (
        <ul className="space-y-1">
            {pacientes.map((paciente) => (
                <li
                    key={paciente.id}
                    className="bg-white rounded-md shadow-sm p-3 flex items-center gap-x-4"
                >

                    <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center text-sm font-medium">
                            {paciente.name.charAt(0).toUpperCase()}
                        </div>
                    </div>

                   
                    <div className="flex-1 ml-4">
                        <p className="text-sm font-medium">{paciente.name}</p>
                        <p className="text-sm text-gray-500">{paciente.email}</p>
                    </div>
                    <div className="flex-1 ml-4">
                        <p className="text-sm text-gray-500">{paciente.phone}</p>
                    </div>
                    
                    <button className="ml-auto text-sm text-blue-500 hover:text-blue-700">
                        <FaEdit className="inline-block mr-1" size={14} />
                    </button>
                    <button className="text-sm text-red-500 hover:text-red-700">
                        <FaTrash className="inline-block mr-1" size={14} />
                    </button>
                </li>
            ))}
        </ul>
    )
}
