
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PacienteLayout from "./layouts/PacienteLayout";
import Home from "./views/home";
import LogiwView from "./views/auth/LogiwView";
import RegisterView from "./views/auth/RegisterView";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./components/Admin/Dashboard";
import Medicos from "./components/Admin/Medicos";




export default function App() {
    return (
        <div className="max-w-5xl mx-auto">
            <Router>
                <Routes>
                    <Route element={<PublicLayout />}>
                        
                        {/* Rutas publicas */}
                        <Route path="/" element={<Home />} index />
                        <Route path="/login" element={<LogiwView />} />
                        <Route path="/register" element={<RegisterView />} />
                        <Route path="/forgot-password" element={<h1>Forgot Password</h1>} />

                       
                    </Route>

                    <Route element={<PacienteLayout />}>
                        {/* Rutas privadas */}
                        <Route path="/profile" element={<h1>Profile</h1>} />
                        <Route path="/settings" element={<h1>Settings</h1>} />
                    </Route>

                    <Route element={<AdminLayout />}>

                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/admin/medicos" element={<Medicos />} />
                        

                    </Route>
                </Routes>
            </Router>
        </div>
    );
}