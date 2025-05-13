import { Link } from "react-router-dom";
import CitasFiltering from "../Cita/CitasFiltering";
import Heading from "../Heading";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart , Bar } from 'recharts';

const data = [
    { name: 'lunes', citas: 12 },
    { name: 'martes', citas: 8 },
    { name: 'miércoles', citas: 15 },
    { name: 'jueves', citas: 10 },
    { name: 'viernes', citas: 20 },
    { name: 'sábado', citas: 25 },
    { name: 'domingo', citas: 30 },
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
        <>
            <div className="mb-6 md:mb-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-0">
                    <Heading>Dashboard</Heading>
                </div>
                <div>
                    <Heading>Grafica de citas de la semana</Heading>

                    <div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="citas" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>

            <div className="mb-6 md:mb-10">
                <div className="mb-4">
                    <Heading>Estadísticas</Heading>
                    <p className="text-gray-500 text-sm">Gráficos y análisis de citas.</p>
                </div>
                <div className="w-full overflow-auto">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data2}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="citas" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
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
        </>
    );
}