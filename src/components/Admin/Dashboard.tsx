import {
    FaUserInjured,
    FaUserMd,
    FaCalendarCheck,
    FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import CitasFiltering from "./Cita/CitasFiltering";
import { getTodayDate } from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentByDate } from "@/api/CitaAPI";
import { getUsers } from "@/api/AuthAPI";
import { getMedics } from "@/api/MedicAPI";


export default function Dashboard() {

    // 

    // stats para obtener la cantidad de citas de hoy

    const today = getTodayDate();
    const { data: citasHoy, isLoading: loadingCitas } = useQuery({
        queryKey: ["citas", today],
        queryFn: () => getAppointmentByDate(today),
    });

    // stats para obtener el numero de pacientes totales

    const { data: pacientesTotales, isLoading: loadingPacientes } = useQuery({
        queryKey: ["pacientes"],
        queryFn: () => getUsers(),
    });

    
    // stats para obtener el numero de odontologos totales
    const { data: odontologosTotales, isLoading: loadingOdontologos } = useQuery({
        queryKey: ["odontologos"],
        queryFn: () => getMedics(),
    });

    const odontologosCount = odontologosTotales?.length || 0;

    const stats = [
        {
            label: "Pacientes totales",
            value: pacientesTotales?.total || 0, 
            icon: <FaUserInjured className="text-blue-500 text-3xl" />,
            to: "/admin/pacientes",
        },
        {
            label: "Odontólogos",
            value: odontologosCount,
            0: odontologosTotales?.total || 0,
            icon: <FaUserMd className="text-green-500 text-3xl" />,
            to: "/admin/medicos",
        },
        {
            label: "Citas de hoy",
            value: loadingCitas ? 0 : citasHoy?.length,
            icon: <FaCalendarCheck className="text-yellow-500 text-3xl" />,
            to: "/admin/citas",
        },
        {
            label: "Tratamientos activos",
            value: 32,
            icon: <FaClipboardList className="text-purple-500 text-3xl" />,
            to: "/admin/tratamientos",
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Panel de Administración</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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

            <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Citas de hoy</h2>
                <CitasFiltering
                />
            </div>
        </div>
    );
}
