// components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  if (!token) {
    // No logueado → redirige a login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.map(r => r.toUpperCase()).includes(rol)) {
    // Rol no permitido → redirige a página no autorizada
    return <Navigate to="/unauthorized" replace />;
  }

  // Usuario autorizado → renderiza la ruta
  return <Outlet />;
};

export default PrivateRoute;