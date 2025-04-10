import {
    FaUserInjured,
    FaUserMd,
    FaCalendarCheck,
    FaClipboardList,
    FaMoneyBillWave,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const stats = [
        {
            label: "Pacientes registrados",
            value: 124,
            icon: <FaUserInjured className="text-blue-500 text-3xl" />,
            to: "/admin/pacientes",
        },
        {
            label: "Odontólogos",
            value: 12,
            icon: <FaUserMd className="text-green-500 text-3xl" />,
            to: "/admin/odontologos",
        },
        {
            label: "Citas de hoy",
            value: 8,
            icon: <FaCalendarCheck className="text-yellow-500 text-3xl" />,
            to: "/admin/citas",
        },
        {
            label: "Tratamientos activos",
            value: 32,
            icon: <FaClipboardList className="text-purple-500 text-3xl" />,
            to: "/admin/tratamientos",
        },
        {
            label: "Ingresos del mes",
            value: "$4,250",
            icon: <FaMoneyBillWave className="text-emerald-500 text-3xl" />,
            to: "/admin/finanzas",
        },
    ];

    const agendaDelDia = [
        { hora: "09:00", paciente: "Juan Pérez", odontologo: "Dra. López" },
        { hora: "10:30", paciente: "Ana Díaz", odontologo: "Dr. Ruiz" },
        { hora: "13:00", paciente: "Carlos Torres", odontologo: "Dra. Gómez" },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Panel de Administración</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <Link
                        key={index}
                        to={stat.to}
                        className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-gray-300"
                    >
                        <div className="flex items-center space-x-4">
                            <div>{stat.icon}</div>
                            <div>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                                <p className="text-xl font-semibold text-gray-700">{stat.value}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Agenda del Día */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Agenda del día</h2>
                <ul className="space-y-3">
                    {agendaDelDia.map((cita, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center border-b border-gray-100 pb-2"
                        >
                            <div>
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold">{cita.hora}</span> - {cita.paciente}
                                </p>
                                <p className="text-xs text-gray-500">{cita.odontologo}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
