import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { CheckPasswordForm } from "@/types/index";
import { checkPassword, deleteUser } from "@/api/AuthAPI";
import { FaTrash } from "react-icons/fa";
import ErrorMessage from "@/components/ErrorMessage";

export default function DeletePacienteModal() {
    const initialValues: CheckPasswordForm = {
        password: "",
    };

    const location = useLocation();
    const params = useParams();
    const pacienteId = params.pacienteId!;
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const deletePaciente = queryParams.get("deletePaciente") || "";
    const showModal = deletePaciente === "true" ? true : false;

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const queryClient = useQueryClient();
    const CheckPasswordForm = useMutation({
        mutationFn: checkPassword,
        onError: (error) => toast.error(error.message || "Error al verificar la contraseña"),
        onSuccess: (data) => {
            toast.success(data.message);
        }
    });

    const deletePacienteMutation = useMutation({
        mutationFn: deleteUser,
        onError: (error) => toast.error(error.message || "Error al eliminar el paciente"),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["pacientes"] });

            // navigate to the previous page
            navigate("/pacientes", { replace: true });
        }
    });

    const closeModal = () => {
        navigate(location.pathname, { replace: true });
    };

    const handleForm = async (data: CheckPasswordForm) => {
        await CheckPasswordForm.mutateAsync(data);
        await deletePacienteMutation.mutateAsync(pacienteId);
    };

    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center justify-between">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold leading-6 text-red-600"
                                    >
                                        <FaTrash className="inline mr-2" /> Eliminar Paciente
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
                                        ¿Estás seguro de que deseas eliminar este paciente? Esta acción no se puede deshacer.
                                        Para confirmar, <span className="font-semibold">ingresa tu contraseña</span>.
                                    </p>

                                    <form
                                        className="mt-4 space-y-4"
                                        onSubmit={handleSubmit(handleForm)}
                                        noValidate
                                    >
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-semibold text-gray-700"
                                            >
                                                Contraseña
                                            </label>
                                            <input
                                                type="password"
                                                {...register("password", { required: "La contraseña es requerida" })}
                                                className={`mt-1 block w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
                                            />
                                            {errors.password && (
                                                <ErrorMessage>{errors.password.message}</ErrorMessage>
                                            )}
                                        </div>

                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                            >
                                                <FaTrash className="mr-2" /> Eliminar
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