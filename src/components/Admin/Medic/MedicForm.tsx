import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';
import type { MedicFormData } from '@/types/index';

type MedicFormProps = {
    errors: FieldErrors<MedicFormData>;
    register: UseFormRegister<MedicFormData>;
};

export default function MedicForm({ errors, register }: MedicFormProps) {
    return (
        <div className="space-y-4">
            {/* Nombre */}
            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm text-gray-700">
                    Nombre
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre del médico"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    {...register("name", {
                        required: "El nombre del médico es requerido",
                    })}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>

            {/* Celular */}
            <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-sm text-gray-700">
                    Celular
                </label>
                <input
                    id="phone"
                    type="text"
                    placeholder="Celular del médico"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    {...register("phone", {
                        required: "El celular del médico es requerido",
                    })}
                />
                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
            </div>

            {/* Especialidad */}
            <div className="flex flex-col gap-1">
                <label htmlFor="speciality" className="text-sm text-gray-700">
                    Especialidad
                </label>
                <input
                    id="speciality"
                    type="text"
                    placeholder="Especialidad del médico"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    {...register("speciality", {
                        required: "La especialidad del médico es requerida",
                    })}
                />
                {errors.speciality && (
                    <ErrorMessage>{errors.speciality.message}</ErrorMessage>
                )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email del médico"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    {...register("email", {
                        required: "El email del médico es requerido",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "El email no es válido",
                        },
                    })}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>
        </div>
    );
}
