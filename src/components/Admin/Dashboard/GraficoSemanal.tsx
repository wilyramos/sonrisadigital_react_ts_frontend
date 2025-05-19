import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsReportWeekly } from '../../../api/CitaAPI';



export default function GraficoSemanal() {

    const { data, isLoading, error } = useQuery({
        queryKey: ['weeklyAppointments'],
        queryFn: getAppointmentsReportWeekly,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar los datos</div>;

    console.log(data);

    return (
        <>
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
        </>
    )
}
