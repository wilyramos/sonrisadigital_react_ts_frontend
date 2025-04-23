import type { MedicList } from "@/types/index";
import MedicCard from "./MedicCard"; // Importa el nuevo componente MedicCard

type MedicsListProps = {
    medics: MedicList;
};

export default function MedicsList({ medics }: MedicsListProps) {
    if (!medics || medics.length === 0) {
        return <p className="text-gray-500">No hay médicos disponibles.</p>;
    }

    return (
        <ul className="space-y-2">
            {medics.map((medic) => (
                <MedicCard key={medic.id} medic={medic} />
            ))}
        </ul>
    );
}