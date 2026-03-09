import React from 'react'
import NavbarProfesional from '../Components/NavBarProfesional'

const Disponibilidad = () => {
  return (
  <>
  <NavbarProfesional />
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
  <h2 className="text-center mb-4">Disponibilidad</h2>

  <div className="mb-3">
    <label className="form-label fw-semibold">Días de atención</label>
    {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map(dia => (
      <div className="form-check" key={dia}>
        <input className="form-check-input" type="checkbox" />
        <label className="form-check-label">{dia}</label>
      </div>
    ))}
  </div>

  <div className="mb-3">
    <label className="form-label fw-semibold">Horario</label>
    <div className="d-flex gap-2">
      <input type="time" className="form-control" />
      <input type="time" className="form-control" />
    </div>
  </div>

  <div className="mb-4">
    <label className="form-label fw-semibold">Duración del turno</label>
    <select className="form-select">
      <option>15 minutos</option>
      <option>30 minutos</option>
      <option>45 minutos</option>
    </select>
  </div>

  <button className="btn btn-primary w-100">
    Guardar disponibilidad
  </button>
</div>
  </>

  )
}

export default Disponibilidad