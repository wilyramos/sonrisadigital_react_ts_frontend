import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { CitaFormData } from "@/types/index";
import { citaListSchema } from "@/types/index";


export async function crearCita(formData: CitaFormData) {

    try {
        const url = "/cita";
        const { data } = await api.post<string>(url, formData);
        console.log(data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al crear la cita");
        }
    }
}

export async function getCitas() {
    try {
        const url = "/cita/all";
        const { data } = await api.get(url);
        console.log(data);
        const response = citaListSchema.safeParse(data);
        
        console.log(response);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener las citas");
        }
    }
}