
import { FaPlus} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddMedicModal from "./AddMedicModal";
import { useQuery } from "@tanstack/react-query";
import { getMedics } from "@/api/MedicAPI";
import MedicsList from "./Medic/MedicsList";
import ClipLoader from "react-spinners/ClipLoader";

export default function Medicos() {

    const navigate = useNavigate()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['medicos'],
        queryFn: () => getMedics(),
        retry: 1,
    })

    if (isLoading) return <div className="text-center">
        <ClipLoader color="#10b981" size={40} />

    </div>;
    if (isError) return <div className="text-center">Error al cargar los médicos</div>;

    return (
        <>

            <div className="">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-semibold text-gray-800">
                            Gestión de Odontólogos
                        </h1>
                        <button
                            type="button"
                            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition duration-150 cursor-pointer"
                            onClick={() => navigate(location.pathname + `?newMedic=true`)}
                        >
                            <FaPlus className="mr-2" />
                            Agregar Odontólogo
                        </button>
                    </div>

                    

                    <MedicsList medics={data} />

                    
                </div>
            </div>


            <AddMedicModal />
        </>
    );
}