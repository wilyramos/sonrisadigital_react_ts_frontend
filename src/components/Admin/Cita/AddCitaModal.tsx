import { Dialog } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import type { CitaFormData } from '@/types/index';
import { useQueryClient } from '@tanstack/react-query';
import { crearCita } from '@/api/CitaAPI';
import CitaForm from './CitaForm';

export default function AddCitaModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryparams = new URLSearchParams(location.search);
    const show = !!queryparams.get('newCita');

    const defaultValues = {
        date: new Date().toISOString().slice(0, 16), // Formato YYYY-MM-DDTHH:mm
        patientId: 0,
        medicId: 0,
        description: '',
    };

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CitaFormData>({
        defaultValues
    });


    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: crearCita,
        onError: (error) => {
            toast.error(error.message || 'Error al crear la cita.');
        },
        onSuccess: (data) => {
            toast.success(data);
            // console.log(data);
            queryClient.invalidateQueries({ queryKey: ['citas'] }); // Invalida la caché de citas
            reset();
            closeModal();
        },
    });

    const handleCreateCita = (formData: CitaFormData) => {
        mutate(formData);
    };

    const closeModal = () => {
        navigate(location.pathname, { replace: true });
    };

    return (
        <Dialog as="div" className="relative z-10" open={show} onClose={closeModal}>
            <div className="fixed inset-0 bg-black/20" aria-hidden="true" />

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="flex items-center justify-between">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-semibold leading-6 text-teal-500"
                            >
                                Nueva Cita
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

                        <div className="mt-4">
                            <p className="text-sm text-gray-500">
                                Completa el siguiente formulario para crear una nueva cita.
                            </p>

                            <form
                                className="mt-4 space-y-4"
                                onSubmit={handleSubmit(handleCreateCita)}
                                noValidate
                            >
                                <CitaForm
                                    register={register}
                                    errors={errors}
                                    setValue={setValue}
                                />

                                <div className="mt-6 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Crear Cita
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
}