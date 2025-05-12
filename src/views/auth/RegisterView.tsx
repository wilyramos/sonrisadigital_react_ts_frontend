import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthRegisterForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import ErrorMessage from "@/components/ErrorMessage";
import { motion } from "framer-motion";


export default function RegisterView() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues: AuthRegisterForm = {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm<AuthRegisterForm>({
        defaultValues: initialValues
    });


    const password = watch("password");

    const { mutate } = useMutation({
        mutationFn: registerUser,
        onMutate: () => {
            setIsLoading(true);
            toast.loading("Creando cuenta...");
        },
        onError: (error) => {
            // console.log(error)
            setIsLoading(false);
            toast.dismiss();
            toast.error(error?.message || "Error al crear la cuenta. Por favor, inténtalo de nuevo.");
        },
        onSuccess: (data) => {
            setIsLoading(false);
            toast.dismiss();
            toast.success(data);
            reset();
            navigate("/login");
        },
    });

    const handleRegister = (formData: AuthRegisterForm) => {
        mutate(formData);
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="flex items-center justify-center">

            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, ease: "easeOut" }}
                variants={fadeUp}
                className="relative bg-white p-10 w-full max-w-md "
            >

                <div className="relative bg-white px-8 w-full max-w-md">
                    <div className="mb-6 text-center">
                        <img
                            src="logo.svg"
                            alt="Logo"
                            className="w-24 h-24 mx-auto "
                        />
                        <h1 className="text-2xl font-bold text-lime-500 mb-2">
                            Crear Cuenta
                        </h1>
                        <p className="text-gray-500 text-sm mb-4">
                            Bienvenido, por favor completa tus datos para registrarte.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", { required: "Este campo es obligatorio" })}
                                className={`shadow appearance-none border rounded-2xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Tu nombre completo"
                            />
                            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "Este campo es obligatorio",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Por favor, introduce un email válido",
                                    },
                                })}
                                className={`shadow appearance-none border rounded-2xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Tu correo electrónico"
                            />
                            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: "Este campo es obligatorio",
                                    minLength: {
                                        value: 6,
                                        message: "La contraseña debe tener al menos 6 caracteres",
                                    },
                                })}
                                className={`shadow appearance-none border rounded-2xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Crea una contraseña segura"
                            />
                            {errors.password && (
                                <ErrorMessage>{errors.password.message}</ErrorMessage>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                id="passwordConfirmation"
                                {...register("passwordConfirmation", {
                                    required: "Este campo es obligatorio",
                                    validate: (value) =>
                                        value === password || "Las contraseñas no coinciden",
                                })}
                                className={`shadow appearance-none border rounded-2xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.passwordConfirmation ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Confirma tu contraseña"
                            />
                            {errors.passwordConfirmation && (
                                <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {isLoading ? "Creando..." : "Crear Cuenta"}
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            ¿Ya tienes una cuenta?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-teal-500 hover:text-teal-800"
                            >
                                Iniciar Sesión
                            </Link>
                        </p>
                    </div>
                </div>

            </motion.div>

        </div>

    );
}