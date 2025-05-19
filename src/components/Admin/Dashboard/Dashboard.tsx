import { Link } from "react-router-dom";
import CitasFiltering from "../Cita/CitasFiltering";
import GraficoSemanal from "./GraficoSemanal";
import GraficoMensual from "./GraficoMensual";

export default function Dashboard() {
    return (
        <div className="space-y-10">

            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <GraficoSemanal />

                {/* Gráfico mensual */}

                <GraficoMensual />
                
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
