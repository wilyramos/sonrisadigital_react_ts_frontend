import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { CitaFormData } from "@/types/index";
import { citaListSchema } from "@/types/index";
import { CitaStatus } from "@/types/index";
import { citaListResponseByPatientIdSchema } from "@/types/index";


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
        const url = "/cita";
        const { data } = await api.get(url);
        // console.log(data);
        const response = citaListSchema.safeParse(data);
        
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener las citas");
        }
    }
}

export async function getCitasSearch(searchTerm: string) {
    try {
        const url = `/cita/citas/search?query=${searchTerm}`;
        const { data } = await api.get(url);
        console.log(data);
    
        const response = citaListSchema.safeParse(data);
        
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Error al obtener las citas por busqueda");
        }
    }
}

export async function getAppointmentsByDate(date: string) {
    try {
        const url = `/cita/citas/${date}`;
        // console.log(url);
        const { data } = await api.get(url);
        // console.log(data);
        const response = citaListSchema.safeParse(data);
        // console.log(response);
        
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener las citas por fecha");
        }
    }
}

export async function getCitaById(id: number) {
    try {
        const url = `/cita/${id}`;
        const { data } = await api.get(url);
        console.log(data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener la cita");
        }
    }
}

export async function updateStatusCita({ citaId, status }: { citaId: string; status: CitaStatus }) {
    try {
        const url = `/cita/${citaId}/status`;
        const { data } = await api.put(url, { status });
        console.log(data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al actualizar el estado de la cita");
        }
    }
}

export async function getCitasByPatientId(patientId: string) {
    try {
        const url = `/cita/patient/${patientId}`;
        const { data } = await api.get(url);
        const response = citaListResponseByPatientIdSchema.safeParse(data);
        
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener las citas por paciente");
        }
    }
}

export async function deleteCitaById(citaId: string) {
    
    try {
        const url = `/cita/${citaId}`;
        const { data } = await api.delete(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al eliminar la cita");
        }
    }

}

export async function getAppointmentsReportWeekly() {
    try {
        const url = `/cita/report/weekly`;
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al obtener el reporte semanal de citas");
        }
    }
}