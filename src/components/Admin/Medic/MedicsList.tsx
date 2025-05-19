import type { MedicList } from "@/types/index";
import { Link } from "react-router-dom";

type MedicsListProps = {
    medics?: MedicList;
};

export default function MedicsList({ medics }: MedicsListProps) {
    if (!medics || medics.length === 0) {
        return <p className="text-gray-500 text-center mt-4">No hay médicos disponibles.</p>;
    }

    return (
        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left bg-white">
                <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider text-xs">
                    <tr>
                        <th className="px-4 py-3">Nombre</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Teléfono</th>
                        <th className="px-4 py-3">Especialidad</th>
                        <th className="px-4 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {medics.map((medic) => (
                        <tr key={medic.id} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3 text-gray-900">{medic.name}</td>
                            <td className="px-4 py-3 text-gray-600">{medic.email}</td>
                            <td className="px-4 py-3 text-gray-600">{medic.phone}</td>
                            <td className="px-4 py-3 text-gray-600">{medic.speciality}</td>
                            <td className="px-4 py-3">
                               <Link
                                    to={`/medicos/${medic.id}`}
                                    className="text-teal-500 hover:text-teal-700 transition"
                                >
                                    Ver Detalles
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
