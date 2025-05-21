import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { getCitasByPatientDNI } from "@/api/CitaAPI";
import ErrorMessage from "@/components/ErrorMessage";
// import { useQuery } from "@tanstack/react-query";

type ConsultarForm = {
    dni: string;
};

export default function ConsultarView() {
    const [isLoading, setIsLoading] = useState(false);
    const [dataResult, setDataResult] = useState<any>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ConsultarForm>({
        defaultValues: {
            dni: "",
        },
    });

    const { mutate } = useMutation({
        mutationFn: getCitasByPatientDNI,
        onError: (error) => {
            console.error(error);
            setIsLoading(false);
            toast.error(error.message || "Error al consultar");
        },
        onSuccess: (data) => {
            setIsLoading(false);
            toast.success("Consulta exitosa");
            setDataResult(data);
        },
    });


    const handleConsultar = (formData: ConsultarForm) => {
        console.log("DNI being sent to mutate:", formData.dni);
        mutate(formData.dni);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="relative bg-white p-10 w-full max-w-md">
                <div className="mb-6 text-center">
                    <img src="/logo.svg" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-teal-600 mb-2">Consultar Información</h1>
                    <p className="text-gray-600 text-sm">Ingresa tu número de documento</p>
                </div>

                <form onSubmit={handleSubmit(handleConsultar)} className="space-y-5">
                    <div>
                        <label htmlFor="documento" className="block text-sm font-semibold text-gray-700 mb-1">
                            Número de Documento
                        </label>
                        <input
                            type="text"
                            id="documento"
                            {...register("dni", {
                                required: "Este campo es obligatorio",
                                pattern: {
                                    value: /^[0-9]{8}$/,
                                    message: "El DNI debe tener 8 dígitos numéricos",
                                },
                            })}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.dni ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Ej: 12345678"
                        />
                        {errors.dni && <ErrorMessage>{errors.dni.message}</ErrorMessage>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 font-semibold text-white rounded-xl ${isLoading ? "bg-teal-400 cursor-not-allowed opacity-60" : "bg-teal-500 hover:bg-teal-600"
                            }`}
                    >
                        {isLoading ? "Consultando..." : "Consultar"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        <a href="/" className="text-teal-500 font-semibold hover:underline">
                            Volver al inicio
                        </a>
                    </p>
                </div>
            </div>

            {dataResult && (
                <div className="w-full max-w-5xl mt-10 bg-white p-6 rounded-xl shadow-lg grid md:grid-cols-2 gap-6">
                    {/* Información del Paciente */}
                    <div>
                        <h2 className="text-2xl font-bold text-teal-600 mb-4">Datos del Paciente</h2>
                        <div className="space-y-2 text-gray-700">
                            <p><span className="font-semibold">👤 Nombre:</span> {dataResult.patient.name}</p>
                            <p><span className="font-semibold">📧 Email:</span> {dataResult.patient.email}</p>
                            <p><span className="font-semibold">📞 Teléfono:</span> {dataResult.patient.phone || "No registrado"}</p>
                            <p><span className="font-semibold">🪪 DNI:</span> {dataResult.patient.dni || "No registrado"}</p>
                        </div>
                    </div>

                    {/* Citas del Paciente */}
                    <div>
                        <h3 className="text-2xl font-bold text-teal-600 mb-4">Citas Registradas</h3>
                        {dataResult.appointments.length === 0 ? (
                            <p className="text-gray-500">No se encontraron citas para este paciente.</p>
                        ) : (
                            <ul className="space-y-4">
                                {dataResult.appointments.map((cita: any) => (
                                    <li
                                        key={cita.id}
                                        className="border-l-4 border-teal-500 bg-gray-50 p-4 rounded-lg shadow-sm"
                                    >
                                        <p className="text-sm text-gray-500">{new Date(cita.date).toLocaleString()}</p>
                                        <p className="font-semibold text-gray-800">{cita.description}</p>
                                        <p className="text-gray-600"><span className="font-semibold">🩺 Médico:</span> {cita.medic.name}</p>
                                        <p className="text-gray-600">
                                            <span className="font-semibold">📌 Estado:</span>{" "}
                                            <span
                                                className={`inline-block px-2 py-1 rounded text-xs font-medium ${cita.status === "Pendiente"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : cita.status === "Completado"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {cita.status}
                                            </span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}


        </div>
    );
}


