import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsReportMonthly } from '../../../api/CitaAPI';


export default function GraficoMensual() {

    const { data, isLoading, error } = useQuery({
        queryKey: ['monthlyAppointments'],
        queryFn: getAppointmentsReportMonthly,
        refetchOnWindowFocus: false,
    });
    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar los datos</div>;

    return (
        <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Citas mensuales del año <span>{new Date().toLocaleString('default', { year: 'numeric' })}</span></h2>
            <p className="text-sm text-gray-500 mb-4">Tendencia mensual de citas registradas.</p>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="citas" stroke="#6366f1" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
