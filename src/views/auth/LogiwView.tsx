import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "sonner";
import ErrorMessage from "@/components/ErrorMessage";

export default function ModernLoginView() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthLoginForm>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate } = useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            setIsLoading(false);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Error al iniciar sesión");
            }
        },
        onSuccess: () => {
            setIsLoading(false);
            toast.success("Inicio de sesión exitoso");
            navigate("/dashboard", { replace: true });
        }
    });

    const handleLogin = (formData: AuthLoginForm) => mutate(formData);

    return (
        <div className="flex items-center justify-center">
            <div className="relative bg-white  p-8 w-full max-w-md">
                <div className="mb-6 text-center">
                    <img
                        src="logo.svg"
                        alt="Logo"
                        className="w-24 h-24 mx-auto "
                    />
                    <h1 className="text-2xl font-bold text-lime-500 mb-2">
                        Iniciar Sesión
                    </h1>
                    <p className="text-gray-600 text-sm mb-4">
                        Bienvenido de nuevo, por favor ingresa tus credenciales.
                    </p>

                </div>
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
                            {...register("email", { required: "Este campo es obligatorio" })}
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
                            })}
                            className={`shadow appearance-none border rounded-2xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Tu contraseña"
                        />
                        {errors.password && (
                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            to="/forgot-password"
                            className="inline-block align-baseline font-semibold text-sm text-teal-500 hover:text-teal-800"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isLoading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        ¿No tienes una cuenta?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-teal-500 hover:text-teal-800"
                        >
                            Crear cuenta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}