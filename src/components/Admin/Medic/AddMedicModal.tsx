import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import type { MedicFormData } from '@/types/index';
import { createMedic } from '@/api/MedicAPI';
import MedicForm from './MedicForm';
import { useQueryClient } from '@tanstack/react-query';

export default function AddMedicModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryparams = new URLSearchParams(location.search);
    const show = !!queryparams.get('newMedic');

    const { register, handleSubmit, formState: { errors }, reset } = useForm<MedicFormData>({
        defaultValues: { name: '', phone: '', speciality: '', email: '' },
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createMedic,
        onError: (error) => {
            toast.error(error.message || 'Error al crear el médico.');
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['medicos'] }); 
            navigate(location.pathname, { replace: true }); // Cierra el modal
            reset();
        },
    });

    const handleCreateMedic = (formData: MedicFormData) => {
        mutate(formData);
    };

    const closeModal = () => {
        navigate(location.pathname, { replace: true });
    };

    return (
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
                    <div className="fixed inset-0 bg-black/50 transition-opacity"  />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center justify-between">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold leading-6 text-teal-500"
                                    >
                                        Nuevo Médico
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="rounded-md p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        <span className="sr-only">Cerrar</span>
                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="">
                                    <p className="text-sm text-gray-500">
                                        Completa el siguiente formulario para crear un nuevo médico.
                                    </p>

                                    <form
                                        className="mt-4 space-y-4"
                                        onSubmit={handleSubmit(handleCreateMedic)}
                                        noValidate
                                    >
                                        <MedicForm 
                                            register={register} 
                                            errors={errors}
                                        />

                                        <div className="mt-6 flex justify-end gap-2">
                                            <button
                                                type="button"
                                                className="bg-gray-50 text-gray-800 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100 transition duration-150"
                                                onClick={closeModal}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-teal-500 text-white rounded-lg px-4 py-2 hover:bg-teal-600 transition duration-150"
                                            >
                                                Crear
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}