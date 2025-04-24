import { CalendarDays, Users, CheckCircle, XCircle, Clock } from "lucide-react"; // Añadimos Clock para pendientes

export default function Dashboard() {
    return (
        <div className="p-8 space-y-8"> 
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">Panel de Citas</h1>
                <p className="text-gray-600 text-sm">Resumen general y gestión de citas.</p>
            </div>

            {/* Resumen de estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Mayor gap */}
                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-5"> {/* rounded-xl */}
                    <CalendarDays className="text-blue-500 w-7 h-7" /> {/* Mayor tamaño de icono */}
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Citas hoy</p>
                        <p className="text-2xl font-semibold text-gray-800">12</p> {/* Mayor tamaño de texto */}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-5">
                    <CheckCircle className="text-green-500 w-7 h-7" />
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Completadas</p>
                        <p className="text-2xl font-semibold text-gray-800">8</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-5">
                    <XCircle className="text-red-500 w-7 h-7" />
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Canceladas</p>
                        <p className="text-2xl font-semibold text-gray-800">2</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-5">
                    <Users className="text-purple-500 w-7 h-7" />
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Pacientes</p>
                        <p className="text-2xl font-semibold text-gray-800">124</p>
                    </div>
                </div>

                {/* Nueva tarjeta de ejemplo */}
                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-5">
                    <Clock className="text-yellow-500 w-7 h-7" />
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Pendientes</p>
                        <p className="text-2xl font-semibold text-gray-800">5</p>
                    </div>
                </div>
            </div>

            {/* Lista de próximas citas */}
            <div className="bg-white rounded-xl shadow p-6"> {/* rounded-xl */}
                <div className="flex items-center justify-between mb-4"> {/* Encabezado con posible botón */}
                    <h2 className="text-xl font-semibold text-gray-800">Próximas citas</h2>
                    <button className="text-sm text-blue-500 hover:underline">Ver todas</button> {/* Ejemplo de botón */}
                </div>
                
            </div>
        </div>
    );
}