import { ToastContainer } from "react-toastify";
import { Navigate, Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";
import { ClipLoader } from "react-spinners";
import LayourSidebar from "@/layouts/LayoutSidebar";

export default function AdminLayout() {

    const { user, isError, isLoading } = useAuth();

    if (isError) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <LayourSidebar >
                {
                    isLoading ? (
                        <>
                            <div className="flex items-center justify-center w-full p-20">
                                <ClipLoader color="#36d7b7" size={50} />
                            </div>
                        </>

                    ) : (
                        user?.role === 'admin' ? (
                            <div className="flex flex-col w-full h-full p-6 items-center">
                                <Outlet />
                            </div>

                        ) : (
                            <Navigate to="/login" />
                        )
                    )
                }
            </LayourSidebar>
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