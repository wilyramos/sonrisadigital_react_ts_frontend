import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { motion } from "framer-motion";
dayjs.locale('es');
import { Calendar as BigCalendar, View, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useQuery } from "@tanstack/react-query";
import { getCitas } from "@/api/CitaAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const localizer = dayjsLocalizer(dayjs);

interface Event {
    id: number; // ID de la cita
    start: Date;
    end: Date;
    title: string;
    status?: string; // status ahora puede ser cualquier string o undefined
    description?: string;
    medic?: {
        name: string;
        email: string;
        id: number;
        phone: string;
        speciality: string;
    };
    patient?: {
        [key: string]: any;
    };
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
    const [events, setEvents] = useState<Event[]>([]);


    /* Query para obtener las citas */

    const { data: citasData, isLoading, isError } = useQuery({
        queryKey: ["citas"],
        queryFn: () => getCitas(),
        retry: 1,
    });

    useEffect(() => {
        if (citasData) {
            const formattedEvents: Event[] = citasData.map(cita => {
                const startDate = dayjs(cita.date).toDate();
                const endDate = dayjs(cita.date).add(1, 'hour').toDate();
                return {
                    start: startDate,
                    end: endDate,
                    title: `${cita.description} - ${cita.patient.name}`,
                    status: cita.status,
                    description: cita.description,
                    medic: cita.medic,
                    patient: cita.patient,
                    id: cita.id, 
                };
            });
            setEvents(formattedEvents);
        }
    }, [citasData]);

    const handleNavigate = (newDate: Date) => setDate(newDate);

    // Button to select event

    const navigate = useNavigate();
    const handleSelectEvent = (event: Event) => {
        navigate(`/calendar?viewCita=${event.id}`);
    };

    const handleViewChange = (newView: View) => {
        setView(newView);
    };

    // settins react-big-calendar
    const components = {
        event: EventComponent as React.ComponentType<any>,
    };

    const minTime = new Date();
    minTime.setHours(8, 0, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(20, 0, 0, 0);


    if (isLoading) return <div className="text-center"><ClipLoader color="#10b981" size={40} /></div>;
    if (isError) return <div className="text-red-500 text-center">Error al cargar las citas.</div>;


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
                    events={events} // Usa el estado 'events' que ahora contiene tus citas formateadas
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