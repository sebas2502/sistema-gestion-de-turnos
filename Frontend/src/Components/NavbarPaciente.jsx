import { Link , useNavigate} from "react-router-dom";
import logoCentroMedico from "../public/imgs/logo_centro_medico.png";
import { logout } from "../services/authServices";

const NavbarPaciente = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">


        <Link className="navbar-brand d-flex align-items-center" to="/misTurnos">
          <img
            src={logoCentroMedico}
            alt="Logo Centro Médico"
            className="me-2"
            style={{ height: "60px", width: "auto" , borderRadius:"50%" 
            }}
          />
          <span className="fw-semibold text-primary d-none d-sm-inline">
            Centro Médico Goya
          </span>
        </Link>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarProfesional"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

     
        <div className="collapse navbar-collapse" id="navbarProfesional">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/misTurnos">
                Mis Turnos
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/turnos">
                Solicitar Turno
              </Link>
            </li>

            <li className="nav-item">
              <button className="btn btn-outline-danger ms-lg-3"
               onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default NavbarPaciente;
