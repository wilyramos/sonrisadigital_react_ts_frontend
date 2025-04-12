import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { CitaFormData } from "@/types/index";



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