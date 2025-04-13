import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { CitaFormData } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { searchUsers } from "@/api/AuthAPI"
import { useState } from 'react'
import type { UserListResponse } from '@/types/index'
import { toast } from 'react-toastify'
import ClipLoader from "react-spinners/ClipLoader";
import { searchMedics } from "@/api/MedicAPI"
import type { MedicListArrayResponse } from '@/types/index'
import { FiCheckCircle } from 'react-icons/fi'
import {  FaUserDoctor } from 'react-icons/fa6'


type CitaFormProps = {
    errors: FieldErrors<CitaFormData>
    register: UseFormRegister<CitaFormData>
    setValue: UseFormSetValue<CitaFormData>
}

export default function CitaForm({ errors, register, setValue }: CitaFormProps) {


    /** Buscar usuarios */
    const [searchResults, setSearchResults] = useState<UserListResponse | null>([])
    const [selectedUser, setSelectedUser] = useState<number | null>(null)
    const [selectedUserNameAndEmail, setSelectedUserNameAndEmail] = useState<string | null>(null)

    // Search Usuario by name and by email
    const mutation = useMutation({
        mutationFn: searchUsers,
        onError: (error) => {
            // console.log(error)
            toast.error(error.message || 'Error al buscar el paciente.')
        },
        onSuccess: (data) => {
            // toast.success('Paciente encontrado')
            setSearchResults(data)
        },
    })

    const handleSearchUser = async (formData: string) => {

        if (formData.length > 2) {
            mutation.mutate(formData)
        } else {
            mutation.reset()
            setSearchResults(null)
        }
    }

    const handleSelectUser = (userId: number) => {
        setSelectedUser(userId)
        const selectedUserData = searchResults?.find(user => user.id === userId);
        setSelectedUserNameAndEmail(selectedUserData ? `${selectedUserData.name} (${selectedUserData.email})` : null)
        setSearchResults(null)
        //Asign the selected user id to the patientId field in the form
        setValue('patientId', userId)
    }

    /** Buscar Medico */
    const [searchMedicResults, setSearchMedicResults] = useState<MedicListArrayResponse | null>()
    const [selectedMedic, setSelectedMedic] = useState<number | null>(null)
    const [selectedMedicNameAndEmail, setSelectedMedicNameAndEmail] = useState<string | null>(null)


    const medicMutation = useMutation({
        mutationFn: searchMedics,
        onError: (error) => {
            // console.log(error)
            toast.error(error.message || 'Error al buscar el médico.')
        },
        onSuccess: (data) => {
            // console.log(data)
            setSearchMedicResults(data)
        },
    })

    const handleSearchMedic = async (formData: string) => {
        if (formData.length > 2) {
            medicMutation.mutate(formData)
        } else {
            medicMutation.reset()
            setSearchMedicResults(null)
        }
    }

    const handleSelectMedic = (medicId: number) => {
        setSelectedMedic(medicId)
        const selectedMedicData = searchMedicResults?.find(medic => medic.id === medicId);
        setSelectedMedicNameAndEmail(selectedMedicData ? `${selectedMedicData.name} (${selectedMedicData.email})` : null)
        setSearchMedicResults(null)
        setValue('medicId', medicId)
    }

    return (
        <>
            <div className='grid grid-cols-2 gap-4'>

                <div className="flex flex-col gap-2 ">
                    <label
                        className="font-normal text text-gray-600"
                        htmlFor="searchPatient"
                    >
                        Buscar Paciente
                    </label>
                    <input
                        id="searchPatient"
                        type="text"
                        placeholder="Nombre o email del paciente"
                        className="w-full px-2 py-1 text-sm border-gray-300 border rounded-xl"
                        onChange={(e) => handleSearchUser(e.target.value)}
                    />
                    <div className="flex flex-col gap-2 ">
                        {mutation.isPending && <p className="text-center">
                            <ClipLoader /></p>}
                        {mutation.isError && <ErrorMessage >{mutation.error.message}</ErrorMessage>}
                        {mutation.isSuccess && (
                            <ul className="bg-white border border-gray-200 rounded-md max-h-48 overflow-y-auto">
                                {searchResults?.map((user) => (
                                    <li
                                        key={user.id}
                                        className="px-4 py-3 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
                                        onClick={() => handleSelectUser(user.id)}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <div className="rounded-full bg-gray-300 w-5 h-5 flex items-center justify-center text-gray-600 text-sm font-semibold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-gray-800 font-medium">{user.name}</p>
                                                <p className="text-gray-500 text-xs">{user.email}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {selectedUser && (
                        <div className="flex items-center bg-gray-100 rounded-md shadow-sm p-2">
                            <FiCheckCircle className="h-3 w-3 text-teal-500 mr-2" />
                            <p className="text-xs text-gray-800 font-medium truncate">
                                {selectedUserNameAndEmail}
                            </p>
                        </div>
                    )}
                    <input
                        id="patientId"
                        type='hidden'
                        {...register('patientId', { required: 'El paciente es obligatorio' })}
                    />
                    {errors.patientId && <ErrorMessage>{errors.patientId.message}</ErrorMessage>}

                </div>

                <div className="flex flex-col gap-2 ">
                    <label
                        className="font-normal text text-gray-600"
                        htmlFor="searchMedic"
                    >Buscar Médico</label>
                    <input
                        id="searchMedic"
                        type="text"
                        placeholder="Nombre o email del médico"
                        className="w-full px-2 py-1 text-sm border-gray-300 border rounded-xl"
                        onChange={(e) => handleSearchMedic(e.target.value)}
                    />
                    <div className="flex flex-col gap-2 ">
                        {medicMutation.isPending && <p className="text-center">
                            <ClipLoader /></p>}
                        {medicMutation.isError && <ErrorMessage >{medicMutation.error.message}</ErrorMessage>}
                        {medicMutation.isSuccess && (
                            <ul className="bg-white rounded-md max-h-48 overflow-y-auto">
                                {searchMedicResults?.map((medic) => (
                                    <li
                                        key={medic.id}
                                        className="px-4 py-3 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
                                        onClick={() => handleSelectMedic(medic.id)}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <div className="rounded-full bg-red-300 w-5 h-5 flex items-center justify-center text-red-600 text-sm font-semibold">
                                                {medic.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-gray-800 font-medium">{medic.name}</p>
                                                <p className="text-gray-500 text-xs">{medic.email}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {selectedMedic && (
                        <div className="flex items-center bg-gray-100 rounded-md shadow-sm p-2">
                            <FiCheckCircle className="h-3 w-3 text-teal-500 mr-2" />
                            <p className="text-xs text-gray-800 font-medium truncate">
                                {selectedMedicNameAndEmail}
                            </p>
                            <FaUserDoctor className="h-3 w-3 text-teal-500 ml-2" />
                        </div>
                    )}
                    <input
                        id="medicId"
                        type='hidden'
                        {...register('medicId', { required: 'El médico es obligatorio' })}
                    />
                    {errors.medicId && <ErrorMessage>{errors.medicId.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col gap-2 ">
                    <label
                        className="font-normal text text-gray-600"
                        htmlFor="date"
                    >Fecha y hora</label>
                    <input
                        id="date"
                        type="datetime-local"
                        placeholder="Fecha y hora de la cita"
                        {...register('date', { required: 'Este campo es obligatorio' })}
                        className="w-full px-2 py-1 text-sm border-gray-300 border rounded-xl"
                    />
                    {errors.date && <ErrorMessage >{errors.date.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col gap-2 ">
                    <label
                        className="font-normal text text-gray-600"
                        htmlFor="description"
                    >Descripción</label>
                    <textarea
                        id="description"
                        placeholder="Descripción de la cita"
                        {...register('description', { required: 'Este campo es obligatorio' })}
                        className="w-full px-2 py-1 text-sm border-gray-300 border rounded-xl"
                        rows={3}
                    />
                    {errors.description && <ErrorMessage >{errors.description.message}</ErrorMessage>}
                </div>

            </div>
        </>
    )
}