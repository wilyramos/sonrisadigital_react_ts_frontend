import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { AuthLoginForm } from "@/types/index";
import { userSchema, userListSchema, userListArraySchema } from "@/types/index";



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

        console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al iniciar sesión");
        } else {
            throw new Error("Error al iniciar sesión");
        }
    }
}

export async function getUser(){
    try {
        const url = "/auth/user";
        const { data } = await api.get(url);
        const response = userSchema.safeParse(data);
        // console.log(response);
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener el usuario");
        }
    }
}

export async function getUsers(){
    try {
        const url = "/auth/users";
        const { data } = await api.get(url);
        // console.log(data);
        const response = userListSchema.safeParse(data);

        if(response.success) {
            return response.data;
        }
        
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener los usuarios");
        }
    }
}

// With Pagination

export async function getUsersWithPagination(page: number, limit: number) {
    try {
        const url = `/auth/users?limit=${limit}&offset=${page}`;
        const { data } = await api.get(url);
        const response = userListSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener los usuarios");
        }
    }
}

export async function searchUsers(search: string) {
    try {
        const url = `/auth/users/search?query=${search}`;
        const { data } = await api.get(url);
        // console.log(data);
        const response = userListArraySchema.safeParse(data);

        // console.log(response);
        if (response.success) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al buscar los usuarios");
        }
        return [];
    }
}
