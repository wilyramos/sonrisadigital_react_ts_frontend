import { ToastContainer } from "react-toastify";
import { Navigate, Outlet, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import Logo from "@/components/Logo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export default function AdminLayout() {
    const { user, isError } = useAuth();

    if (isError) return <Navigate to="/login" />;
    if (user && user.role !== "admin") return <Navigate to="/profile" />;

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen ">

                {/* Sidebar for desktop */}
                <aside className="hidden md:block">
                    <AdminSidebar user={user} />
                </aside>

                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* Top Navigation */}
                    <header className="w-full bg-white  px-4 py-3 flex justify-between items-center md:hidden">
                        <Link to="/dashboard" className="w-32">
                            <Logo />
                        </Link>

                        {user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="focus:outline-none">
                                    <Menu className="text-gray-600 hover:text-teal-600 cursor-pointer" size={24} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-40 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">

                                    <DropdownMenuItem>
                                        <Link to="/citas" className="w-full text-sm text-gray-700 hover:text-teal-600">Citas</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="/pacientes" className="w-full text-sm text-gray-700 hover:text-teal-600">Pacientes</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="/medicos" className="w-full text-sm text-gray-700 hover:text-teal-600">Odontólogos</Link>
                                    </DropdownMenuItem>


                                    <DropdownMenuItem>
                                        <Link to="/profile" className="w-full text-sm text-gray-700 hover:text-teal-600">Perfil</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <button
                                            className="w-full text-sm text-red-600 hover:text-red-700 text-left"
                                            onClick={() => {
                                                localStorage.removeItem("token");
                                                window.location.href = "/login";
                                            }}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </header>

                    {/* Main content */}
                    <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                        <Outlet />
                    </main>
                </div>
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
