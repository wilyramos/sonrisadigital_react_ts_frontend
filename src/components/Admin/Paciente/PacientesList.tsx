import type { UserList } from "@/types/index";
import PacienteCard from "./PacienteCard"; // Asegúrate de que la ruta sea correcta

type PacientesListProps = {
    pacientes?: UserList;
};

export default function PacientesList({ pacientes }: PacientesListProps) {
    if (!pacientes || pacientes.length === 0) {
        return <p className="text-gray-500">No hay pacientes disponibles.</p>;
    }

    return (
        <ul className="space-y-1">
            {pacientes.map((paciente) => (
                <PacienteCard
                    key={paciente.id}
                    paciente={paciente}
                />
            ))}
        </ul>
    );
}