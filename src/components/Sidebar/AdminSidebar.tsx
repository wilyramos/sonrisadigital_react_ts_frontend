import { Home, Calendar, Users, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import type { User } from "@/types/index";
import { useQueryClient } from "@tanstack/react-query";

interface AdminSidebarProps {
    user?: User | null;
}

const navItems = [
    { label: "Inicio", icon: <Home size={18} />, path: "/dashboard" },
    { label: "Citas", icon: <Calendar size={18} />, path: "/citas" },
    { label: "Pacientes", icon: <Users size={18} />, path: "/pacientes" },
    { label: "Odontólogos", icon: <Users size={18} />, path: "/medicos" },
    { label: "Configuración", icon: <Settings size={18} />, path: "/configuracion" },
];



export default function AdminSidebar({ user }: AdminSidebarProps) {

    const queryClient = useQueryClient();
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN_SONRISADIGITAL');
        queryClient.invalidateQueries({ queryKey: ['user'] });
    };

    return (
        <aside className="h-screen w-48 bg-white border-r border-gray-100 flex flex-col px-4 py-6 shadow-md">
            <div className="mb-10">
                <Logo />
            </div>

            <nav className="flex flex-col gap-1 flex-1">
                {navItems.map(({ label, icon, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 group ${isActive
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                            }`
                        }
                    >
                        <div className="text-gray-400 group-hover:text-blue-600 transition">{icon}</div>
                        <span className="truncate">{label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100">
                {user && (
                    <div className="mb-4 text-xs text-gray-500 px-3">
                        Bienvenido, <span className="font-medium">{user.name}</span>
                        
                    </div>
                )}

                <button
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={logout}
                >
                    <LogOut size={18} />
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
}
