import { useEffect, useState } from "react";
import api from "../api/api";
import NavbarProfesional from "../Components/NavbarProfesional";

const DisponibilidadProfesional = () => {

  const [disponibilidades, setDisponibilidades] = useState([]);

  const [form, setForm] = useState({
    diaSemana: "",
    horaDesde: "",
    horaHasta: "",
    duracionTurno: ""
  });

  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];

  const obtenerDisponibilidades = async () => {

    try {

      const res = await api.get("/disponibilidad");

      setDisponibilidades(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    obtenerDisponibilidades();

  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const crearDisponibilidad = async (e) => {

    e.preventDefault();

    try {

      await api.post("/disponibilidad", form);

      setForm({
        diaSemana: "",
        horaDesde: "",
        horaHasta: "",
        duracionTurno: ""
      });

      obtenerDisponibilidades();

    } catch (error) {

      console.error(error);

    }

  };

  const eliminarDisponibilidad = async (id) => {

    if (!window.confirm("¿Eliminar esta disponibilidad?")) return;

    try {

      await api.delete(`/disponibilidad/${id}`);

      obtenerDisponibilidades();

    } catch (error) {

      console.error(error);

    }

  };

  return (

   <>
   <NavbarProfesional />
     <div className="container mt-5">

      <h2 className="mb-4 text-center">
        Configurar Disponibilidad
      </h2>

      {/* formulario */}

      <div className="card mb-4">

        <div className="card-body">

          <form onSubmit={crearDisponibilidad}>

            <div className="row g-3">

              <div className="col-md-3">

                <label className="form-label">Día</label>

                <select
                  name="diaSemana"
                  className="form-select"
                  value={form.diaSemana}
                  onChange={handleChange}
                  required
                >

                  <option value="">Seleccionar</option>

                  {dias.map((d, i) => (
                    <option key={i} value={i}>
                      {d}
                    </option>
                  ))}

                </select>

              </div>

              <div className="col-md-3">

                <label className="form-label">Desde</label>

                <input
                  type="time"
                  name="horaDesde"
                  className="form-control"
                  value={form.horaDesde}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-3">

                <label className="form-label">Hasta</label>

                <input
                  type="time"
                  name="horaHasta"
                  className="form-control"
                  value={form.horaHasta}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-2">

                <label className="form-label">Duración</label>

                <input
                  type="number"
                  name="duracionTurno"
                  className="form-control"
                  placeholder="min"
                  value={form.duracionTurno}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-1 d-flex align-items-end">

                <button className="btn btn-primary w-100">
                  +
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

      {/* lista */}

      {disponibilidades.length === 0 ? (

        <div className="alert alert-info">
          No hay disponibilidades configuradas
        </div>

      ) : (

        <div className="list-group">

          {disponibilidades.map((d) => (

            <div
              key={d.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >

              <div>

                <strong>
                  {dias[d.diaSemana]}
                </strong>

                <div>

                  🕒 {d.horaDesde} - {d.horaHasta}

                </div>

                <small className="text-muted">

                  Turnos de {d.duracionTurno} minutos

                </small>

              </div>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => eliminarDisponibilidad(d.id)}
              >

                Eliminar

              </button>

            </div>

          ))}

        </div>

      )}

    </div>
   </>

  );

};

export default DisponibilidadProfesional;