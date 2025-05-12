import Navigation from "../components/Nav/Navigation";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'sonner'
import { ToastContainer } from "react-toastify";
import { FaPhoneAlt, FaClock } from "react-icons/fa";
import Footer from "@/components/Home/Footer";



export default function PublicLayout() {

    return (
        <>
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-sm md:text-base">
                <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-white text-lg" />
                    <p className="font-semibold">
                        Contáctanos: <span className="font-bold">9658658745</span>
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <FaClock className="text-white text-lg" />
                    <p>
                        Horario: <span className="font-semibold">Lunes a Viernes 8:00 AM - 5:00 PM</span>
                    </p>
                </div>
            </div>
            <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-6">
                <Navigation />
                <main className="">
                    <Outlet />
                </main>

                
            </div>
            <footer className=" pt-10">
                    <Footer />
                </footer>
            <Toaster
                position="top-right"
                richColors
            />
            <ToastContainer />
        </>
    )
}
