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
    const params = useParams();
    const pacienteId = params.pacienteId!;
    const navigate = useNavigate();
    const location = useLocation();

    const { data: pacienteData, isLoading, isError } = useQuery({
        queryKey: ["paciente", pacienteId],
        queryFn: () => getUserById(pacienteId),
        retry: 1,
    });

    const pacienteDataEdit = {
        name: pacienteData?.name ?? "",
        email: pacienteData?.email ?? "",
        phone: pacienteData?.phone!!,
        dni: pacienteData?.dni ?? "",
    };

    const { data: appointmentData, isLoading: isLoadingAppointment, isError: isErrorAppointment } = useQuery({
        queryKey: ["appointment", pacienteId],
        queryFn: () => getCitasByPatientId(pacienteId),
        retry: 1,
    });

    if (isLoading || isLoadingAppointment) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <ClipLoader color="#000" size={50} />
            </div>
        );
    }

    if (isError || isErrorAppointment) {
        toast.error("Error al cargar los detalles del paciente.");
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-red-600">Error al cargar los detalles del paciente.</p>
            </div>
        );
    }

    if (!pacienteData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p>No se encontraron datos para el paciente.</p>
            </div>
        );
    }

    return (
        <>
            <div className="p-6 max-w-3xl mx-auto space-y-8 bg-white shadow-lg rounded-lg">
                <div className="flex justify-between items-center">
                    <Heading>Historial Médico - {pacienteData.name}</Heading>

                    <Menu as="div" className="relative">
                        <Menu.Button className="text-gray-600 hover:text-gray-950 cursor-pointer">
                            <EllipsisVerticalIcon className="h-7 w-7" />
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
                            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                <Menu.Item>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-200"
                                        onClick={() => navigate(location.pathname + `?editPaciente=true`)}
                                    >
                                        <FaEdit className="w-4 h-4" /> Editar
                                    </button>
                                </Menu.Item>
                                <Menu.Item>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-200"
                                        onClick={() => navigate(location.pathname + `?deletePaciente=true`)}
                                    >
                                        <FaTrashAlt className="w-4 h-4" /> Eliminar
                                    </button>
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col space-y-3">
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

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700">Citas Médicas</h3>
                        {appointmentData && appointmentData.length > 0 ? (
                            <ul className="space-y-4">
                                {appointmentData.map((appointment) => (
                                    <li key={appointment.id} className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-lg">
                                        <div className="space-y-3">
                                            <div className="flex items-center text-gray-700">
                                                <MdDescription className="h-5 w-5 text-blue-500 mr-2" />
                                                <span className="font-semibold">Descripción:</span>
                                                <span className="ml-2">{appointment.description}</span>
                                            </div>
                                            <div className="flex items-center text-gray-700">
                                                <MdCalendarToday className="h-5 w-5 text-green-500 mr-2" />
                                                <span className="font-semibold">Fecha:</span>
                                                <span className="ml-2">{new Date(appointment.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className={`flex items-center text-sm ${appointment.status === 'Completed' ? 'text-green-600' : appointment.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {appointment.status === 'Completed' && <MdCheckCircle className="h-5 w-5 mr-2" />}
                                                {appointment.status === 'Pending' && <MdPending className="h-5 w-5 mr-2" />}
                                                {appointment.status === 'Cancelled' && <MdCancel className="h-5 w-5 mr-2" />}
                                                <span>{appointment.status}</span>
                                            </div>
                                            <div className="text-xs rounded-2xl bg-gray-100 p-3 mt-2">
                                                <p className="flex items-center text-gray-700">
                                                    <MdPerson className="h-5 w-5 text-purple-500 mr-2" />
                                                    <strong>Médico:</strong>
                                                    <span className="ml-2">{appointment.medic.name}</span>
                                                </p>
                                                <p className="flex items-center text-gray-700">
                                                    <MdPhone className="h-5 w-5 text-teal-500 mr-2" />
                                                    <span className="ml-2">{appointment.medic.phone}</span>
                                                </p>
                                                <p className="flex items-center text-gray-700">
                                                    <MdEmail className="h-5 w-5 text-indigo-500 mr-2" />
                                                    <span className="ml-2">{appointment.medic.email}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No hay citas disponibles.</p>
                        )}
                    </div>
                </div>
            </div>

            <DeletePacienteModal />
            <EditPacienteModal data={pacienteDataEdit} />
        </>
    );
}
