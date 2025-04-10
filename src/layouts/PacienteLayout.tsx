import { ToastContainer } from "react-toastify";
import Navigation from "../components/Nav/Navigation";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth"; // Asegúrate de que la ruta sea correcta
import { ClipLoader } from "react-spinners"; // Importa un componente de spinner

export default function PacienteLayout() {
    const { user, isError, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !isLoading) {
            navigate("/login");
        }
    }, [user, isLoading, navigate]);

    if (isError) {
        return <Navigate to="/auth/login" />;
    }

    return (
        <>
            <div className="flex flex-col min-h-screen"> {/* Añadido fondo */}
                <Navigation isPrivate={true} />

                <main className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center"> {/* Centrado el spinner */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center">
                            <ClipLoader color="#10b981" size={40} /> {/* Spinner de carga */}
                            <p className="mt-2 text-gray-600 text-sm">Cargando...</p>
                        </div>
                    ) : (
                        <section className="w-full"> {/* Asegura que la sección ocupe el ancho */}
                            <div className="bg-white shadow rounded-md p-6"> {/* Contenedor para el contenido */}
                                <Outlet />
                            </div>
                        </section>
                    )}
                </main>

                <footer className="mt-8">
                    <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
                        &copy; {new Date().getFullYear()} My Website. All rights reserved.
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