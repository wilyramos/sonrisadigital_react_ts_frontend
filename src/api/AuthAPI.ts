import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { AuthLoginForm, userSchema } from "@/types/index";




export async function registerUser(formData: AuthLoginForm) {
    
    try {
        const url = "/auth/create-account";
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al registrar usuario");
        }
    }
}

export async function authenticateUser(formData: AuthLoginForm) {
    try {
        const url = "/auth/login";
        const { data } = await api.post<string>(url, formData);
        
        localStorage.setItem("AUTH_TOKEN_SONRISADIGITAL", data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al iniciar sesión");
        }
    }
}

export async function getUser(){
    try {
        const url = "/auth/user";
        const { data } = await api.get(url);
        console.log(data)
        const response = userSchema.safeParse(data);
        console.log(response)
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener el usuario");
        }
    }
}

