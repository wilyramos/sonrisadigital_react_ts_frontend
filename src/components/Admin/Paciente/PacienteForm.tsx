import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import ErrorMessage from '@/components/ErrorMessage'
import type { PacienteFormData } from '@/types/index'


type PacienteFormProps = {
    errors: FieldErrors<PacienteFormData>
    register: UseFormRegister<PacienteFormData>
}

export default function PacienteForm({ errors, register }: PacienteFormProps) {
    return (

        <>
            <div className="flex flex-col gap-2 ">
                <label
                    className="font-normal text text-gray-600"
                    htmlFor="name"
                >Nombre</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre del paciente"
                    {...register('name', { required: 'Este campo es obligatorio' })}
                    className="w-full px-2 py-1 text-sm border-gray-300 border rounded-xl"
                />
                {errors.name && <ErrorMessage >{errors.name.message}</ErrorMessage>}
            </div>

            <div className="flex flex-col gap-2 ">
                <label
                    className="font-normal text text-gray-600"
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="text"
                    placeholder="Email del paciente"
                    {...register('email', { required: 'Este campo es obligatorio' })}
                    className="w-full px-2 py-1 text-sm border-gray-300 border rounded-xl"
                />
                {errors.email && <ErrorMessage >{errors.email.message}</ErrorMessage>}
            </div>

            <div className="flex flex-col gap-2 ">
                <label
                    className="font-normal text text-gray-600"
                    htmlFor="phone"
                >Celular</label>
                <input
                    id="phone"
                    type="text"
                    placeholder="Celular del paciente"
                    {...register('phone', { required: 'Este campo es obligatorio' })}
                    className="w-full px-2 py-1 text-sm border-gray-300 border rounded-xl"
                />
                {errors.phone && <ErrorMessage >{errors.phone.message}</ErrorMessage>}
            </div>
            <div className="flex flex-col gap-2 ">
                <label
                    className="font-normal text text-gray-600"
                    htmlFor="password"
                >Contraseña</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Contraseña del paciente"
                    {...register('password', { required: 'Este campo es obligatorio' })}
                    className="w-full px-2 py-1 text-sm border-gray-300 border rounded-xl"
                />
                {errors.password && <ErrorMessage >{errors.password.message}</ErrorMessage>}
            </div>
            <div className="flex flex-col gap-2 ">
                <label
                    className="font-normal text text-gray-600"
                    htmlFor="passwordConfirmation"
                >Confirmar Contraseña</label>
                <input
                    id="passwordConfirmation"
                    type="password"
                    placeholder="Confirmar contraseña del paciente"
                    {...register('passwordConfirmation', { required: 'Este campo es obligatorio' })}
                    className="w-full px-2 py-1 text-sm border-gray-300 border rounded-xl"
                />
                {errors.passwordConfirmation && <ErrorMessage >{errors.passwordConfirmation.message}</ErrorMessage>}
            </div>
        </>
    )
}
