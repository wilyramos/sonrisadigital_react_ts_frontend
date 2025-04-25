import { useParams } from "react-router-dom";
import { getUserById } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";


export default function PacientesDetailsView() {

    // const queryparams = new URLSearchParams();
    const params = useParams()
    const pacienteId = params.pacienteId!
    console.log(pacienteId);
    
    // Use query to fetch patient details if needed
    const { data: pacienteData, isLoading, isError } = useQuery({


        queryKey: ["paciente", pacienteId],
        queryFn: () => getUserById(pacienteId),
        retry: 1,
    });

    
    console.log(pacienteData);
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ClipLoader color="#000" size={50} />
            </div>
        );
    }
    if (isError) {
        toast.error("Error al cargar los detalles del paciente.");
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Error al cargar los detalles del paciente.</p>
            </div>
        );
    }
    
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Detalles del Paciente</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">{pacienteData?.name}</h2>
                <p><strong>Email:</strong> {pacienteData?.email}</p>
                <p><strong>Teléfono:</strong> {pacienteData?.phone}</p>
                {/* Agrega más campos según sea necesario */}
            </div>
        </div>
    )
    
}
