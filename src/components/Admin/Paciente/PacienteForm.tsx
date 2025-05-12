import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import ErrorMessage from '@/components/ErrorMessage'
import type { PacienteFormData } from '@/types/index'

type PacienteFormProps = {
    errors: FieldErrors<PacienteFormData>
    register: UseFormRegister<PacienteFormData>
}

export default function PacienteForm({ errors, register }: PacienteFormProps) {
    const inputClass = "w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm placeholder:text-gray-400";

    const labelClass = "text-sm text-gray-700 font-medium mb-1";

    const fieldWrapperClass = "flex flex-col gap-1";

    return (
        <div className="flex flex-col gap-5">
            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="name">Nombre</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre del paciente"
                    {...register('name', { required: 'Este campo es obligatorio' })}
                    className={inputClass}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email del paciente"
                    {...register('email', { required: 'Este campo es obligatorio' })}
                    className={inputClass}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="phone">Celular</label>
                <input
                    id="phone"
                    type="tel"
                    placeholder="Celular del paciente"
                    {...register('phone', { required: 'Este campo es obligatorio' })}
                    className={inputClass}
                />
                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
            </div>

            <div className={fieldWrapperClass}>
                <label className={labelClass} htmlFor="dni">DNI</label>
                <input
                    id="dni"
                    type="text"
                    placeholder="DNI del paciente"
                    {...register('dni', { required: 'Este campo es obligatorio' })}
                    className={inputClass}
                />
                {errors.dni && <ErrorMessage>{errors.dni.message}</ErrorMessage>}
            </div>
        </div>
    )
}
