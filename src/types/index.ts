import { z } from 'zod'

/** Auth */

const authSchema = z.object({
    name: z.string().min(1, { message: 'El nombre es requerido.' }),
    email: z.string().email({ message: 'El correo electrónico no es válido.' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
    passwordConfirmation: z.string().min(6, { message: 'La confirmación de contraseña es requerida.' }),
})

type Auth = z.infer<typeof authSchema>

export type AuthLoginForm = Pick<Auth, 'email' | 'password'>
export type AuthRegisterForm = Pick<Auth, 'name' | 'email' | 'password' | 'passwordConfirmation'>
export type CheckPasswordForm = Pick<Auth, 'password'>

/** User */

export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    id: z.number(),
    phone: z.string().nullable(),
    role: z.string(),
    dni: z.string().optional(),
})

export type User = z.infer<typeof userSchema>
// used in the form to create a user by admin
export type UserForm = Pick<User, 'name' | 'email' | 'phone' | 'dni'>;



/** User List */
export type UserList = User[]

export const userListSchema = z.object({
    users: userSchema.array(),
    total: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
})


// Es un array de los objetos de userSchema
// Para usarlo en la busqueda de usuarios
export const userListArraySchema = z.array(userSchema) 
export type UserListResponse = z.infer<typeof userListArraySchema>


/** Medic */

export const medicSchema = z.object({
    id: z.number(),
    name: z.string().min(1, { message: 'El nombre es requerido.' }),
    email: z.string().email({ message: 'El correo electrónico no es válido.' }),
    phone: z.string(),
    speciality: z.string(),
})
export type Medic = z.infer<typeof medicSchema>
export type MedicFormData = Pick<Medic, 'name' | 'email' | 'phone' | 'speciality'>;
export type MedicList = Medic[];
export type MedicListResponse = {
    medicos: MedicList
    total: number
}

// para usar en la busqueda de medicos
export const medicListArraySchema = z.array(medicSchema)
export type MedicListArrayResponse = z.infer<typeof medicListArraySchema>

/** Paciente */

export const pacienteSchema = z.object({
    name: z.string().min(1, { message: 'El nombre es requerido.' }),
    email: z.string().email({ message: 'El correo electrónico no es válido.' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
    passwordConfirmation: z.string().min(6, { message: 'La confirmación de contraseña es requerida.' }),
    phone: z.string(),
    role: z.literal('paciente'),
    dni: z.string().optional(),
})

export type Paciente = z.infer<typeof pacienteSchema>
export type PacienteFormData = Pick<Paciente, 'name' | 'email' | 'phone' | 'dni'>;


/** Cita */

export const citaSchema = z.object({
    id: z.number(),
    medicId: z.number(),
    patientId: z.number(),
    date: z.string(),
    description: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    medic: z.object({
        id: z.number(),
        name: z.string(),
        speciality: z.string(),
        email: z.string(),
        phone: z.string(),
    }),
    patient: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
        phone: z.string().nullable(),
    }),
})

// Cita es un objeto que contiene la información de la cita
export const citaListResponseSchema = z.object({
    appointments: citaSchema.array(),
    total: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
}) 




// CitaListResponseByPatientId es un array de los objetos de citaSchema pero sin el patient y medic
export const citaListResponseByPatientIdSchema = z.array(citaSchema.omit({ patient: true }));

// Omitir al paciente en la respuesta de la cita
export const citasResponseSchemaByPatientDNI = z.object({
    patient: userSchema,
    appointments: citaListResponseByPatientIdSchema,
})

export type CitaListResponseByPatientId = z.infer<typeof citaListResponseByPatientIdSchema>


// para el react-big-calendar
export type CitaListCalendar = z.infer<typeof citaSchema> & {
    start: Date
    end: Date
}


export const citaListSchema = z.array(citaSchema)
export type CitaList = z.infer<typeof citaListSchema>


export type CitaListResponse = {
    citas: CitaList
    total: number
    totalPages: number
    currentPage: number
}

export type Cita = z.infer<typeof citaSchema>
export type CitaFormData = Pick<Cita, 'medicId' | 'patientId' | 'date' | 'description'>;
export const citaStatusSchema = z.enum(['pending', 'confirmed', 'completed', 'cancelled'])
export type CitaStatus = z.infer<typeof citaStatusSchema>


// Schema for response succes from the API
export const responseSuccessSchema = z.object({
    message: z.string()
})