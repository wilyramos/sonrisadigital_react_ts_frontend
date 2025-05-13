import { CalendarDays, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import CitasFiltering from "../Cita/CitasFiltering";
import Heading from "../Heading";

const data = [
    { label: "Citas Programadas", icon: <CalendarDays className="text-blue-500 w-6 h-6" />, value: 12 },
    { label: "Citas Completadas", icon: <CheckCircle className="text-green-500 w-6 h-6" />, value: 8 },
    { label: "Citas Canceladas", icon: <XCircle className="text-red-500 w-6 h-6" />, value: 2 },
    { label: "Citas Pendientes", icon: <Clock className="text-yellow-500 w-6 h-6" />, value: 2 },
    { label: "Pacientes Registrados", icon: <Users className="text-purple-500 w-6 h-6" />, value: 50 },
];

export default function Dashboard() {
    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div>
                <Heading>Dashboard</Heading>
                <p className="text-muted-foreground text-sm">Resumen general y gestión de citas.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {data.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl shadow p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            {item.icon}
                            <p className="text-sm text-gray-500">{item.label}</p>
                        </div>
                        <p className="text-xl font-bold text-gray-800">{item.value}</p>
                    </div>
                ))}
            </div>

            <div>
                <div className="flex items-center justify-between mb-3">
                    <Heading>Últimas Citas</Heading>
                    <Link
                        to="/citas"
                        className="text-sm font-medium text-blue-600 hover:underline"
                    >
                        Ver todas
                    </Link>
                </div>
                <CitasFiltering />
            </div>
        </div>
    );
}
