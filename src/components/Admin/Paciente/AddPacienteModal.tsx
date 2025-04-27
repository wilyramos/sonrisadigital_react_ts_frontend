import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { registerUserByAdmin } from '@/api/AuthAPI'; 
import PacienteForm from './PacienteForm';
import { useQueryClient } from '@tanstack/react-query';
import type { PacienteFormData } from '@/types/index'; 

export default function AddPacienteModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryparams = new URLSearchParams(location.search);
    const show = !!queryparams.get('newPaciente');

    const { register, handleSubmit, formState: { errors }, reset } = useForm<PacienteFormData>({
        defaultValues: { name: '', email: '', phone: '' }, 
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: registerUserByAdmin, // Ajusta la función de la API
        onError: (error) => {
            toast.error(error.message || 'Error al crear el paciente.');
        },
        onSuccess: (data) => {
            console.log(data);
            toast.success(data || 'Paciente creado con éxito.');
            queryClient.invalidateQueries({ queryKey: ['pacientes'] }); 
            navigate(location.pathname, { replace: true });
            reset();
        },
    });

    const handleCreatePaciente = (formData: PacienteFormData) => {
        mutate(formData); // Envía los datos del formulario a la API
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
                    <div className="fixed inset-0 bg-black/20 transition-opacity" />
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
                                        Nuevo Paciente
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
                                        Completa el siguiente formulario para crear un nuevo paciente.
                                    </p>

                                    <form
                                        className="mt-4 space-y-4"
                                        onSubmit={handleSubmit(handleCreatePaciente)}
                                        noValidate
                                    >
                                        <PacienteForm register={register} errors={errors} /> {/* Usa el componente PacienteForm */}

                                        <div className="mt-6 flex justify-end gap-2">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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