import { useParams } from "react-router-dom";
import { getUserById } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import DeletePacienteModal from "./DeletePacienteModal";
import EditPacienteModal from "./EditPacienteModal";
import { getCitasByPatientId } from "@/api/CitaAPI";

export default function PacientesDetailsView() {
    // Get the patient ID from the URL parameters
    const params = useParams();
    const pacienteId = params.pacienteId!;
    const navigate = useNavigate()
    const location = useLocation();


    // Use query to fetch patient details
    const { data: pacienteData, isLoading, isError} = useQuery({
        queryKey: ["paciente", pacienteId],
        queryFn: () => getUserById(pacienteId),
        retry: 1,
    });


    // get apointment by patientId
    const { data: appointmentData, isLoading: isLoadingAppointment, isError: isErrorAppointment } = useQuery({
        queryKey: ["appointment", pacienteId],
        queryFn: () => getCitasByPatientId(pacienteId),
        retry: 1,
    });

    console.log(appointmentData);
    console.log(pacienteData);
    // console.log(isLoading);



    // Handle loading state
    if (isLoading || isLoadingAppointment) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <ClipLoader color="#000" size={50} />
            </div>
        );
    }

    // Handle error state
    if (isError || isErrorAppointment) {
        toast.error("Error al cargar los detalles del paciente.");
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-red-600">Error al cargar los detalles del paciente.</p>{" "}
            </div>
        );
    }

    // Ensure patient data exists before rendering details
    if (!pacienteData ) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p>No se encontraron datos para el paciente.</p>
            </div>
        );
    }

    return (

        <>

            <div className="p-4 max-w-6xl mx-auto">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                        Detalles del Paciente
                    </h1>

                    <div className="flex shrink-0 items-center gap-x-6">
                        <Menu as="div" className="relative flex-none">
                            <Menu.Button className=" text-gray-600 hover:text-gray-950 cursor:pointer">
                                <span className="sr-only">opciones</span>
                                <EllipsisVerticalIcon className="h-8 w-8 sm:h-9 sm:w-9" />
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 sm:w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    <Menu.Item>
                                        <button
                                            type="button"
                                            className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-300 hover:text-gray-900`}
                                            onClick={() => navigate(location.pathname + `?editPaciente=true`)}
                                        >
                                            <FaEdit className="w-4 h-4" /> Editar Paciente
                                        </button>
                                    </Menu.Item>

                                    <Menu.Item>
                                        <button
                                            type="button"
                                            className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-300 hover:text-gray-900`}
                                            onClick={() => navigate(location.pathname + `?deletePaciente=true`)}
                                        >
                                            <FaTrashAlt className="w-4 h-4" /> Eliminar Paciente
                                        </button>
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                        {pacienteData.name}
                    </h2>
                    <div className="space-y-3">
                        {" "}
                        {/* Spacing between detail lines */}
                        <p className="text-gray-600">
                            <strong className="font-medium text-gray-700">Email:</strong>{" "}
                            {pacienteData.email}
                        </p>
                        <p className="text-gray-600">
                            <strong className="font-medium text-gray-700">Teléfono:</strong>{" "}
                            {pacienteData.phone}
                        </p>

                    </div>

                    
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Citas</h3>
                        {appointmentData?(
                            <ul className="space-y-4">
                                {appointmentData.map((appointment) => (
                                    <li key={appointment.id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                                        <p className="text-gray-600">
                                            <strong className="font-medium text-gray-700">Descripción:</strong>{" "}
                                            {appointment.description}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong className="font-medium text-gray-700">Fecha:</strong>{" "}
                                            {new Date(appointment.date).toLocaleDateString()}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No hay citas disponibles para este paciente.</p>

                        )}
                    </div>
                </div>
            </div>
            <DeletePacienteModal />
            <EditPacienteModal />
        </>
    );
}