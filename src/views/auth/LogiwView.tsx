import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from 'react-toastify';
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
            email: "demo@correo.com",
            password: "demo123",
        },
    });

    const { mutate } = useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            console.error(error);
            setIsLoading(false);
            toast.error(error.message || "Error al iniciar sesión");
        },
        onSuccess: () => {
            setIsLoading(false);
            toast.success("Inicio de sesión exitoso");
            navigate("/dashboard", { replace: true });
        },
    });

    const handleLogin = (formData: AuthLoginForm) => {
        setIsLoading(true);
        toast.info("Iniciando sesión...");
        // console.log(formData);
        mutate(formData);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="relative bg-white p-10 w-full max-w-md  ">
                <div className="mb-6 text-center">
                    <img src="/logo.svg" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-teal-600 mb-2">Iniciar Sesión</h1>
                    <p className="text-gray-600 text-sm">Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "Este campo es obligatorio" })}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Correo electrónico"
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: "Este campo es obligatorio" })}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Contraseña"
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-teal-500 hover:underline font-medium">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 font-semibold text-white rounded-xl ${isLoading ? "bg-teal-400 cursor-not-allowed opacity-60" : "bg-teal-500 hover:bg-teal-600"}`}
                    >
                        {isLoading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        ¿No tienes una cuenta?{" "}
                        <Link to="/register" className="text-teal-500 font-semibold hover:underline">
                            Crear cuenta
                        </Link>
                    </p>
                    
                    <p className="text-gray-600 text-sm">
                        ¿Eres paciente?{" "}
                        <Link to="/consultar" className="text-teal-500 font-semibold hover:underline">
                            Consultar cita
                        </Link>
                    </p>

                </div>

            </div>
        </div>
    );
}
