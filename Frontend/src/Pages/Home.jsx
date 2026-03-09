import React from "react";
import logo_centro_medico from "../public/imgs/logo_centro_medico.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center pb-4">
      <div className="mx-auto w-100" style={{ maxWidth: "480px" }}>
        <div className="text-center mb-4">
          <img
            className="logo-centro-medico d-block mx-auto"
            src={logo_centro_medico}
            alt="Imagen ilustrativa"
          />
          <h1 className="text-color">Sistema de gestión de turnos médicos</h1>
          <p className="text-color mt-3">
            Solicite, consulte y administre turnos médicos de forma rápida y
            sencilla desde cualquier dispositivo.
          </p>
        </div>

        <hr />

        <p className="text-center text-color fw-semibold mt-3">
          Acceso para pacientes y profesionales de la salud
        </p>

        <div className="text-center mt-4">
          <Link to="/login" className="btn btn-primary px-4">
            Iniciar sesión
          </Link>
        </div>

        <hr className="my-4" />

        <div className="text-center">
          <p className="text-color">¿Todavía no tenés una cuenta?</p>
          <Link to="/registro" className="btn btn-success px-4">
            Registrarme
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;