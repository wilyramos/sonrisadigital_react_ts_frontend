import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCitaById, updateStatusCita } from '@/api/CitaAPI';
import type { CitaStatus } from '@/types/index';
import { statusTranslations } from '@/locales/es';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';

export default function CitaDetailsModal() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const queryparams = new URLSearchParams(location.search);
    const citaId = queryparams.get('viewCita');
    const show = !!citaId;

    const { data: cita, isLoading, isError } = useQuery({
        queryKey: ['cita', citaId],
        queryFn: () => getCitaById(Number(citaId)),
        enabled: show && !!citaId,
    });

    const closeModal = () => {
        navigate(location.pathname, { replace: true });
    };

    const { mutate } = useMutation({
        mutationFn: updateStatusCita,
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['citas'] });
        },
        onError: (error) => {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Error al actualizar el estado de la cita.');
            }
        },
    });

    const handleChangeStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as CitaStatus;
        console.log('Status changed to:', status);
        if (!citaId) return;
        const data = {
            citaId,
            status,
        };
        mutate(data);
    };

    if (!show) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <p className="text-sm text-gray-500">Cargando detalles de la cita...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center p-4">
                <p className="text-sm text-red-600">Error al cargar los detalles de la cita. Por favor, inténtelo de nuevo más tarde.</p>
            </div>
        );
    }

    if (cita) return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-lg transition-all">
                                <div className="flex items-center justify-between">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold leading-6 text-teal-600"
                                    >
                                        Detalles de la Cita
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="rounded-md p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        <span className="sr-only">Cerrar</span>
                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Fecha y hora</dt>
                                        <dd className="mt-1 text-sm border-l-2 border-gray-400 pl-2 bg-gray-50 rounded">
                                            {cita?.date
                                                ? format(new Date(cita.date), 'PPPP \'a las\' HH:mm', { locale: es })
                                                : 'No disponible'}
                                        </dd>
                                    </div>

                                    <div className=''>
                                        <label className="block text-sm font-medium text-gray-500">Estado actual:</label>
                                        <select
                                            className="py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
                                            defaultValue={cita?.status}
                                            onChange={handleChangeStatus}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option key={key} value={key}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Paciente</dt>
                                        <dd className="mt-1 text-sm border-l-2 border-gray-400 pl-2 bg-gray-50 rounded">
                                            {cita?.patient?.name} <br />
                                            <span className="text-gray-500">{cita?.patient?.email}</span> <br />
                                            <span className="text-gray-500">{cita?.patient?.phone}</span>
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Médico</dt>
                                        <dd className="mt-1 text-sm border-l-2 border-gray-400 pl-2 bg-gray-50 rounded">
                                            {cita?.medic?.name} ({cita?.medic?.speciality}) <br />
                                            <span className="text-gray-500">{cita?.medic?.email}</span> <br />
                                            <span className="text-gray-500">{cita?.medic?.phone}</span>
                                        </dd>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">Descripción</dt>
                                        <dd className="mt-1 text-sm border-l-2 border-gray-400 pl-2 bg-gray-50 rounded">
                                            {cita?.description || 'Sin descripción'}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Creado</dt>
                                        <dd className="mt-1 text-sm border-l-2 border-gray-400 pl-2 bg-gray-50 rounded">
                                            {cita?.createdAt
                                                ? format(new Date(cita.createdAt), 'PPPP HH:mm', { locale: es })
                                                : 'No disponible'}
                                        </dd>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}