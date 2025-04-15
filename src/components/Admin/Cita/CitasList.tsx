import { FaCalendarAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { formatDateOnly, formatTimeOnly } from '@/utils/formatDate';
import type { CitaList } from "@/types/index";

type CitasListProps = {
    citas: CitaList;
};

export default function CitasList({ citas }: CitasListProps) {
    if (!citas || citas.length === 0) {
        return <p className="text-gray-500">No hay citas programadas.</p>;
    }

    return (
        <ul className="space-y-1">
            {citas.map((cita) => (
                <li
                    key={cita.id}
                    className="bg-white rounded-3xl shadow-md p-3 flex items-center gap-x-4"
                >
                    <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center text-sm font-medium">
                            <FaCalendarAlt size={16} />
                        </div>
                    </div>

                    <div className="flex-1 ml-4">
                        <p className="text-sm font-medium">{cita.patient.name}</p>
                        <p className="text-sm text-gray-500">
                            {formatDateOnly(cita.date)} - {formatTimeOnly(cita.date)}
                        </p>
                    </div>
                    <div className="flex-1 ml-4">
                        <p className="text-sm text-gray-500">{cita.patient.email}</p>
                        <p className="text-sm text-gray-500">{cita.patient.phone}</p>
                    </div>

                    <div className="flex-1 ml-4">
                        <p className="text-sm text-gray-500">{cita.description}</p>
                    </div>

                    <div className="flex-1 ml-4">
                        <p className="text-sm text-gray-500">{cita.status}</p>
                    </div>

                    
                    <div className="flex-1 ml-4">
                        <p className="text-sm text-gray-500">Dr. {cita.medic.name}</p>
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