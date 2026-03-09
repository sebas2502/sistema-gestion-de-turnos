import React from "react";
import logo_register from "../../public/imgs/logo_register.svg";

const FormRegister = () => {
  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center px-3">
      

      <img
        src={logo_register}
        alt="Logo de Registro de usuario"
        className="mb-3"
        style={{ maxWidth: "180px" }}
      />

   
      <h1 className="text-center text-color mb-4">
        Registro De Usuario
      </h1>


      <form className="w-100" style={{ maxWidth: "420px" }}>
        
        <div className="mb-3">
          <label htmlFor="username" className="form-label text-color">
            Usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Ingrese su usuario"
          />
        </div>

         <div className="mb-3">
          <label htmlFor="dni" className="form-label text-color">
            DNI
          </label>
          <input
            type="number"
            className="form-control"
            id="dni"
            placeholder="Ingrese su dni"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label text-color">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="********"
          />
        </div>

          <div className="mb-4">
          <label htmlFor="password" className="form-label text-color">
           Repita su contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="********"
          />
        </div>


        <div className="d-grid mb-4">
          <button type="submit" className="btn btn-success">
            Registrarme
          </button>
        </div>

      </form>
    </div>
  );
};

export default FormRegister;
