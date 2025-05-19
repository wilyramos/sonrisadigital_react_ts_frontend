import { useNavigate, useParams } from "react-router-dom";
import { getMedicById } from "@/api/MedicAPI";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { FaEdit, FaTrashAlt, FaUserAstronaut, FaBriefcase } from "react-icons/fa";
import Heading from "../Heading";
import DeleteMedicModal from "./DeleteMedicModal";
import EditMedicModal from "./EditMedicModal";

export default function MedicDetailsView() {
    const params = useParams();
    const medicId = params.medicId!;
    const navigate = useNavigate();

    const { data: medicData, isLoading, isError } = useQuery({
        queryKey: ["medic", medicId],
        queryFn: () => getMedicById(medicId),
        retry: 1,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#4f46e5" size={50} />
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Error al cargar los detalles del médico.</p>
            </div>
        );
    }

    return (
        <>
            <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <Heading>Detalles del Médico</Heading>
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
                                        onClick={() => navigate(location.pathname + `?editMedic=true`)}
                                    >
                                        <FaEdit className="w-4 h-4" /> Editar
                                    </button>
                                </Menu.Item>
                                <Menu.Item>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-200"
                                        onClick={() => navigate(location.pathname + `?deleteMedic=true`)}
                                    >
                                        <FaTrashAlt className="w-4 h-4" /> Eliminar
                                    </button>
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>

                {medicData && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-semibold leading-6 text-gray-900">
                                Información del Médico
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Detalles personales y profesionales del médico.
                            </p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        <FaUserAstronaut className="inline mr-2" /> Nombre
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {medicData.name}
                                    </dd>
                                </div>
                                {medicData.speciality && (
                                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            <FaBriefcase className="inline mr-2" /> Especialidad
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            {medicData.speciality}
                                        </dd>
                                    </div>
                                )}

                                {medicData.phone && (
                                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Teléfono
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            {medicData.phone}
                                        </dd>
                                    </div>
                                )}
                                {medicData.email && (
                                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Email
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            {medicData.email}
                                        </dd>
                                    </div>
                                )}


                            </dl>
                        </div>
                    </div>
                )}
            </div>
            <DeleteMedicModal />
            <EditMedicModal data={medicData} />
        </>
    );
}
