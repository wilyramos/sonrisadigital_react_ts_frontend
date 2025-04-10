
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import Home from "./views/home";
import LogiwView from "./views/auth/LogiwView";




export default function App() {
    return (
        <div className="max-w-5xl mx-auto">
            <Router>
                <Routes>
                    <Route element={<PublicLayout />}>
                        
                        {/* Rutas publicas */}
                        <Route path="/" element={<Home />} index />
                        <Route path="/login" element={<LogiwView />} />
                        <Route path="/register" element={<h1>Register</h1>} />
                        <Route path="/forgot-password" element={<h1>Forgot Password</h1>} />

                        {/* <Route path="/places/:placeId" element={<PlaceView />} />
                        <Route path="/explora" element={<Categorias />} /> */}
                    </Route>

                    <Route element={<PrivateLayout />}>
                        {/* Rutas privadas */}
                        <Route path="/profile" element={<h1>Profile</h1>} />
                        <Route path="/settings" element={<h1>Settings</h1>} />

                    </Route>
                </Routes>
            </Router>
        </div>
    );
}