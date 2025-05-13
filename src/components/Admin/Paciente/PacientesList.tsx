import type { UserList } from "@/types/index";
import PacienteCard from "./PacienteCard";

type PacientesListProps = {
  pacientes?: UserList;
};

export default function PacientesList({ pacientes }: PacientesListProps) {
  if (!pacientes || pacientes.length === 0) {
    return <p className="text-gray-500 text-center py-6">No hay pacientes disponibles.</p>;
  }

  return (
    <div className="space-y-3">
      {pacientes.map((paciente) => (
        <PacienteCard key={paciente.id} paciente={paciente} />
      ))}
    </div>
  );
}
