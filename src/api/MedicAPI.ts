import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { MedicFormData } from "@/types/index";
import { medicListArraySchema } from "@/types/index";
import { medicSchema } from "@/types/index";



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

export async function getMedicById(medicId: string) {
    try {
        const url = `/medic/${medicId}`;
        const { data } = await api.get(url);

        const response = medicSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener el médico");
        } else {
            throw new Error("Error desconocido al obtener el médico");
        }
    }
}

export async function searchMedics(search: string) {
    try {
        const url = `/medic/?query=${search}`;
        const { data } = await api.get(url);
        // console.log(data);
        const response = medicListArraySchema.safeParse(data);

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

export async function deleteMedicById(medicId: string) {
    try {
        const url = `/medic/${medicId}`;
        const { data } = await api.delete(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al eliminar el médico");
        } else {
            throw new Error("Error desconocido al eliminar el médico");
        }
    }
}

export async function updateMedic({ medicId, formData }: { medicId: string; formData: MedicFormData }) {
    try {
        const url = `/medic/${medicId}`;
        const { data } = await api.put(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Error al actualizar el médico");
        } else {
            throw new Error("Error desconocido al actualizar el médico");
        }
    }
}