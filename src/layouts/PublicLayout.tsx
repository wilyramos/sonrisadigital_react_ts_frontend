import Navigation from "../components/Nav/Navigation";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'sonner'



export default function PublicLayout() {
    
    return (
        <>
            <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-6">
                <Navigation />
                <main className="">
                    <Outlet />
                </main>

                <footer className="bg-white shadow mt-auto">
                    <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
                        &copy; {new Date().getFullYear()} My Website. All rights reserved.
                    </div>
                </footer>
            </div>
            <Toaster                
                position="top-right"
                richColors
            />            
        </>
    )
}
