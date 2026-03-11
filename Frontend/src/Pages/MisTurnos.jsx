import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import NavBarPaciente from "../Components/NavbarPaciente";

const MisTurnos = () => {

  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchTurnos = async () => {

      try {

        const res = await api.get(
          "/turnos/misTurnos"
        );
        console.log(res.data)
        setTurnos(res.data);

      } catch (err) {

        setError("No se pudieron cargar los turnos");

      } finally {

        setLoading(false);

      }

    };

    fetchTurnos();

  }, []);

  const getEstadoBadge = (estado) => {

    if (estado === "confirmado") {
      return "bg-success";
    }

    if (estado === "cancelado") {
      return "bg-danger";
    }

    return "bg-secondary";
  };

  const cancelarTurno = async (id) => {

   const confirmar = window.confirm(
    "¿Estás seguro de que querés cancelar este turno?"
  );

  if(!confirmar) return;
  
  try {

    await api.patch(
      `/turnos/${id}/cancelar`
    );

    setTurnos(prev =>
      prev.map(turno =>
        turno.id === id
          ? { ...turno, estado: "CANCELADO" }
          : turno
      )
    );

  } catch (error) {

    console.error(error);

  }

};

  if (loading) {
    return (
      <div className="container py-4">
        <p>Cargando turnos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (

    <>
    <NavBarPaciente />
    <div className="container py-4">
     
   

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Mis Turnos</h2>

        <Link
          to="/turnos"
          className="btn btn-primary"
        >
          Solicitar turno
        </Link>

      </div>

      {turnos.length === 0 ? (

        <div className="alert alert-info">
          No tenés turnos registrados.
        </div>

      ) : (

        <div className="row">

          {turnos.map((turno) => (

            <div
              key={turno.id}
              className="col-md-6 col-lg-4 mb-4"
            >

              <div className="card shadow-sm h-100">

                <div className="card-body d-flex flex-column">

                  <h5 className="card-title">
                    {turno.profesional.usuario.nombreCompleto}
                  </h5>

                  <p className="text-muted mb-3">
                    {turno.profesional.especialidad.nombre}
                  </p>

                  <p className="mb-1">
                    📅 {new Date(turno.fecha).toLocaleDateString()}
                  </p>

                  <p className="mb-3">
                    🕒 {turno.hora}
                  </p>

                  <span
                    className={`badge ${getEstadoBadge(turno.estado)} mb-3`}
                  >
                    {turno.estado}
                  </span>

                  {turno.estado === "confirmado" && (

                    <div className="mt-auto">

                      <button className="btn btn-danger btn-sm w-100"
                        onClick={()=>cancelarTurno(turno.id)}
                      >
                        Cancelar turno
                      </button>

                    </div>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  </>
  );

};

export default MisTurnos;