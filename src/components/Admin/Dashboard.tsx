
import CitasFiltering from "./Cita/CitasFiltering";
// import { useQuery } from "@tanstack/react-query";
// import { getUsers } from "@/api/AuthAPI";
// import { getAppointmentsToday } from "@/api/CitaAPI"; // Necesitarías esta API
// import { getActiveTreatments } from "@/api/TratamientoAPI"; // Necesitarías esta API
// import { getMedics } from "@/api/MedicAPI";

export default function Dashboard() {
    // const { data: pacientesTotales } = useQuery({
    //     queryKey: ["pacientes"],
    //     queryFn: () => getUsers(),
    // });

    // const { data: citasHoy } = useQuery({
    //     queryKey: ["citasHoy"],
    //     queryFn: () => getAppointmentsToday(),
    // });

    // const { data: tratamientosActivos } = useQuery({
    //     queryKey: ["tratamientosActivos"],
    //     queryFn: () => getActiveTreatments(),
    // });

    // const { data: odontologosTotales } = useQuery({
    //     queryKey: ["odontologos"],
    //     queryFn: () => getMedics(),
    // });

    return (
        <div className="flex justify-center">
            <CitasFiltering />
        </div>
    );
}