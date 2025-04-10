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


/** User */

export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    id: z.number(),
    phone: z.string().nullable(),
    role: z.string()
})

export type User = z.infer<typeof userSchema>
export type UserForm = Pick<User, 'name' | 'email' | 'phone'>

/** User List */
export type UserList = User[]
export type UserListResponse = {
    users: UserList
    total: number
}

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