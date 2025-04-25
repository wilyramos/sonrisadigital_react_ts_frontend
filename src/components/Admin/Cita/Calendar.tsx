import { useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { motion } from "framer-motion";

dayjs.locale('es');

import { Calendar as BigCalendar, View, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Mantener el CSS base de react-big-calendar

const localizer = dayjsLocalizer(dayjs);

interface Event {
    start: Date;
    end: Date;
    title: string;
    status?: "confirmed" | "pending" | "cancelled";
    description?: string;
}

// Interfaz para las props que esperamos en EventComponent
interface CustomEventComponentProps {
    event: Event;
    view: View;
    title: string;
    isAllDay: boolean;
}

const messages = {
    allDay: 'Todo el día', previous: '<', next: '>', today: 'Hoy', month: 'Mes',
    week: 'Semana', day: 'Día', agenda: 'Agenda', date: 'Fecha', time: 'Hora',
    event: 'Cita', showMore: (total: number) => `+ Ver ${total} más`
};

const EventComponent: React.FC<CustomEventComponentProps> = ({ event }) => {
    const status = event.status;

    let borderColorClass = 'border-gray-400'; // Default neutral
    

    if (status === "confirmed") {
        borderColorClass = 'border-green-400';
    } else if (status === "pending") {
        borderColorClass = 'border-yellow-400';
    } else if (status === "cancelled") {
        borderColorClass = 'border-red-400';
    }
    

    return (
        <div className={`flex items-center border-l-6 ${borderColorClass} cursor-pointer `}>
            <div className="truncate px-1">
                <p className="text-sm font-semibold">{event.title}</p>
            </div>
        </div>
    );
};

export default function Calendar() {
    const [date, setDate] = useState<Date>(new Date());
    const [view, setView] = useState<View>("day");


    const events: Event[] = [

        { start: new Date(2025, 3, 22, 10, 0), end: new Date(2025, 3, 22, 11, 0), title: "Reunión con el cliente A", status: "confirmed", description: "Discutir los requisitos del proyecto X." },
        { start: new Date(2025, 3, 23, 14, 0), end: new Date(2025, 3, 23, 15, 0), title: "Cita médica", status: "pending", description: "Chequeo anual con el Dr. Gómez." },
        { start: new Date(2025, 3, 23, 14, 30), end: new Date(2025, 3, 23, 15, 40), title: "Cita médica 2 (Traslape)", status: "pending", description: "Control de presión arterial." },
        { start: new Date(2025, 3, 24, 9, 0), end: new Date(2025, 3, 24, 10, 0), title: "Reunión de equipo", status: "cancelled", description: "Reunión semanal pospuesta." },
        { start: new Date(2025, 3, 24, 11, 0), end: new Date(2025, 3, 24, 12, 0), title: "Llamada con proveedor", status: "confirmed", description: "Seguimiento del pedido #12345." },
        { start: new Date(2025, 3, 24), end: new Date(2025, 3, 25), title: "Cumpleaños de Juan" },
        { start: new Date(2025, 3, 24, 12, 30), end: new Date(2025, 3, 24, 13, 15), title: "Cita con el Dr. Smith", status: "confirmed", description: "Revisión general dental." },
        { start: new Date(2025, 3, 25, 9, 0), end: new Date(2025, 3, 25, 10, 0), title: "Reunión para discutir proyecto X larguísimo", status: "pending", description: "Brainstorming inicial de características y alcance." },
        { start: new Date(2025, 3, 26, 14, 0), end: new Date(2025, 3, 26, 15, 0), title: "Llamada con el cliente B", status: "confirmed", description: "Actualización de progreso del proyecto Y." },
        { start: new Date(2025, 3, 27, 10, 30), end: new Date(2025, 3, 27, 11, 0), title: "Evento cancelado importante", status: "cancelled", description: "Cancelado por falta de asistentes." },
        { start: new Date(2025, 3, 28, 16, 0), end: new Date(2025, 3, 30, 17, 0), title: "Idea para nuevo proyecto", status: "pending", description: "Explorar viabilidad de la idea Z." },
        { start: new Date(2025, 3, 29, 13, 0), end: new Date(2025, 3, 29, 14, 0), title: "Cita médica", status: "confirmed", description: "Chequeo anual con el Dr. Pérez." },
        { start: new Date(2025, 3, 30, 9, 0), end: new Date(2025, 3, 30, 10, 0), title: "Reunión de seguimiento", status: "pending", description: "Revisar el progreso del proyecto X." },
        { start: new Date(2025, 3, 30, 11, 0), end: new Date(2025, 3, 30, 12, 0), title: "Cita médica", status: "confirmed", description: "Chequeo anual con el Dr. López." },
        { start: new Date(2025, 3, 30, 14, 0), end: new Date(2025, 3, 30, 15, 0), title: "Reunión de equipo", status: "cancelled", description: "Reunión semanal cancelada." },
    ];

    const handleNavigate = (newDate: Date) => setDate(newDate);
    const handleSelectEvent = (event: Event) => console.log("Evento seleccionado:", event);

    const handleViewChange = (newView: View) => {
        setView(newView);
    };

    const components = {
        event: EventComponent as React.ComponentType<any>,
    };

    const minTime = new Date();
    minTime.setHours(8, 0, 0, 0); // 8:00 AM

    const maxTime = new Date();
    maxTime.setHours(20, 0, 0, 0); // 8:00 PM


    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-4 flex flex-col h-[calc(100vh-4rem)] rounded-2xl shadow-lg font-semibold"
        >
            <div className="flex-grow overflow-auto">
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    components={components}
                    date={date}
                    onNavigate={handleNavigate}
                    onView={handleViewChange}
                    view={view}
                    views={['month', 'week', 'day', 'agenda']}
                    min={minTime}
                    max={maxTime}
                    messages={messages}
                    popup
                    onSelectEvent={handleSelectEvent}
                    toolbar={true}
                    dayLayoutAlgorithm="no-overlap"
                    style={{ width: "100%" }}
                />
            </div>
        </motion.div>
    );
}    