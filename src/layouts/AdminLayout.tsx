import { ToastContainer } from "react-toastify";
import { Navigate, Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";
import { ClipLoader } from "react-spinners";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

export default function AdminLayout() {
    const { user, isError, isLoading } = useAuth();

    if (isError) {
        return <Navigate to="/login" />;
    }

    // navigate to login if user is not admin
    if (user && user.role !== "admin") {
        return <Navigate to="/profile" />;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen">

                <aside className="hidden md:block">
                    <AdminSidebar user={user} />
                </aside>

                <div className=" flex flex-col md:hidden justify-center items-center">
                <div className="w-64 flex items-center pt-4">
                    <Link to="/dashboard" className="focus:outline-none">
                        <Logo />
                    </Link>
                </div>
                </div>   

                <main className="flex-1 p-10 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <ClipLoader color="#000" size={50} />
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </main>
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
