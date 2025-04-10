import { ToastContainer } from "react-toastify";
import NavigationAdmin from "../components/Nav/NavigationAdmin"; // Componente de navegación para el administrador
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth"; // Asegúrate de que la ruta sea correcta
import { ClipLoader } from "react-spinners"; // Importa un componente de spinner

export default function AdminLayout() {
    const { user, isError, isLoading } = useAuth(); // Asumiendo que useAuth devuelve isAdmin
    const navigate = useNavigate();

   const isAdmin = user?.role



    if (isError) {
        return <Navigate to="/login" />;
    }

    

    return (
        <>
            <div className="flex flex-col min-h-screen"> {/* Fondo para el layout */}
                <NavigationAdmin /> {/* Componente de navegación específico para el administrador */}

                <main className="container mx-auto px-4 py-8 flex-grow">
                    <Outlet />
                </main>

                <footer className="mt-8">
                    <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
                        &copy; {new Date().getFullYear()} Clínica Dental - Panel de Administración
                    </div>
                </footer>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}