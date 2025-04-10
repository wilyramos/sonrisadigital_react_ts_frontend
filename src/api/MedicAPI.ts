import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { MedicFormData } from "@/types/index";




export async function createMedic(formData: MedicFormData) {
    try {
        const url = "/medic/create-account";
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al crear el médico");
        } else {
            throw new Error("Error desconocido al crear el médico");
        }
    }
}

export async function getMedics() {
    try {
        const url = "/medic/medics";
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener los médicos");
        } else {
            throw new Error("Error desconocido al obtener los médicos");
        }
    }
}