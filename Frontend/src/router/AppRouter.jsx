import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/auth/FormLogin";
import Registro from "../Pages/auth/FormRegister";
import TurnosPacientes from "../Pages/TurnosPacientes";
import DisponibilidadProfesional from "../Pages/DisponibilidadProfesional";
import Unauthorized from "../Pages/auth/Unauthorized"; // Página opcional
import PrivateRoute from "../Components/PrivateRoute"; // Componente que protege rutas
import MisTurnos from "../Pages/MisTurnos";
import AgendaProfesional from "../Pages/AgendaProfesional";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas privadas para pacientes */}
        <Route element={<PrivateRoute allowedRoles={["paciente"]} />}>
           <Route path="/turnos" element={<TurnosPacientes />} />
           <Route path="/MisTurnos" element={<MisTurnos />} />
        </Route>

        {/* Rutas privadas para profesionales */}
        <Route element={<PrivateRoute allowedRoles={["profesional"]} />}>
          <Route path="/agendaProfesional" element={<AgendaProfesional />} />
          <Route path="/disponibilidadProfesional" element={<DisponibilidadProfesional />} />
        </Route>

        {/* Ruta de acceso denegado */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;