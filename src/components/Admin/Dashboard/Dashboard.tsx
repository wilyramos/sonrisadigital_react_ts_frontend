import { CalendarDays, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import CitasFiltering from "../Cita/CitasFiltering";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import Heading from "../Heading";

// Define variants for the main container (controls staggering)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08, // Reduce el delay entre elementos para una animación más rápida
            delayChildren: 0.1,   // Un pequeño delay inicial antes de que empiece el primer elemento
        },
    },
};

// Define variants for the individual items (each element being animated)
const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Starts invisible and slightly down
    visible: {
        opacity: 1,
        y: 0, // Ends visible and in place
        transition: {
            duration: 0.3, // Duration for each item's animation
            ease: "easeOut",
        },
    },
};

export default function Dashboard() {
    return (
        <motion.div
            className="p-8 space-y-8"
            variants={containerVariants} // Apply container variants to the parent
            initial="hidden"
            animate="visible"       // Trigger the animation on mount
        >
            <motion.div variants={itemVariants}>
                <Heading>Dashboard</Heading>
                <p className="text-gray-600 text-sm">Resumen general y gestión de citas.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-2 flex justify-between items-center">
                    <div className="flex gap-2">
                        <CalendarDays className="text-blue-500 w-7 h-7" />
                        <p className="text-sm text-gray-500 mb-1">Citas Programadas</p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-800 ">12</p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-2 flex justify-between items-center">
                    <div className="flex gap-2">
                        <CheckCircle className="text-green-500 w-7 h-7" />
                        <p className="text-sm text-gray-500 mb-1">Citas Completadas</p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-800 ">8</p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-2 flex justify-between items-center">
                    <div className="flex gap-2">
                        <XCircle className="text-red-500 w-7 h-7" />
                        <p className="text-sm text-gray-500 mb-1">Citas Canceladas</p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-800 ">2</p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-2 flex justify-between items-center">
                    <div className="flex gap-2">
                        <Clock className="text-yellow-500 w-7 h-7" />
                        <p className="text-sm text-gray-500 mb-1">Citas Pendientes</p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-800 ">2</p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-2 flex justify-between items-center">
                    <div className="flex gap-2">
                        <Users className="text-purple-500 w-7 h-7" />
                        <p className="text-sm text-gray-500 mb-1">Pacientes Registrados</p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-800 ">50</p>
                </motion.div>
            </div>

            {/* Lista de próximas citas - Animate its content */}
            <div className="bg-white rounded-xl shadow p-2">
                {/* Animate the header row */}
                <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Próximas Citas</h1>
                    <Link to="/citas" className="text-sm font-semibold text-blue-500 hover:text-blue-700">
                        Ver todas las citas
                    </Link>
                </motion.div>
                {/* Animate the CitasFiltering component's container */}
                <motion.div variants={itemVariants}>
                    <CitasFiltering />
                </motion.div>
            </div>

        </motion.div>
    );
}