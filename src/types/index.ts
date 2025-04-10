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
    email: true,
}).extend({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})


