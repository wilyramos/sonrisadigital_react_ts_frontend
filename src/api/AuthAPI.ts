import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { AuthLoginForm } from "@/types/index";




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

