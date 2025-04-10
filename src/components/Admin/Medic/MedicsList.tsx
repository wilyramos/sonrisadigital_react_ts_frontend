import type { MedicList } from "@/types/index";
import { MdEmail, MdLocalPhone } from "react-icons/md";
import { FaTrash, FaUserDoctor } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

type MedicsListProps = {
    medics: MedicList;
};

export default function MedicsList({ medics }: MedicsListProps) {
    
    if (!medics || medics.length === 0) {
        return <p className="text-gray-500">No hay médicos disponibles.</p>;
    }

    return (
        <ul className="space-y-4">
            {medics.map((medic) => (
                <li
                    key={medic.id}
                    className="bg-white rounded-md shadow-sm p-3 flex items-center gap-x-4"
                >
                    <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center text-sm font-medium">
                            {medic.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div className="min-w-0 flex-grow">
                        <p className="text-sm font-semibold text-gray-900 truncate">{medic.name}</p>
                        <p className="text-xs text-gray-500 truncate flex items-center gap-x-1">
                            <FaUserDoctor className="text-gray-400" size={14} />
                            {medic.speciality}
                        </p>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-xs text-gray-500 flex items-center gap-x-1">
                            <MdEmail className="text-gray-400" size={14} />
                            {medic.email}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-x-1">
                            <MdLocalPhone className="text-gray-400" size={14} />
                            {medic.phone}
                        </p>
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
    );
}