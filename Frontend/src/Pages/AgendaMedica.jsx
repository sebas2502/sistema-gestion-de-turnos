import React from "react";
import NavbarProfesional from "../Components/NavBarProfesional";

const AgendaMedica = () => {
  return (
  <> 
   <NavbarProfesional />

   <div className="container py-4 px-3">

      <h2 className="text-center text-color mb-4">
        Agenda de turnos
      </h2>

      {/* Fecha */}
      <div className="mb-4">
        <label className="form-label text-color">Fecha</label>
        <input type="date" className="form-control" />
      </div>

      {/* Lista de turnos */}
      <div className="d-flex flex-column gap-3">

        <div className="card shadow-sm cardPersonalizado">
          <div className="card-body">
            <h5 className="mb-1">09:00</h5>
            <p className="mb-0">Juan Pérez</p>
            <small className="text-muted">DNI: 12345678</small>
          </div>
        </div>

        <div className="card shadow-sm cardPersonalizado">
          <div className="card-body">
            <h5 className="mb-1">09:30</h5>
            <p className="mb-0">María López</p>
            <small className="text-muted">DNI: 23456789</small>
          </div>
        </div>

        <div className="card shadow-sm cardPersonalizado">
          <div className="card-body">
            <h5 className="mb-1">10:00</h5>
            <p className="mb-0">Carlos Gómez</p>
            <small className="text-muted">DNI: 34567890</small>
          </div>
        </div>

      </div>

    </div>
    </>
  );
};

export default AgendaMedica;
