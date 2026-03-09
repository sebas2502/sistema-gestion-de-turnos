import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authServices";
import logo_login from "../../public/imgs/logo_login.svg";

const FormLogin = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(usuario, clave); // devuelve { token, rol }
     
      // Guardar token y rol
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.usuario.rol);
      const rol = data.usuario.rol
    
      // Redirigir según rol
      if (rol === "PACIENTE") {
        navigate("/turnos");
      } else if (rol === "PROFESIONAL") {
        navigate("/agenda");
      } else if (rol === "ADMIN") {
        navigate("/dashboard-super"); 
      } else {
        navigate("/"); // fallback
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center px-3">
      <img
        src={logo_login}
        alt="Logo de inicio de sesión"
        className="mb-3"
        style={{ maxWidth: "180px" }}
      />
      <h1 className="text-center text-color mb-4">Inicio de sesión</h1>

      <form className="w-100" style={{ maxWidth: "420px" }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label text-color">Usuario</label>
          <input
            type="text"
            className="form-control"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="clave" className="form-label text-color">Clave</label>
          <input
            type="password"
            className="form-control"
            id="clave"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-danger mb-3">{error}</p>}

        <div className="d-grid mb-4">
          <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;