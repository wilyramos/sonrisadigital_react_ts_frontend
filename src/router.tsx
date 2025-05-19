
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PacienteLayout from "./layouts/PacienteLayout";
import Home from "./views/home";
import Servicios from "./views/Servicios";
import LogiwView from "./views/auth/LogiwView";
import RegisterView from "./views/auth/RegisterView";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Medicos from "./components/Admin/Medic/Medicos";
import Pacientes from "./components/Admin/Paciente/Pacientes";
import Citas from "./components/Admin/Cita/Citas";
import CitaDetailsView from "./components/Admin/Cita/CitaDetailsView";
import CitasCalendar from "./components/Admin/Cita/CitasCalendar";
import PacientesDetailsView from "./components/Admin/Paciente/PacientesDetailsView";
import Historia from "./views/Historia";
import NuestroEquipo from "./views/NuestroEquipo";
import VisionMision from "./views/VisionMision";
import MedicDetailsView from "./components/Admin/Medic/MedicDetailsView";


import About from "./views/About";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route element={<PublicLayout />}>

                    {/* Rutas publicas */}
                    <Route path="/" element={<Home />} index />
                    <Route path="/servicios" element={<Servicios />} />
                    <Route path="/nosotros" element={<About />} />
                    <Route path="/nosotros/historia" element={<Historia />} />
                    <Route path="/nosotros/equipo" element={<NuestroEquipo />} />
                    <Route path="/nosotros/vision-mision" element={<VisionMision />} />
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
                    <Route path="/medicos" element={<Medicos />} />
                    <Route path="/medicos/:medicId" element={<MedicDetailsView />} />
                    <Route path="/pacientes" element={<Pacientes />} />
                    <Route path="/pacientes/:pacienteId" element={<PacientesDetailsView />} />

                    <Route path="/citas" element={<Citas />} />
                    <Route path="/calendar" element={<CitasCalendar />} />
                    <Route path="/citas/:citaId" element={<CitaDetailsView />} />

                </Route>
            </Routes>
        </Router>
    );
}