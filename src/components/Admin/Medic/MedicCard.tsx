import { MdEmail, MdLocalPhone } from "react-icons/md";
import { FaTrash, FaUserDoctor } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import type { MedicList } from "@/types/index";

type MedicCardProps = {
    medic: MedicList[number];
};

export default function MedicCard({ medic }: MedicCardProps) {
    return (
        <li className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-100">

            {/* Avatar grande */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold shadow-inner">
                {medic.name.charAt(0).toUpperCase()}
            </div>

            {/* Info general */}
            <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">{medic.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaUserDoctor className="text-indigo-400" size={16} />
                    {medic.speciality}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                        <MdEmail className="text-gray-400" size={16} />
                        {medic.email}
                    </span>
                    <span className="flex items-center gap-2">
                        <MdLocalPhone className="text-gray-400" size={16} />
                        {medic.phone}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button
                    className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    title="Editar médico"
                >
                    <FaEdit size={16} />
                </button>
                <button
                    className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                    title="Eliminar médico"
                >
                    <FaTrash size={16} />
                </button>
            </div>
        </li>
    );
}
