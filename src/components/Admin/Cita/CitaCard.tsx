import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiUserCheck } from "react-icons/fi";
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { statusTranslations } from "@/locales/es";
import { formatTimeOnly } from "@/utils/formatDate";
import { Cita } from "@/types/index";



interface StatusColors {
    [key: string]: string;
}

interface CitaCardProps {
    cita: Cita;
    statusColors: StatusColors;
}

export default function CitaCard({ cita, statusColors }: CitaCardProps) {
    const navigate = useNavigate();

    return (

        <div className="grid grid-cols-5 gap-2 border border-gray-200 rounded-xl py-2 px-4 shadow-xl hover:shadow-2xl transition-all duration-200 text-center">

            <div className="col-span-3">
                <button
                    onClick={() => navigate(`/dashboard?viewCita=${cita.id}`)}
                >
                    <p className="text-sm font-semibold text-blue-600 hover:underline uppercase cursor-pointer">
                        {cita.description && cita.description.length > 50
                            ? `${cita.description.slice(0, 50)}...`
                            : cita.description
                        }
                    </p>
                </button>
            </div>

            <div className="col-span-2 inline-flex items-center bg-gray-100 text-center justify-center rounded-lg border border-gray-300 shadow-sm px-1 font-extrabold text-sm">
                <span className="text-gray-500 text-xs font-bold">{formatTimeOnly(cita.date)}</span>
            </div>

            <div className="col-span-4 text-xs">
                <p className="flex items-center gap-2">
                    <FiUser className="text-gray-400" />
                    <span className="font-medium">Paciente:</span> {cita.patient.name}
                    <span className="text-xs text-gray-500 font-bold">({cita.patient.phone})</span>
                </p>
                <p className="flex items-center gap-2">
                    <FiUserCheck className="text-gray-400" />
                    <span className="font-medium">Médico:</span> {cita.medic.name}
                </p>
                <p className="flex items-center gap-2">
                    <FiUserCheck className="text-gray-400" />
                    <span className="font-medium">Estado:</span>
                    <span className={statusColors[cita.status]}>{statusTranslations[cita.status]}</span>
                </p>
            </div>
            <div className="grid place-items-end">
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </Menu.Button>

                    <Transition as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                                <button
                                    onClick={() => navigate(`/dashboard?viewCita=${cita.id}`)}
                                    className='flex items-center gap-2 px-3 py-1 text-sm leading-6 text-gray-900'
                                >
                                    <FaEye /> Ver detalles
                                </button>
                            </Menu.Item>
                            {/* <Menu.Item>
                                <Link to={`/}`}
                                    className='flex items-center gap-2 px-3 py-1 text-sm leading-6 text-gray-900'>
                                    <FaEdit /> Editar
                                </Link>
                            </Menu.Item> */}
                            <Menu.Item>
                                <Link to={`/}`}
                                    className='flex items-center gap-2 px-3 py-1 text-sm leading-6 text-gray-900'>
                                    <FaTrashAlt /> Eliminar
                                </Link>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
}