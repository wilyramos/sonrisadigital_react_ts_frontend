import { Link } from "react-router-dom";
import CitasFiltering from "../Cita/CitasFiltering";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const data = [
    { name: 'Lun', citas: 12 },
    { name: 'Mar', citas: 8 },
    { name: 'Mié', citas: 15 },
    { name: 'Jue', citas: 10 },
    { name: 'Vie', citas: 20 },
    { name: 'Sáb', citas: 25 },
    { name: 'Dom', citas: 30 },
];

const data2 = [
    { name: 'Ene', citas: 12 },
    { name: 'Feb', citas: 8 },
    { name: 'Mar', citas: 15 },
    { name: 'Abr', citas: 10 },
    { name: 'May', citas: 20 },
    { name: 'Jun', citas: 25 },
    { name: 'Jul', citas: 30 },
    { name: 'Ago', citas: 35 },
    { name: 'Sep', citas: 40 },
    { name: 'Oct', citas: 45 },
    { name: 'Nov', citas: 50 },
    { name: 'Dic', citas: 55 },
];

export default function Dashboard() {
    return (
        <div className="space-y-10">

            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gráfico semanal */}
                <div className="bg-white shadow-md rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Citas por Día (Semana Actual)</h2>
                    <p className="text-sm text-gray-500 mb-4">Cantidad de citas por día.</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="citas" fill="#14b8a6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Gráfico mensual */}
                <div className="bg-white shadow-md rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Citas por Mes (Último Año)</h2>
                    <p className="text-sm text-gray-500 mb-4">Tendencia mensual de citas registradas.</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data2}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="citas" stroke="#6366f1" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Últimas citas */}
            <div className="bg-white shadow-md rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Últimas Citas</h2>
                    <Link
                        to="/citas"
                        className="text-sm font-medium text-teal-600 hover:underline"
                    >
                        Ver todas
                    </Link>
                </div>
                <CitasFiltering />
            </div>
        </div>
    );
}
