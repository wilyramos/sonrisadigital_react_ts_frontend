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
import { MdDescription, MdCalendarToday, MdCheckCircle, MdPending, MdCancel, MdPerson, MdPhone, MdEmail } from "react-icons/md";
import Heading from "../Heading";

export default function PacientesDetailsView() {
    // Get the patient ID from the URL parameters
    const params = useParams();
    const pacienteId = params.pacienteId!;
    const navigate = useNavigate()
    const location = useLocation();

    // Use query to fetch patient details
    const { data: pacienteData, isLoading, isError } = useQuery({
        queryKey: ["paciente", pacienteId],
        queryFn: () => getUserById(pacienteId),
        retry: 1,
    });

    // Get the patient data for editing
    const pacienteDataEdit = {
        name: pacienteData?.name ?? "",
        email: pacienteData?.email ?? "",
        phone: pacienteData?.phone!!,
        dni: pacienteData?.dni ?? "",
        
    };

    // get apointment by patientId
    const { data: appointmentData, isLoading: isLoadingAppointment, isError: isErrorAppointment } = useQuery({
        queryKey: ["appointment", pacienteId],
        queryFn: () => getCitasByPatientId(pacienteId),
        retry: 1,
    });


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
    if (!pacienteData) {
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
                    <Heading>Detalles del Paciente</Heading>

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
                     <div className="space-y-4">
                        <div className="flex items-center text-gray-700">
                            <MdEmail className="h-5 w-5 mr-3 text-indigo-500" />
                            <span className="font-semibold">Email:</span>
                            <span className="ml-2">{pacienteData.email}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <MdPhone className="h-5 w-5 mr-3 text-teal-500" />
                            <span className="font-semibold">Teléfono:</span>
                            <span className="ml-2">{pacienteData.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <MdPerson className="h-5 w-5 mr-3 text-purple-500" />
                            <span className="font-semibold">DNI:</span>
                            <span className="ml-2">{pacienteData.dni}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Citas del Paciente</h3>
                        {appointmentData && appointmentData.length > 0 ? (
                            <ul className="space-y-6">
                                {appointmentData.map((appointment) => (
                                    <li key={appointment.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                            <p className=" col-span-2 text-gray-700 flex items-center">
                                                <MdDescription className="h-5 w-5 text-blue-500 mr-2" />
                                                <span className="ml-2 font-bold">{appointment.description}</span>
                                            </p>
                                            <div className="space-y-2">

                                                <p className="text-gray-700 flex items-center">
                                                    <MdCalendarToday className="h-5 w-5 text-green-500 mr-2" /> {/* React Icon */}
                                                    <strong className="font-semibold text-gray-700">Fecha:</strong>{" "}
                                                    <span className="font-normal ml-2">{new Date(appointment.date).toLocaleDateString()}</span>
                                                </p>
                                                <p className={`text-gray-700 flex items-center ${appointment.status === 'Completed' ? 'text-green-600' : appointment.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                                                    {appointment.status === 'Completed' && <MdCheckCircle className="h-5 w-5 mr-2" />} {/* React Icon based on status */}
                                                    {appointment.status === 'Pending' && <MdPending className="h-5 w-5 mr-2" />} {/* React Icon based on status */}
                                                    {appointment.status === 'Cancelled' && <MdCancel className="h-5 w-5 mr-2" />} {/* React Icon based on status */}
                                                    <strong className="font-semibold text-gray-700">Estado:</strong>{" "}
                                                    <span className="font-normal ml-2">{appointment.status}</span>
                                                </p>
                                            </div>
                                            <div className="text-xs rounded-2xl shadow-2xl p-2 bg-gray-100 ">
                                                <p className="text-gray-700 flex items-center">
                                                    <MdPerson className="h-5 w-5 text-purple-500 mr-2" /> {/* React Icon */}
                                                    <strong className="font-semibold text-gray-700">Médico:</strong>{" "}
                                                    <span className="font-normal ml-2">{appointment.medic.name}</span>
                                                </p>
                                                <p className="text-gray-700 flex items-center">
                                                    <MdPhone className="h-5 w-5 text-teal-500 mr-2" /> {/* React Icon */}
                                                    <span className="font-normal ml-2">{appointment.medic.phone}</span>
                                                </p>
                                                <p className="text-gray-700 flex items-center">
                                                    <MdEmail className="h-5 w-5 text-indigo-500 mr-2" /> {/* React Icon */}
                                                    <span className="font-normal ml-2">{appointment.medic.email}</span>
                                                </p>
                                            </div>
                                        </div>
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
            <EditPacienteModal 
                data={pacienteDataEdit}
            />
        </>
    );
}