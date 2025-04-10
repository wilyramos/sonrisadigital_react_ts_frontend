import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';
import type { MedicFormData } from '@/types/index';


type MedicFormProps = {
    errors: FieldErrors<MedicFormData>
    register: UseFormRegister<MedicFormData>
}

export default function MedicForm({ errors, register }: MedicFormProps) {
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
                    placeholder="Nombre del medico"
                    className="w-full px-2 py-1 text-sm border-gray-300 border rounded-xl"
                    {...register("name", {
                        required: "El nombre del medico es requerido",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className='flex flex-col gap-2 '>
                <label
                    className="font-normal text text-gray-600"
                    htmlFor="lastName"
                >Celular</label>
                <input
                    id="phone"
                    type="text"
                    placeholder="Celular del medico"
                    className="w-full px-2 py-1 text-sm  border-gray-300 border rounded-xl"
                    {...register("phone", {
                        required: "El celular del medico es requerido",
                    })}
                />
                {errors.phone && (
                    <ErrorMessage>{errors.phone.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-2 ">
                <label
                    className="font-normal text text-gray-600"
                    htmlFor="speciality"
                >Especialidad</label>
                <input
                    id="speciality"
                    type="text"
                    placeholder="Especialidad del medico"
                    className="w-full px-2 py-1  text-sm border-gray-300 border rounded-xl"
                    {...register("speciality", {
                        required: "La especialidad del medico es requerida",
                        
                    })}
                />
                {errors.speciality && (
                    <ErrorMessage>{errors.speciality.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-2 ">
                <label
                    className="font-normal text text-gray-600"
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email del medico"
                    className="w-full px-2 py-1 text-sm  border-gray-300 border rounded-xl"
                    {...register("email", {
                        required: "El email del medico es requerido",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "El email no es valido",
                        },
                    })}
                />
                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </div>

        </>


    )
}
