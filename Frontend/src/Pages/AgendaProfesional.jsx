import { useEffect, useState } from "react";
import api from "../api/api";
import NavbarProfesional from "../Components/NavbarProfesional";
const AgendaProfesional = () => {

  const [fecha, setFecha] = useState("");
  const [turnos, setTurnos] = useState([]);

  const obtenerAgenda = async () => {

    try {

      const res = await api.get(
        `/turnos/agenda?fecha=${fecha}`,
        { withCredentials: true }
      );

      setTurnos(res.data);

    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {

    if (!fecha) return;

    obtenerAgenda();

  }, [fecha]);

  const marcarAtendido = async (turnoId) => {

    if (!window.confirm("¿Marcar este turno como atendido?")) return;

    try {

      await api.patch(`/turnos/${turnoId}/atendido`);

      // refrescar agenda
      obtenerAgenda();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <>
    <NavbarProfesional />
      <div className="container mt-5">

      <h2 className="mb-4 text-center">
        Agenda Profesional
      </h2>

      {/* selector de fecha */}

      <div className="mb-4">

        <label className="form-label">
          Seleccionar fecha
        </label>

        <input
          type="date"
          className="form-control"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

      </div>

      {/* agenda */}

      {turnos.length === 0 ? (

        <div className="alert alert-info">
          No hay turnos para esta fecha
        </div>

      ) : (

        <div className="list-group">

          {turnos.map((turno) => (

            <div key={turno.id} className="list-group-item">

              <h6>
                {turno.paciente.usuario.nombreCompleto}
              </h6>

              <p className="mb-1">
                📅 {turno.fecha}
              </p>

              <p className="mb-1">
                🕒 {turno.hora}
              </p>

              <span className={`badge ${
                turno.estado === "ATENDIDO"
                  ? "bg-success"
                  : turno.estado === "CANCELADO"
                  ? "bg-danger"
                  : "bg-primary"
              }`}>
                {turno.estado}
              </span>

              {turno.estado === "RESERVADO" && (
                <button
                  className="btn btn-success btn-sm ms-3"
                  onClick={() => marcarAtendido(turno.id)}
                >
                  Marcar como atendido
                </button>
              )}

            </div>

          ))}

        </div>

      )}

    </div>
    </>

  );

};

export default AgendaProfesional;