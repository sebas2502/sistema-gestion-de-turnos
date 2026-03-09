import { useEffect, useState } from "react";
import NavbarPaciente from "../Components/NavbarPaciente";
import api from "../api/api";
import { Navigate, useNavigate } from "react-router-dom";

const TurnosPaciente = () => {

  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadId, setEspecialidadId] = useState("");

  const [profesionales, setProfesionales] = useState([]);
  const [profesionalId, setProfesionalId] = useState("");
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null);

  const [fecha, setFecha] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  const [loading, setLoading] = useState(false);
  const [reservando, setReservando] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const pacienteId = usuario?.pacienteId;

  const navigate = useNavigate();

  const diasSemana = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes"
  };

  /* =========================
     Cargar especialidades
     ========================= */

  useEffect(() => {

    const fetchEspecialidades = async () => {
      try {

        const res = await api.get("/especialidades");

        setEspecialidades(Array.isArray(res.data) ? res.data : []);

      } catch (error) {

        console.error("Error al cargar especialidades", error);

      }
    };

    fetchEspecialidades();

  }, []);

  /* =========================
     Cargar profesionales
     ========================= */

  useEffect(() => {

    if (!especialidadId) return;

    const fetchProfesionales = async () => {

      try {

        const res = await api.get("/profesionales", {
          params: { especialidadId }
        });

        setProfesionales(Array.isArray(res.data) ? res.data : []);

      } catch (error) {

        console.error("Error al cargar profesionales", error);
        setProfesionales([]);

      }

    };

    // reset cascada
    setProfesionalId("");
    setProfesionalSeleccionado(null);
    setFecha("");
    setHorarios([]);
    setHorarioSeleccionado(null);

    fetchProfesionales();

  }, [especialidadId]);

  /* =========================
     Cargar horarios disponibles
     ========================= */

  useEffect(() => {

    if (!fecha || !profesionalId) return;

    const fetchHorarios = async () => {

      try {

        setLoading(true);
        setHorarioSeleccionado(null);

        const res = await api.get("/turnos/disponibles", {
          params: {
            profesionalId,
            fecha
          }
        });
        console.log("horarios backend:", res.data);

        // solo horarios disponibles (lo que devuelve el backend)
        setHorarios(Array.isArray(res.data) ? res.data : []);

      } catch (error) {

        console.error("Error al obtener horarios", error);
        setHorarios([]);

      } finally {

        setLoading(false);

      }

    };

    fetchHorarios();

  }, [fecha, profesionalId]);

  /* =========================
     Confirmar turno
     ========================= */

  const confirmarTurno = async () => {

    if (!horarioSeleccionado) return;

    try {

      setReservando(true);

      await api.post("/turnos/reservar", {
        profesionalId,
        pacienteId,
        fecha,
        hora: horarioSeleccionado
      });

      alert("Turno confirmado correctamente");

      // refrescar horarios
      const res = await api.get("/turnos/disponibles", {
        params: { profesionalId, fecha }
      });

      setHorarios(res.data);
      setHorarioSeleccionado(null);
      navigate('/misTurnos');
    } catch (error) {

      alert(error.response?.data?.error || "Error al reservar turno");

    } finally {

      setReservando(false);

    }

  };

  return (
    <>
      <NavbarPaciente />

      <div className="container py-4 px-3" style={{ maxWidth: "600px" }}>

        <h2 className="text-center text-color mb-4">
          Solicitar turno
        </h2>

        {/* ESPECIALIDAD */}

        <div className="mb-3">

          <label className="form-label">Especialidad</label>

          <select
            className="form-select"
            value={especialidadId}
            onChange={(e) => setEspecialidadId(e.target.value)}
          >

            <option value="">Seleccione una especialidad</option>

            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.id}>
                {esp.nombre}
              </option>
            ))}

          </select>

        </div>

        {/* PROFESIONAL */}

        <div className="mb-3">

          <label className="form-label">Profesional</label>

          <select
            className="form-select"
            value={profesionalId}
            disabled={!especialidadId}
            onChange={(e) => {

              const id = e.target.value;

              setProfesionalId(id);

              const profesional = profesionales.find(p => p.id == id);

              setProfesionalSeleccionado(profesional);

              // limpiar selección previa
              setFecha("");
              setHorarios([]);
              setHorarioSeleccionado(null);

            }}
          >

            <option value="">Seleccione un profesional</option>

            {profesionales.map((p) => (
              <option key={p.id} value={p.id}>
                Dr. {p.usuario.nombreCompleto}
              </option>
            ))}

          </select>

        </div>

        {/* DIAS DE ATENCION */}

        {profesionalSeleccionado && profesionalSeleccionado.disponibilidades?.length > 0 && (

          <div className="card bg-light mt-3">

            <div className="card-body py-2">

              <small>

                <strong>Días de atención:</strong>{" "}

                {profesionalSeleccionado.disponibilidades
                  .map(d => diasSemana[d.diaSemana])
                  .join(", ")}

              </small>

            </div>

          </div>

        )}

        {/* FECHA */}

        <div className="mb-4">

          <label className="form-label">Fecha</label>

          <input
            type="date"
            className="form-control"
            value={fecha}
            disabled={!profesionalId}
            onChange={(e) => {

              setFecha(e.target.value);
              setHorarios([]);
              setHorarioSeleccionado(null);

            }}
          />

        </div>

        <hr />

        {/* HORARIOS DISPONIBLES */}

        <p className="fw-semibold">Horarios disponibles</p>

        {loading && (
          <p className="text-muted">Cargando horarios...</p>
        )}

        {!loading && fecha && profesionalId && horarios.length === 0 && (

          <p className="text-muted">
            No hay turnos disponibles para esta fecha
          </p>

        )}

        <div className="d-flex flex-wrap gap-2 mb-4">

          {horarios.map((hora) => (

            <button
              key={hora}
              className={`btn ${
                horarioSeleccionado === hora
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setHorarioSeleccionado(hora)}
            >
              {hora}
            </button>

          ))}

        </div>

        {/* CONFIRMAR */}

        <div className="d-grid">

          <button
            className="btn btn-primary"
            disabled={!horarioSeleccionado || reservando}
            onClick={confirmarTurno}
          >
            {reservando ? "Reservando..." : "Confirmar turno"}
          </button>

        </div>

      </div>
    </>
  );
};

export default TurnosPaciente;