import { ToastContainer } from "react-toastify";
import NavigationAdmin from "../components/Nav/NavigationAdmin"; // Componente de navegación para el administrador
import { Navigate, Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";
import { ClipLoader } from "react-spinners";
export default function AdminLayout() {

    const { user, isError, isLoading } = useAuth();

    if (isError) {
        return <Navigate to="/login" />;
    }


    return (
        <>
            <div className="flex flex-col min-h-screen">
                <NavigationAdmin />

                <main className="container mx-auto px-4 py-8 flex flex-grow">
                    {
                        isLoading ? (
                            <div className="flex flex-col items-center justify-center w-full">
                                <ClipLoader color="#10b981" size={40} /> {/* Spinner de carga */}
                                <p className="mt-2 text-gray-600 text-sm">Cargando...</p>
                            </div>
                        ) : (
                            user?.role === 'admin' ? (
                                <section className="w-full">
                                    <div className=" p-6">
                                        <Outlet />
                                    </div>
                                </section>
                            ) : (
                                <Navigate to="/login" />
                            )
                        )
                    }
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