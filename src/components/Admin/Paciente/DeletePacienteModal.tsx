import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { CheckPasswordForm } from "@/types/index";
import { checkPassword, deleteUser } from "@/api/AuthAPI";


export default function DeletePacienteModal() {

    const initialValues: CheckPasswordForm  = {
        password: "",
    };

    const location = useLocation();
    const params = useParams();
    const pacienteId = params.pacienteId!;
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const deletePaciente = queryParams.get("deletePaciente") || "";
    const showModal = deletePaciente === "true" ? true : false;

    const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: initialValues});


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
    }

    const handleForm = async (data: CheckPasswordForm) => {
        

        await CheckPasswordForm.mutateAsync(data);
        await deletePacienteMutation.mutateAsync(pacienteId);
    }
    return (
        <>

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
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex items-center justify-between">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-semibold leading-6 text-teal-500"
                                        >
                                            Eliminar Paciente

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

                                    <p className="text-sm text-gray-500">
                                            ¿Estás seguro de que deseas eliminar este paciente?
                                            <span className="text-red-500 font-semibold"> ingresa tu contraseña. </span>
                                        </p>

                                    <div className="mt-4">   
                                        <form
                                            className="mt-4 space-y-4"
                                            onSubmit={handleSubmit(handleForm)}
                                            noValidate
                                        >
                                            <div className="flex flex-col gap-2">
                                                <label 
                                                    htmlFor="password"
                                                    className="text-sm font-semibold text-gray-700"
                                                    >Password</label>
                                                <input
                                                    type="password"


                                                    {...register("password", { required: true })}
                                                    className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                                                />
                                                {errors.password && (
                                                    <span className="text-red-500 text-sm">
                                                        Este campo es requerido
                                                    </span>
                                                )}
                                            </div>
                                            <input 
                                                type="submit"
                                                className="flex items-center rounded-2xl bg-red-500 text-white hover:bg-red-700 px-2 cursor-pointer"
                                                value="Eliminar Paciente"
                                            />
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
