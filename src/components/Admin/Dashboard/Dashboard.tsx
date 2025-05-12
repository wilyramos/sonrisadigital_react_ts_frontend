import { CalendarDays, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import CitasFiltering from "../Cita/CitasFiltering";
import { Link } from "react-router-dom";
import Heading from "../Heading";

export default function Dashboard() {
    return (
        <div className="">
            <div>
                <Heading>Dashboard</Heading>
                <p className="text-gray-600 text-sm">Resumen general y gestión de citas.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="bg-white rounded-xl shadow-lg p-2 flex justify-between items-center">
                    <div className="flex gap-2">
                        <CalendarDays className="text-blue-500 w-7 h-7" />
                        <p className="text-sm text-gray-500 mb-1">Citas Programadas</p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-800 ">12</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-2 flex justify-between items-center">
                    <div className="flex gap-2">
                        <CheckCircle className="text-green-500 w-7 h-7" />
                        <p className="text-sm text-gray-500 mb-1">Citas Completadas</p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-800 ">8</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-2 flex justify-between items-center">
                    <div className="flex gap-2">
                        <XCircle className="text-red-500 w-7 h-7" />
                        <p className="text-sm text-gray-500 mb-1">Citas Canceladas</p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-800 ">2</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-2 flex justify-between items-center">
                    <div className="flex gap-2">
                        <Clock className="text-yellow-500 w-7 h-7" />
                        <p className="text-sm text-gray-500 mb-1">Citas Pendientes</p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-800 ">2</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-2 flex justify-between items-center">
                    <div className="flex gap-2">
                        <Users className="text-purple-500 w-7 h-7" />
                        <p className="text-sm text-gray-500 mb-1">Pacientes Registrados</p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-800 ">50</p>
                </div>
            </div>

            <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                    <Heading>Últimas Citas</Heading>
                    <Link to="/citas" className="text-sm font-semibold text-blue-500 hover:text-blue-700">
                        Ver todas las citas
                    </Link>
                </div>
                <CitasFiltering />
            </div>

        </div>
    );
}