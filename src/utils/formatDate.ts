export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return date.toLocaleString('es-ES', options);
};

export const formatDateOnly = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return date.toLocaleDateString('es-ES', options);
}

export const formatTimeOnly = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return date.toLocaleTimeString('es-ES', options);
}

export const obtenerHora = (isDate: string) => {
    const localDate = new Date(isDate);
    const hours = localDate.getHours().toString().padStart(2, "0");
    return `${hours}:00`;
};

export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// OBTENER LA FECHA Y HORA EN PERU
export const getDateAndTimeInPeru = (isDate: string) => {
    
    const localDate = new Date(isDate);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    return localDate.toLocaleString('es-PE', options).replace(/\//g, '-');

};
