import { useParams, useNavigate } from "react-router-dom"


import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PacienteFormData } from "@/types/index";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PacienteForm from "./PacienteForm";
import { updateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";


interface PropsEditPacienteModal {
    data?: PacienteFormData;
}

export default function EditPacienteModal({ data }: PropsEditPacienteModal) {
    const initialValues: PacienteFormData = {
        name: data?.name || "",
        email: data?.email || "",
        phone: data?.phone || "",
        dni: data?.dni || "",
    }

    const params = useParams();
    const navigate = useNavigate();


    const queryParams = new URLSearchParams(location.search);
    const editPaciente = queryParams.get("editPaciente") || "";
    const showModal = editPaciente === "true" ? true : false;


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
    });

    const queryClient = useQueryClient();

    // mutation to update the user
    const updatePacienteMutation = useMutation({
        mutationFn: updateUser,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data.message);

            queryClient.invalidateQueries({ queryKey: ["paciente", params.pacienteId] });
            navigate(location.pathname, { replace: true });
        }
    });


    const handleEditPaciente = async (formData: PacienteFormData) => {
        await updatePacienteMutation.mutateAsync({ id: params.pacienteId!, formData });
    }

    const closeModal = () => {
        navigate(location.pathname, { replace: true });
    };

    return (
        <>
            <Transition.Root show={showModal} as={Fragment}>
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
                                            Editar Paciente
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
                                            onSubmit={handleSubmit(handleEditPaciente)}
                                            noValidate
                                        >
                                            <PacienteForm errors={errors} register={register} />

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
                                                    Actualizar
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

        </>
    )
}
