import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AddCitaModal from "./AddCitaModal";

export default function Citas() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    // const newCita = queryParams.get("newCita");
    // const newMedic = queryParams.get("newMedic");
    // console.log(newMedic);
    // console.log(newCita);
    
    
    return (
        <>
            <div className="">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-semibold text-gray-800">
                            Gestión de Citas
                        </h1>
                        <button
                            type="button"
                            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition duration-150 cursor-pointer"
                            onClick={() => navigate(location.pathname + `?newCita=true`)}
                        >
                            <FaPlus className="mr-2" />
                            Agregar Cita
                        </button>
                    </div>



                    {/* <MedicsList medics={data} /> */}


                </div>
            </div>
            <AddCitaModal />
        </>
    )
}


